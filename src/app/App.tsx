import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { NAV_ITEMS, personal, SECTION_IDS } from '@shared/constants';
import { useActiveSection, useKeyboardShortcuts } from '@shared/hooks';
import type { CommandItem } from '@shared/types';
import { AnimatedCursor } from '@shared/ui/AnimatedCursor';
import { CommandPalette } from '@shared/ui/CommandPalette';
import { GradientBlob } from '@shared/ui/GradientBlob';
import { LoadingScreen } from '@shared/ui/LoadingScreen';
import { MouseSpotlight } from '@shared/ui/MouseSpotlight';
import { NoiseOverlay } from '@shared/ui/NoiseOverlay';
import { ScrollProgress } from '@shared/ui/ScrollProgress';
import { SectionIndicator } from '@shared/ui/SectionIndicator';
import { scrollToSection } from '@shared/utils';

import { useTheme } from '@features/ThemeSwitcher';
import { Header } from '@widgets/Header';
import { HomePage } from '@pages/Home';

import styles from './App.module.scss';

gsap.registerPlugin(ScrollTrigger);

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const easterEggCountRef = useRef(0);
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));
  const { toggleTheme } = useTheme();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const commands: CommandItem[] = useMemo(
    () => [
      ...NAV_ITEMS.map((item) => ({
        id: `nav-${item.id}`,
        label: `Go to ${item.label}`,
        shortcut: `⌘${NAV_ITEMS.indexOf(item) + 1}`,
        action: () => scrollToSection(item.id),
        group: 'Navigation',
      })),
      {
        id: 'theme',
        label: 'Toggle theme',
        shortcut: '⌘D',
        action: toggleTheme,
        group: 'Actions',
      },
      {
        id: 'contact',
        label: 'Send email',
        action: () => {
          window.location.href = `mailto:${personal.email}`;
        },
        group: 'Actions',
      },
    ],
    [toggleTheme],
  );

  const shortcuts = useMemo(
    () => ({
      'meta+k': () => setIsCommandOpen(true),
      'meta+d': toggleTheme,
      'meta+1': () => scrollToSection(SECTION_IDS.home),
      'meta+2': () => scrollToSection(SECTION_IDS.about),
      'meta+3': () => scrollToSection(SECTION_IDS.skills),
      'meta+4': () => scrollToSection(SECTION_IDS.experience),
      'meta+5': () => scrollToSection(SECTION_IDS.projects),
      'meta+6': () => scrollToSection(SECTION_IDS.contact),
    }),
    [toggleTheme],
  );

  useKeyboardShortcuts(shortcuts, !isLoading);

  useEffect(() => {
    const konami = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let konamiIndex = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === konami[konamiIndex]) {
        konamiIndex += 1;
        if (konamiIndex === konami.length) {
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 4000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }

      if (event.key === 'Escape' && isCommandOpen) {
        setIsCommandOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen]);

  const handleLogoClick = () => {
    easterEggCountRef.current += 1;
    if (easterEggCountRef.current >= 5) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 4000);
      easterEggCountRef.current = 0;
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className={styles.app}>
        <ScrollProgress />
        <AnimatedCursor />
        <MouseSpotlight />
        <NoiseOverlay />

        <GradientBlob color="primary" size="lg" className={styles.blob1} />
        <GradientBlob color="secondary" size="md" className={styles.blob2} />

        <Header onLogoClick={handleLogoClick} />
        <SectionIndicator activeSection={activeSection} />

        <main>
          <HomePage />
        </main>

        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          commands={commands}
        />

        {showEasterEgg && (
          <div className={styles.easterEgg} role="alert">
            <span className={styles.easterEggIcon}>✨</span>
            <p>You found the secret! Middle Frontend magic unlocked.</p>
          </div>
        )}
      </div>
    </>
  );
};
