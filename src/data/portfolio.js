// Portfolio data — sourced from Kavindu Ranasinghe's resume.
// Keep numbers honest; the Tron framing is window-dressing on top of real history.

export const PORTFOLIO = {
  name: 'KAVINDU RANASINGHE',
  role: 'Software Engineer',
  tagline:
    'Software Engineer with 3+ years shipping customer-facing web apps in React, Next.js, Angular, and TypeScript. Currently building CRM workflows at Mathemly while reading for an MSc at the University of Colombo.',
  bio: [
    'Software Engineer with three-plus years of professional experience building and shipping customer-facing web applications. Day-to-day I work across CRM workflows, authentication systems, and API integrations — wiring frontends to Strapi, REST, and Firebase backends.',
    'I write most things in TypeScript on top of React or Next.js, with Angular when the role calls for it. I care about clear API contracts, accessible component libraries, and the kind of small product details that make a CRM feel less like a CRM.',
    'Currently a Software Engineer at Mathemly, and reading for an MSc in Computer Science at the University of Colombo. Open to remote and hybrid roles.',
  ],
  stats: [
    { num: '3+',  label: 'Years shipping' },
    { num: '30+', label: 'Reusable UI components' },
    { num: '30+', label: 'Critical issues resolved' },
    { num: '30+', label: 'API endpoints integrated' },
  ],
  projects: [
    {
      id: 'P-001',
      title: 'Chatbot',
      desc: 'Conversational assistant wired to OpenAI with a React and TypeScript front end, Nest.js APIs, WebSockets for live replies, and PostgreSQL for chat history and CRM context.',
      tags: ['React', 'TypeScript', 'Nest.js', 'WebSocket', 'OpenAI', "PostgreSQL"],
      year: '2026',
    },
    {
      id: 'P-002',
      title: 'E-commerce Marketplace',
      desc: 'Full-stack marketplace with a React and TypeScript front end, Nest.js APIs for catalog and orders, and PostgreSQL—product listings, cart-style flows, and a responsive UI.',
      tags: ['React','TypeScript', 'Nest.js', "PostgreSQL"],
      year: '2026',
    },
    {
      id: 'P-003',
      title: 'Business Management System',
      desc: 'Internal ops dashboard in React and TypeScript with a small design-system layer for shared UI. Redis for caching and fast reads, PostgreSQL as the system of record.',
      tags: ['React', 'TypeScript', 'Design Systems', "Redis", "PostgreSQL"],
      year: '2025',
    },
    {
      id: 'P-004',
      title: 'Tile Game',
      desc: 'Browser tile puzzle built with vanilla JavaScript, HTML, and CSS—grid logic, move validation, and lightweight styling with no framework overhead.',
      tags: ['Javascript', 'HTML', 'CSS'],
      year: '2025',
    },
    {
      id: 'P-005',
      title: 'Inventor Management System',
      desc: 'Server-rendered PHP app with MySQL for inventors, filings, and records, plus Bootstrap for responsive tables and forms across admin and user views.',
      tags: ['PHP', 'MySQL', 'Bootstrap'],
      year: '2024',
    },
    {
      id: 'P-006',
      title: 'Calculator',
      desc: 'Interactive calculator UI in React and TypeScript with Tailwind CSS for layout, keyboard-friendly input, and chained operations with clear state handling.',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      year: '2024',
    },
    {
      id: 'P-007',
      title: 'Portfolio Website',
      desc: 'Static portfolio site hand-built with semantic HTML, CSS layout and motion, and JavaScript for small interactions—fast to load and easy to host anywhere.',
      tags: ['HTML', 'CSS', 'Javascript'],
      year: '2024',
    },
    {
      id: 'P-008',
      title: 'Mentor Mentee Management System',
      desc: 'Role-based web app pairing mentors and mentees: React SPA, Express APIs on GCP, and MongoDB for profiles, schedules, and program data.',
      tags: ['React', 'GCP', "Express", "Mongodb"],
      year: '2023',
    },
  ],
  experience: [
    {
      role: 'Software Engineer',
      company: 'Mathemly · Apr 2025 — Present',
      desc: 'Shipping 5+ customer-facing modules in React and Next.js with responsive layouts, multi-step form flows, and validation. Integrated frontend with Strapi CMS and REST APIs across 10+ endpoints. Built end-to-end CRM workflows (lead capture, onboarding, opportunity tracking) with auth persistence and RBAC. Created a 15+ component library with standardised prop interfaces.',
    },
    {
      role: 'Junior Software Engineer',
      company: 'Random Software · Jul 2024 — Dec 2024',
      desc: 'Delivered Angular frontend features and AWS-backed services for a SaaS platform serving US and Canada. Shipped on 2-week Agile sprints alongside 8+ engineers, designers, and PMs. Resolved 15+ critical production issues via hotfixes, and built/maintained Cypress E2E suites covering core user flows.',
    },
    {
      role: 'Trainee Software Engineer',
      company: 'Syntax Genie · Oct 2022 — Mar 2023',
      desc: 'Developed React-based interfaces and Firebase backend integrations for customer-facing features handling real-time data sync and authentication. Contributed to debugging and performance work that improved page-load times and overall reliability.',
    },
  ],
  education: [
    { school: 'University of Colombo', degree: 'MSc in Computer Science', period: '2025 — 2027' },
    { school: 'University of Bedfordshire', degree: 'BSc (Hons) Computer Science & Software Engineering — Second Class Upper', period: '2020 — 2023' },
  ],
  skills: [
    {
      group: 'Languages',
      items: [
        { name: 'TypeScript', level: 92 },
        { name: 'JavaScript', level: 95 },
        { name: 'SQL', level: 90 },
        { name: 'Python',        level: 80 },
        { name: 'Java',        level: 78 },
        { name: 'PHP',        level: 78 },
      ],
    },
    {
      group: 'Frontend',
      items: [
        { name: 'React',        level: 92 },
        { name: 'Next.js',      level: 88 },
        { name: 'Angular',      level: 80 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Figma',        level: 70 },
      ],
    },
    {
      group: 'Backend & APIs',
      items: [
        { name: 'Node.js / Express', level: 82 },
        { name: 'NestJS',            level: 72 },
        { name: 'Strapi',            level: 78 },
        { name: 'Firebase',          level: 80 },
        { name: 'REST / WebSockets', level: 84 },
      ],
    },
    {
      group: 'Cloud, Data & Tooling',
      items: [
        { name: 'AWS (S3, Lambda, CloudFront)', level: 70 },
        { name: 'Docker / GitHub Actions',      level: 72 },
        { name: 'MongoDB / PostgreSQL / Redis', level: 76 },
        { name: 'Cypress / Jest',               level: 82 },
        { name: 'Git · Jira · Bitbucket',       level: 88 },
      ],
    },
  ],
  writing: [
  ],
  contact: {
    email:    'kvndranasinghe@gmail.com',
    github:   'github.com/kvnd100',
    linkedin: 'linkedin.com/in/kvnd100',
    site:     'kvnd100.github.io/portfolio-website',
  },
  resume: {
    file: '/Kavindu_Resume_v2.pdf',
    label: 'Kavindu_Resume_v2.pdf',
    sizeKb: 269,
    updated: '2025.04.07',
    pages: 2,
  },
};

export const SECTIONS = [
  { key: 'projects',   label: 'Projects',   code: 'SEC.001' },
  { key: 'experience', label: 'Experience', code: 'SEC.002' },
  { key: 'skills',     label: 'Skills',     code: 'SEC.003' },
  { key: 'about',      label: 'About',      code: 'SEC.004' },
  { key: 'writing',    label: 'Writing',    code: 'SEC.005' },
  { key: 'contact',    label: 'Contact',    code: 'SEC.006' },
  { key: 'resume',     label: 'Resume',     code: 'SEC.007' },
];
