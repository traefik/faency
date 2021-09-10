import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { GridForStory } from './Grid';
import { Box } from '../Box';
import { Text } from '../Text';

export default {
  title: 'Components/Grid',
  component: GridForStory,
} as ComponentMeta<typeof GridForStory>;

export const Basic: ComponentStory<typeof GridForStory> = (args) => (
  <GridForStory {...args}>
    <Box>
      <Text as="p" size="4" css={{ lineHeight: '27px' }}>
        Traefik Labs develops the world's most popular cloud-native application networking software.
        It helps developers and operations teams of all sizes build, deploy and run modern
        microservices applications quickly and easily.
      </Text>
    </Box>
    <Box>
      <Text as="p" size="4" css={{ lineHeight: '27px' }}>
        Traefik Labs develops the world's most popular cloud-native application networking software.
        It helps developers and operations teams of all sizes build, deploy and run modern
        microservices applications quickly and easily.
      </Text>
    </Box>
    <Box>
      <Text as="p" size="4" css={{ lineHeight: '27px' }}>
        Traefik Labs develops the world's most popular cloud-native application networking software.
        It helps developers and operations teams of all sizes build, deploy and run modern
        microservices applications quickly and easily.
      </Text>
    </Box>
  </GridForStory>
);

Basic.args = {
  columns: '3',
  gap: '6',
};
