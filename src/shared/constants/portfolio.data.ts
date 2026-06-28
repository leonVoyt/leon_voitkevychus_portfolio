/**
 * =============================================================================
 * PORTFOLIO CONTENT
 * =============================================================================
 *
 * Edit this file to customize your portfolio.
 * All personal information, experience, skills, and projects live here.
 *
 * After changes, run `npm run dev` to preview.
 * =============================================================================
 */

import {
  betting,
  casino,
  citrus,
  citrusService,
  mbDigital,
  profileImage,
  resume,
  streaming,
} from '@assets';

import type {
  AboutContent,
  ExperienceItem,
  HeroContent,
  PersonalInfo,
  Project,
  Skill,
  StatItem,
} from './portfolio.types';

// -----------------------------------------------------------------------------
// PERSONAL & CONTACT
// -----------------------------------------------------------------------------

export const personal: PersonalInfo = {
  name: 'Leon Voitkevychus',
  title: 'Frontend & Full-Stack Engineer',
  tagline: 'React, TypeScript and Node from UI to API — open to React Native projects.',
  availability: 'Available for new opportunities',
  email: 'leonvoytkevichus@gmail.com',
  location: 'Croatia, Pula',
  github: 'https://github.com/leonVoyt',
  linkedin: 'https://linkedin.com/in/leonvtkvchs',
  whatsapp: 'https://wa.me/+380631031201',
  telegram: 'https://t.me/Vneol',
  cvUrl: resume,
  url: 'https://leon-voitkevychus-portfolio.vercel.app/',
  initials: 'LV',
};

// -----------------------------------------------------------------------------
// HERO SECTION
// -----------------------------------------------------------------------------

export const hero: HeroContent = {
  headlineLine1: 'Frontend.',
  headlineLine2: 'Full-Stack.',
  techStack: [
    { label: 'React' },
    { label: 'Next.js' },
    { label: 'TypeScript' },
    { label: 'Node.js' },
    { label: 'NestJS' },
    { label: 'Open to React Native', open: true },
  ],
  allSkillsLabel: 'All skills',
};

// -----------------------------------------------------------------------------
// ABOUT SECTION
// -----------------------------------------------------------------------------

export const about: AboutContent = {
  sectionLabel: 'About Me',
  sectionTitle: 'Focused on frontend, full-stack',
  sectionDescription:
    'Shipping web products with strong UI, solid architecture, and production-ready quality.',
  bio: [
    'My core focus is frontend engineering with React and TypeScript — building fast, maintainable interfaces for EdTech, e-commerce, and real-time platforms with complex state, caching, and offline behavior.',
    'As a full-stack developer, I work across the stack with Node.js, NestJS, and PostgreSQL when products need tight client-server integration, reliable APIs, and end-to-end ownership from feature design to deployment.',
    "I don't have commercial React Native experience yet, but I've been exploring the ecosystem and would gladly take on mobile work — my React and TypeScript background transfers well to cross-platform apps.",
  ],
  portraitUrl: profileImage,
  currentRole: 'Middle Frontend Engineer',
  currentCompany: 'MB digital',
};

// -----------------------------------------------------------------------------
// STATS (About section counters)
// -----------------------------------------------------------------------------

export const stats: StatItem[] = [
  { label: 'Years Experience', value: 4, suffix: '+' },
  { label: 'Projects Delivered', value: 10, suffix: '+' },
  { label: 'Technologies', value: 50, suffix: '+' },
  { label: 'AI Tools Mastered', value: 5, suffix: '+' },
];

// -----------------------------------------------------------------------------
// SKILLS
// -----------------------------------------------------------------------------

export const skillCategories = [
  { id: 'frontend' as const, label: 'Frontend' },
  { id: 'backend' as const, label: 'Backend' },
  { id: 'tools' as const, label: 'Tools' },
  { id: 'cloud' as const, label: 'Cloud' },
  { id: 'ai' as const, label: 'AI' },
];

