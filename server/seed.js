const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const projects = [
  {
    title: 'Task Management App',
    description:
      'A collaborative task management tool with real-time updates, drag-and-drop kanban boards, and team workspace features.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    techStack: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    liveUrl: 'https://kanban-client-amber.vercel.app',
    githubUrl: 'https://github.com/DoDaa3/todo-app',
    featured: true,
    order: 1,
  },
  {
    title: 'Hey Tajine',
    description:
      'A Slack bot with a dedicated landing page, designed to enhance team communication and workflow automation within Slack workspaces.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop',
    techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://hey-tajine-frontend.vercel.app/',
    githubUrl: '',
    featured: true,
    order: 2,
  },
  {
    title: 'Ummaty',
    description:
      'A charity website landing page built to connect people with charitable causes and make giving back to the community more accessible.',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop',
    techStack: ['HTML', 'Tailwind CSS', 'React'],
    liveUrl: 'https://image-grid-ten.vercel.app/',
    githubUrl: '',
    featured: true,
    order: 3,
  },
  {
    title: 'AI Content Studio',
    description:
      'An AI-powered content generation platform built with Next.js and Google Gemini, featuring authentication via Supabase, real-time markdown rendering, and a polished animated UI.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Gemini AI', 'React Query'],
    liveUrl: 'https://ai-content-studio-zeta-gules.vercel.app/',
    githubUrl: 'https://github.com/DoDaa3/ai-content-studio',
    featured: true,
    order: 4,
  },
];

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'
    );
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    console.log('Cleared existing projects');

    await Project.insertMany(projects);
    console.log(`Seeded ${projects.length} projects`);

    await mongoose.connection.close();
    console.log('Done');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
