// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { FIELD_STORY_ARG_TYPES, FieldStoryArgs } from '../../utils/fieldStoryArgs';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BadgeVanilla } from '../Badge/Badge.vanilla';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Checkbox } from '../Checkbox';
import { Field } from '../Field';
import { FieldVanilla } from '../Field/Field.vanilla';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import { Input } from '../Input';
import { Text } from '../Text';
import { TextVanilla } from '../Text/Text.vanilla';
import { Select, SelectProps, SelectVariants } from './Select';
import {
  SelectGroupVanilla,
  SelectItemVanilla,
  SelectLabelVanilla,
  SelectSeparatorVanilla,
  SelectVanilla,
  SelectVanillaProps,
} from './Select.vanilla';

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

const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const optionValue = (label: string) => label.toLowerCase().replace(' ', '');

const VanillaOptions = () => (
  <>
    {OPTIONS.map((label) => (
      <SelectItemVanilla key={label} value={optionValue(label)}>
        {label}
      </SelectItemVanilla>
    ))}
  </>
);

export const Vanilla: StoryFn<SelectVanillaProps> = (args) => (
  <SelectVanilla aria-label="Option" {...args}>
    <VanillaOptions />
  </SelectVanilla>
);
Vanilla.args = { placeholder: 'Pick an option', size: 'medium' };
Vanilla.argTypes = {
  size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
  variant: { control: 'inline-radio', options: [undefined, 'ghost'] },
  state: { control: 'inline-radio', options: [undefined, 'invalid'] },
  disabled: { control: 'boolean' },
};

export const VanillaGroups: StoryFn<SelectVanillaProps> = (args) => (
  <SelectVanilla
    aria-label="Entry point"
    defaultValue="websecure"
    css={{ maxWidth: 280 }}
    {...args}
  >
    <SelectGroupVanilla>
      <SelectLabelVanilla>Public</SelectLabelVanilla>
      <SelectItemVanilla value="web">web</SelectItemVanilla>
      <SelectItemVanilla value="websecure">websecure</SelectItemVanilla>
    </SelectGroupVanilla>
    <SelectSeparatorVanilla />
    <SelectGroupVanilla>
      <SelectLabelVanilla>Internal</SelectLabelVanilla>
      <SelectItemVanilla value="metrics">metrics</SelectItemVanilla>
      <SelectItemVanilla value="traefik" disabled>
        traefik
      </SelectItemVanilla>
    </SelectGroupVanilla>
  </SelectVanilla>
);

export const VanillaRichItems: StoryFn<SelectVanillaProps> = (args) => (
  <SelectVanilla aria-label="Type" placeholder="Pick a type" css={{ maxWidth: 320 }} {...args}>
    <SelectItemVanilla value="http" description="Routes HTTP requests by host, path and headers">
      HTTP
    </SelectItemVanilla>
    <SelectItemVanilla value="grpc" textValue="gRPC" description="Routes gRPC calls over HTTP/2">
      gRPC{' '}
      <BadgeVanilla size="small" variant="blue">
        beta
      </BadgeVanilla>
    </SelectItemVanilla>
    <SelectItemVanilla value="tcp" description="Raw TCP, routed by SNI only">
      TCP
    </SelectItemVanilla>
  </SelectVanilla>
);

export const VanillaWithField: StoryFn<SelectVanillaProps & FieldStoryArgs> = ({
  label,
  description,
  error,
  ...args
}) => (
  <FieldVanilla label={label} description={description} error={error}>
    <SelectVanilla placeholder="Select" {...args}>
      <SelectItemVanilla value="web">web</SelectItemVanilla>
      <SelectItemVanilla value="websecure">websecure</SelectItemVanilla>
    </SelectVanilla>
  </FieldVanilla>
);
VanillaWithField.args = {
  label: 'Entry point',
  description: 'Use FieldVanilla to give the select a label, a description and an error.',
  error: 'Select an entry point.',
};
VanillaWithField.argTypes = FIELD_STORY_ARG_TYPES;

const MANY_OPTIONS = Array.from({ length: 40 }, (_, index) => `Service ${index + 1}`);

const ManyOptions = () => (
  <>
    {MANY_OPTIONS.map((label) => (
      <SelectItemVanilla key={label} value={label}>
        {label}
      </SelectItemVanilla>
    ))}
  </>
);

