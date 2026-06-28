import type { HTMLAttributes, ReactNode } from 'react';

import { useMagnetic, useReducedMotion } from '@shared/hooks';
import { cn } from '@shared/utils';

import styles from './MagneticButton.module.scss';

interface MagneticButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strength?: number;
}

export const MagneticButton = ({
  children,
  strength = 0.3,
  className,
  ...props
}: MagneticButtonProps) => {
  const reducedMotion = useReducedMotion();
  const ref = useMagnetic<HTMLDivElement>({ strength, disabled: reducedMotion });

  return (
    <div
      ref={ref}
      className={cn(styles.magnetic, className)}
      style={{ transition: reducedMotion ? 'none' : 'transform 0.15s ease-out' }}
      {...props}
    >
      {children}
    </div>
  );
};
