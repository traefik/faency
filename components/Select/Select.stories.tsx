import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select, SelectProps, SelectVariants } from './Select';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const BaseSelect = (props: SelectProps): JSX.Element => <Select {...props} />;
const SelectForStory = modifyVariantsForStory<
  SelectVariants,
  SelectProps & React.InputHTMLAttributes<any>
>(BaseSelect);

export default {
  title: 'Components/Select',
  component: SelectForStory,
} as ComponentMeta<typeof SelectForStory>;

const Template: ComponentStory<typeof SelectForStory> = (args) => (
  <SelectForStory {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
    <option value="option4">Option 4</option>
    <option value="option5">Option 5</option>
  </SelectForStory>
);

export const Basic = Template.bind({});

Basic.args = {};

export const Size = Template.bind({});

Size.args = { size: 'large', placeholder: 'placeholder' };

export const Variant = Template.bind({});

Variant.args = { variant: 'ghost', defaultValue: 'option3' };

export const State = Template.bind({});

State.args = { state: 'invalid' };

export const Disabled = Template.bind({});

Disabled.args = { disabled: true, defaultValue: 'option3' };

export const Overflow: ComponentStory<typeof SelectForStory> = ({ width, ...args }) => (
  <SelectForStory css={{ width }} {...args}>
    <option value="option1">Too long option, I have to cut</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
    <option value="option4">Option 4</option>
    <option value="option5">Option 5</option>
  </SelectForStory>
);

Overflow.args = { width: 100, defaultValue: 'option1', size: 'medium' };

Overflow.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['small', 'medium', 'large']
  },
  width: {
    control: 'number'
  }
}