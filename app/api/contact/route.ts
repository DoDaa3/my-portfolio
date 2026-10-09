import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Error as MongooseError } from 'mongoose';
import { connectDB } from '@/lib/db';
import { ContactModel } from '@/lib/models';
import { contactEmail } from '@/lib/emailTemplate';

// Saving to MongoDB plus sending the email can take a few seconds
export const maxDuration = 30;

export async function POST(request: Request) {
  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, message } = body;
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' || !name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    await connectDB();
    await ContactModel.create({ name, email, message });

    // Send email before responding (the function is frozen once the response is sent)
    const emailConfigured =
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      process.env.EMAIL_PASS !== 'YOUR_APP_PASSWORD_HERE';

    if (emailConfigured) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          replyTo: email,
          ...contactEmail({ name, email, message }),
        });
      } catch (emailErr) {
        console.error('Email send error:', emailErr);
      }
    }

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 });
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      const messages = Object.values(err.errors).map((e) => e.message);
      return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
    }
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Server error. Please try again later.' }, { status: 500 });
  }
}
