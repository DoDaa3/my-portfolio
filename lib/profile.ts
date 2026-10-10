// Facts about Omar shown across the site. The "Ask my AI" chat (lib/chatContext.ts)
// reads from here too, so keep it accurate: the assistant only knows what's in it.

export const profile = {
  name: 'Omar Amine',
  title: 'Frontend Engineer',
  location: 'Casablanca, Morocco',
  availability: 'Open to new opportunities, including remote roles',
  email: 'amineomar019@gmail.com',
  links: {
    portfolio: 'https://omaramine.vercel.app',
    github: 'https://github.com/DoDaa3',
    linkedin: 'https://www.linkedin.com/in/omar-amine-460807207/',
    x: 'https://x.com/OmarAMI03151544',
    cv: 'https://omaramine.vercel.app/Omar-Amine-CV.pdf',
  },
  summary:
    'Frontend engineer with 3+ years of experience building modern web applications with React, Next.js, TypeScript and Tailwind CSS. Turns Figma designs into responsive, accessible and performant interfaces, and is comfortable across the stack with Node.js, REST APIs and SQL/NoSQL databases. Has worked on healthcare platforms, content creation tools, nonprofit websites and Slack bot dashboards, both full-time and freelance.',
  education: [
    { degree: 'IT Development', school: 'Specialized Institute of Technology, Casablanca', years: '2018 – 2020' },
    { degree: 'Baccalaureate in Physics & Chemistry', school: 'Moulay Driss 1st High School, Casablanca', years: '2018' },
  ],
  languages: ['Arabic', 'Amazigh', 'French', 'English'],
};

export interface ExperienceItem {
  role: string;
  type: 'Freelance' | 'Full-time';
  company: string;
  period: string;
  location?: string;
  current?: boolean;
  promotedFrom?: { role: string; period: string };
  description: string | null;
  projects?: { name: string; description: string }[];
  skills: string[];
}

export const experiences: ExperienceItem[] = [
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
    promotedFrom: { role: 'Software Developer Intern', period: 'Dec 2022 — Apr 2023' },
    description: null,
    projects: [
      {
        name: 'FCN4U',
        description:
          'Built an interactive thumbnail creator using React.js, Next.js, Tailwind CSS, and Fabric.js, enabling users to customize featured images. Developed multiple UI components, implemented dynamic customization options, and optimized performance with server-side rendering for faster load times and improved SEO.',
      },
      {
        name: 'BimoHealth',
        description:
          'Developed the frontend for an online mental health consultation platform for a South African client using React.js and Tailwind CSS. Built doctor search, appointment booking and video consultations with the Amazon Chime SDK, interactive mental health assessments, and contributed to backend authentication and S3 bucket storage for secure image uploads.',
      },
    ],
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Fabric.js', 'Amazon Chime SDK', 'Git', 'AWS S3'],
  },
  {
    role: 'Full Stack Engineer',
    type: 'Full-time',
    company: "Student's Mind",
    period: 'Dec 2020 — Feb 2021',
    description:
      'Developed a comprehensive school management system using Python, Qt Designer, and MySQL. Built features for student registration, grade entry, and employee attendance tracking, ensuring seamless record management and efficient educational processes.',
    skills: ['Python', 'Qt Designer', 'MySQL'],
  },
];

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; color: string }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React.js', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'Next.js', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
      { name: 'TypeScript', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
      { name: 'React Query', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
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
      { name: 'Socket.io', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
      { name: 'REST APIs', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'MongoDB', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      { name: 'PostgreSQL', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      { name: 'Supabase', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
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

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  relationship: string;
  quote: string;
  linkedIn: string;
  avatar?: string;
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'El Mehdi Karami',
    role: 'Lead Software Engineer',
    company: 'Freelance Client — Hey Tajine',
    relationship: 'Omar built Hey Tajine for El Mehdi',
    quote:
      'Omar is a talented frontend engineer with a keen eye for design and a proactive mindset. He not only builds clean, well-crafted interfaces but also suggests valuable improvements that enhance user experience. A great collaborator and problem solver—highly recommended!',
    linkedIn: 'https://www.linkedin.com/in/omar-amine-460807207/',
    avatar: '/images/el-mehdi-karami.jpeg',
    date: 'March 2025',
  },
  {
    name: 'Meryem Benmezouara',
    role: 'Software Engineer',
    company: 'Metaverse',
    relationship: 'Worked with Omar at Metaverse',
    quote:
      'I had the opportunity to collaborate with Omar Amine on a project as a Frontend Developer. He is technically strong, detail-oriented, and highly collaborative. Omar delivers clean, efficient code and consistently contributes to creating engaging digital experiences. A great team player and a valuable asset to any tech team.',
    linkedIn: 'https://www.linkedin.com/in/omar-amine-460807207/',
    avatar: '/images/meryem-benmezouara.jpeg',
    date: 'February 2026',
  },
];
