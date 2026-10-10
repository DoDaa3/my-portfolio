'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
}

const SUGGESTIONS = [
  'What’s Omar’s experience with React?',
  'Tell me about FlowBoard',
  'Is he open to remote work?',
  'What did he build at Metaverse?',
];

const CONTACT_EMAIL = 'amineomar019@gmail.com';
const MAX_LENGTH = 1000;

// Minimal formatting for assistant replies: paragraphs, "- " bullets, **bold** and links
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
  return text.split(pattern).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (/^https?:\/\//.test(part)) {
      const url = part.replace(/[.,]$/, '');
      const internal = url.startsWith('https://omaramine.vercel.app');
      return (
        <a
          key={key}
          href={internal ? url.replace('https://omaramine.vercel.app', '') || '/' : url}
          {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          className="font-medium text-primary-600 dark:text-primary-400 underline underline-offset-2 break-words"
        >
          {internal ? url.replace('https://omaramine.vercel.app', 'omaramine.vercel.app') : url}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(part)) {
      return (
        <a key={key} href={`mailto:${part}`} className="font-medium text-primary-600 dark:text-primary-400 underline underline-offset-2">
          {part}
        </a>
      );
    }
    return part;
  });
}

function FormattedText({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, b) => {
        const lines = block.split('\n');
        if (lines.every((l) => /^\s*[-*•]\s+/.test(l))) {
          return (
            <ul key={b} className="list-disc pl-5 space-y-1 [&:not(:first-child)]:mt-2">
              {lines.map((l, i) => (
                <li key={i}>{renderInline(l.replace(/^\s*[-*•]\s+/, ''), `${b}-${i}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={b} className="[&:not(:first-child)]:mt-2">
            {lines.map((l, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {renderInline(l.replace(/^\s*[-*•]\s+/, '• '), `${b}-${i}`)}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

function Avatar({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/images/profile.png"
      alt=""
      width={size}
      height={size}
      className="rounded-full object-cover object-[center_20%] shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5z" />
      <path d="M19 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z" opacity=".7" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Focus the input when opening; Esc closes
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  // Keep the latest message in view while it streams
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Grow the textarea with its content, up to ~4 lines
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  }, [input]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = async (text: string) => {
    const question = text.trim().slice(0, MAX_LENGTH);
    if (!question || streaming) return;

    const history = [...messages.filter((m) => !m.error), { role: 'user' as const, content: question }];
    setMessages([...messages, { role: 'user', content: question }, { role: 'assistant', content: '' }]);
    setInput('');
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const updateLast = (update: (m: Message) => Message) =>
      setMessages((prev) => [...prev.slice(0, -1), update(prev[prev.length - 1])]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Something went wrong.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        updateLast((m) => ({ ...m, content: m.content + chunk }));
      }
      updateLast((m) => (m.content.trim() ? m : { ...m, error: true, content: 'I couldn’t come up with an answer. Try rephrasing your question.' }));
    } catch (err) {
      if (controller.signal.aborted) return;
      const reason = err instanceof Error ? err.message : 'Something went wrong.';
      updateLast(() => ({
        role: 'assistant',
        error: true,
        content: `${reason} You can always reach Omar directly at ${CONTACT_EMAIL}.`,
      }));
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setStreaming(false);
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setStreaming(false);
    setMessages([]);
    setInput('');
    inputRef.current?.focus();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  };

  const last = messages[messages.length - 1];
  const waitingForFirstToken = streaming && last?.role === 'assistant' && last.content === '';

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask my AI about Omar"
        aria-expanded={open}
        aria-controls="ask-ai-panel"
        className={`fixed z-[60] bottom-5 right-5 sm:bottom-6 sm:right-6 group flex items-center gap-2 h-14 pl-4 pr-5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-400/50 ${
          open ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <span className="relative flex items-center justify-center">
          <SparkleIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
        </span>
        <span className="text-sm">Ask my AI</span>
      </button>

      {/* Panel */}
      <div
        id="ask-ai-panel"
        role="dialog"
        aria-modal="false"
        aria-label="Ask my AI about Omar"
        className={`fixed z-[70] inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px] sm:max-h-[calc(100vh-3rem)] flex flex-col overflow-hidden bg-white dark:bg-gray-900 sm:rounded-2xl sm:border border-gray-200 dark:border-gray-800 shadow-2xl origin-bottom-right transition-all duration-300 ease-out ${
          open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none invisible'
        }`}
      >
        {/* Header */}
        <div className="relative flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white">
          <div className="relative">
            <Avatar size={40} />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 ring-2 ring-primary-600" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold leading-tight">Ask about Omar</p>
            <p className="text-xs text-primary-100/90 truncate">Answers from my portfolio</p>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="p-2 rounded-lg hover:bg-white/15 transition-colors"
              aria-label="Start a new conversation"
              title="New conversation"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={close}
            className="p-2 rounded-lg hover:bg-white/15 transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gray-50/60 dark:bg-gray-950/40" aria-live="polite">
          {/* Welcome */}
          <div className="flex gap-2.5 items-end">
            <Avatar size={28} />
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 shadow-sm">
              Hi! 👋 I’m Omar’s AI assistant. Ask me anything about his experience, projects or skills.
            </div>
          </div>

          {messages.length === 0 && (
            <div className="pl-[38px] flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="text-left text-xs font-medium px-3 py-2 rounded-xl border border-primary-200 dark:border-primary-800/60 bg-primary-50/70 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/40 hover:border-primary-300 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary-600 text-white px-4 py-2.5 text-sm whitespace-pre-wrap break-words shadow-sm">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={i} className="flex gap-2.5 items-end">
                <Avatar size={28} />
                <div
                  className={`max-w-[85%] rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed shadow-sm break-words ${
                    m.error
                      ? 'bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 text-red-700 dark:text-red-300'
                      : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {m.content === '' && waitingForFirstToken && i === messages.length - 1 ? (
                    <span className="flex gap-1 py-1" aria-label="Typing">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                          style={{ animationDelay: `${d * 150}ms` }}
                        />
                      ))}
                    </span>
                  ) : (
                    <FormattedText text={m.content} />
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* Input */}
        <form onSubmit={onSubmit} className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3 pb-2">
          <div className="flex items-end gap-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 focus-within:border-primary-400 focus-within:ring-4 focus-within:ring-primary-500/10 transition-all pl-4 pr-1.5 py-1.5">
            <label htmlFor="ask-ai-input" className="sr-only">Your question</label>
            <textarea
              id="ask-ai-input"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_LENGTH}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about Omar’s experience…"
              className="flex-1 resize-none bg-transparent py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 outline-none max-h-28"
            />
            <button
              type="submit"
              disabled={!input.trim() || streaming}
              aria-label="Send"
              className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-[11px] text-center text-gray-400 dark:text-gray-500">
            AI can make mistakes. For anything important, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2 hover:text-primary-500">Omar</a>.
          </p>
        </form>
      </div>
    </>
  );
}
