import React, { createContext, useContext, useEffect, useState } from 'react';

export type ColorScheme = 'light' | 'dark';

function readDocumentTheme(): ColorScheme | null {
  const el = document.documentElement;
  if (el.classList.contains('dark')) return 'dark';
  if (el.classList.contains('light')) return 'light';
  const attr = el.dataset.theme;
  if (attr === 'dark' || attr === 'light') return attr;
  return null;
}

const ColorSchemeContext = createContext<ColorScheme>('light');

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
  const [scheme, setScheme] = useState<ColorScheme>(() => {
    if (typeof window === 'undefined') return 'light';
    return (
      readDocumentTheme() ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const docTheme = readDocumentTheme();
      if (docTheme) setScheme(docTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const mqHandler = (e: MediaQueryListEvent) => {
      if (!readDocumentTheme()) setScheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', mqHandler);

    return () => {
      observer.disconnect();
      mq.removeEventListener('change', mqHandler);
    };
  }, []);

  return <ColorSchemeContext.Provider value={scheme}>{children}</ColorSchemeContext.Provider>;
}

export function useColorScheme(): ColorScheme {
  return useContext(ColorSchemeContext);
}
