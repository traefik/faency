import { FaencyProvider } from '../components/FaencyProvider';
import { DocsContainer } from './components/DocContainer';
import { globalCss } from '../';
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
  docs: {
    container: DocsContainer,
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
