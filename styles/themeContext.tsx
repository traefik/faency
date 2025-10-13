import React, { createContext, useContext, useEffect, useState } from 'react';

import { darkColors, lightColors } from '../colors';
import { PrimaryColor, themes } from './themes.css';

export type ThemeMode = 'light' | 'dark' | 'system';
export type { PrimaryColor };

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  primaryColor: PrimaryColor;
  colors: typeof lightColors | typeof darkColors;
  setMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: PrimaryColor) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface VanillaExtractThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  defaultPrimaryColor?: PrimaryColor;
  forcedTheme?: 'light' | 'dark';
}

export function VanillaExtractThemeProvider({
  children,
  defaultMode = 'system',
  defaultPrimaryColor = 'blue',
  forcedTheme,
}: VanillaExtractThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>(defaultPrimaryColor);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Update primaryColor when defaultPrimaryColor prop changes
  useEffect(() => {
    setPrimaryColor(defaultPrimaryColor);
  }, [defaultPrimaryColor]);

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
    const themeClass = themes[resolvedTheme][primaryColor];

    // Remove all theme classes
    Object.values(themes.light).forEach((cls) => document.body.classList.remove(cls));
    Object.values(themes.dark).forEach((cls) => document.body.classList.remove(cls));

    // Add current theme class
    document.body.classList.add(themeClass);

    return () => {
      document.body.classList.remove(themeClass);
    };
  }, [resolvedTheme, primaryColor]);

  const contextValue: ThemeContextValue = {
    mode,
    resolvedTheme,
    primaryColor,
    colors,
    setMode,
    setPrimaryColor,
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
