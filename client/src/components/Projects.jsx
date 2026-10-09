import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Fallback projects used when the API is unavailable
const fallbackProjects = [
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

const API_URL =
  process.env.REACT_APP_API_URL || '';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleRef, titleVisible] = useScrollAnimation();

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    async function fetchProjects() {
      try {
        const res = await fetch(`${API_URL}/api/projects`, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProjects(data.length > 0 ? data : fallbackProjects);
      } catch {
        setProjects(fallbackProjects);
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    }
    fetchProjects();

    return () => { clearTimeout(timeout); controller.abort(); };
  }, []);

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <h2
          ref={titleRef}
          className={`section-title scroll-hidden ${titleVisible ? 'scroll-visible' : ''}`}
        >
          My <span className="text-primary-600 dark:text-primary-400">Projects</span>
        </h2>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={i}
                // Center a lone last card instead of leaving it stuck on the left
                className={
                  projects.length % 2 === 1 && i === projects.length - 1
                    ? 'sm:col-span-2 sm:w-[calc(50%-0.75rem)] sm:mx-auto'
                    : ''
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
