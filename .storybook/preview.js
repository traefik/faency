import { FaencyProvider } from '../components/FaencyProvider';
import { DocsContainer } from './components/DocContainer';
import { themes } from '@storybook/theming';
import { elevation, elevationDark } from '../colors';

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
    dark: { ...themes.dark, appContentBg: elevationDark['00dp'] },
    light: { ...themes.light, appContentBg: elevation['00dp'] },
  },
  docs: {
    container: DocsContainer,
  },
};

export const decorators = [
  (renderStory) => <FaencyProvider primaryColor="$neon9">{renderStory()}</FaencyProvider>,
];