const OverflowCase = ({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) => (
  <FlexVanilla direction="column" gap={2}>
    <TextVanilla weight="medium">{title}</TextVanilla>
    <TextVanilla size="1" variant="subtle">
      {hint}
    </TextVanilla>
    {children}
  </FlexVanilla>
);

const caseBox = {
  boxSizing: 'border-box',
  p: '$3',
  border: '1px dashed',
  borderColor: '$divider',
  borderRadius: '$3',
};

export const VanillaOverflow: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '$6',
        alignItems: 'start',
      }}
    >
      <OverflowCase title="Clipping parent" hint="overflow: hidden, the list must not be cut.">
        <BoxVanilla css={{ ...caseBox, height: 66, overflow: 'hidden' }}>
          <SelectVanilla aria-label="Option" placeholder="Pick an option">
            <VanillaOptions />
          </SelectVanilla>
        </BoxVanilla>
      </OverflowCase>

      <OverflowCase
        title="Scrolled parent"
        hint="Scroll the box, then open: the list opens at the trigger."
      >
        <BoxVanilla css={{ ...caseBox, height: 120, overflow: 'auto', colorScheme: 'light dark' }}>
          <BoxVanilla css={{ height: 60 }} />
          <SelectVanilla aria-label="Option" placeholder="Pick an option">
            <VanillaOptions />
          </SelectVanilla>
          <BoxVanilla css={{ height: 120 }} />
        </BoxVanilla>
      </OverflowCase>

      <OverflowCase
        title="Lower stacking context"
        hint="The list must cover the sibling below, which has a higher z-index."
      >
        <BoxVanilla css={{ position: 'relative', height: 138 }}>
          <BoxVanilla
            css={{ ...caseBox, position: 'relative', zIndex: 1, transform: 'translateZ(0)' }}
          >
            <SelectVanilla aria-label="Option" placeholder="Pick an option">
              <VanillaOptions />
            </SelectVanilla>
          </BoxVanilla>
          <BoxVanilla
            css={{
              ...caseBox,
              position: 'absolute',
              top: 74,
              left: 0,
              right: 0,
              zIndex: 2,
              bc: '$cardBackground',
            }}
          >
            <TextVanilla size="1">Sibling with z-index: 2</TextVanilla>
          </BoxVanilla>
        </BoxVanilla>
      </OverflowCase>

      <OverflowCase
        title="Long list"
        hint="Scrolls with the wheel, the keyboard and the arrow buttons."
      >
        <BoxVanilla css={caseBox}>
          <SelectVanilla aria-label="Service" defaultValue="Service 20">
            <ManyOptions />
          </SelectVanilla>
        </BoxVanilla>
      </OverflowCase>

      <OverflowCase title="Long labels" hint="The trigger cuts the text, the list wraps it.">
        <BoxVanilla css={{ ...caseBox, width: 160 }}>
          <SelectVanilla aria-label="Middleware" defaultValue="long">
            <SelectItemVanilla value="long">
              strip-prefix-api-gateway-production-eu-west-1
            </SelectItemVanilla>
            <SelectItemVanilla value="short">rate-limit</SelectItemVanilla>
          </SelectVanilla>
        </BoxVanilla>
      </OverflowCase>
    </BoxVanilla>

    <OverflowCase
      title="Bottom of the page"
      hint="Scroll down until this select touches the bottom edge, then open it: the list opens upward."
    >
      <FlexVanilla
        direction="column"
        justify="end"
        css={{ ...caseBox, width: 260, height: '100vh' }}
      >
        <SelectVanilla aria-label="Service" placeholder="Pick a service">
          <ManyOptions />
        </SelectVanilla>
      </FlexVanilla>
    </OverflowCase>
  </FlexVanilla>
);

const COMPARISON_STATES = [
  { title: 'Small', props: { size: 'small' } },
  { title: 'Medium', props: {} },
  { title: 'Large', props: { size: 'large' } },
  { title: 'Ghost', props: { variant: 'ghost' } },
  { title: 'Invalid', props: { state: 'invalid' } },
  { title: 'Disabled', props: { disabled: true } },
] as const;

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={4}>
    <TextVanilla variant="subtle">
      The closed selects should look the same. The open list differs on purpose: the Stitches Select
      uses the list of the browser, the vanilla one a styled popup.
    </TextVanilla>
    <FlexVanilla gap={6}>
      <BoxVanilla css={{ flex: 1 }}>
        <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
        <FlexVanilla direction="column" gap={3}>
          {COMPARISON_STATES.map(({ title, props }) => (
            <Field key={title} label={title}>
              <Select defaultValue="option2" {...props}>
                {OPTIONS.map((label) => (
                  <option key={label} value={optionValue(label)}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>
          ))}
        </FlexVanilla>
      </BoxVanilla>
      <BoxVanilla css={{ flex: 1 }}>
        <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
        <FlexVanilla direction="column" gap={3}>
          {COMPARISON_STATES.map(({ title, props }) => (
            <FieldVanilla key={title} label={title}>
              <SelectVanilla defaultValue="option2" {...props}>
                <VanillaOptions />
              </SelectVanilla>
            </FieldVanilla>
          ))}
        </FlexVanilla>
      </BoxVanilla>
    </FlexVanilla>
  </FlexVanilla>
);

export default Component;
