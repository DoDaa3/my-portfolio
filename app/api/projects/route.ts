import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ProjectModel } from '@/lib/models';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const projects = await ProjectModel.find().sort({ order: 1 }).lean();
    return NextResponse.json(projects);
  } catch (err) {
    console.error('Projects fetch error:', err);
    return NextResponse.json({ error: 'Server error. Please try again later.' }, { status: 500 });
  }
}
