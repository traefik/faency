import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Box, BoxVanilla } from '../Box';
import { Flex } from './Flex';
import { FlexVanilla } from './Flex.vanilla';

const Component: Meta<typeof Flex> = {
  title: 'Components/Flex',
  component: Flex,
};

export const Basic: StoryFn<typeof Flex> = (args) => (
  <Flex {...args}>
    <Box css={{ width: '$8', height: '$8', bc: '$blue9' }}></Box>
    <Box css={{ width: '$5', height: '$5', bc: '$blue9' }}></Box>
    <Box css={{ width: '$7', height: '$7', bc: '$blue9' }}></Box>
  </Flex>
);

Basic.args = {
  direction: 'column',
  align: 'center',
  gap: '6',
};

export const Comparison: StoryFn = (args) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Original Stitches Version</h3>
        <Basic {...args} />
      </div>

      <div>
        <h3>Vanilla-Extract Version (Same API)</h3>
        <FlexVanilla {...args}>
          <BoxVanilla css={{ width: '$8', height: '$8', bc: '$blue9' }}></BoxVanilla>
          <BoxVanilla css={{ width: '$5', height: '$5', bc: '$blue9' }}></BoxVanilla>
          <BoxVanilla css={{ width: '$7', height: '$7', bc: '$blue9' }}></BoxVanilla>
        </FlexVanilla>
      </div>
    </div>
  );
};

Comparison.args = {
  direction: 'column',
  align: 'center',
  justify: 'center',
  gap: '6',
};

export default Component;
