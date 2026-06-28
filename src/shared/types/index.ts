export type Theme = 'light' | 'dark';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
  group: string;
}
