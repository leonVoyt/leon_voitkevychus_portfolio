import { NAV_ITEMS } from '@shared/constants';
import { scrollToSection } from '@shared/utils';

import styles from './SectionIndicator.module.scss';

interface SectionIndicatorProps {
  activeSection: string;
}

export const SectionIndicator = ({ activeSection }: SectionIndicatorProps) => {
  return (
    <nav className={styles.indicator} aria-label="Section navigation">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`${styles.dot} ${activeSection === item.id ? styles.active : ''}`}
          onClick={() => scrollToSection(item.id)}
          aria-label={`Go to ${item.label}`}
          aria-current={activeSection === item.id ? 'true' : undefined}
        >
          <span className={styles.tooltip}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
