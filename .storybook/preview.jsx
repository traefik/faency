import { DocsContainer } from '@storybook/addon-docs/blocks';
import { DARK_MODE_EVENT_NAME } from '@vueless/storybook-dark-mode';
import React from 'react';
import { addons } from 'storybook/preview-api';
import { themes } from 'storybook/theming';

import { globalCss } from '../';
import { FaencyProvider } from '../components/FaencyProvider';
import { darkTheme, lightTheme } from '../stitches.config';

const channel = addons.getChannel();

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
      const [isDark, setDark] = React.useState(() => {
        // Initialize from system preference or localStorage
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('sb-addon-themes-3');
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              return parsed.current === 'dark';
            } catch (e) {
              // Fall through
            }
          }
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
      });

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
  const [Provider, setProvider] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../styles/themeContext')
      .then((module) => {
        setProvider(() => module.VanillaExtractThemeProvider);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('VanillaExtractThemeProvider failed to load:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return React.createElement('div', { style: { padding: '24px' } }, 'Loading theme system...');
  }

  if (Provider) {
    return React.createElement(
      Provider,
      {
        forcedTheme: isDark ? 'dark' : 'light',
        primaryColor,
      },
      children,
    );
  }

  // If provider failed to load, just return children (Stitches fallback)
  return children;
};

export const decorators = [
  (renderStory) => {
    // Initialize isDark from system preference or localStorage to avoid flash
    const [isDark, setDark] = React.useState(() => {
      // Check if storybook-dark-mode has a stored preference
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('sb-addon-themes-3');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.current === 'dark') return true;
          } catch (e) {
            // Fall through to system preference
          }
        }
        // Fallback to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return false;
    });

    React.useEffect(() => {
      darkTheme('blue').toString();
      lightTheme('blue').toString();
    }, []);

    React.useEffect(() => {
      channel.on(DARK_MODE_EVENT_NAME, setDark);
      return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
    }, []);

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
