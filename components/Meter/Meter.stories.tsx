// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { FlexVanilla } from '../Flex/Flex.vanilla';
import { TextVanilla } from '../Text/Text.vanilla';
import { MeterVanilla } from './Meter.vanilla';

const Component: Meta<typeof MeterVanilla> = {
  title: 'Components/Meter',
  component: MeterVanilla,
  parameters: {
    docs: {
      description: {
        component:
          'A bar showing one value, or several stacked segments, against a maximum. Use `value` for one bar and `segments` for a stacked one. `label` and `valueLabel` add a caption above the bar, which also names the meter for screen readers. A single bar is a `meter`; a stacked one is an image labelled by its segments. Pass `aria-hidden` when the number is already shown as text next to it.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 120 } },
    max: { control: 'number' },
    label: { control: 'text' },
    valueLabel: { control: 'text' },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default Component;

export const Basic: StoryFn<typeof MeterVanilla> = (args) => <MeterVanilla {...args} />;

Basic.args = {
  value: 42,
  max: 100,
  label: 'Storage used',
  valueLabel: '42 GB / 100 GB',
  size: 'medium',
};

export const Stacked: StoryFn<typeof MeterVanilla> = () => (
  <MeterVanilla
    label="Requests by provider"
    valueLabel="1k"
    segments={[
      { value: 520, label: 'OpenAI: 520' },
      { value: 310, label: 'Anthropic: 310' },
      { value: 170, label: 'Mistral: 170' },
    ]}
  />
);

export const StatusColors: StoryFn<typeof MeterVanilla> = () => (
  <MeterVanilla
    aria-label="Responses by status"
    segments={[
      { value: 1200, color: '$chartStatusGood', label: '2xx: 1.2k' },
      { value: 140, color: '$chartStatusWarning', label: '4xx: 140' },
      { value: 60, color: '$chartStatusSerious', label: '429: 60' },
      { value: 30, color: '$chartStatusCritical', label: '5xx: 30' },
    ]}
  />
);

const ROWS = [
  { name: 'checkout-api', count: 1840 },
  { name: 'search', count: 920 },
  { name: 'auth', count: 410 },
  { name: 'reports', count: 95 },
];

export const SharedMaxList: StoryFn<typeof MeterVanilla> = () => {
  const max = Math.max(...ROWS.map((r) => r.count));

  return (
    <FlexVanilla direction="column" gap={3}>
      {ROWS.map((r) => (
        <FlexVanilla key={r.name} direction="column" gap={1}>
          <FlexVanilla justify="space-between">
            <TextVanilla>{r.name}</TextVanilla>
            <TextVanilla variant="subtle">{r.count}</TextVanilla>
          </FlexVanilla>
          <MeterVanilla value={r.count} max={max} aria-hidden />
        </FlexVanilla>
      ))}
    </FlexVanilla>
  );
};

SharedMaxList.parameters = {
  docs: {
    description: {
      story:
        'Every row is sized against the largest one. The count is shown as text, so the bars are `aria-hidden`.',
    },
  },
};

export const Sizes: StoryFn<typeof MeterVanilla> = () => (
  <FlexVanilla direction="column" gap={4}>
    <MeterVanilla value={64} size="small" label="Small" valueLabel="64%" />
    <MeterVanilla value={64} label="Medium (default)" valueLabel="64%" />
    <MeterVanilla value={64} size="large" label="Large" valueLabel="64%" />
  </FlexVanilla>
);
