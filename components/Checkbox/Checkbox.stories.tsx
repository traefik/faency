// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { FIELD_STORY_ARG_TYPES, FieldStoryArgs } from '../../utils/fieldStoryArgs';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Field } from '../Field';
import { FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { LabelVanilla } from '../Label';
import { TextVanilla } from '../Text';
import { Checkbox, CheckboxProps, CheckboxVariants } from './Checkbox';
import { CheckboxVanilla, CheckboxVanillaProps } from './Checkbox.vanilla';

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

const OPTIONS = ['Dashboard', 'Profile', 'Settings'];

/**
 * The indeterminate state has its own story because `Comparison` cannot show it: the Stitches
 * Checkbox does not style it, so it renders with no box and a check mark.
 *
 * A "select all" checkbox is indeterminate (`checked="indeterminate"`) while only some of its options
 * are checked: it shows a dash and screen readers announce it as "mixed". Checking it checks every
 * option, and unchecking it clears them.
 */
export const SelectAllVanilla: StoryFn = () => {
  const id = React.useId();
  const [selected, setSelected] = React.useState<string[]>(['Dashboard']);
  const allChecked =
    selected.length === OPTIONS.length ? true : selected.length > 0 ? 'indeterminate' : false;

  return (
    <FlexVanilla direction="column" gap={2}>
      <TextVanilla variant="subtle" css={{ maxWidth: 420, mb: '$2' }}>
        &quot;Select all&quot; shows a dash while only some options are checked (the indeterminate
        state). Check or uncheck options to see it change. Only the vanilla-extract Checkbox styles
        this state, so it is not in the Comparison story.
      </TextVanilla>
      <FlexVanilla align="center" gap={2}>
        <CheckboxVanilla
          id={`${id}-all`}
          checked={allChecked}
          onCheckedChange={(checked) => setSelected(checked === true ? OPTIONS : [])}
        />
        <LabelVanilla htmlFor={`${id}-all`}>Select all</LabelVanilla>
      </FlexVanilla>
      {OPTIONS.map((option) => (
        <FlexVanilla key={option} align="center" gap={2} css={{ pl: '$5' }}>
          <CheckboxVanilla
            id={`${id}-${option}`}
            checked={selected.includes(option)}
            onCheckedChange={(checked) =>
              setSelected((current) =>
                checked === true ? [...current, option] : current.filter((o) => o !== option),
              )
            }
          />
          <LabelVanilla htmlFor={`${id}-${option}`}>{option}</LabelVanilla>
        </FlexVanilla>
      ))}
      <FlexVanilla align="center" gap={2}>
        <CheckboxVanilla id={`${id}-disabled`} checked="indeterminate" disabled />
        <LabelVanilla htmlFor={`${id}-disabled`} variant="subtle">
          Disabled
        </LabelVanilla>
      </FlexVanilla>
    </FlexVanilla>
  );
};

type ComparisonProps = Pick<
  CheckboxVanillaProps,
  'defaultChecked' | 'disabled' | 'size' | 'aria-invalid'
>;

const COMPARISON_STATES: { label: string; props: ComparisonProps }[] = [
  { label: 'Unchecked', props: {} },
  { label: 'Checked', props: { defaultChecked: true } },
  { label: 'Large, checked', props: { size: 'large', defaultChecked: true } },
  { label: 'Invalid (aria-invalid)', props: { 'aria-invalid': true } },
  { label: 'Disabled', props: { disabled: true } },
  {
    label: 'Disabled, checked (large)',
    props: { disabled: true, defaultChecked: true, size: 'large' },
  },
];

const COLUMN_WIDTH = 160;

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={4}>
    <TextVanilla size="1" variant="subtle">
      The disabled rows differ on purpose: the vanilla Checkbox draws a grey check, so a disabled
      checked box stays readable.
    </TextVanilla>
    <FlexVanilla gap={4}>
      <BoxVanilla css={{ width: 240 }} />
      <H3Vanilla css={{ width: COLUMN_WIDTH }}>Stitches</H3Vanilla>
      <H3Vanilla css={{ width: COLUMN_WIDTH }}>Vanilla Extract</H3Vanilla>
    </FlexVanilla>
    {COMPARISON_STATES.map(({ label, props }) => (
      <FlexVanilla key={label} gap={4} align="center">
        <TextVanilla size="1" variant="subtle" css={{ width: 240 }}>
          {label}
        </TextVanilla>
        <BoxVanilla css={{ width: COLUMN_WIDTH }}>
          <Checkbox aria-label={`Stitches ${label}`} {...props} />
        </BoxVanilla>
        <BoxVanilla css={{ width: COLUMN_WIDTH }}>
          <CheckboxVanilla aria-label={`Vanilla ${label}`} {...props} />
        </BoxVanilla>
      </FlexVanilla>
    ))}
  </FlexVanilla>
);

export default Component;
