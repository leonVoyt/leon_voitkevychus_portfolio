import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiBars3, HiXMark } from 'react-icons/hi2';

import { NAV_ITEMS } from '@shared/constants';
import { scrollToSection } from '@shared/utils';

import styles from './Navigation.module.scss';

interface NavigationProps {
  activeSection: string;
  onNavigate?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Navigation = ({ activeSection, onNavigate, onOpenChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const setMenuOpen = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId);
    setMenuOpen(false);
    onNavigate?.();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={styles.root}>
      <nav className={styles.desktop} aria-label="Main navigation">
        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`${styles.link} ${activeSection === item.id ? styles.active : ''}`}
                onClick={() => handleNavigate(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    className={styles.indicator}
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className={styles.mobileToggle}
        onClick={() => setMenuOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              className={styles.mobileBackdrop}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              ref={menuRef}
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav aria-label="Mobile navigation">
                <ul className={styles.mobileList}>
                  {NAV_ITEMS.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        type="button"
                        className={`${styles.mobileLink} ${activeSection === item.id ? styles.active : ''}`}
                        onClick={() => handleNavigate(item.id)}
                      >
                        <span className={styles.mobileIndex}>0{index + 1}</span>
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
