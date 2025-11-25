// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { VariantProps } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
import { Text } from '../Text';
import { Box } from './Box';
import { BoxVanilla } from './Box.vanilla';

type BoxVariants = VariantProps<typeof Box>;
type BoxProps = BoxVariants & NonNullable<unknown>;

const BaseBox = (props: BoxProps): JSX.Element => <Box {...props} />;
const BoxForStory = modifyVariantsForStory<BoxVariants, BoxProps & React.HTMLAttributes<any>>(
  BaseBox,
);

const Component: Meta<typeof BoxForStory> = { title: 'Components/Box', component: BoxForStory };

export const Basic: StoryFn<typeof BoxForStory> = (args) => (
  <Box css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }} {...args}>
    <Text as="p" size="4" css={{ lineHeight: '27px' }}>
      Traefik Labs develops the world's most popular cloud-native application networking software.
      It helps developers and operations teams of all sizes build, deploy and run modern
      microservices applications quickly and easily.
    </Text>
  </Box>
);

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={5}>
    <Box>
      <H3>Original Stitches Version</H3>
      <Box css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }}>
        <Text as="p" size="4" css={{ lineHeight: '27px' }}>
          Original Stitches-based Box component using css prop.
        </Text>
      </Box>
    </Box>

    <BoxVanilla>
      <H3>Vanilla-Extract Version (Same API)</H3>
      <BoxVanilla css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }}>
        <Text as="p" size="4" css={{ lineHeight: '27px' }}>
          Vanilla-extract Box component using the same css prop
        </Text>
      </BoxVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3>Both Components Support Identical CSS Props</H3>
      <FlexVanilla gap={3}>
        <Box css={{ p: '$3', bc: '$blue4', br: '$2', c: 'white', ta: 'center', fg: 1 }}>
          <Text size="2">Stitches Box</Text>
        </Box>
        <BoxVanilla css={{ p: '$3', bc: '$blue4', br: '$2', c: 'white', ta: 'center', fg: 1 }}>
          <Text size="2">Vanilla Box</Text>
        </BoxVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

Comparison.storyName = 'Comparison';

export default Component;
