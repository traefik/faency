// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { FIELD_STORY_ARG_TYPES, FieldStoryArgs } from '../../utils/fieldStoryArgs';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Field } from '../Field';
import { Checkbox, CheckboxProps, CheckboxVariants } from './Checkbox';

const BaseCheckbox = (props: CheckboxProps): JSX.Element => <Checkbox {...props} />;
const CheckboxForStory = modifyVariantsForStory<
  CheckboxVariants,
  CheckboxProps & React.InputHTMLAttributes<any>
>(BaseCheckbox);

const Component: Meta<typeof CheckboxForStory> = {
  title: 'Components/Checkbox',
  component: CheckboxForStory,
  argTypes: { onCheckedChange: { action: 'checkedChange' } },
};

const Template: StoryFn<typeof CheckboxForStory> = (args) => <CheckboxForStory {...args} />;

export const Basic: StoryFn<typeof CheckboxForStory> = Template.bind({});

Basic.args = {};

export const Size: StoryFn<typeof CheckboxForStory> = Template.bind({});

Size.args = {
  size: 'large',
};

export const Disabled: StoryFn<typeof CheckboxForStory> = Template.bind({});

Disabled.args = {
  disabled: true,
  checked: true,
  size: 'large',
};

export const WithField: StoryFn<React.ComponentProps<typeof CheckboxForStory> & FieldStoryArgs> = ({
  label,
  description,
  error,
  ...args
}) => (
  <Field label={label} description={description} error={error} labelPosition="end">
    <CheckboxForStory {...args} />
  </Field>
);
WithField.args = {
  label: 'Accept the terms',
  description: 'Use Field to give the checkbox a label, a description and an error.',
  error: 'You must accept the terms.',
};
WithField.argTypes = FIELD_STORY_ARG_TYPES;

export default Component;
