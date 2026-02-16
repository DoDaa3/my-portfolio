const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const connectDB = require('./_lib/db');

// Define schema inline to avoid model recompilation in serverless
const contactSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
  email: { type: String, required: [true, 'Email is required'], trim: true, maxlength: 254, match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'] },
  message: { type: String, required: [true, 'Message is required'], trim: true, maxlength: 5000 },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send email before responding (Vercel kills the function after res is sent)
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
          subject: `Portfolio Contact: ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `<h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>`,
        });
      } catch (emailErr) {
        console.error('Email send error:', emailErr);
      }
    }

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
