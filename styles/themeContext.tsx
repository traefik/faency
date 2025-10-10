import React, { createContext, useContext, useEffect, useState } from 'react';

import { darkColors, lightColors } from '../colors';
import { darkTheme, lightTheme } from './themes.css';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  colors: typeof lightColors | typeof darkColors;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface VanillaExtractThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  forcedTheme?: 'light' | 'dark';
}

export function VanillaExtractThemeProvider({
  children,
  defaultMode = 'system',
  forcedTheme,
}: VanillaExtractThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const resolvedTheme: 'light' | 'dark' = forcedTheme || (mode === 'system' ? systemTheme : mode);

  const colors = resolvedTheme === 'dark' ? darkColors : lightColors;

  useEffect(() => {
    const themeClass = resolvedTheme === 'dark' ? darkTheme : lightTheme;

    document.body.classList.remove(lightTheme, darkTheme);
    document.body.classList.add(themeClass);

    return () => {
      document.body.classList.remove(lightTheme, darkTheme);
    };
  }, [resolvedTheme]);

  const contextValue: ThemeContextValue = {
    mode,
    resolvedTheme,
    colors,
    setMode,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useVanillaExtractTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useVanillaExtractTheme must be used within a VanillaExtractThemeProvider');
  }
  return context;
}
