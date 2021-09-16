import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { VariantProps } from '@stitches/react';
import { Badge } from './Badge';
import { Flex } from '../Flex';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

type BadgeVariants = VariantProps<typeof Badge>;
type BadgeProps = BadgeVariants & {};

const BaseBadge = (props: BadgeProps): JSX.Element => <Badge {...props} />;
const BadgeForStory = modifyVariantsForStory<BadgeVariants, BadgeProps>(BaseBadge);

export default {
  title: 'Components/Badge',
  component: BadgeForStory,
  argTypes: {
    size: { control: 'inline-radio' },
    variant: { control: 'select' },
  },
} as ComponentMeta<typeof BadgeForStory>;

export const Colors: ComponentStory<typeof BadgeForStory> = (args) => (
  <Flex css={{ gap: '$3' }}>
    <Badge {...args}>Default</Badge>
    <Badge {...args} variant="red">
      Red
    </Badge>
    <Badge {...args} variant="green">
      Green
    </Badge>
    <Badge {...args} variant="blue">
      Blue
    </Badge>
    <Badge {...args} variant="neon">
      Neon
    </Badge>
    <Badge {...args} variant="orange">
      Orange
    </Badge>
  </Flex>
);

Colors.args = {
  interactive: false,
  size: 'small',
  variant: 'gray',
};

export const Small: ComponentStory<typeof BadgeForStory> = (args) => (
  <Badge {...args}>Small badge</Badge>
);

Small.args = {
  interactive: false,
  size: 'small',
  variant: 'blue',
};

export const Large: ComponentStory<typeof BadgeForStory> = (args) => (
  <Badge {...args}>Large badge</Badge>
);

Large.args = {
  interactive: false,
  size: 'large',
  variant: 'green',
};

export const Interactive: ComponentStory<typeof BadgeForStory> = (args) => (
  <Flex css={{ gap: '$3' }}>
    <Badge as="button" {...args}>
      Default
    </Badge>
    <Badge as="button" {...args} variant="red">
      Red
    </Badge>
    <Badge as="button" {...args} variant="green">
      Green
    </Badge>
    <Badge as="button" {...args} variant="blue">
      Blue
    </Badge>
    <Badge as="button" {...args} variant="neon">
      Neon
    </Badge>
    <Badge as="button" {...args} variant="orange">
      Orange
    </Badge>
  </Flex>
);

Interactive.args = {
  interactive: true,
  size: 'small',
  variant: 'gray',
};
