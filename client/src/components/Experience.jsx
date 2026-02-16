import { useScrollAnimation } from '../hooks/useScrollAnimation';

const experiences = [
  {
    role: 'Frontend Engineer',
    type: 'Freelance',
    company: 'UMMATY',
    period: 'Dec 2025 — Present',
    location: 'Casablanca, Morocco · Remote',
    current: true,
    description:
      'Leading the frontend redevelopment of UMMATY\'s official website. Rebuilding the UI with ReactJS and Tailwind CSS for a cleaner, modern design. Improving layout structure, responsiveness, and accessibility while implementing reusable components for easier future updates.',
    skills: ['React.js', 'Tailwind CSS', 'JavaScript', 'Figma', 'Vercel', 'Git'],
  },
  {
    role: 'Frontend Developer',
    type: 'Freelance',
    company: 'HeyTajine',
    period: 'Dec 2024 — Feb 2025',
    location: 'Casablanca, Morocco · Remote',
    description:
      'Built the frontend for HeyTajine, a Slack bot project. Designed the landing page in Figma, then developed a responsive landing page and intuitive dashboard using HTML, Tailwind CSS, and JavaScript.',
    skills: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Figma', 'Git'],
  },
  {
    role: 'Software Developer',
    type: 'Full-time',
    company: 'Metaverse',
    period: 'Dec 2022 — Feb 2024',
    location: 'Casablanca, Morocco · Hybrid',
    description: null,
    projects: [
      {
        name: 'FCN4U.com',
        description:
          'Built an interactive thumbnail creator using React.js, Next.js, Tailwind CSS, and Fabric.js, enabling users to customize featured images. Developed multiple UI components, implemented dynamic customization options, and optimized performance with server-side rendering for faster load times and improved SEO.',
      },
      {
        name: 'BimoHealth',
        description:
          'Developed the frontend for an online mental health consultation platform using React.js and Tailwind CSS. Built interactive mental health assessments, responsive UI components, and contributed to backend authentication and S3 bucket storage for secure image uploads.',
      },
    ],
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Fabric.js', 'Git', 'AWS S3'],
  },
];

function ExperienceCard({ experience, index }) {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`scroll-hidden ${isVisible ? 'scroll-visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-900/50 transition-all duration-300">
        {/* Current indicator */}
        {experience.current && (
          <div className="absolute top-0 left-6 -translate-y-1/2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-primary-500 text-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Current
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {experience.role}
              </h3>
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                experience.type === 'Full-time'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
              }`}>
                {experience.type}
              </span>
            </div>
            <p className="text-primary-600 dark:text-primary-400 font-semibold">
              {experience.company}
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-right shrink-0">
            <p className="font-medium">{experience.period}</p>
            <p>{experience.location}</p>
          </div>
        </div>

        {experience.description && (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {experience.description}
          </p>
        )}

        {experience.projects && (
          <div className="space-y-3 mb-4">
            {experience.projects.map((project) => (
              <div key={project.name} className="pl-4 border-l-2 border-primary-200 dark:border-primary-800">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {project.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-50 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300 border border-gray-100 dark:border-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const [titleRef, titleVisible] = useScrollAnimation();

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <h2
          ref={titleRef}
          className={`section-title scroll-hidden ${titleVisible ? 'scroll-visible' : ''}`}
        >
          Work{' '}
          <span className="text-primary-600 dark:text-primary-400">Experience</span>
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
