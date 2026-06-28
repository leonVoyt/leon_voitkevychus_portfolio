import { lazy, Suspense } from 'react';

import { About } from '@widgets/About';
import { Hero } from '@widgets/Hero';

import styles from './HomePage.module.scss';

const Skills = lazy(() => import('@widgets/Skills').then((m) => ({ default: m.Skills })));
const Experience = lazy(() =>
  import('@widgets/Experience').then((m) => ({ default: m.Experience })),
);
const Projects = lazy(() => import('@widgets/Projects').then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import('@widgets/Contact').then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import('@widgets/Footer').then((m) => ({ default: m.Footer })));

const SectionFallback = () => {
  return <div className={styles.fallback} aria-hidden="true" />;
}

export const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </>
  );
}
