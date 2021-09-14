import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Flex } from './Flex';
import { Box } from '../Box';

export default {
  title: 'Components/Flex',
  component: Flex,
} as ComponentMeta<typeof Flex>;

export const Basic: ComponentStory<typeof Flex> = (args) => (
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
