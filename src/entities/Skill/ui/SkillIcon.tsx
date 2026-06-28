import type { IconType } from 'react-icons';
import { HiCpuChip } from 'react-icons/hi2';
import {
  SiAngular,
  SiAnthropic,
  SiCypress,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithubcopilot,
  SiGooglecloud,
  SiGraphql,
  SiJest,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiReacttable,
  SiRedis,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiWebpack,
} from 'react-icons/si';
import { TbBrandAws, TbBrandReactNative } from 'react-icons/tb';

import { ZustandIcon } from './icons/ZustandIcon';

const ICON_MAP: Record<string, IconType> = {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiVuedotjs,
  SiThreedotjs,
  SiFramer,
  SiSass,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiGraphql,
  SiPostgresql,
  SiRedis,
  SiGit,
  SiDocker,
  SiFigma,
  SiVite,
  SiJest,
  TbBrandAws,
  SiVercel,
  SiGooglecloud,
  SiOpenai,
  SiAnthropic,
  HiCpuChip,
  SiGithubcopilot,
  SiNestjs,
  SiMongodb,
  SiExpress,
  SiWebpack,
  SiCypress,
  SiAngular,
  SiReactquery,
  SiReacttable,
  SiReacthookform,
  TbBrandReactNative,
  SiRedux,
  SiZustand: ZustandIcon,
  SiTanstackquery: SiReactquery,
};

interface SkillIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const SkillIcon = ({ name, size = 24, className }: SkillIconProps) => {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} aria-hidden="true" />;
};
