// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { Checkbox } from '../Checkbox';
import { Flex, FlexVanilla } from '../Flex';
import { Input, InputVanilla } from '../Input';
import { Label } from '../Label';
import { Radio, RadioGroup } from '../Radio';
import { Select } from '../Select';
import { Switch } from '../Switch';
import { Text } from '../Text';
import { Textarea, TextareaVanilla } from '../Textarea';
import { Field } from './Field';
import { FieldVanilla } from './Field.vanilla';
import { useFieldControl } from './FieldContext';

const Component: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
**Field** connects a form control to its label, help text and error, so that screen readers read them together.

Without \`Field\`, a \`Label\` next to an \`Input\` looks correct but is not connected to it: when the control gets focus, a screen reader reads only the type of control, not its name, help text or error. To connect them by hand, you must create ids and set \`htmlFor\`, \`aria-describedby\` and \`aria-invalid\` on every control. \`Field\` does this for you.

- **When to use it:** around \`Input\`, \`Select\`, \`Checkbox\`, \`Switch\`, \`RadioGroup\`, or a custom control that uses \`useFieldControl\`. \`TextField\` and \`Textarea\` already have \`label\`, \`description\`, \`error\` and \`announceError\` props that use \`Field\` inside, so you do not need to wrap them. If a wrapper of your app does it, put \`label\`, \`description\` and \`error\` on the \`Field\`, not on them: otherwise they make their own Field, and the label of the outer Field is no longer connected to the control.
- **Custom control:** spread what \`useFieldControl\` returns on the control. When the control is not an \`input\`, \`select\`, \`textarea\` or \`button\`, pass \`labelable: false\` and set \`aria-labelledby={labelId}\`, so that the control gets its name from the label. See the CustomControlWithHook story.
- **One control per Field:** the label of a \`Field\` connects to one control. Do not put two controls in one \`Field\`.
- **\`id\`:** the control keeps its own \`id\`. When it has none, it gets the \`id\` of the \`Field\`, or a generated id when the \`Field\` has a label.
- **\`error\`:** marks the control as invalid and gives the error text. The error is read when the control gets focus.
- **\`announceError\`:** for errors that show or change while the user types, for example with Formik and Yup. The screen reader reads the error with the field name ("Name: The name is required.") about one second after the error stops changing, so that the echo of the typed text does not hide it. Off by default.
- **\`disabled\`:** disables the control and gives the label the disabled style. \`Field\` styles only its own label: give other labels inside the control, such as the labels of radio options, the disabled style yourself.
- **\`label\` as a function:** it gets \`htmlFor\`, \`id\` and \`variant\`. Render \`htmlFor\` and \`id\` on the label, so that the control has its name and \`announceError\` can read the field name.
- **\`labelPosition\`:** \`top\` (default) puts the label above the control. \`end\` puts it after the control, for a \`Checkbox\` or a \`Switch\`.
`,
      },
    },
  },
};

const AllControls = (args: React.ComponentProps<typeof Field>) => {
  const id = React.useId();

  return (
    <Flex direction="column" gap={4}>
      <Field {...args} label="Name">
        <Input placeholder="my-gateway" />
      </Field>
      <Field {...args} label="Notes">
        <Textarea />
      </Field>
      <Field {...args} label="Entry point">
        <Select>
          <option value="">Select</option>
          <option value="web">web</option>
          <option value="websecure">websecure</option>
        </Select>
      </Field>
      <Field {...args} label="Accept the terms" labelPosition="end">
        <Checkbox />
      </Field>
      <Field {...args} label="Notifications" labelPosition="end">
        <Switch />
      </Field>
      <Field {...args} label="Size">
        <RadioGroup css={{ gap: '$3' }}>
          <Flex align="center" gap={1}>
            <Radio value="small" id={`${id}-small`} />
            <Label htmlFor={`${id}-small`} variant={args.disabled ? 'subtle' : 'default'}>
              Small
            </Label>
          </Flex>
          <Flex align="center" gap={1}>
            <Radio value="large" id={`${id}-large`} />
            <Label htmlFor={`${id}-large`} variant={args.disabled ? 'subtle' : 'default'}>
              Large
            </Label>
          </Flex>
        </RadioGroup>
      </Field>
    </Flex>
  );
};

const STATE_ARG_TYPES = { label: { table: { disable: true } } };

export const Basic: StoryFn<typeof Field> = (args) => <AllControls {...args} />;
Basic.args = {
  description: 'A short help text for the control.',
};
Basic.argTypes = STATE_ARG_TYPES;

export const WithError: StoryFn<typeof Field> = Basic.bind({});
WithError.args = {
  description: 'A short help text for the control.',
  error: 'This field is required.',
};
WithError.argTypes = STATE_ARG_TYPES;

export const Disabled: StoryFn<typeof Field> = Basic.bind({});
Disabled.args = {
  description: 'A short help text for the control.',
  disabled: true,
};
Disabled.argTypes = STATE_ARG_TYPES;

export const AnnounceError: StoryFn<typeof Field> = () => {
  const [value, setValue] = React.useState('');
  const error = /[A-Z]/.test(value) ? 'Use lowercase letters only.' : undefined;

  return (
    <Field
      label="Name"
      description="Type an uppercase letter: the error shows at once, and it is read when you stop typing."
      error={error}
      announceError
    >
      <Input value={value} onChange={(event) => setValue(event.target.value)} />
    </Field>
  );
};

export const ErrorOnBlur: StoryFn<typeof Field> = () => {
  const [values, setValues] = React.useState({ name: '', email: '' });
  const [touched, setTouched] = React.useState({ name: false, email: false });
  const errors = {
    name: values.name ? undefined : 'The name is required.',
    email: values.email ? undefined : 'The email is required.',
  };

  return (
    <Flex direction="column" gap={3}>
      <Text>
        Like Formik with Yup: the error of a field shows when you leave it, and it changes while you
        type after that.
      </Text>
      {(['name', 'email'] as const).map((key) => (
        <Field
          key={key}
          label={key === 'name' ? 'Name' : 'Email'}
          error={touched[key] ? errors[key] : undefined}
          announceError
        >
          <Input
            value={values[key]}
            onChange={(event) => setValues((prev) => ({ ...prev, [key]: event.target.value }))}
            onBlur={() => setTouched((prev) => ({ ...prev, [key]: true }))}
          />
        </Field>
      ))}
    </Flex>
  );
};

const CustomControl = () => {
  const { invalid, labelId, ...control } = useFieldControl({ labelable: false });

  return (
    <Text
      as="div"
      role="textbox"
      tabIndex={0}
      aria-labelledby={labelId}
      {...control}
      css={{
        display: 'block',
        p: '$2',
        border: '1px solid',
        borderColor: invalid ? '$red9' : '$grayBlue9',
        borderRadius: '$3',
      }}
    >
      Custom control
    </Text>
  );
};

export const CustomControlWithHook: StoryFn<typeof Field> = () => (
  <Field label="Custom" error="Custom error.">
    <CustomControl />
  </Field>
);

export const Vanilla: StoryFn<typeof FieldVanilla> = (args) => (
  <FlexVanilla direction="column" gap={4}>
    <FieldVanilla {...args} label="Name">
      <InputVanilla placeholder="my-gateway" />
    </FieldVanilla>
    <FieldVanilla {...args} label="Notes">
      <TextareaVanilla />
    </FieldVanilla>
  </FlexVanilla>
);
Vanilla.args = {
  description: 'A short help text for the control.',
  error: 'This field is required.',
};
Vanilla.argTypes = STATE_ARG_TYPES;

export default Component;
