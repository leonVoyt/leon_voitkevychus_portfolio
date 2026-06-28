export {
  about,
  experience,
  hero,
  personal,
  projectCategories,
  projects,
  skillCategories,
  skills,
  stats,
} from './portfolio.data';
export type {
  AboutContent,
  ExperienceItem,
  HeroContent,
  HeroTechItem,
  PersonalInfo,
  Project,
  ProjectCategory,
  Skill,
  SkillCategory,
  StatItem,
} from './portfolio.types';
export type { SocialLink } from './socialLinks';
export { socialLinks } from './socialLinks';

/** @deprecated Use `personal` from portfolio.data.ts */
export { personal as SITE_CONFIG } from './portfolio.data';

/** @deprecated Use `stats` from portfolio.data.ts */
export { stats as STATS } from './portfolio.data';

/** @deprecated Use `skills` from portfolio.data.ts */
export { skills as SKILLS } from './portfolio.data';

/** @deprecated Use `skillCategories` from portfolio.data.ts */
export { skillCategories as SKILL_CATEGORIES } from './portfolio.data';

/** @deprecated Use `experience` from portfolio.data.ts */
export { experience as EXPERIENCES } from './portfolio.data';

/** @deprecated Use `projects` from portfolio.data.ts */
export { projects as PROJECTS } from './portfolio.data';

/** @deprecated Use `projectCategories` from portfolio.data.ts */
export { projectCategories as PROJECT_CATEGORIES } from './portfolio.data';

/** @deprecated Use `hero` from portfolio.data.ts */
export { hero as HERO } from './portfolio.data';

/** @deprecated Use `about` from portfolio.data.ts */
export { about as ABOUT } from './portfolio.data';

export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  skills: 'skills',
  experience: 'experience',
  projects: 'projects',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_ITEMS = [
  { id: SECTION_IDS.home, label: 'Home' },
  { id: SECTION_IDS.about, label: 'About' },
  { id: SECTION_IDS.skills, label: 'Skills' },
  { id: SECTION_IDS.experience, label: 'Experience' },
  { id: SECTION_IDS.projects, label: 'Projects' },
  { id: SECTION_IDS.contact, label: 'Contact' },
] as const;

export const KEYBOARD_SHORTCUTS = {
  commandPalette: { key: 'k', meta: true, label: 'Open command palette' },
  themeToggle: { key: 'd', meta: true, label: 'Toggle dark mode' },
  home: { key: '1', meta: true, label: 'Go to Home' },
  about: { key: '2', meta: true, label: 'Go to About' },
  skills: { key: '3', meta: true, label: 'Go to Skills' },
  experience: { key: '4', meta: true, label: 'Go to Experience' },
  projects: { key: '5', meta: true, label: 'Go to Projects' },
  contact: { key: '6', meta: true, label: 'Go to Contact' },
} as const;

export const THEME_STORAGE_KEY = 'portfolio-theme';
