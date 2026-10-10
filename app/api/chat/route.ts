import { NextResponse } from 'next/server';
import { chatSystemPrompt } from '@/lib/chatContext';

export const maxDuration = 30;

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1000;

// Best-effort per-IP limit. Serverless instances don't share memory, so this
// caps bursts from one visitor rather than enforcing a strict global quota.
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== 'object' || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const messages = (body as { messages: unknown[] }).messages.slice(-MAX_MESSAGES);
  const parsed: ChatMessage[] = [];
  for (const m of messages) {
    if (!m || typeof m !== 'object') return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
    const text = content.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (text) parsed.push({ role, content: text });
  }
  if (parsed.length === 0 || parsed[parsed.length - 1].role !== 'user') return null;
  return parsed;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'The assistant is not configured yet.' }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'You’ve asked a lot of questions in a short time. Please try again in a few minutes.' },
      { status: 429 }
    );
  }

  let messages: ChatMessage[] | null = null;
  try {
    messages = parseMessages(await request.json());
  } catch {
    // fall through to the 400 below
  }
  if (!messages) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: chatSystemPrompt }] },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: { temperature: 0.3, maxOutputTokens: 600 },
      }),
    }
  );

  if (!upstream.ok || !upstream.body) {
    console.error('Gemini error:', upstream.status, await upstream.text().catch(() => ''));
    return NextResponse.json(
      { error: 'The assistant is unavailable right now. Please try again later.' },
      { status: 502 }
    );
  }

  // Gemini streams Server-Sent Events; forward just the text so the client can render it as it arrives
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';

  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() ?? '';
        for (const event of events) {
          for (const line of event.split('\n')) {
            if (!line.startsWith('data:')) continue;
            try {
              const data = JSON.parse(line.slice(5));
              const parts: { text?: string }[] = data?.candidates?.[0]?.content?.parts ?? [];
              const text = parts.map((p) => p.text ?? '').join('');
              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              // Ignore keep-alives and partial lines
            }
          }
        }
      },
    })
  );

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
