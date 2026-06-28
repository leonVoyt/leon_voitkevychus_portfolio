import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { personal } from '@shared/constants';
import { useReducedMotion } from '@shared/hooks';

import styles from './LoadingScreen.module.scss';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const duration = 2200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);

      if (newProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {progress < 1 && (
        <motion.div
          className={styles.screen}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.content}>
            <motion.div
              className={styles.logo}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.logoMark}>{personal.initials}</span>
              <span className={styles.logoText}>{personal.name}</span>
            </motion.div>
            <div className={styles.progressTrack}>
              <motion.div className={styles.progressBar} style={{ scaleX: progress }} />
            </div>
            <span className={styles.percentage}>{Math.round(progress * 100)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
