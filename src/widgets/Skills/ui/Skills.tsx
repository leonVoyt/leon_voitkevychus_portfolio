import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { SECTION_IDS } from '@shared/constants';
import { Container } from '@shared/ui/Container';
import { SectionHeading } from '@shared/ui/SectionHeading';
import { cn } from '@shared/utils';

import { SKILL_CATEGORIES, type SkillCategory, SkillIcon, SKILLS } from '@entities/Skill';

import styles from './Skills.module.scss';

const SkillCard = ({ skill }: { skill: (typeof SKILLS)[number] }) => {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrapper}>
        <SkillIcon name={skill.icon} size={28} />
      </div>
      <span className={styles.skillName}>{skill.name}</span>
      <div className={styles.proficiencyBar}>
        <div className={styles.proficiencyFill} style={{ width: `${skill.proficiency}%` }} />
      </div>
    </article>
  );
}

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const filteredSkills =
    activeCategory === 'all' ? SKILLS : SKILLS.filter((skill) => skill.category === activeCategory);

  const syncShellHeight = useCallback(() => {
    const shell = shellRef.current;
    const grid = gridRef.current;
    if (!shell || !grid) return;
    shell.style.height = `${grid.offsetHeight}px`;
  }, []);

  useLayoutEffect(() => {
    syncShellHeight();

    const grid = gridRef.current;
    if (!grid) return;

    const observer = new ResizeObserver(syncShellHeight);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [activeCategory, syncShellHeight]);

  const handleCategoryChange = (category: SkillCategory | 'all') => {
    if (category === activeCategory || isTransitioning) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      setActiveCategory(category);
      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 180);
  };

  return (
    <section id={SECTION_IDS.skills} className={styles.skills}>
      <Container>
        <SectionHeading
          label="Skills"
          title="Technologies I work with"
          description="A curated stack built for performance, scalability, and exceptional user experiences."
          align="center"
        />

        <div className={styles.filters} role="tablist" aria-label="Skill categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={cn(styles.filter, activeCategory === 'all' && styles.active)}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={cn(styles.filter, activeCategory === cat.id && styles.active)}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          ref={shellRef}
          className={cn(styles.gridShell, isTransitioning && styles.gridShellTransitioning)}
        >
          <div ref={gridRef} className={styles.grid}>
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
