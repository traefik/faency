import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VariantProps } from '../../stitches.config';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Box } from './Box';
import { Text } from '../Text';

type BoxVariants = VariantProps<typeof Box>;
type BoxProps = BoxVariants & {};

const BaseBox = (props: BoxProps): JSX.Element => <Box {...props} />;
const BoxForStory = modifyVariantsForStory<BoxVariants, BoxProps & React.HTMLAttributes<any>>(
  BaseBox
);

export default {
  title: 'Components/Box',
  component: BoxForStory,
} as ComponentMeta<typeof BoxForStory>;

export const Basic: ComponentStory<typeof BoxForStory> = (args) => (
  <Box css={{ px: '$4', py: '$6', bc: '$deepBlue6', ta: 'center' }} {...args}>
    <Text as="p" size="4" css={{ lineHeight: '27px' }}>
      Traefik Labs develops the world's most popular cloud-native application networking software.
      It helps developers and operations teams of all sizes build, deploy and run modern
      microservices applications quickly and easily.
    </Text>
  </Box >
);