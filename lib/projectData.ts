// Project list shown on the site. It's also what `npm run seed` writes to MongoDB,
// and the fallback when the database is unreachable.
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
  /** Set on the server when a case study exists (see lib/caseStudies.ts) */
  caseStudySlug?: string;
}

export const fallbackProjects: Project[] = [
  {
    _id: '1',
    title: 'FlowBoard',
    description:
      'A real-time collaborative Kanban board with drag-and-drop, role-based board sharing, sprints, and board, list, calendar and timeline views.',
    image: '/images/projects/task-management.webp',
    techStack: ['React', 'TypeScript', 'Socket.io', 'Express', 'PostgreSQL', 'Prisma'],
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
      'An online mental health platform for a South African client: doctor search, appointment booking, video consultations and interactive assessments.',
    image: '/images/projects/bimo-health.webp',
    imagePosition: 'bottom',
    techStack: ['React', 'Tailwind CSS', 'Amazon Chime SDK', 'AWS S3'],
  },
  {
    _id: '6',
    title: 'FCN4U',
    description:
      'A Photoshop-style thumbnail editor built into a content platform: text, images, shapes, arrows, shadows and layers.',
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Fabric.js'],
  },
];
