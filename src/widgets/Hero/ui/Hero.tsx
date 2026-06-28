import { lazy, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown, HiArrowRight } from 'react-icons/hi2';

import { hero, personal, SECTION_IDS, socialLinks } from '@shared/constants';
import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';
import { MagneticButton } from '@shared/ui/MagneticButton';
import { TextReveal } from '@shared/ui/TextReveal';
import { scrollToSection } from '@shared/utils';

import styles from './Hero.module.scss';

const HeroScene = lazy(() => import('./HeroScene').then((mod) => ({ default: mod.HeroScene })));

export const Hero = () => {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  };

  return (
    <section
      id={SECTION_IDS.home}
      className={styles.hero}
      onMouseMove={handleMouseMove}
      aria-label="Hero section"
    >
      <div className={styles.canvasWrapper}>
        <Suspense fallback={null}>
          <HeroScene mouseRef={mouseRef} />
        </Suspense>
      </div>
      <div className={styles.gradientOverlay} aria-hidden="true" />

      <Container className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge variant="success" pulse>
            {personal.availability}
          </Badge>
        </motion.div>

        <h1 className={styles.heading}>
          <TextReveal text={hero.headlineLine1} as="span" className={styles.line} delay={0.3} />
          <br />
          <TextReveal
            text={hero.headlineLine2}
            as="span"
            className={styles.lineGradient}
            delay={0.5}
          />
        </h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {personal.tagline}
        </motion.p>

        <motion.ul
          className={styles.techStack}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          aria-label="Main technologies"
        >
          {hero.techStack.map(({ label, open }) => (
            <li key={label}>
              <span className={open ? styles.techOpen : styles.techItem}>{label}</span>
            </li>
          ))}
          <li>
            <button
              type="button"
              className={styles.techLink}
              onClick={() => scrollToSection(SECTION_IDS.skills)}
            >
              {hero.allSkillsLabel}
              <HiArrowRight size={14} aria-hidden="true" />
            </button>
          </li>
        </motion.ul>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <MagneticButton>
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection(SECTION_IDS.projects)}
              rightIcon={<HiArrowRight size={18} />}
            >
              View Projects
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection(SECTION_IDS.contact)}
            >
              Get in Touch
            </Button>
          </MagneticButton>
        </motion.div>

        <motion.div
          className={styles.socials}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {socialLinks.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </Container>

      <motion.button
        type="button"
        className={styles.scrollIndicator}
        onClick={() => scrollToSection(SECTION_IDS.about)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll to about section"
      >
        <span className={styles.scrollText}>Scroll</span>
        <HiArrowDown className={styles.scrollIcon} />
      </motion.button>
    </section>
  );
}