export const skills: Skill[] = [
  { id: 'react', name: 'React', icon: 'SiReact', category: 'frontend', proficiency: 98 },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'SiTypescript',
    category: 'frontend',
    proficiency: 96,
  },
  { id: 'nextjs', name: 'Next.js', icon: 'SiNextdotjs', category: 'frontend', proficiency: 92 },
  {
    id: 'reactquery',
    name: 'React Query',
    icon: 'SiReactquery',
    category: 'frontend',
    proficiency: 96,
  },
  {
    id: 'reacttable',
    name: 'React Table',
    icon: 'SiReacttable',
    category: 'frontend',
    proficiency: 94,
  },
  {
    id: 'reacthookform',
    name: 'React Hook Form',
    icon: 'SiReacthookform',
    category: 'frontend',
    proficiency: 95,
  },
  { id: 'vue', name: 'Vue.js', icon: 'SiVuedotjs', category: 'frontend', proficiency: 55 },
  { id: 'angular', name: 'Angular', icon: 'SiAngular', category: 'frontend', proficiency: 50 },
  { id: 'threejs', name: 'Three.js', icon: 'SiThreedotjs', category: 'frontend', proficiency: 68 },
  { id: 'framer', name: 'Framer Motion', icon: 'SiFramer', category: 'frontend', proficiency: 72 },
  { id: 'scss', name: 'SCSS', icon: 'SiSass', category: 'frontend', proficiency: 99 },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: 'SiTailwindcss',
    category: 'frontend',
    proficiency: 95,
  },
  {
    id: 'reactnative',
    name: 'React Native',
    icon: 'TbBrandReactNative',
    category: 'frontend',
    proficiency: 50,
  },
  { id: 'zustand', name: 'Zustand', icon: 'SiZustand', category: 'frontend', proficiency: 90 },
  { id: 'redux', name: 'Redux', icon: 'SiRedux', category: 'frontend', proficiency: 85 },
  {
    id: 'tanstackquery',
    name: 'Tanstack Query',
    icon: 'SiTanstackquery',
    category: 'frontend',
    proficiency: 90,
  },

  // Backend
  { id: 'nodejs', name: 'Node.js', icon: 'SiNodedotjs', category: 'backend', proficiency: 68 },
  { id: 'NestJS', name: 'NestJS', icon: 'SiNestjs', category: 'backend', proficiency: 55 },
  { id: 'Express', name: 'Express', icon: 'SiExpress', category: 'backend', proficiency: 55 },
  { id: 'MongoDB', name: 'MongoDB', icon: 'SiMongodb', category: 'backend', proficiency: 70 },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    icon: 'SiPostgresql',
    category: 'backend',
    proficiency: 84,
  },
  // Tools
  { id: 'git', name: 'Git', icon: 'SiGit', category: 'tools', proficiency: 95 },
  { id: 'docker', name: 'Docker', icon: 'SiDocker', category: 'tools', proficiency: 87 },
  { id: 'figma', name: 'Figma', icon: 'SiFigma', category: 'tools', proficiency: 90 },
  { id: 'vite', name: 'Vite', icon: 'SiVite', category: 'tools', proficiency: 93 },
  { id: 'webpack', name: 'Webpack', icon: 'SiWebpack', category: 'tools', proficiency: 93 },
  { id: 'jest', name: 'Jest', icon: 'SiJest', category: 'tools', proficiency: 88 },
  {
    id: 'playwright',
    name: 'Playwright',
    icon: 'SiCypress',
    category: 'tools',
    proficiency: 88,
  },
  // Cloud
  { id: 'aws', name: 'AWS', icon: 'TbBrandAws', category: 'cloud', proficiency: 45 },
  { id: 'vercel', name: 'Vercel', icon: 'SiVercel', category: 'cloud', proficiency: 92 },
  { id: 'gcp', name: 'Google Cloud', icon: 'SiGooglecloud', category: 'cloud', proficiency: 48 },
  //
  { id: 'openai', name: 'OpenAI', icon: 'SiOpenai', category: 'ai', proficiency: 99 },
  { id: 'claude', name: 'Claude', icon: 'SiAnthropic', category: 'ai', proficiency: 80 },
  { id: 'cursor', name: 'Cursor', icon: 'HiCpuChip', category: 'ai', proficiency: 99 },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    icon: 'SiGithubcopilot',
    category: 'ai',
    proficiency: 85,
  },
];

// -----------------------------------------------------------------------------
// EXPERIENCE
// -----------------------------------------------------------------------------

export const experience: ExperienceItem[] = [
  {
    id: 'mbdigital',
    company: 'MB digital',
    role: 'Middle Frontend & Full-Stack Developer',
    period: '2025 — Present',
    location: 'Remote',
    description:
      'Leading frontend architecture for education projects. Building scalable and performant web applications.',
    techStack: ['React', 'TypeScript', 'Zustand', 'Tanstack Query', 'Vite', 'SCSS Modules'],
    achievements: [
      'Implemented client-side caching and offline synchronization, reducing repeated API requests by 60%+ and improving application responsiveness.',
      'Optimized asset caching and data loading strategies, reducing page load times by up to 40%',
      'Achieved 80–98% unit test coverage across core application features',
      'Developed end-to-end tests (E2E) using Cypress/Playwright to validate critical user flows and production scenarios',
    ],
  },
  {
    id: 'citrus',
    company: 'Citrus 🍊',
    role: 'Middle Frontend Developer',
    period: '2024 — 2025',
    location: 'Remote',
    description:
      "Worked on one of Ukraine's largest e-commerce platforms, serving 800,000+ monthly active users.",
    techStack: ['React', 'Next.js', 'TypeScript', 'Storybook'],
    achievements: [
      'Maintained and developed a high-load web application with 800,000+ monthly active users, focusing on performance, reliability, and scalable frontend architecture.',
      'Optimized frontend bundle size by removing unused dependencies and improving tree-shaking, reducing total bundle size by ~20–40%.',
      'Improved Core Web Vitals (LCP / FCP) by reducing initial asset load and optimizing critical rendering path.',
    ],
  },
  {
    id: 'kvazi',
    company: 'Kvazi team',
    role: 'Frontend Developer',
    period: '2022 — 2024',
    location: 'Remote',
    description:
      'Developed a full-featured online gambling platform from scratch, including the Casino, Sports Betting, Administration Panel, and Partner (Affiliate) Portal.',
    techStack: ['React', 'TypeScript', 'Mobx State Tree', 'WebSocket', 'Typescript'],
    achievements: [
      'Developed a PWA casino application integrated with Telegram Mini Apps.',
      'Implemented offline-first features with local data storage and backend synchronization, reducing data loss incidents by ~80–90% in unstable network conditions.',
      'Replaced 5-second polling with WebSocket-based real-time updates, reducing API requests by approximately 60-75%',
    ],
  },
];

