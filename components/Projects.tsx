'use client';

import ProjectCard from './ProjectCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Project } from '@/lib/projects';

function Projects({ projects }: { projects: Project[] }) {
  const [titleRef, titleVisible] = useScrollAnimation<HTMLHeadingElement>();

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <h2
          ref={titleRef}
          className={`section-title scroll-hidden ${titleVisible ? 'scroll-visible' : ''}`}
        >
          My <span className="text-primary-600 dark:text-primary-400">Projects</span>
        </h2>

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
      </div>
    </section>
  );
}

export default Projects;
