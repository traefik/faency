import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { VariantProps } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Text } from '../Text';
import { Box } from './Box';

type BoxVariants = VariantProps<typeof Box>;
type BoxProps = BoxVariants & NonNullable<unknown>;

const BaseBox = (props: BoxProps): JSX.Element => <Box {...props} />;
const BoxForStory = modifyVariantsForStory<BoxVariants, BoxProps & React.HTMLAttributes<any>>(
  BaseBox
);

const Component: Meta<typeof BoxForStory> = {
  title: 'Components/Box',
  component: BoxForStory,
};

export const Basic: StoryFn<typeof BoxForStory> = (args) => (
  <Box css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }} {...args}>
    <Text as="p" size="4" css={{ lineHeight: '27px' }}>
      Traefik Labs develops the world's most popular cloud-native application networking software.
      It helps developers and operations teams of all sizes build, deploy and run modern
      microservices applications quickly and easily.
    </Text>
  </Box>
);

export default Component;
