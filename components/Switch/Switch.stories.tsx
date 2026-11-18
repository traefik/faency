// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { FIELD_STORY_ARG_TYPES, FieldStoryArgs } from '../../utils/fieldStoryArgs';
import ignoreArgType from '../../utils/ignoreArgType';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Field } from '../Field';
import { FieldVanilla } from '../Field/Field.vanilla';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import { Label } from '../Label';
import { TextVanilla } from '../Text/Text.vanilla';
import { Switch, SwitchProps, SwitchVariants } from './Switch';
import { SwitchVanilla } from './Switch.vanilla';

const BaseSwitch = (props: SwitchProps): JSX.Element => <Switch {...props} />;
const SwitchForStory = modifyVariantsForStory<
  SwitchVariants,
  SwitchProps & React.InputHTMLAttributes<any>
>(BaseSwitch);

const Component: Meta<typeof SwitchForStory> = {
  title: 'Components/Switch',
  component: SwitchForStory,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template: StoryFn<typeof SwitchForStory> = (args) => <SwitchForStory {...args} />;

export const Basic: StoryFn<typeof SwitchForStory> = Template.bind({});

Basic.args = {};

export const Large: StoryFn<typeof SwitchForStory> = Template.bind({});

Large.args = { size: '2' };

export const Disabled: StoryFn<typeof SwitchForStory> = Template.bind({});

Disabled.args = { disabled: true };

export const Labelled: StoryFn<typeof SwitchForStory> = ({ id, ...args }) => (
  <Flex align="center">
    <Label variant="contrast" htmlFor={id}>
      label
    </Label>
    <SwitchForStory id={id} {...args} />
  </Flex>
);
Labelled.args = {
  id: 'labelled',
};
ignoreArgType('id', Labelled);

interface ExtendedSwitchProps extends React.ComponentProps<typeof SwitchForStory> {
  invalid?: boolean;
}

export const LabelAndTitle: StoryFn<(props: ExtendedSwitchProps) => JSX.Element> = ({
  id,
  onFocus,
  onBlur,
  invalid,
  disabled,
  ...args
}) => {
  const [hasFocus, setHasFocus] = React.useState(false);

  const titleVariant = React.useMemo(() => {
    if (disabled) {
      return 'subtle';
    }
    if (invalid) {
      return 'invalid';
    }
    if (hasFocus) {
      return 'contrast';
    }
    return 'default';
  }, [invalid, disabled, hasFocus]);

  const labelVariant = React.useMemo(() => {
    if (invalid) {
      return 'invalid';
    }
    if (disabled) {
      return 'subtle';
    }
    return 'contrast';
  }, [invalid, disabled]);

  const handleFocus = React.useCallback(
    (e: React.FocusEvent<HTMLButtonElement>) => {
      if (onFocus) {
        onFocus(e);
      }
      setHasFocus(true);
    },
    [onFocus, setHasFocus],
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLButtonElement>) => {
      if (onBlur) {
        onBlur(e);
      }
      setHasFocus(false);
    },
    [onBlur, setHasFocus],
  );

  return (
    <>
      <Label htmlFor={id} variant={titleVariant}>
        title
      </Label>
      <Flex align="center">
        <Label variant={labelVariant} htmlFor={id}>
          label
        </Label>
        <SwitchForStory
          id={id}
          disabled={disabled}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...args}
        />
      </Flex>
    </>
  );
};
LabelAndTitle.args = {
  id: 'label-title',
  invalid: false,
  disabled: false,
};
ignoreArgType('id', LabelAndTitle);

export const WithField: StoryFn<React.ComponentProps<typeof SwitchForStory> & FieldStoryArgs> = ({
  label,
  description,
  error,
  ...args
}) => (
  <Field label={label} description={description} error={error} labelPosition="end">
    <SwitchForStory {...args} />
  </Field>
);
WithField.args = {
  label: 'Notifications',
  description: 'Use Field to give the switch a label, a description and an error.',
  error: 'Turn on the notifications.',
};
WithField.argTypes = FIELD_STORY_ARG_TYPES;

export const VanillaReadOnly: StoryFn = () => (
  <FlexVanilla direction="column" gap={3}>
    <FieldVanilla label="Maintenance mode" labelPosition="end">
      <SwitchVanilla as="span" checked />
    </FieldVanilla>
    <FieldVanilla label="Rate limiting" labelPosition="end">
      <SwitchVanilla as="span" />
    </FieldVanilla>
    <FieldVanilla label="Legacy routing" labelPosition="end">
      <SwitchVanilla as="span" size="2" checked disabled />
    </FieldVanilla>
  </FlexVanilla>
);

const COMPARISON_STATES = [
  { title: 'Off', props: {} },
  { title: 'On', props: { defaultChecked: true } },
  { title: 'Large off', props: { size: '2' } },
  { title: 'Large on', props: { size: '2', defaultChecked: true } },
  { title: 'Invalid', props: { 'aria-invalid': true } },
  { title: 'Disabled', props: { disabled: true } },
  { title: 'Disabled on', props: { disabled: true, defaultChecked: true } },
] as const;

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={4}>
    <TextVanilla variant="subtle">
      The vanilla Switch fixes the Stitches one on purpose: the large thumb starts 3px from the edge
      instead of 2px, no size has an outer margin, and the focus ring shows only for keyboard focus.
    </TextVanilla>
    <FlexVanilla gap={6}>
      <BoxVanilla css={{ flex: 1 }}>
        <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
        <FlexVanilla direction="column" gap={3}>
          {COMPARISON_STATES.map(({ title, props }) => (
            <Field key={title} label={title} labelPosition="end">
              <Switch {...props} />
            </Field>
          ))}
        </FlexVanilla>
      </BoxVanilla>
      <BoxVanilla css={{ flex: 1 }}>
        <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
        <FlexVanilla direction="column" gap={3}>
          {COMPARISON_STATES.map(({ title, props }) => (
            <FieldVanilla key={title} label={title} labelPosition="end">
              <SwitchVanilla {...props} />
            </FieldVanilla>
          ))}
        </FlexVanilla>
      </BoxVanilla>
    </FlexVanilla>
  </FlexVanilla>
);

export default Component;
