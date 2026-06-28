import { cn } from '@shared/utils';

import styles from './GradientBlob.module.scss';

interface GradientBlobProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

export const GradientBlob = ({ className, color = 'primary', size = 'md' }: GradientBlobProps) => {
  return (
    <div className={cn(styles.blob, styles[color], styles[size], className)} aria-hidden="true" />
  );
}
