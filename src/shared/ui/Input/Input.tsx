import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@shared/utils';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn(styles.field, error && styles.hasError, className)}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        <input ref={ref} id={inputId} className={styles.input} aria-invalid={!!error} {...props} />
        {error && (
          <span className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
