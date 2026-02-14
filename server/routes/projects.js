const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects - Fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    console.error('Projects fetch error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
