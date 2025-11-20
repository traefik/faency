import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Box, BoxVanilla } from '../Box';
import { Text } from '../Text';
import { Grid } from './Grid';
import { GridVanilla } from './Grid.vanilla';

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
  columns: 3,
  gap: 6,
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
        <GridVanilla {...args}>
          <BoxVanilla>
            <Text as="p" size="4" css={{ lineHeight: '27px' }}>
              Traefik Labs develops the world's most popular cloud-native application networking
              software. It helps developers and operations teams of all sizes build, deploy and run
              modern microservices applications quickly and easily.
            </Text>
          </BoxVanilla>
          <BoxVanilla>
            <Text as="p" size="4" css={{ lineHeight: '27px' }}>
              Traefik Labs develops the world's most popular cloud-native application networking
              software. It helps developers and operations teams of all sizes build, deploy and run
              modern microservices applications quickly and easily.
            </Text>
          </BoxVanilla>
          <BoxVanilla>
            <Text as="p" size="4" css={{ lineHeight: '27px' }}>
              Traefik Labs develops the world's most popular cloud-native application networking
              software. It helps developers and operations teams of all sizes build, deploy and run
              modern microservices applications quickly and easily.
            </Text>
          </BoxVanilla>
        </GridVanilla>
      </div>
    </div>
  );
};

Comparison.args = {
  columns: 3,
  gap: 6,
};

export default Component;
