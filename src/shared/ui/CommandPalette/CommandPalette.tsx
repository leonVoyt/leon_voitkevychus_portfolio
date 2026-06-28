import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiCommandLine, HiMagnifyingGlass } from 'react-icons/hi2';

import type { CommandItem } from '@shared/types';

import styles from './CommandPalette.module.scss';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: CommandItem[];
}

export const CommandPalette = ({ isOpen, onClose, commands }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group]?.push(cmd);
    return acc;
  }, {});

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === 'Enter' && filtered[selectedIndex]) {
        event.preventDefault();
        filtered[selectedIndex].action();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} role="dialog" aria-label="Command palette">
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.palette}
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.search}>
              <HiMagnifyingGlass className={styles.searchIcon} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command..."
                className={styles.input}
                aria-label="Search commands"
              />
              <kbd className={styles.kbd}>ESC</kbd>
            </div>
            <div className={styles.list} role="listbox">
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className={styles.group}>
                  <span className={styles.groupLabel}>{group}</span>
                  {items.map((cmd) => {
                    flatIndex += 1;
                    const index = flatIndex;
                    return (
                      <button
                        key={cmd.id}
                        type="button"
                        className={`${styles.item} ${index === selectedIndex ? styles.selected : ''}`}
                        onClick={() => {
                          cmd.action();
                          onClose();
                        }}
                        role="option"
                        aria-selected={index === selectedIndex}
                      >
                        <span>{cmd.label}</span>
                        {cmd.shortcut && <kbd className={styles.shortcut}>{cmd.shortcut}</kbd>}
                      </button>
                    );
                  })}
                </div>
              ))}
              {filtered.length === 0 && <p className={styles.empty}>No commands found</p>}
            </div>
            <div className={styles.footer}>
              <HiCommandLine size={14} />
              <span>Navigate with ↑↓ · Select with Enter</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
