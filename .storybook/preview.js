import { FaencyProvider } from '../components/FaencyProvider';
import { DocsContainer } from './components/DocContainer';

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

export const decorators = [
  (renderStory) => <FaencyProvider primaryColor="$neon8">{renderStory()}</FaencyProvider>,
];
