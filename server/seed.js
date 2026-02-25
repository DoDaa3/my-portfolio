const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration using Stripe.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 1,
  },
  {
    title: 'Task Management App',
    description:
      'A collaborative task management tool with real-time updates, drag-and-drop kanban boards, and team workspace features.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    techStack: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    liveUrl: 'https://kanban-client-amber.vercel.app',
    githubUrl: 'https://github.com/DoDaa3/todo-app',
    featured: true,
    order: 2,
  },
  {
    title: 'Weather Dashboard',
    description:
      'A responsive weather dashboard that displays current conditions, forecasts, and interactive maps using the OpenWeatherMap API.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop',
    techStack: ['React', 'Chart.js', 'OpenWeatherMap API', 'CSS3'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    order: 3,
  },
  {
    title: 'Social Media Analytics',
    description:
      'A data visualization platform that aggregates social media metrics and presents insights through interactive charts and dashboards.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    techStack: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 4,
  },
  {
    title: 'AI Chat Application',
    description:
      'An AI-powered chat application with natural language processing, conversation history, and multiple AI model support.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    techStack: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Prisma'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    order: 5,
  },
  {
    title: 'Fitness Tracker',
    description:
      'A mobile-first fitness tracking app with workout logging, progress charts, goal setting, and social sharing capabilities.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop',
    techStack: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    order: 6,
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
