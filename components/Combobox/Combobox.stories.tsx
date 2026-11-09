// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { FlexVanilla } from '../Flex/Flex.vanilla';
import { LabelVanilla } from '../Label/Label.vanilla';
import { ComboboxVanilla, ComboboxVanillaProps } from './Combobox.vanilla';

const SERVICES = [
  'whoami',
  'api-gateway',
  'auth-service',
  'billing',
  'catalog',
  'checkout',
  'inventory',
  'notifications',
  'orders',
  'payments',
  'search',
  'users',
];

const Component: Meta<typeof ComboboxVanilla> = {
  title: 'Components/Combobox',
  component: ComboboxVanilla,
  parameters: {
    docs: {
      description: {
        component:
          'A text input that suggests known values as you type. Any text is accepted, so use it when the value may name something not in the list. Use Select when the value must be one of the options.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    state: { control: 'inline-radio', options: [undefined, 'invalid'] },
    openOnFocus: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'medium',
    openOnFocus: true,
    disabled: false,
  },
};

export const Basic: StoryFn<ComboboxVanillaProps> = (args) => {
  const [value, setValue] = React.useState('');

  return (
    <FlexVanilla direction="column" gap={1} css={{ maxWidth: 320 }}>
      <LabelVanilla htmlFor="service">Service</LabelVanilla>
      <ComboboxVanilla
        {...args}
        id="service"
        value={value}
        onValueChange={setValue}
        suggestions={SERVICES}
        placeholder="my-service"
      />
    </FlexVanilla>
  );
};

export const EmptyText: StoryFn<ComboboxVanillaProps> = (args) => (
  <FlexVanilla direction="column" gap={1} css={{ maxWidth: 320 }}>
    <LabelVanilla htmlFor="empty-service">Service</LabelVanilla>
    <ComboboxVanilla
      {...args}
      id="empty-service"
      suggestions={[]}
      emptyText="No service in namespace default"
      placeholder="my-service"
    />
  </FlexVanilla>
);

export const NameAndPort: StoryFn<ComboboxVanillaProps> = (args) => (
  <FlexVanilla gap={2} css={{ maxWidth: 420 }}>
    <ComboboxVanilla
      {...args}
      aria-label="Service name"
      suggestions={SERVICES}
      placeholder="Name"
      css={{ flex: 1, minWidth: 0 }}
    />
    <ComboboxVanilla
      {...args}
      aria-label="Service port"
      suggestions={['80', 'http', '443', 'https']}
      placeholder="Port"
      css={{ flex: '0 0 110px' }}
    />
  </FlexVanilla>
);

export default Component;
