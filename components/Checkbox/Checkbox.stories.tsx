import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckboxForStory } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: CheckboxForStory,
  argTypes: { onCheckedChange: { action: 'checkedChange' } },
} as ComponentMeta<typeof CheckboxForStory>;

const Template: ComponentStory<typeof CheckboxForStory> = (args) => <CheckboxForStory {...args} />;

export const Basic = Template.bind({});

Basic.args = {};

export const Size = Template.bind({});

Size.args = {
  size: 'large',
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  checked: true,
  size: 'large',
};
