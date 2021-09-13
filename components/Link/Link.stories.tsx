import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LinkForStory } from './Link';

export default {
  title: 'Components/Link',
  component: LinkForStory,
} as ComponentMeta<typeof LinkForStory>;

const Template: ComponentStory<typeof LinkForStory> = (args) => (
  <LinkForStory href="https://traefik.io" {...args}>
    https://traefik.io
  </LinkForStory>
);

export const Basic = Template.bind({});

Basic.args = {};

export const Variant = Template.bind({});

Variant.args = {
  variant: 'primary',
};
