import { DocsContainer } from '@storybook/addon-docs/blocks';
import { DARK_MODE_EVENT_NAME } from '@vueless/storybook-dark-mode';
import React from 'react';
import { addons } from 'storybook/preview-api';
import { themes } from 'storybook/theming';

import { globalCss } from '../';
import { FaencyProvider } from '../components/FaencyProvider';
import { darkTheme, lightTheme } from '../stitches.config';
import { VanillaExtractThemeProvider } from '../styles/themeContext';
import { themes as vanillaThemes } from '../styles/themes.css';

const channel = addons.getChannel();

/**
 * Initialize theme preference from localStorage or system preference
 * @returns {boolean} true if dark mode should be active
 */
const getInitialThemePreference = () => {
  if (typeof window === 'undefined') return false;

  // Check stored preference
  const stored = localStorage.getItem('sb-addon-themes-3');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.current) {
        return parsed.current === 'dark';
      }
    } catch (error) {
      console.warn('Failed to parse Storybook theme preference:', error);
    }
  }

  // Fallback to system preference only if no stored value or parse error
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Initialize vanilla-extract theme class immediately on script load
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const initialTheme = getInitialThemePreference() ? 'dark' : 'light';
  const themeClass = vanillaThemes[initialTheme]['blue'];

  function applyInitialTheme() {
    Object.values(vanillaThemes.light).forEach((cls) => document.body.classList.remove(cls));
    Object.values(vanillaThemes.dark).forEach((cls) => document.body.classList.remove(cls));

    document.body.classList.add(themeClass);
  }

  if (document.body) {
    applyInitialTheme();
  } else {
    document.addEventListener('DOMContentLoaded', applyInitialTheme);
  }
}

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    stylePreview: true,
  },
  docs: {
    container: (context) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isDark, setDark] = React.useState(getInitialThemePreference);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        channel.on(DARK_MODE_EVENT_NAME, setDark);
        return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
      }, [setDark]);

      const props = {
        ...context,
        theme: isDark ? themes.dark : themes.light,
      };

      return React.createElement(DocsContainer, props);
    },
  },
};

export const globalTypes = {};

const globalStyle = globalCss({
  body: {
    bc: '$contentBg',
  },
});

const VanillaProviderWrapper = ({ children, isDark, primaryColor }) => {
  return React.createElement(
    VanillaExtractThemeProvider,
    {
      forcedTheme: isDark ? 'dark' : 'light',
      primaryColor,
    },
    children,
  );
};

export const decorators = [
  (renderStory) => {
    const [isDark, setDark] = React.useState(getInitialThemePreference);

    React.useEffect(() => {
      darkTheme('blue').toString();
      lightTheme('blue').toString();
    }, []);

    React.useEffect(() => {
      channel.on(DARK_MODE_EVENT_NAME, setDark);
      return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
    }, []);

    // Apply vanilla-extract theme class before first render to prevent flash
    React.useLayoutEffect(() => {
      const resolvedTheme = isDark ? 'dark' : 'light';
      const themeClass = vanillaThemes[resolvedTheme]['blue'];

      Object.values(vanillaThemes.light).forEach((cls) => document.body.classList.remove(cls));
      Object.values(vanillaThemes.dark).forEach((cls) => document.body.classList.remove(cls));

      document.body.classList.add(themeClass);
    }, [isDark]);

    return (
      <VanillaProviderWrapper isDark={isDark} primaryColor="blue">
        <FaencyProvider>
          {globalStyle()}
          {renderStory()}
        </FaencyProvider>
      </VanillaProviderWrapper>
    );
  },
];

export const tags = ['autodocs'];
