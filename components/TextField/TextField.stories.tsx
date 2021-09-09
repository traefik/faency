import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextFieldForStory } from './TextField';

export default {
  title: 'Components/TextField',
  component: TextFieldForStory,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof TextFieldForStory>;

const Template: ComponentStory<typeof TextFieldForStory> = (args) => (
  <TextFieldForStory {...args} />
);

export const Basic = Template.bind({});

Basic.args = { placeholder: 'placeholder' };

export const Large = Template.bind({});

Large.args = { size: 'large', placeholder: 'placeholder' };

export const PasswordType = Template.bind({});

PasswordType.args = { type: 'password', value: 'value' };

export const Invalid = Template.bind({});

Invalid.args = { state: 'invalid' };

export const Disabled = Template.bind({});

Disabled.args = { disabled: true, value: 'value' };

export const ReadOnly = Template.bind({});

ReadOnly.args = { readOnly: true, value: 'value' };
