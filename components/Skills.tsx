'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { skillCategories, type SkillCategory } from '@/lib/profile';

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`scroll-hidden-scale ${isVisible ? 'scroll-visible-scale' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{category.icon}</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {category.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <span
              key={skill.name}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default ${skill.color}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: `opacity 0.3s ease ${(index * 150) + (i * 50)}ms, transform 0.3s ease ${(index * 150) + (i * 50)}ms`,
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Skills() {
  const [titleRef, titleVisible] = useScrollAnimation<HTMLHeadingElement>();

  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <h2
          ref={titleRef}
          className={`section-title scroll-hidden ${titleVisible ? 'scroll-visible' : ''}`}
        >
          My <span className="text-primary-600 dark:text-primary-400">Skills</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
