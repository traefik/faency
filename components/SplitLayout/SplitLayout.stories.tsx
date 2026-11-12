// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { FlexVanilla } from '../Flex/Flex.vanilla';
import { TextVanilla } from '../Text/Text.vanilla';
import {
  SplitLayoutAsideVanilla,
  SplitLayoutMainVanilla,
  SplitLayoutVanilla,
} from './SplitLayout.vanilla';

const Component: Meta<typeof SplitLayoutVanilla> = {
  title: 'Components/SplitLayout',
  component: SplitLayoutVanilla,
  parameters: {
    docs: {
      description: {
        component:
          'A main pane and an aside, side by side with a divider between them. Drag the divider, or focus it and use the arrow keys (Home and End jump to the limits); double-click resets it. Each pane takes a `minWidth` in px or % (default `25%`) and an optional `stickyTop`. The aside sets its starting width (`defaultWidth` or `defaultFraction`) and remembers it with `storageKey`. At `breakpoint` (viewport px) and below, the panes stack and the divider is hidden.',
      },
    },
  },
  argTypes: {
    breakpoint: { control: 'number' },
  },
};

export default Component;

const Card = ({ title, lines = 3 }: { title: string; lines?: number }) => (
  <FlexVanilla
    direction="column"
    gap={2}
    css={{
      p: '$4',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '$gray6',
      borderRadius: '$3',
    }}
  >
    <TextVanilla as="h3" size={3} weight="medium" css={{ m: 0 }}>
      {title}
    </TextVanilla>
    {Array.from({ length: lines }, (_, i) => (
      <TextVanilla as="p" key={i} variant="subtle" css={{ m: 0, lineHeight: 1.5 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </TextVanilla>
    ))}
  </FlexVanilla>
);

export const Basic: StoryFn<typeof SplitLayoutVanilla> = (args) => (
  <SplitLayoutVanilla {...args}>
    <SplitLayoutMainVanilla gap={4}>
      <Card title="Details" />
      <Card title="Configuration" />
    </SplitLayoutMainVanilla>
    <SplitLayoutAsideVanilla gap={4}>
      <Card title="Preview" />
    </SplitLayoutAsideVanilla>
  </SplitLayoutVanilla>
);

Basic.args = {
  breakpoint: 1024,
};

export const MinWidths: StoryFn<typeof SplitLayoutVanilla> = () => (
  <SplitLayoutVanilla breakpoint={720}>
    <SplitLayoutMainVanilla gap={4} minWidth="50%">
      <Card title="Form" lines={4} />
    </SplitLayoutMainVanilla>
    <SplitLayoutAsideVanilla gap={4} minWidth={280} defaultFraction={0.3}>
      <Card title="Changes" lines={4} />
    </SplitLayoutAsideVanilla>
  </SplitLayoutVanilla>
);

MinWidths.parameters = {
  docs: {
    description: {
      story:
        'Main keeps at least half the layout; the aside never gets narrower than 280px and starts at 30%. Stacks at 720px and below.',
    },
  },
};

export const Sticky: StoryFn<typeof SplitLayoutVanilla> = () => (
  <SplitLayoutVanilla>
    <SplitLayoutMainVanilla gap={4}>
      {Array.from({ length: 6 }, (_, i) => (
        <Card key={i} title={`Section ${i + 1}`} lines={4} />
      ))}
    </SplitLayoutMainVanilla>
    <SplitLayoutAsideVanilla gap={4} stickyTop="$4" storageKey="storybook-sticky">
      <Card title="Summary" />
    </SplitLayoutAsideVanilla>
  </SplitLayoutVanilla>
);

Sticky.parameters = {
  docs: {
    description: {
      story:
        'Scroll the page: the short aside stays `$4` from the top. Its width is remembered across reloads under `storageKey`.',
    },
  },
};

export const StickyMain: StoryFn<typeof SplitLayoutVanilla> = () => (
  <SplitLayoutVanilla>
    <SplitLayoutMainVanilla gap={4} stickyTop="$4">
      <Card title="Filters" />
    </SplitLayoutMainVanilla>
    <SplitLayoutAsideVanilla gap={4} defaultFraction={0.6}>
      {Array.from({ length: 6 }, (_, i) => (
        <Card key={i} title={`Result ${i + 1}`} lines={4} />
      ))}
    </SplitLayoutAsideVanilla>
  </SplitLayoutVanilla>
);

StickyMain.parameters = {
  docs: {
    description: {
      story: 'When the aside is the long pane, make main sticky instead.',
    },
  },
};
