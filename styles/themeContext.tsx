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
  defaultTheme?: ThemeMode;
  primaryColor?: PrimaryColor;
  forcedTheme?: 'light' | 'dark';
}

export function VanillaExtractThemeProvider({
  children,
  defaultTheme = 'system',
  primaryColor = 'blue',
  forcedTheme,
}: VanillaExtractThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultTheme);
  const [appliedPrimaryColor, setPrimaryColor] = useState<PrimaryColor>(primaryColor);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    // Initialize with actual system preference to avoid flash
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    setPrimaryColor(primaryColor);
  }, [primaryColor]);

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

  const baseColors = resolvedTheme === 'dark' ? darkColors : lightColors;

  // Add semantic colors based on the current theme and primary color
  const semanticColors =
    resolvedTheme === 'dark'
      ? {
          primary: darkColors[`${appliedPrimaryColor}9`],
          contentBg: darkColors['00dp'],
          hiContrast: 'white',
          loContrast: darkColors.deepBlue2,
          focusOutline: 'hsl(216, 100%, 64%)',
          divider: 'hsl(209, 29%, 19%)',
          background: '#0a0a0a',
          foreground: '#ffffff',
          muted: '#1a1a1a',
          mutedForeground: '#b4b4b4',
          card: '#1a1a1a',
          cardForeground: '#ffffff',
          popover: '#1a1a1a',
          popoverForeground: '#ffffff',
          border: '#3a3a3a',
          input: '#3a3a3a',
          accent: '#3b82f6',
          accentForeground: '#ffffff',
          destructive: '#dc2626',
          destructiveForeground: '#ffffff',
          ring: '#60a5fa',
        }
      : {
          primary: lightColors[`${appliedPrimaryColor}9`],
          contentBg: lightColors['00dp'],
          hiContrast: lightColors.deepBlue11,
          loContrast: 'white',
          focusOutline: 'hsl(216, 100%, 64%)',
          divider: 'hsl(207, 10%, 82%)',
          background: '#fcfcfc',
          foreground: '#1a1a1a',
          muted: '#f4f4f4',
          mutedForeground: '#646464',
          card: '#ffffff',
          cardForeground: '#1a1a1a',
          popover: '#ffffff',
          popoverForeground: '#1a1a1a',
          border: '#e3e3e3',
          input: '#e3e3e3',
          accent: '#60a5fa',
          accentForeground: '#ffffff',
          destructive: '#dc2626',
          destructiveForeground: '#ffffff',
          ring: '#3b82f6',
        };

  const colors = {
    ...baseColors,
    ...semanticColors,
  };

  useEffect(() => {
    const themeClass = themes[resolvedTheme][appliedPrimaryColor];

    // Remove all theme classes
    Object.values(themes.light).forEach((cls) => document.body.classList.remove(cls));
    Object.values(themes.dark).forEach((cls) => document.body.classList.remove(cls));

    // Add current theme class
    document.body.classList.add(themeClass);

    return () => {
      document.body.classList.remove(themeClass);
    };
  }, [resolvedTheme, appliedPrimaryColor]);

  const contextValue: ThemeContextValue = {
    mode,
    resolvedTheme,
    primaryColor: appliedPrimaryColor,
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
