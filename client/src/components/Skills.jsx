const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
      { name: 'TypeScript', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'HTML5', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
      { name: 'CSS3', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' },
      { name: 'Tailwind CSS', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300' },
      { name: 'Next.js', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
      { name: 'Redux', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      { name: 'Express', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
      { name: 'Python', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
      { name: 'REST APIs', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'GraphQL', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'MongoDB', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      { name: 'PostgreSQL', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'Redis', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
      { name: 'Firebase', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
      { name: 'Docker', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'AWS', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
      { name: 'CI/CD', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      { name: 'Vercel', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
      { name: 'Jest', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <h2 className="section-title">
          My <span className="text-primary-600 dark:text-primary-400">Skills</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-transform duration-200 hover:scale-105 ${skill.color}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
