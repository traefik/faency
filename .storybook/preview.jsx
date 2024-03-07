import React from 'react';
import { FaencyProvider } from '../components/FaencyProvider';
import { DocsContainer } from '@storybook/addon-docs';
import { globalCss } from '../';
import { darkTheme, lightTheme } from '../stitches.config';
import { useEffect } from 'react';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
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
      const isDark = useDarkMode();

      const props = {
        ...context,
        theme: isDark ? themes.dark : themes.light,
      };

      return React.createElement(DocsContainer, props);
    },
  },
};

const globalStyle = globalCss({
  body: {
    bc: '$contentBg',
  },
});

export const decorators = [
  (renderStory) => {
    useEffect(() => {
      darkTheme('neon').toString();
      lightTheme('neon').toString();
    }, []);

    return (
      <FaencyProvider>
        {globalStyle()}
        {renderStory()}
      </FaencyProvider>
    );
  },
];
