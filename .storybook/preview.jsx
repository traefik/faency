import { DocsContainer } from '@storybook/addon-docs';
import { addons } from '@storybook/preview-api';
import { themes } from '@storybook/theming';
import React from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import { globalCss } from '../';
import { FaencyProvider } from '../components/FaencyProvider';
import { darkTheme, lightTheme } from '../stitches.config';
import { VanillaExtractThemeProvider } from '../styles/themeContext';

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
      const [isDark, setDark] = React.useState();

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

const globalStyle = globalCss({
  body: {
    bc: '$contentBg',
  },
});

export const decorators = [
  (renderStory) => {
    const [isDark, setDark] = React.useState(false);

    React.useEffect(() => {
      darkTheme('neon').toString();
      lightTheme('neon').toString();
    }, []);

    React.useEffect(() => {
      channel.on(DARK_MODE_EVENT_NAME, setDark);
      return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
    }, []);

    return (
      <VanillaExtractThemeProvider forcedTheme={isDark ? 'dark' : 'light'}>
        <FaencyProvider>
          {globalStyle()}
          {renderStory()}
        </FaencyProvider>
      </VanillaExtractThemeProvider>
    );
  },
];

export const tags = ['autodocs'];
