import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { Box } from '../Box';
import { Text } from '../Text';
import { Grid } from './Grid';

const Component: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
};

export const Basic: StoryFn<typeof Grid> = (args) => (
  <Grid {...args}>
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
  </Grid>
);

Basic.args = {
  columns: '3',
  gap: '6',
};

export default Component;
