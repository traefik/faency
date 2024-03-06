import React from 'react';
import { FaencyProvider } from '../components/FaencyProvider';
import { DocsContainer } from './components/DocContainer';
import { globalCss } from '../dist';
import { darkTheme, lightTheme } from '../stitches.config';
import { useEffect } from 'react';

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
  // TODO bring back doc container
  // docs: {
  //   container: DocsContainer,
  // },
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
