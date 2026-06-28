import { useMousePosition, useReducedMotion } from '@shared/hooks';

import styles from './MouseSpotlight.module.scss';

export const MouseSpotlight = () => {
  const { x, y } = useMousePosition();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className={styles.spotlight}
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, var(--color-accent-soft), transparent 40%)`,
      }}
      aria-hidden="true"
    />
  );
}
