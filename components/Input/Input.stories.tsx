import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input, InputProps, InputVariants } from './Input';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const BaseInput = (props: InputProps): JSX.Element => <Input {...props} />;
const InputForStory = modifyVariantsForStory<
  InputVariants,
  InputProps & React.InputHTMLAttributes<any>
>(BaseInput);

export default {
  title: 'Components/Input',
  component: InputForStory,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof InputForStory>;

const Template: ComponentStory<typeof InputForStory> = (args) => (
  <InputForStory {...args} />
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
