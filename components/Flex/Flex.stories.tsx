import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Box } from '../Box';
import { Flex } from './Flex';

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

export default Component;
