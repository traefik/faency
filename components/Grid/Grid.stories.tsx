import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Box, BoxVanilla } from '../Box';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
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
    <FlexVanilla direction="column" gap={5}>
      <BoxVanilla>
        <H3>Original Stitches Version</H3>
        <Basic {...args} />
      </BoxVanilla>

      <BoxVanilla>
        <H3>Vanilla-Extract Version (Same API)</H3>
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
      </BoxVanilla>
    </FlexVanilla>
  );
};

Comparison.args = {
  columns: 3,
  gap: 6,
};

export default Component;
