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
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
    <option>Option 4</option>
    <option>Option 5</option>
  </SelectForStory>
);

export const Basic = Template.bind({});

Basic.args = {};

export const Size = Template.bind({});

Size.args = { size: 'large', placeholder: 'placeholder' };

export const Variant = Template.bind({});

Variant.args = { variant: 'ghost', value: 'value' };

export const State = Template.bind({});

State.args = { state: 'invalid' };

export const Disabled = Template.bind({});

Disabled.args = { disabled: true, value: 'value' };

export const ReadOnly = Template.bind({});

ReadOnly.args = { readOnly: true, value: 'value' };
