import 'server-only';
import { connectDB } from './db';
import { ProjectModel } from './models';

export interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  /** CSS object-position for the card crop, e.g. 'top', 'bottom', '50% 40%' */
  imagePosition?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

// Used when the database is unavailable (local dev without env, build outages)
export const fallbackProjects: Project[] = [
  {
    _id: '1',
    title: 'FlowBoard',
    description:
      'A collaborative kanban task manager with real-time updates, drag-and-drop boards, priorities, due dates, and multiple views (board, list, calendar, timeline).',
    image: '/images/projects/task-management.webp',
    techStack: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    liveUrl: 'https://kanban-client-amber.vercel.app',
    githubUrl: 'https://github.com/DoDaa3/todo-app',
  },
  {
    _id: '2',
    title: 'Hey Tajine',
    description:
      'A Slack bot with a dedicated landing page, designed to enhance team communication and workflow automation within Slack workspaces.',
    image: '/images/projects/hey-tajine.webp',
    imagePosition: '50% 40%',
    techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://hey-tajine-frontend.vercel.app/',
  },
  {
    _id: '3',
    title: 'Ummaty',
    description:
      'A charity website landing page built to connect people with charitable causes and make giving back to the community more accessible.',
    image: '/images/projects/ummaty.webp',
    techStack: ['HTML', 'Tailwind CSS', 'React'],
    liveUrl: 'https://image-grid-ten.vercel.app/',
  },
  {
    _id: '4',
    title: 'AI Content Studio',
    description:
      'An AI-powered content generation platform built with Next.js and Google Gemini, featuring authentication via Supabase, real-time markdown rendering, and a polished animated UI.',
    image: '/images/projects/ai-content-studio.webp',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Gemini AI', 'React Query'],
    liveUrl: 'https://ai-content-studio-zeta-gules.vercel.app/',
    githubUrl: 'https://github.com/DoDaa3/ai-content-studio',
  },
  {
    _id: '5',
    title: 'BimoHealth',
    description:
      'An online mental health consultation platform with interactive mental health assessments, responsive UI components, secure authentication, and S3-backed image uploads.',
    image: '/images/projects/bimo-health.webp',
    imagePosition: 'bottom',
    techStack: ['React', 'Tailwind CSS', 'AWS S3'],
  },
];


export async function getProjects(): Promise<Project[]> {
  try {
    await connectDB();
    const docs = await ProjectModel.find().sort({ order: 1 }).lean();
    if (docs.length === 0) return fallbackProjects;

    return docs.map((doc) => ({
      _id: String(doc._id),
      title: doc.title,
      description: doc.description,
      image: doc.image || undefined,
      imagePosition: doc.imagePosition || undefined,
      techStack: doc.techStack ?? [],
      liveUrl: doc.liveUrl || undefined,
      githubUrl: doc.githubUrl || undefined,
    }));
  } catch (err) {
    console.error('Falling back to built-in projects:', err);
    return fallbackProjects;
  }
}
