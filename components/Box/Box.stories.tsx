import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { VariantProps } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
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

export const VanillaExtractVersion: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3>Original Stitches Version</h3>
      <Box css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }}>
        <Text as="p" size="4" css={{ lineHeight: '27px' }}>
          Original Stitches-based Box component using css prop.
        </Text>
      </Box>
    </div>

    <div>
      <h3>Vanilla-Extract Version (Same API)</h3>
      <BoxVanilla css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }}>
        <Text as="p" size="4" css={{ lineHeight: '27px' }}>
          Vanilla-extract Box component using the same css prop
        </Text>
      </BoxVanilla>
    </div>

    <div>
      <h3>Both Components Support Identical CSS Props</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Box css={{ p: '$3', bc: '$blue4', br: '$2', c: 'white', ta: 'center', fg: 1 }}>
          <Text size="2">Stitches Box</Text>
        </Box>
        <BoxVanilla css={{ p: '$3', bc: '$blue4', br: '$2', c: 'white', ta: 'center', fg: 1 }}>
          <Text size="2">Vanilla Box</Text>
        </BoxVanilla>
      </div>
    </div>
  </div>
);

export const SimpleComparison: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3>Stitches (Reference)</h3>
      <Box css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }}>
        <Text as="p" size="4">
          Stitches version
        </Text>
      </Box>
    </div>

    <div>
      <h3>Vanilla-Extract (Should Match)</h3>
      <BoxVanilla css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }}>
        <Text as="p" size="4">
          Vanilla Extract version
        </Text>
      </BoxVanilla>
    </div>
  </div>
);

export const ThemeComparison: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3>Stitches (Storybook theme)</h3>
      <Box css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }}>
        <Text as="p" size="4">
          Stitches - follows Storybook theme toggle
        </Text>
      </Box>
    </div>

    <div>
      <h3>Vanilla-Extract (Storybook theme)</h3>
      <BoxVanilla css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }}>
        <Text as="p" size="4">
          Vanilla Extract - follows Storybook theme toggle
        </Text>
      </BoxVanilla>
    </div>
  </div>
);

VanillaExtractVersion.storyName = 'Stitches vs Vanilla-Extract Comparison';
SimpleComparison.storyName = 'Simple Comparison';
ThemeComparison.storyName = 'Theme Comparison';

export default Component;
