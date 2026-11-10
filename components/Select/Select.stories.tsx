// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { FIELD_STORY_ARG_TYPES, FieldStoryArgs } from '../../utils/fieldStoryArgs';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Checkbox } from '../Checkbox';
import { Field } from '../Field';
import { Flex } from '../Flex';
import { Input } from '../Input';
import { Text } from '../Text';
import { Select, SelectProps, SelectVariants } from './Select';

const BaseSelect = (props: SelectProps): JSX.Element => <Select {...props} />;
const SelectForStory = modifyVariantsForStory<
  SelectVariants,
  SelectProps & React.InputHTMLAttributes<any>
>(BaseSelect);

const Component: Meta<typeof SelectForStory> = {
  title: 'Components/Select',
  component: SelectForStory,
};

const Template: StoryFn<typeof SelectForStory> = (args) => (
  <SelectForStory {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
    <option value="option4">Option 4</option>
    <option value="option5">Option 5</option>
  </SelectForStory>
);

export const Basic: StoryFn<typeof SelectForStory> = Template.bind({});

Basic.args = {};

export const Size: StoryFn<typeof SelectForStory> = Template.bind({});

Size.args = { size: 'large', placeholder: 'placeholder' };

export const Variant: StoryFn<typeof SelectForStory> = Template.bind({});

Variant.args = { variant: 'ghost', defaultValue: 'option3' };
Variant.argTypes = {
  variant: {
    control: 'inline-radio',
    options: [undefined, 'ghost'],
  },
};

export const State: StoryFn<typeof SelectForStory> = Template.bind({});

State.args = { state: 'invalid' };

export const Disabled: StoryFn<typeof SelectForStory> = Template.bind({});

Disabled.args = { disabled: true, defaultValue: 'option3' };

export const Overflow: StoryFn<typeof SelectForStory> = ({ width, ...args }) => (
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
    options: ['small', 'medium', 'large'],
  },
  width: {
    control: 'number',
  },
};

export const Autofill: StoryFn<typeof SelectForStory> = () => {
  const [invalid, setInvalid] = React.useState(false);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Flex direction="column" gap={3} css={{ maxWidth: 360 }}>
        <Text>
          Chrome autofills a select only in an address form. Click a field and pick a saved address:
          the Country select must keep the Faency colors.
        </Text>
        <Field label="Full name">
          <Input name="name" autoComplete="name" />
        </Field>
        <Field label="Street address">
          <Input name="address" autoComplete="street-address" />
        </Field>
        <Field label="City">
          <Input name="city" autoComplete="address-level2" />
        </Field>
        <Field label="Postal code">
          <Input name="postal-code" autoComplete="postal-code" />
        </Field>
        <Field label="Country" error={invalid ? 'Select a country.' : undefined}>
          <Select name="country" autoComplete="country">
            <option value="">Select</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="IT">Italy</option>
            <option value="ES">Spain</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
          </Select>
        </Field>
        <Flex align="center" gap={2}>
          <Checkbox
            id="autofill-invalid"
            checked={invalid}
            onCheckedChange={(checked) => setInvalid(checked === true)}
          />
          <Text as="label" htmlFor="autofill-invalid">
            Show the Country select as invalid
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};

export const WithField: StoryFn<React.ComponentProps<typeof SelectForStory> & FieldStoryArgs> = ({
  label,
  description,
  error,
  ...args
}) => (
  <Field label={label} description={description} error={error}>
    <SelectForStory {...args}>
      <option value="">Select</option>
      <option value="web">web</option>
      <option value="websecure">websecure</option>
    </SelectForStory>
  </Field>
);
WithField.args = {
  label: 'Entry point',
  description: 'Use Field to give the select a label, a description and an error.',
  error: 'Select an entry point.',
};
WithField.argTypes = FIELD_STORY_ARG_TYPES;

export default Component;
