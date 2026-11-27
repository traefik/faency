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
    // The library's type emission (vite.config.ts) has no place in a Storybook build.
    config.plugins = (config.plugins || []).filter(
      (plugin) => !(plugin && 'name' in plugin && plugin.name === 'vite:dts'),
    );
    config.plugins.push(vanillaExtractPlugin());
    return config;
  },

  features: {
    backgrounds: false,
  },
};

export default config;
