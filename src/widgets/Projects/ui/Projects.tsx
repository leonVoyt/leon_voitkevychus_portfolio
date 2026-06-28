import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub as FaGithubIcon } from 'react-icons/fa';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';

import { SECTION_IDS } from '@shared/constants';
import { Container } from '@shared/ui/Container';
import { Modal } from '@shared/ui/Modal';
import { SectionHeading } from '@shared/ui/SectionHeading';

import {
  type Project,
  PROJECT_CATEGORIES,
  type ProjectFilterCategory,
  PROJECTS,
} from '@entities/Project';

import styles from './Projects.module.scss';

const ProjectCard = ({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) => {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = '';
  };

  return (
    <motion.article
      className={styles.card}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      <div className={styles.imageWrapper}>
        <img src={project.image} alt={project.title} className={styles.image} loading="lazy" />
        <div className={styles.imageOverlay} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.techStack}>
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className={styles.tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectFilterCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id={SECTION_IDS.projects} className={styles.projects}>
      <Container>
        <SectionHeading
          label="Projects"
          title="Selected work"
          description="A collection of projects showcasing technical depth and design sensibility."
          align="center"
        />

        <div className={styles.filters} role="tablist" aria-label="Project categories">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`${styles.filter} ${activeCategory === cat.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title ?? ''}
      >
        {selectedProject && (
          <div className={styles.modalContent}>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className={styles.modalImage}
            />
            <p className={styles.modalDescription}>{selectedProject.longDescription}</p>
            <div className={styles.modalTech}>
              {selectedProject.techStack.map((tech) => (
                <span key={tech} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
            <div className={styles.modalLinks}>
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalLink}
                >
                  <FaGithubIcon size={18} />
                  View Code
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalLink}
                >
                  <HiArrowTopRightOnSquare size={18} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
