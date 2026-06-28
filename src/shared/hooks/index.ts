import { type RefObject,useCallback, useEffect, useRef, useState } from 'react';

export const useReducedMotion = (): boolean => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export const useMousePosition = (): { x: number; y: number } => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return progress;
}

export const useActiveSection = (sectionIds: readonly string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }

          let maxRatio = 0;
          let mostVisible = sectionIds[0] ?? '';
          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              mostVisible = sectionId;
            }
          });

          if (mostVisible) setActiveSection(mostVisible);
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [sectionIds]);

  return activeSection;
}

export const useCounter = (target: number, duration = 2000, start = false): number => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, start]);

  return count;
}

interface MagneticOptions {
  strength?: number;
  disabled?: boolean;
}

export const useMagnetic = <T extends HTMLElement>(options: MagneticOptions = {}) => {
  const { strength = 0.35, disabled = false } = options;
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const element = ref.current;
      if (!element || disabled) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (event.clientX - centerX) * strength;
      const deltaY = (event.clientY - centerY) * strength;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    },
    [strength, disabled],
  );

  const handleMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = 'translate(0, 0)';
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, disabled]);

  return ref;
}

export const useKeyboardShortcuts = (shortcuts: Record<string, () => void>, enabled = true): void => {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const modifier = event.metaKey || event.ctrlKey;
      const shortcutKey = modifier ? `meta+${key}` : key;

      const action = shortcuts[shortcutKey];
      if (action) {
        event.preventDefault();
        action();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcuts, enabled]);
}

export const useInView = (
  threshold = 0.2,
): {
  ref: RefObject<HTMLElement | null>;
  isInView: boolean;
} => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

interface HeaderVisibilityOptions {
  isMenuOpen?: boolean;
}

interface HeaderVisibility {
  isScrolled: boolean;
  isHidden: boolean;
}

const SCROLL_ON_THRESHOLD = 24;
const SCROLL_OFF_THRESHOLD = 8;
const HIDE_AFTER_Y = 120;
const HIDE_DELTA = 18;
const SHOW_DELTA = 10;

export const useHeaderVisibility = (options: HeaderVisibilityOptions = {}): HeaderVisibility => {
  const { isMenuOpen = false } = options;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const hideAccumulator = useRef(0);
  const showAccumulator = useRef(0);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (isMenuOpen) {
      setIsHidden(false);
      hideAccumulator.current = 0;
      showAccumulator.current = 0;
    }
  }, [isMenuOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setIsScrolled(window.scrollY > SCROLL_ON_THRESHOLD);

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        setIsScrolled((prev) => {
          if (prev) return currentY > SCROLL_OFF_THRESHOLD;
          return currentY > SCROLL_ON_THRESHOLD;
        });

        if (!isMenuOpen && isDesktop) {
          if (delta > 0 && currentY > HIDE_AFTER_Y) {
            hideAccumulator.current += delta;
            showAccumulator.current = 0;

            if (hideAccumulator.current >= HIDE_DELTA) {
              setIsHidden(true);
              hideAccumulator.current = 0;
            }
          } else if (delta < 0) {
            showAccumulator.current += Math.abs(delta);
            hideAccumulator.current = 0;

            if (showAccumulator.current >= SHOW_DELTA) {
              setIsHidden(false);
              showAccumulator.current = 0;
            }
          }
        } else {
          setIsHidden(false);
          hideAccumulator.current = 0;
          showAccumulator.current = 0;
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen, isDesktop]);

  return { isScrolled, isHidden };
}
