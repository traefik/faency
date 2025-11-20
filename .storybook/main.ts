import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@vueless/storybook-dark-mode'],

  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  async viteFinal(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(vanillaExtractPlugin());
    return config;
  },

  features: {
    backgrounds: false,
  },
};

export default config;
