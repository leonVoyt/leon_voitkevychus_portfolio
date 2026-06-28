import { motion } from 'framer-motion';

import { useReducedMotion } from '@shared/hooks';
import { cn } from '@shared/utils';

import styles from './TextReveal.module.scss';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const TextReveal = ({ text, className, delay = 0, as: Tag = 'span' }: TextRevealProps) => {
  const reducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn(styles.wrapper, className)} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className={styles.wordWrapper}>
          <motion.span
            className={styles.word}
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: delay + index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}
