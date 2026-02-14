const mongoose = require('mongoose');
const connectDB = require('./_lib/db');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  description: { type: String, required: [true, 'Description is required'], trim: true },
  image: { type: String, default: '' },
  techStack: { type: [String], default: [] },
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    console.error('Projects fetch error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
