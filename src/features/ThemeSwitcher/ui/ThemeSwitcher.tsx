import { motion } from 'framer-motion';
import { HiMoon, HiSun } from 'react-icons/hi2';

import { useTheme } from '../model/ThemeContext';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      className={styles.switcher}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileTap={{ scale: 0.92 }}
    >
      <motion.div
        className={styles.iconWrapper}
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {theme === 'dark' ? <HiMoon size={18} /> : <HiSun size={18} />}
      </motion.div>
    </motion.button>
  );
}
