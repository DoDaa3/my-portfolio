const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Submit a contact form message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
