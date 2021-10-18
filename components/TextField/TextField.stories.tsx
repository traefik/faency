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

Basic.args = { placeholder: 'placeholder', id: 'basic', label: 'basic' };

export const Large = Template.bind({});

Large.args = { size: 'large', placeholder: 'placeholder', id: 'large', label: 'large' };

export const PasswordType = Template.bind({});

PasswordType.args = { type: 'password', value: 'value', id: 'password-type', label: 'password' };

export const Invalid = Template.bind({});

Invalid.args = { state: 'invalid', id: 'invalid', label: 'invalid' };

export const Clearable = Template.bind({});

Clearable.args = { clearable: true, id: 'clearable', label: 'clearable' };

export const ClearableInvalid = Template.bind({});

ClearableInvalid.args = { clearable: true, state: 'invalid', id: 'clearable-invalid', label: 'clearableInvalid' };

export const Search = Template.bind({});

Search.args = { startAdornment: <MagnifyingGlassIcon />, placeholder: 'Search...', id: 'search', label: 'search' }

export const SearchClearable = Template.bind({});

SearchClearable.args = { startAdornment: <MagnifyingGlassIcon />, placeholder: 'Search...', clearable: true, id: 'search-clearable', label: 'searchClearable' };

export const Disabled = Template.bind({});

Disabled.args = { disabled: true, value: 'value', id: 'disabled', label: 'disabled' };

export const ReadOnly = Template.bind({});

ReadOnly.args = { readOnly: true, value: 'value', id: 'read-only', label: 'readOnly' };
