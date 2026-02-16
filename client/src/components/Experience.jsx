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
      <div className="relative group">
        {/* Card */}
        <div className="ml-12 sm:ml-16 mb-8 bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-900/50 transition-all duration-300">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
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
              <p className="text-primary-600 dark:text-primary-400 font-semibold text-base">
                {experience.company}
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-right shrink-0">
              <p className="font-medium">{experience.period}</p>
              <p>{experience.location}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 dark:bg-gray-700/50 mb-4" />

          {experience.description && (
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-[0.935rem]">
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

        <div className="relative max-w-3xl mx-auto">
          {/* Continuous timeline line */}
          <div className="absolute left-[19px] sm:left-[23px] top-2 bottom-8 w-0.5 bg-gradient-to-b from-primary-400 via-primary-300 to-gray-200 dark:from-primary-500 dark:via-primary-700 dark:to-gray-700" />

          {experiences.map((exp, i) => (
            <div key={exp.company} className="relative">
              {/* Timeline node */}
              <div className="absolute left-0 sm:left-1 top-6 z-10">
                {exp.current ? (
                  <div className="relative">
                    <div className="w-[39px] h-[39px] sm:w-[47px] sm:h-[47px] rounded-full bg-primary-500/20 dark:bg-primary-400/20 animate-pulse-glow" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px] rounded-full bg-primary-500 border-[3px] border-white dark:border-gray-900 shadow-md" />
                    </div>
                  </div>
                ) : (
                  <div className="w-[39px] h-[39px] sm:w-[47px] sm:h-[47px] flex items-center justify-center">
                    <div className="w-[13px] h-[13px] sm:w-[15px] sm:h-[15px] rounded-full bg-white dark:bg-gray-900 border-[3px] border-primary-400 dark:border-primary-500 shadow-sm group-hover:scale-125 transition-transform duration-300" />
                  </div>
                )}
              </div>

              <ExperienceCard experience={exp} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
