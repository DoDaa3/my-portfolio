import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Fallback projects used when the API is unavailable
const fallbackProjects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration using Stripe.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    _id: '2',
    title: 'Task Management App',
    description:
      'A collaborative task management tool with real-time updates, drag-and-drop kanban boards, and team workspace features.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    techStack: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    _id: '3',
    title: 'Weather Dashboard',
    description:
      'A responsive weather dashboard that displays current conditions, forecasts, and interactive maps using the OpenWeatherMap API.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop',
    techStack: ['React', 'Chart.js', 'OpenWeatherMap API', 'CSS3'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    _id: '4',
    title: 'Social Media Analytics',
    description:
      'A data visualization platform that aggregates social media metrics and presents insights through interactive charts and dashboards.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    techStack: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    _id: '5',
    title: 'AI Chat Application',
    description:
      'An AI-powered chat application with natural language processing, conversation history, and multiple AI model support.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    techStack: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Prisma'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    _id: '6',
    title: 'Fitness Tracker',
    description:
      'A mobile-first fitness tracking app with workout logging, progress charts, goal setting, and social sharing capabilities.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop',
    techStack: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
];

const API_URL =
  process.env.REACT_APP_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:5001`;

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
            {[...Array(6)].map((_, i) => (
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
