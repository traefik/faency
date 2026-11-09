// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BadgeVanilla } from '../Badge/Badge.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import {
  SegmentedControlItemVanilla,
  SegmentedControlVanilla,
  SegmentedControlVanillaProps,
} from './SegmentedControl.vanilla';

const Component: Meta<typeof SegmentedControlVanilla> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControlVanilla,
  parameters: {
    docs: {
      description: {
        component:
          'Pick exactly one of a few options, all visible at once. Arrow keys move and select, and `name` submits the value with a form. Use ButtonSwitch for a compact on/off style switch or to pick several options.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'medium',
    fullWidth: false,
    disabled: false,
  },
};

export const Basic: StoryFn<SegmentedControlVanillaProps> = (args) => {
  const [value, setValue] = React.useState('7d');

  return (
    <SegmentedControlVanilla
      {...args}
      aria-label="Time range"
      value={value}
      onValueChange={setValue}
    >
      <SegmentedControlItemVanilla value="24h">Last 24h</SegmentedControlItemVanilla>
      <SegmentedControlItemVanilla value="7d">Last 7 days</SegmentedControlItemVanilla>
      <SegmentedControlItemVanilla value="30d">Last 30 days</SegmentedControlItemVanilla>
    </SegmentedControlVanilla>
  );
};

export const Sizes: StoryFn<SegmentedControlVanillaProps> = (args) => (
  <FlexVanilla direction="column" gap={3} align="start">
    {(['small', 'medium', 'large'] as const).map((size) => (
      <SegmentedControlVanilla
        key={size}
        {...args}
        size={size}
        aria-label={`Sort, ${size}`}
        defaultValue="requests"
      >
        <SegmentedControlItemVanilla value="requests">Requests</SegmentedControlItemVanilla>
        <SegmentedControlItemVanilla value="errors">Errors</SegmentedControlItemVanilla>
        <SegmentedControlItemVanilla value="latency">Latency</SegmentedControlItemVanilla>
      </SegmentedControlVanilla>
    ))}
  </FlexVanilla>
);

export const WithCount: StoryFn<SegmentedControlVanillaProps> = (args) => (
  <SegmentedControlVanilla {...args} aria-label="Filter" defaultValue="all">
    <SegmentedControlItemVanilla value="all">
      All <BadgeVanilla>24</BadgeVanilla>
    </SegmentedControlItemVanilla>
    <SegmentedControlItemVanilla value="errors">
      Errors <BadgeVanilla variant="red">3</BadgeVanilla>
    </SegmentedControlItemVanilla>
    <SegmentedControlItemVanilla value="warnings">
      Warnings <BadgeVanilla variant="orange">5</BadgeVanilla>
    </SegmentedControlItemVanilla>
  </SegmentedControlVanilla>
);

export default Component;
