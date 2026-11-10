// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { VariantProps } from '../../stitches.config';
import { FIELD_STORY_ARG_TYPES, FieldStoryArgs } from '../../utils/fieldStoryArgs';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Field } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Radio, RadioGroup, RadioProps, RadioVariants } from './Radio';

const BaseRadio = (props: RadioProps): JSX.Element => <Radio {...props} />;
const RadioForStory = modifyVariantsForStory<RadioVariants, RadioProps>(BaseRadio);

type RadioGroupVariants = VariantProps<typeof RadioGroup>;
type RadioGroupProps = RadioGroupVariants & NonNullable<unknown>;

const BaseRadioGroup = (props: RadioGroupProps): JSX.Element => <RadioGroup {...props} />;
const RadioGroupForStory = modifyVariantsForStory<
  RadioGroupVariants,
  RadioGroupProps & React.InputHTMLAttributes<any>
>(BaseRadioGroup);

const Component: Meta<typeof RadioForStory> = {
  title: 'Components/Radio',
  component: RadioForStory,
};

const Template: StoryFn<typeof RadioForStory> = ({ value, ...rest }) => (
  <RadioGroupForStory defaultValue="1">
    <RadioForStory value={value || '1'} css={{ mr: '$5' }} {...rest} />
    <RadioForStory value={value || '2'} css={{ mr: '$5' }} {...rest} />
  </RadioGroupForStory>
);

export const Basic: StoryFn<typeof RadioForStory> = Template.bind({});

Basic.args = {};

export const Size: StoryFn<typeof RadioForStory> = Template.bind({});

Size.args = {
  size: '2',
};

export const Disabled: StoryFn<typeof RadioForStory> = Template.bind({});

Disabled.args = {
  disabled: true,
  size: 2,
};

const RadioOptions = ({ disabled }: { disabled?: boolean }) => {
  const id = React.useId();

  return (
    <RadioGroup css={{ gap: '$3' }} disabled={disabled}>
      {['Small', 'Large'].map((option) => (
        <Flex key={option} align="center" gap={1}>
          <Radio value={option.toLowerCase()} id={`${id}-${option}`} />
          <Label htmlFor={`${id}-${option}`} variant={disabled ? 'subtle' : 'default'}>
            {option}
          </Label>
        </Flex>
      ))}
    </RadioGroup>
  );
};

export const WithField: StoryFn<React.ComponentProps<typeof RadioForStory> & FieldStoryArgs> = ({
  label,
  description,
  error,
  disabled,
}) => (
  <Field label={label} description={description} error={error} disabled={disabled}>
    <RadioOptions disabled={disabled} />
  </Field>
);
WithField.args = {
  label: 'Size',
  description: 'Use Field to give the radio group a label, a description and an error.',
  error: 'Select a size.',
};
WithField.argTypes = FIELD_STORY_ARG_TYPES;

export default Component;
