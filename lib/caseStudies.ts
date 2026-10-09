// Long-form write-ups for /projects/[slug]. `projectTitle` links a case study
// to its card in lib/projectData.ts.

export interface CaseStudyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface CaseStudy {
  slug: string;
  projectTitle: string;
  title: string;
  tagline: string;
  meta: { role: string; timeline: string; type: string; team?: string };
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  cover?: CaseStudyImage;
  overview: string[];
  features: string[];
  decisions: { title: string; body: string }[];
  challenge: { title: string; body: string[] };
  gallery: CaseStudyImage[];
  next: string[];
  /** Heading for `next`; defaults to "What's next" */
  nextHeading?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'flowboard',
    projectTitle: 'FlowBoard',
    title: 'FlowBoard',
    tagline: 'A real-time collaborative Kanban board where every teammate sees changes the moment they happen.',
    meta: {
      role: 'Solo: design, frontend & backend',
      timeline: '~1 week',
      type: 'Personal project',
    },
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Socket.io',
      'Redis',
      'Zod',
      'JWT',
    ],
    liveUrl: 'https://kanban-client-amber.vercel.app',
    githubUrl: 'https://github.com/DoDaa3/todo-app',
    cover: {
      src: '/images/projects/task-management.webp',
      alt: 'FlowBoard Kanban board with To Do, In Progress, In Review and Done columns',
      width: 1200,
      height: 625,
    },
    overview: [
      'I built FlowBoard to learn how real-time collaborative apps work under the hood, and to have a task board I would actually use myself.',
      'It goes well beyond a to-do list: teams get shared boards with roles, sprints, subtasks, comments, notifications and four different ways to look at the same work.',
    ],
    features: [
      'Drag-and-drop Kanban board with To Do, In Progress, In Review and Done columns',
      'Board, List, Calendar and Timeline views of the same tasks',
      'Live updates for everyone on a board via Socket.io',
      'Board sharing by email with Admin, Editor and Viewer roles',
      'Workspaces, sprint planning, subtasks, labels, comments and task dependencies',
      'In-app notifications, an activity log and ⌘K global search',
      'JWT authentication with email verification',
      'Dark mode and responsive layouts',
    ],
    decisions: [
      {
        title: 'One Socket.io room per board',
        body: 'Each open board joins its own room. When a task is created, edited or moved, the server broadcasts to that room only, so collaborators update instantly without unrelated users receiving traffic. A Redis adapter lets the real-time layer run across multiple server instances.',
      },
      {
        title: 'Task order lives on the server, inside a transaction',
        body: 'Every task has a position. Moving a card re-numbers the affected tasks in the old and new columns inside a single Prisma transaction, then the server sends the updated board to everyone. Clients never guess the final order; they all converge on the same state.',
      },
      {
        title: 'A relational model for relational data',
        body: 'Boards, columns, tasks, subtasks, labels, sprints, dependencies and memberships are deeply connected, so I used PostgreSQL with Prisma for typed queries and versioned migrations instead of a document store.',
      },
      {
        title: 'Validate everything at the edge of the API',
        body: 'Every Express route validates its input with Zod before touching the database, and both the client and the server are written in TypeScript, which caught a lot of mistakes before they reached production.',
      },
    ],
    challenge: {
      title: 'Keeping everyone in sync in real time',
      body: [
        'The hardest part was making several people editing the same board feel seamless. Two users can drag cards in the same column at the same time, and each screen has to end up with the same order without flickering.',
        'Treating the server as the single source of truth for positions, applying moves in a transaction and broadcasting the result to the board room solved it: whatever happens locally, every client settles on the server’s version.',
      ],
    },
    gallery: [
      {
        src: '/images/projects/flowboard-list.webp',
        alt: 'FlowBoard list view with sortable status, priority and due date columns',
        width: 1600,
        height: 534,
        caption: 'List view: sort and filter tasks by status, priority and due date.',
      },
    ],
    next: [
      'A richer Timeline view with dependencies drawn between tasks',
      'A roadmap view for planning epics across sprints',
      'Pushing it toward a full Jira-style experience: backlog, sprint reports and burndown charts',
    ],
  },
  {
    slug: 'ai-content-studio',
    projectTitle: 'AI Content Studio',
    title: 'AI Content Studio',
    tagline: 'An AI writing assistant that streams blog posts, emails and ad copy word by word, tuned to your tone and audience.',
    meta: {
      role: 'Solo: design, frontend & backend',
      timeline: '~1 week',
      type: 'Personal project',
    },
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Google Gemini',
      'React Query',
      'Framer Motion',
    ],
    liveUrl: 'https://ai-content-studio-zeta-gules.vercel.app/',
    githubUrl: 'https://github.com/DoDaa3/ai-content-studio',
    cover: {
      src: '/images/projects/ai-content-studio.webp',
      alt: 'AI Content Studio landing page: Create stunning content in seconds',
      width: 1200,
      height: 612,
    },
    overview: [
      'I built ContentStudio to learn how to ship a complete AI product end to end: authentication, a database, a third-party AI model and a polished, animated UI, all in one Next.js app.',
      'Users pick what they want to write, set the tone, length and audience, and watch the result appear in real time. Everything they generate is saved to their history.',
    ],
    features: [
      'Six content types: blog posts, emails, social captions, product descriptions, ad copy and custom prompts',
      'Tone, length and audience controls for every generation',
      'Real-time streaming output with rendered markdown',
      'A model picker between several Gemini models',
      'Saved history with search and filters, plus a dashboard with usage stats',
      'Email/password and Google sign-in, and self-serve account deletion',
      'Light and dark themes with smooth page transitions',
    ],
    decisions: [
      {
        title: 'Stream the response instead of waiting for it',
        body: 'Long-form generations can take several seconds. The API route reads Gemini’s response as a stream and forwards each chunk to the browser through a ReadableStream, so text starts appearing almost immediately. If the model fails mid-way, the error is written into the stream so the UI never hangs.',
      },
      {
        title: 'Security enforced in the database',
        body: 'Generations are stored in Supabase with row-level security policies, so each user can only read and write their own rows. Even a bug in the UI can’t leak someone else’s content.',
      },
      {
        title: 'All AI calls behind one server route',
        body: 'The browser never talks to the AI provider directly. One route handler validates the input, builds the prompts and only accepts models from a server-side allowlist, which keeps the API key private and made switching providers far less painful.',
      },
      {
        title: 'Prompts as code',
        body: 'System and user prompts are built by small functions from the selected content type, tone, length and audience, so adding a new content type is a data change instead of a rewrite.',
      },
    ],
    challenge: {
      title: 'Taming third-party services',
      body: [
        'The hardest part wasn’t the UI; it was the third parties. Wiring up Supabase auth with Google OAuth, sessions and middleware took real care.',
        'Choosing an AI provider was its own journey: I started with Claude and OpenAI, found the setup a pain for a learning project, and moved to Google Gemini. Even then, model versions and free-tier quotas kept changing, so I went from 1.5 Flash to 2.0 to 2.5 Flash. Because every AI call goes through a single route, each switch stayed small.',
      ],
    },
    gallery: [
      {
        src: '/images/projects/ai-content-studio-features.webp',
        alt: 'Feature cards: multiple content types, real-time streaming, save and organize, secure and private',
        width: 1600,
        height: 478,
        caption: 'The core features at a glance.',
      },
    ],
    next: [
      'Image generation to pair visuals with written content',
      'Diagram generation for technical posts and docs',
      'More content types and team workspaces',
    ],
  },
  {
    slug: 'fcn4u',
    projectTitle: 'FCN4U',
    title: 'FCN4U',
    tagline: 'A Photoshop-style editor in the browser that lets creators design a YouTube-like thumbnail for every post.',
    meta: {
      role: 'UI designer & frontend developer',
      timeline: 'At Metaverse, 2022 – 2024',
      type: 'Client project (launched)',
      team: '2 designers, 5–6 frontend devs, 1 backend dev',
    },
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Fabric.js', 'Figma'],
    overview: [
      'FCN4U is a content platform where every post needs a strong featured image. Instead of sending creators to an external design tool, we built one right into the product.',
      'I worked on both sides of it: as one of the two designers I helped shape the interface in Figma, and as one of the frontend developers I built the thumbnail editor itself.',
    ],
    features: [
      'Add and edit text with fonts, colors and styling',
      'Upload and place images on the canvas',
      'Draw shapes and arrows to highlight what matters',
      'Shadows and visual effects on any element',
      'A layer system to reorder, show and hide elements',
      'Export the finished design as the post’s featured image',
    ],
    decisions: [
      {
        title: 'Build the editor instead of buying one',
        body: 'No existing editor library covered everything we needed (text, images, shapes, arrows, shadows and layers working together), so I built the editing experience from scratch: the tools, the controls and the way elements behave on the canvas.',
      },
      {
        title: 'Designing what I build',
        body: 'Being both a designer and a developer on the team meant I could design the editor’s interface in Figma and then implement it myself, so details didn’t get lost between design and code.',
      },
      {
        title: 'Fast pages with server-side rendering',
        body: 'The platform runs on Next.js, and server-side rendering kept pages quick to load and easy for search engines to index.',
      },
    ],
    challenge: {
      title: 'No library did everything',
      body: [
        'The hardest part was that the tool we wanted didn’t exist. Every library I evaluated was missing something: layers, arrows, shadows, or the flexibility to combine them the way creators expected.',
        'Building it from scratch meant designing how every element is created, selected, moved, styled and stacked, and making all of it feel as natural as a desktop design app.',
      ],
    },
    gallery: [],
    nextHeading: 'Outcome',
    next: [
      'FCN4U launched while the team kept shipping new features on top of it.',
    ],
  },
  {
    slug: 'bimohealth',
    projectTitle: 'BimoHealth',
    title: 'BimoHealth',
    tagline: 'An online mental health platform that lets patients find a doctor, book a session and meet them by video.',
    meta: {
      role: 'Frontend developer',
      timeline: 'At Metaverse, 2022 – 2024',
      type: 'Client project, South Africa (launched)',
      team: '1 frontend dev (me) + 1 backend dev',
    },
    stack: ['React', 'Tailwind CSS', 'AWS S3', 'Figma'],
    cover: {
      src: '/images/projects/bimo-health.webp',
      alt: 'BimoHealth landing page: What is Mental Health?',
      width: 1200,
      height: 564,
    },
    overview: [
      'BimoHealth is a mental health consultation platform built for a client in South Africa, where stigma and limited access to services keep many people from getting help.',
      'I was the frontend developer, turning the Figma designs into the full product and working directly with one backend developer. My main features were appointment booking between patients and doctors, and the video consultations.',
    ],
    features: [
      'Doctor search for patients',
      'Appointment booking between patients and doctors',
      'Video consultations inside the platform',
      'Interactive mental health assessments',
      'Secure image uploads stored on AWS S3',
      'Responsive UI built from the Figma designs',
    ],
    decisions: [
      {
        title: 'Booking built around both sides',
        body: 'A booking flow has two users with different needs: patients want to find a suitable doctor and a time quickly, and doctors need a clear view of their sessions. I built the booking screens to keep both journeys simple.',
      },
      {
        title: 'Video calls inside the product',
        body: 'Consultations happen in the platform itself, so patients never have to install anything or share contact details to talk to a doctor.',
      },
      {
        title: 'A small team, owning the whole frontend',
        body: 'With one backend developer and me on the frontend, I owned every screen end to end, from Figma to production, and also contributed to authentication and S3 storage for secure uploads.',
      },
    ],
    challenge: {
      title: 'Integrating the video calls',
      body: [
        'The hardest part was integrating video calls: connecting a patient and a doctor in a live session from a booked appointment, inside the browser.',
        'Some weeks we got blocked by new challenges, but we kept the client in the loop, and they were happy with both the result and the progress along the way.',
      ],
    },
    gallery: [],
    nextHeading: 'Outcome',
    next: [
      'BimoHealth launched, and the client was happy with the project.',
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudySlug(projectTitle: string) {
  return caseStudies.find((study) => study.projectTitle === projectTitle)?.slug;
}
