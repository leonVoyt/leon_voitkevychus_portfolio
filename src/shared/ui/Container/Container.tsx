import type { ReactNode } from 'react';

import { cn } from '@shared/utils';

import styles from './Container.module.scss';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'nav';
  id?: string;
}

export const Container = ({ children, className, as: Tag = 'div', id }: ContainerProps) => {
  return (
    <Tag id={id} className={cn(styles.container, className)}>
      {children}
    </Tag>
  );
}
