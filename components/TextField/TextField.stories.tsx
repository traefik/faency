import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextField, TextFieldProps, TextFieldVariants } from './TextField';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const BaseTextField = (props: TextFieldProps): JSX.Element => <TextField {...props} />;
const TextFieldForStory = modifyVariantsForStory<
  TextFieldVariants,
  TextFieldProps & React.InputHTMLAttributes<any>
>(BaseTextField);

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

export const Clearable = Template.bind({});

Clearable.args = { clearable: true };

export const ClearableInvalid = Template.bind({});

ClearableInvalid.args = { clearable: true, state: 'invalid' };

export const Search = Template.bind({});

Search.args = { startAdornment: <MagnifyingGlassIcon />, placeholder: 'Search...' }

export const SearchClearable = Template.bind({});

SearchClearable.args = { startAdornment: <MagnifyingGlassIcon />, placeholder: 'Search...', clearable: true };

export const Disabled = Template.bind({});

Disabled.args = { disabled: true, value: 'value' };

export const ReadOnly = Template.bind({});

ReadOnly.args = { readOnly: true, value: 'value' };
