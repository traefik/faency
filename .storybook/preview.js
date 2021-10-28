import { FaencyProvider } from '../components/FaencyProvider';
import { DocsContainer } from './components/DocContainer';
import { globalCss } from '../';

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
  (renderStory) => (
    <FaencyProvider primaryColor="$neon9">
      {globalStyle()}
      {renderStory()}
    </FaencyProvider>
  ),
];
