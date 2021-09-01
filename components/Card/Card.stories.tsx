import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CardForStory } from './Card';

export default {
  title: 'Components/Card',
  component: CardForStory,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof CardForStory>;

export const Template: ComponentStory<typeof CardForStory> = (args) => (
  <CardForStory {...args}>Card</CardForStory>
);

export const Basic = Template.bind({});

Basic.args = {};

export const Ghost = Template.bind({});

Ghost.args = {
  variant: 'ghost',
};

export const Active = Template.bind({});

Active.args = {
  variant: 'active',
};

export const Interactive = Template.bind({});

Interactive.args = {
  interactive: true,
};

export const GhostInteractive = Template.bind({});

GhostInteractive.args = {
  variant: 'ghost',
  interactive: true,
};
