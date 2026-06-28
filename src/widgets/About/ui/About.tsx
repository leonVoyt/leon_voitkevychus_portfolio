import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { about, personal, SECTION_IDS, stats } from '@shared/constants';
import { useCounter, useInView } from '@shared/hooks';
import { Container } from '@shared/ui/Container';
import { GradientBlob } from '@shared/ui/GradientBlob';
import { SectionHeading } from '@shared/ui/SectionHeading';

import styles from './About.module.scss';

gsap.registerPlugin(ScrollTrigger);

const StatCounter = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { ref, isInView } = useInView(0.5);
  const count = useCounter(value, 2000, isInView);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={styles.stat}>
      <span className={styles.statValue}>
        {count}
        <span className={styles.statSuffix}>{suffix}</span>
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !imageRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      if (prefersReducedMotion || isMobile) return;

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
        y: 60,
        opacity: 0.5,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id={SECTION_IDS.about} className={styles.about} ref={sectionRef}>
      <GradientBlob color="primary" size="lg" className={styles.blob1} />
      <GradientBlob color="secondary" size="md" className={styles.blob2} />

      <Container>
        <div className={styles.grid}>
          <div className={styles.textContent}>
            <SectionHeading
              label={about.sectionLabel}
              title={about.sectionTitle}
              description={about.sectionDescription}
            />

            <motion.div
              className={styles.bio}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                I&apos;m <strong>{personal.name}</strong>, a {personal.title} with a passion for{' '}
                {about.bio[0]}
              </p>
              {about.bio.slice(1).map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.div
              className={styles.location}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className={styles.locationDot} aria-hidden="true" />
              Based in {personal.location}
            </motion.div>
          </div>

          <div ref={imageRef} className={styles.visual}>
            <div className={styles.imageFrame}>
              <img
                src={about.portraitUrl}
                alt={`Portrait of ${personal.name}`}
                className={styles.image}
                loading="lazy"
                width={480}
                height={560}
              />
              <div className={styles.imageGlow} aria-hidden="true" />
            </div>
            <div className={styles.floatingCard}>
              <span className={styles.cardLabel}>Currently</span>
              <span className={styles.cardValue}>{about.currentRole}</span>
              <span className={styles.cardCompany}>{about.currentCompany}</span>
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
