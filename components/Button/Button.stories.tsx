import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonForStory } from './Button';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export default {
  title: 'Components/Button',
  component: ButtonForStory,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof ButtonForStory>;

const Template: ComponentStory<typeof ButtonForStory> = (args) => (
  <ButtonForStory {...args}>Button</ButtonForStory>
);

export const Primary = Template.bind({});

Primary.args = {};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: 'secondary',
};

export const Red = Template.bind({});

Red.args = {
  variant: 'red',
};

export const Ghost = Template.bind({});

Ghost.args = {
  ghost: true,
  variant: 'secondary',
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};

const TemplateWithIcon: ComponentStory<typeof ButtonForStory> = (args) => (
  <ButtonForStory {...args}>
    <Flex css={{ gap: '$1', alignItems: 'center' }}>
      <InfoCircledIcon />
      <Text css={{ color: 'currentColor', lineHeight: 'normal' }}>Button</Text>
    </Flex>
  </ButtonForStory>
);

export const WithIcon = TemplateWithIcon.bind({});

WithIcon.args = {};
