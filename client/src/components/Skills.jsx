import { useScrollAnimation } from '../hooks/useScrollAnimation';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React.js', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'Next.js', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
      { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
      { name: 'HTML5', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
      { name: 'CSS3', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' },
      { name: 'Tailwind CSS', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300' },
      { name: 'Fabric.js', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      { name: 'Express', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
      { name: 'REST APIs', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'MongoDB', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      { name: 'AWS S3', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
    ],
  },
  {
    title: 'Design',
    icon: '🎯',
    skills: [
      { name: 'Figma', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
      { name: 'Responsive Design', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'UI/UX', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' },
      { name: 'Accessibility', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    skills: [
      { name: 'Git', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
      { name: 'GitHub', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
      { name: 'Vercel', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
      { name: 'SSR / SEO', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    ],
  },
];

function SkillCard({ category, index }) {
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
  const [titleRef, titleVisible] = useScrollAnimation();

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
