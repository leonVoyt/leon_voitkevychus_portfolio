import { motion } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi2';

import { personal, SECTION_IDS } from '@shared/constants';
import { Container } from '@shared/ui/Container';
import { scrollToSection } from '@shared/utils';

import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.bgAnimation} aria-hidden="true" />

      <Container className={styles.content}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logoMark}>{personal.initials}</span>
            <p className={styles.tagline}>Crafting the future of web, one pixel at a time.</p>
          </div>

          <motion.button
            type="button"
            className={styles.backToTop}
            onClick={() => scrollToSection(SECTION_IDS.home)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <HiArrowUp size={20} />
          </motion.button>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} {personal.name}. All rights reserved.
          </p>
          <p className={styles.craft}>Built with React, Three.js & passion</p>
        </div>
      </Container>
    </footer>
  );
}
