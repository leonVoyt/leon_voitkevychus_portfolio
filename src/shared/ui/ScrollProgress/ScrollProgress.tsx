import { useScrollProgress } from '@shared/hooks';

import styles from './ScrollProgress.module.scss';

export const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress"
    >
      <div className={styles.bar} style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
