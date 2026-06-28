import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa';

import { personal } from './portfolio.data';

export interface SocialLink {
  icon: IconType;
  url: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  { icon: FaGithub, url: personal.github, label: 'GitHub' },
  { icon: FaLinkedin, url: personal.linkedin, label: 'LinkedIn' },
  { icon: FaTelegram, url: personal.telegram, label: 'Telegram' },
  { icon: FaWhatsapp, url: personal.whatsapp, label: 'WhatsApp' },
];
