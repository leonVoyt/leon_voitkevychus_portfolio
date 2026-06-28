import type { ReactNode } from 'react';

import { cn } from '@shared/utils';

import styles from './Badge.module.scss';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'accent';
  pulse?: boolean;
  className?: string;
}

export const Badge = ({ children, variant = 'default', pulse = false, className }: BadgeProps) => {
  return (
    <span className={cn(styles.badge, styles[variant], pulse && styles.pulse, className)}>
      {pulse && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
