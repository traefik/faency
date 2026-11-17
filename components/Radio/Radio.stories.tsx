// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { VariantProps } from '../../stitches.config';
import { FIELD_STORY_ARG_TYPES, FieldStoryArgs } from '../../utils/fieldStoryArgs';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Field } from '../Field';
import { Flex, FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { Label } from '../Label';
import { TextVanilla } from '../Text';
import { Radio, RadioGroup, RadioProps, RadioVariants } from './Radio';
import { RadioGroupVanilla, RadioVanilla } from './Radio.vanilla';

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

const COMPARISON_STATES = [
  { label: 'Size 1 (default)', size: '1' },
  { label: 'Size 2', size: '2' },
  { label: 'Invalid (aria-invalid on the group)', size: '2', invalid: true },
  { label: 'Disabled', size: '2', disabled: true },
] as const;

const COLUMN_WIDTH = 160;

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={4}>
    <TextVanilla size="1" variant="subtle">
      Each group has a checked radio (left) and an unchecked one (right).
    </TextVanilla>
    <FlexVanilla gap={4}>
      <BoxVanilla css={{ width: 240 }} />
      <H3Vanilla css={{ width: COLUMN_WIDTH }}>Stitches</H3Vanilla>
      <H3Vanilla css={{ width: COLUMN_WIDTH }}>Vanilla Extract</H3Vanilla>
    </FlexVanilla>
    {COMPARISON_STATES.map((state) => (
      <FlexVanilla key={state.label} gap={4} align="center">
        <TextVanilla size="1" variant="subtle" css={{ width: 240 }}>
          {state.label}
        </TextVanilla>
        <BoxVanilla css={{ width: COLUMN_WIDTH }}>
          <RadioGroup
            defaultValue="1"
            css={{ gap: '$5' }}
            aria-label={`Stitches ${state.label}`}
            aria-invalid={'invalid' in state || undefined}
            disabled={'disabled' in state}
          >
            <Radio value="1" size={state.size} aria-label="Checked" />
            <Radio value="2" size={state.size} aria-label="Unchecked" />
          </RadioGroup>
        </BoxVanilla>
        <BoxVanilla css={{ width: COLUMN_WIDTH }}>
          <RadioGroupVanilla
            defaultValue="1"
            css={{ gap: '$5' }}
            aria-label={`Vanilla ${state.label}`}
            aria-invalid={'invalid' in state || undefined}
            disabled={'disabled' in state}
          >
            <RadioVanilla value="1" size={state.size} aria-label="Checked" />
            <RadioVanilla value="2" size={state.size} aria-label="Unchecked" />
          </RadioGroupVanilla>
        </BoxVanilla>
      </FlexVanilla>
    ))}
  </FlexVanilla>
);

export default Component;
