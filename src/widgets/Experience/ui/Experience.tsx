import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';

import { SECTION_IDS } from '@shared/constants';
import { Container } from '@shared/ui/Container';
import { SectionHeading } from '@shared/ui/SectionHeading';

import { EXPERIENCES } from '@entities/Experience';

import styles from './Experience.module.scss';

export const Experience = () => {
  const [expandedId, setExpandedId] = useState<string | null>(EXPERIENCES[0]?.id ?? null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id={SECTION_IDS.experience} className={styles.experience}>
      <Container>
        <SectionHeading
          label="Experience"
          title="Where I've made an impact"
          description="A journey through companies shaping the future of the web."
        />

        <div className={styles.timeline}>
          <div className={styles.line} aria-hidden="true" />

          {EXPERIENCES.map((item, index) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                className={styles.item}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.dot} aria-hidden="true">
                  <span className={styles.dotInner} />
                </div>

                <div className={styles.card}>
                  <button
                    type="button"
                    className={styles.header}
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className={styles.headerContent}>
                      <span className={styles.period}>{item.period}</span>
                      <h3 className={styles.role}>{item.role}</h3>
                      <span className={styles.company}>
                        {item.company} · {item.location}
                      </span>
                    </div>
                    <motion.span
                      className={styles.chevron}
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HiChevronDown size={20} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        className={styles.body}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className={styles.description}>{item.description}</p>

                        <div className={styles.techStack}>
                          {item.techStack.map((tech) => (
                            <span key={tech} className={styles.tech}>
                              {tech}
                            </span>
                          ))}
                        </div>

                        <ul className={styles.achievements}>
                          {item.achievements.map((achievement) => (
                            <li key={achievement} className={styles.achievement}>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
