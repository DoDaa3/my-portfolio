import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const timestamp = new Date().toISOString();
  try {
    await connectDB();
    return NextResponse.json({ status: 'ok', db: 'connected', timestamp });
  } catch (err) {
    const db = err instanceof Error ? err.message : 'unknown error';
    return NextResponse.json({ status: 'error', db, timestamp }, { status: 500 });
  }
}
