import { useState } from 'react';

import { personal, SECTION_IDS } from '@shared/constants';
import { NAV_ITEMS } from '@shared/constants';
import { useActiveSection, useHeaderVisibility } from '@shared/hooks';
import { Container } from '@shared/ui/Container';
import { scrollToSection } from '@shared/utils';

import { Navigation } from '@features/Navigation';
import { ThemeSwitcher } from '@features/ThemeSwitcher';

import styles from './Header.module.scss';

interface HeaderProps {
  onLogoClick?: () => void;
}

export const Header = ({ onLogoClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled, isHidden } = useHeaderVisibility({ isMenuOpen });
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));

  const headerClassName = [
    styles.header,
    isScrolled || isMenuOpen ? styles.scrolled : '',
    isMenuOpen ? styles.menuOpen : '',
    isHidden && !isMenuOpen ? styles.hidden : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClassName}>
      <Container className={styles.inner}>
        <button
          type="button"
          className={styles.logo}
          onClick={() => {
            scrollToSection(SECTION_IDS.home);
            onLogoClick?.();
          }}
          aria-label="Go to home"
        >
          <span className={styles.logoMark}>{personal.initials}</span>
          <span className={styles.logoName}>{personal.name}</span>
        </button>

        <Navigation activeSection={activeSection} onOpenChange={setIsMenuOpen} />

        <div className={styles.actions}>
          <ThemeSwitcher />
          <button
            type="button"
            className={styles.cta}
            onClick={() => scrollToSection(SECTION_IDS.contact)}
          >
            Let&apos;s Talk
          </button>
        </div>
      </Container>
    </header>
  );
}
