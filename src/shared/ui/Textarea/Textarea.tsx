import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { cn } from '@shared/utils';

import styles from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn(styles.field, error && styles.hasError, className)}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          className={styles.textarea}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <span className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