// -----------------------------------------------------------------------------
// PROJECTS
// -----------------------------------------------------------------------------

export const projectCategories = [
  { id: 'all' as const, label: 'All' },
  { id: 'edTech' as const, label: 'EdTech' },
  { id: 'eCommerce' as const, label: 'eCommerce' },
  { id: 'gambling' as const, label: 'Gambling' },
  { id: 'streaming' as const, label: 'Live Streaming' },
];

export const projects: Project[] = [
  {
    id: 'mb-digital',
    title: 'Revenue Rush — Education Platform',
    description:
      'Scalable learning platform with offline sync, smart caching, and a polished course experience.',
    longDescription:
      'A modern education platform built for MB digital, designed to deliver courses, track progress, and stay responsive under real-world network conditions. Implemented client-side caching and offline synchronization to cut repeated API traffic by 60%+, optimized asset loading for up to 40% faster page loads, and maintained 80–98% unit test coverage with Cypress/Playwright E2E suites for critical user flows.',
    image: mbDigital,
    category: 'edTech',
    techStack: ['React', 'TypeScript', 'Zustand', 'Tanstack Query', 'Vite', 'SCSS Modules'],
    liveUrl: 'https://beta-web.revenuerush.com/',
    featured: true,
  },
  {
    id: 'citrus',
    title: 'Citrus — E-commerce Platform',
    description: 'High-traffic retail storefront serving 800K+ monthly users across Ukraine.',
    longDescription:
      "Frontend development on one of Ukraine's largest e-commerce platforms. Focused on performance at scale — reduced bundle size by 20–40% through dependency cleanup and tree-shaking, improved Core Web Vitals (LCP/FCP) via critical path optimization, and shipped features for a catalog serving hundreds of thousands of monthly active users.",
    image: citrus,
    category: 'eCommerce',
    techStack: ['React', 'Next.js', 'TypeScript', 'Storybook', 'SCSS Modules'],
    liveUrl: 'https://citrus.ua/',
    featured: true,
  },
  {
    id: 'citrus-service',
    title: 'Citrus Service — Trade-In Platform',
    description:
      'Buyback and repair portal for used devices with guided flows and real-time pricing.',
    longDescription:
      'A dedicated service platform for Citrus where customers trade in, sell, or repair used electronics. Built intuitive multi-step wizards for device evaluation, condition assessment, and payout estimation — turning a complex operational process into a clear, conversion-focused user journey integrated with the main Citrus ecosystem.',
    image: citrusService,
    category: 'eCommerce',
    techStack: ['React', 'Next.js', 'TypeScript', 'Storybook', 'SCSS Modules'],
    liveUrl: 'https://service.citrus.ua/',
    featured: true,
  },
  {
    id: 'casino',
    title: 'Casino Platform',
    description: 'Real-time casino client with PWA support and Telegram Mini App integration.',
    longDescription:
      'A full-featured online casino built from scratch as part of a gambling platform suite. Delivered a PWA experience integrated with Telegram Mini Apps, offline-first data persistence with backend sync (reducing data loss by ~80–90% on unstable networks), and WebSocket-driven live updates that replaced 5-second polling and cut API requests by 60–75%.',
    image: casino,
    category: 'gambling',
    techStack: ['React', 'TypeScript', 'MobX State Tree', 'WebSocket', 'PWA'],
    featured: false,
  },
  {
    id: 'betting',
    title: 'Sports Betting Platform',
    description: 'Live odds and bet slip interface with real-time event updates via WebSocket.',
    longDescription:
      'Sports betting module within a multi-product gambling platform. Engineered real-time odds feeds and bet slip interactions over WebSocket, ensuring sub-second updates during live events. Shared architecture with the casino product — reusable state management, offline resilience, and a mobile-first UI optimized for fast decision-making under time pressure.',
    image: betting,
    category: 'gambling',
    techStack: ['React', 'TypeScript', 'MobX State Tree', 'WebSocket', 'PWA'],
    featured: false,
  },
  {
    id: 'streaming',
    title: 'Live Streaming Platform',
    description:
      'Low-latency live video module with real-time chat and synchronized event overlays.',
    longDescription:
      "Live streaming component within a multi-product gambling platform. Built a responsive video player experience with WebSocket-driven chat, live event metadata, and adaptive playback for unstable mobile networks. Shared the platform's offline-first architecture and state management patterns — ensuring smooth stream recovery, minimal buffering, and consistent UI across casino and sports betting products.",
    image: streaming,
    category: 'streaming',
    techStack: ['React', 'TypeScript', 'MobX State Tree', 'WebSocket', 'PWA'],
    featured: false,
  },
];
