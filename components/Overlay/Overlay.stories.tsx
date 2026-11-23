// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { TextVanilla } from '../Text';
import { Overlay } from './Overlay';
import { OverlayVanilla } from './Overlay.vanilla';

const Component: Meta<typeof Overlay> = {
  title: 'Components/Overlay',
  component: Overlay,
};

const COLUMN_WIDTH = 240;

const Backdrop = ({ children }: { children: React.ReactNode }) => (
  <BoxVanilla
    css={{
      position: 'relative',
      width: COLUMN_WIDTH,
      height: 120,
      p: '$3',
      border: '1px dashed currentColor',
    }}
  >
    <TextVanilla>Content behind the overlay</TextVanilla>
    {children}
  </BoxVanilla>
);

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={4}>
    <FlexVanilla gap={4}>
      <H3Vanilla css={{ width: COLUMN_WIDTH }}>Stitches</H3Vanilla>
      <H3Vanilla css={{ width: COLUMN_WIDTH }}>Vanilla Extract</H3Vanilla>
    </FlexVanilla>
    <FlexVanilla gap={4}>
      <Backdrop>
        <Overlay css={{ position: 'absolute', inset: 0 }} />
      </Backdrop>
      <Backdrop>
        <OverlayVanilla css={{ position: 'absolute', inset: 0 }} />
      </Backdrop>
    </FlexVanilla>
  </FlexVanilla>
);

export default Component;
