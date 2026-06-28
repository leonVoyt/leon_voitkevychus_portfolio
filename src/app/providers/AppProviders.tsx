import type { ReactNode } from 'react';

import { ThemeProvider } from '@features/ThemeSwitcher';

import { LenisProvider } from './LenisProvider';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <LenisProvider>{children}</LenisProvider>
    </ThemeProvider>
  );
}
