export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'cloud' | 'ai';

export interface PersonalInfo {
  /** Full name displayed across the site */
  name: string;
  /** Professional title (e.g. "Middle Frontend Engineer") */
  title: string;
  /** Short tagline under the hero heading */
  tagline: string;
  /** Availability badge text in the hero section */
  availability: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  telegram: string;
  whatsapp: string;
  /** Path to downloadable CV (place file in /public) */
  cvUrl: string;
  /** Production site URL — used for SEO meta tags */
  url: string;
  /** Two-letter initials for logo mark (e.g. "AC") */
  initials: string;
}

export interface HeroContent {
  /** First line of the hero headline */
  headlineLine1: string;
  /** Second line — rendered with gradient */
  headlineLine2: string;
  /** Main tech stack shown under the hero tagline */
  techStack: HeroTechItem[];
  /** Label for the chip that scrolls to the skills section */
  allSkillsLabel: string;
}

export interface HeroTechItem {
  label: string;
  /** Styled as an "open to" / learning opportunity chip */
  open?: boolean;
}

export interface AboutContent {
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  /** Bio paragraphs — HTML strings not supported, plain text only */
  bio: string[];
  /** Portrait image URL or path (e.g. "/images/portrait.jpg") */
  portraitUrl: string;
  /** Current role shown on the floating card */
  currentRole: string;
  /** Current company shown on the floating card (include @ if desired) */
  currentCompany: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface Skill {
  id: string;
  name: string;
  /**
   * Icon key — must match a key in SkillIcon map.
   * Available: SiReact, SiTypescript, SiNextdotjs, SiVuedotjs, SiThreedotjs,
   * SiFramer, SiSass, SiTailwindcss, SiNodedotjs, SiPython, SiGraphql,
   * SiPostgresql, SiRedis, SiGit, SiDocker, SiFigma, SiVite, SiJest,
   * TbBrandAws, SiVercel, SiGooglecloud, SiOpenai, SiAnthropic,
   * HiCpuChip, SiGithubcopilot
   */
  icon: string;
  category: SkillCategory;
  /** Proficiency 0–100 — shown as progress bar */
  proficiency: number;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  techStack: string[];
  achievements: string[];
}

export type ProjectCategory = 'edTech' | 'eCommerce' | 'gambling' | 'streaming';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: ProjectCategory;
  techStack: string[];
  github?: string;
  liveUrl?: string;
  featured: boolean;
}
