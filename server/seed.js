const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const projects = [
  {
    title: 'FlowBoard',
    description:
      'A collaborative kanban task manager with real-time updates, drag-and-drop boards, priorities, due dates, and multiple views (board, list, calendar, timeline).',
    image: '/images/projects/task-management.webp',
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
    image: '/images/projects/hey-tajine.webp',
    imagePosition: '50% 40%',
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
    image: '/images/projects/ummaty.webp',
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
    image: '/images/projects/ai-content-studio.webp',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Gemini AI', 'React Query'],
    liveUrl: 'https://ai-content-studio-zeta-gules.vercel.app/',
    githubUrl: 'https://github.com/DoDaa3/ai-content-studio',
    featured: true,
    order: 4,
  },
  {
    title: 'BimoHealth',
    description:
      'An online mental health consultation platform with interactive mental health assessments, responsive UI components, secure authentication, and S3-backed image uploads.',
    image: '/images/projects/bimo-health.webp',
    imagePosition: 'bottom',
    techStack: ['React', 'Tailwind CSS', 'AWS S3'],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    order: 5,
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
