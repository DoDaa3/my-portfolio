import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Fallback projects used when the API is unavailable
const fallbackProjects = [
  {
    _id: '1',
    title: 'Task Management App',
    description:
      'A collaborative task management tool with real-time updates, drag-and-drop kanban boards, and team workspace features.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    techStack: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    liveUrl: 'https://kanban-client-amber.vercel.app',
    githubUrl: 'https://github.com/DoDaa3/todo-app',
  },
  {
    _id: '2',
    title: 'Hey Tajine',
    description:
      'A Slack bot with a dedicated landing page, designed to enhance team communication and workflow automation within Slack workspaces.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop',
    techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://hey-tajine-frontend.vercel.app/',
  },
  {
    _id: '3',
    title: 'Ummaty',
    description:
      'A charity website landing page built to connect people with charitable causes and make giving back to the community more accessible.',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop',
    techStack: ['HTML', 'Tailwind CSS', 'React'],
    liveUrl: 'https://image-grid-ten.vercel.app/',
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
