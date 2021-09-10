import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FlexForStory } from './Flex';
import { Box } from '../Box';

export default {
  title: 'Components/Flex',
  component: FlexForStory,
} as ComponentMeta<typeof FlexForStory>;

export const Basic: ComponentStory<typeof FlexForStory> = (args) => (
  <FlexForStory {...args}>
    <Box css={{ width: '$8', height: '$8', bc: '$blue9' }}></Box>
    <Box css={{ width: '$5', height: '$5', bc: '$blue9' }}></Box>
    <Box css={{ width: '$7', height: '$7', bc: '$blue9' }}></Box>
  </FlexForStory>
);

Basic.args = {
  direction: 'column',
  align: 'center',
  gap: '6',
};
