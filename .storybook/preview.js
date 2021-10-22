import { FaencyProvider } from '../components/FaencyProvider';
import { DocsContainer } from './components/DocContainer';
import { themes } from '@storybook/theming';
import { deepBlue, deepBlueDark } from '../colors';

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
    dark: { ...themes.dark, appContentBg: deepBlueDark.deepBlue1 },
    light: { ...themes.light, appContentBg: deepBlue.deepBlue1 },
  },
  docs: {
    container: DocsContainer,
  },
};

export const decorators = [
  (renderStory) => <FaencyProvider primaryColor="$neon8">{renderStory()}</FaencyProvider>,
];
