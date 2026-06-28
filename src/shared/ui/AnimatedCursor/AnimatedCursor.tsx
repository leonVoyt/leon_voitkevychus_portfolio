import { useEffect, useRef } from 'react';

import { useMediaQuery, useMousePosition, useReducedMotion } from '@shared/hooks';
import { lerp } from '@shared/utils';

import styles from './AnimatedCursor.module.scss';

export const AnimatedCursor = () => {
  const { x, y } = useMousePosition();
  const isDesktop = useMediaQuery('(min-width: 1024px) and (hover: hover)');
  const reducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ dotX: 0, dotY: 0, ringX: 0, ringY: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;

    const animate = () => {
      posRef.current.dotX = lerp(posRef.current.dotX, x, 0.35);
      posRef.current.dotY = lerp(posRef.current.dotY, y, 0.35);
      posRef.current.ringX = lerp(posRef.current.ringX, x, 0.12);
      posRef.current.ringY = lerp(posRef.current.ringY, y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.dotX}px, ${posRef.current.dotY}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${posRef.current.ringX}px, ${posRef.current.ringY}px)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [x, y, isDesktop, reducedMotion]);

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, label',
      );
      document.body.dataset.cursor = isInteractive ? 'hover' : 'default';
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      delete document.body.dataset.cursor;
    };
  }, [isDesktop, reducedMotion]);

  if (!isDesktop || reducedMotion) return null;

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
