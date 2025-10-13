import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { VariantProps } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Flex } from '../Flex';
import { UnstyledLink } from '../Link';
import { Badge, COLORS } from './Badge';
import { BadgeVanilla } from './Badge.vanilla';

type BadgeVariants = VariantProps<typeof Badge>;
type BadgeProps = BadgeVariants & NonNullable<unknown>;

const BaseBadge = (props: BadgeProps): JSX.Element => <Badge {...props} />;
const BadgeForStory = modifyVariantsForStory<BadgeVariants, BadgeProps>(BaseBadge);

const Component: Meta<typeof BadgeForStory> = {
  title: 'Components/Badge',
  component: BadgeForStory,
  argTypes: {
    size: { control: 'inline-radio' },
    variant: { control: 'select' },
    borderless: { control: 'boolean' },
  },
};

export const Colors: StoryFn<typeof BadgeForStory> = (args) => (
  <Flex css={{ gap: '$3' }}>
    <Badge {...args}>Default</Badge>
    {COLORS.map((color) => (
      <Badge key={color} {...args} variant={color}>
        {color}
      </Badge>
    ))}
  </Flex>
);

Colors.args = {
  interactive: false,
  size: 'small',
  variant: 'gray',
  borderless: false,
};

export const AlphaBackground: StoryFn<typeof BadgeForStory> = Colors.bind({});

AlphaBackground.args = {
  alphaBg: true,
};

export const Small: StoryFn<typeof BadgeForStory> = (args) => <Badge {...args}>Small badge</Badge>;

Small.args = {
  interactive: false,
  size: 'small',
  variant: 'blue',
  borderless: false,
};

export const Large: StoryFn<typeof BadgeForStory> = (args) => <Badge {...args}>Large badge</Badge>;

Large.args = {
  interactive: false,
  size: 'large',
  variant: 'green',
  borderless: false,
};

export const Interactive: StoryFn<typeof BadgeForStory> = (args) => (
  <Flex css={{ gap: '$3' }}>
    <Badge {...args}>Default</Badge>
    {COLORS.map((color) => (
      <Badge {...args} variant={color}>
        {color}
      </Badge>
    ))}
  </Flex>
);

Interactive.args = {
  interactive: true,
  size: 'small',
  variant: 'gray',
  borderless: false,
};

export const BadgeLink: StoryFn<typeof BadgeForStory> = (args) => (
  <Badge asChild interactive {...args}>
    <UnstyledLink href="https://traefik.io">Link</UnstyledLink>
  </Badge>
);

export const Borderless: StoryFn<typeof BadgeForStory> = (args) => (
  <Badge {...args}>Borderless badge</Badge>
);

Borderless.args = {
  interactive: true,
  size: 'small',
  variant: 'neon',
  borderless: true,
};

export const VanillaExtractColors: StoryFn = () => (
  <Flex css={{ gap: '$3' }}>
    <BadgeVanilla>Default</BadgeVanilla>
    {COLORS.map((color) => (
      <BadgeVanilla key={color} variant={color}>
        {color}
      </BadgeVanilla>
    ))}
  </Flex>
);

export const VanillaExtractInteractive: StoryFn = () => (
  <Flex css={{ gap: '$3' }}>
    <BadgeVanilla interactive>Default</BadgeVanilla>
    {COLORS.map((color) => (
      <BadgeVanilla key={color} interactive variant={color}>
        {color}
      </BadgeVanilla>
    ))}
  </Flex>
);

export const Comparison: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ marginBottom: '16px' }}>Stitches Version</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <Badge size="small" variant="gray">
          Gray Small
        </Badge>
        <Badge size="large" variant="blue">
          Blue Large
        </Badge>
        <Badge size="small" variant="green">
          Green
        </Badge>
        <Badge size="small" variant="neon">
          Neon
        </Badge>
        <Badge size="small" variant="orange">
          Orange
        </Badge>
        <Badge size="small" variant="red">
          Red
        </Badge>
        <Badge size="small" variant="purple">
          Purple
        </Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <Badge interactive size="small" variant="gray">
          Interactive Gray
        </Badge>
        <Badge interactive size="small" variant="blue">
          Interactive Blue
        </Badge>
        <Badge interactive size="small" variant="green">
          Interactive Green
        </Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Badge alphaBg size="small" variant="gray">
          Alpha Gray
        </Badge>
        <Badge alphaBg size="small" variant="blue">
          Alpha Blue
        </Badge>
        <Badge borderless size="small" variant="neon">
          Borderless Neon
        </Badge>
      </div>
    </div>

    <div>
      <h3 style={{ marginBottom: '16px' }}>Vanilla Extract Version</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <BadgeVanilla size="small" variant="gray">
          Gray Small
        </BadgeVanilla>
        <BadgeVanilla size="large" variant="blue">
          Blue Large
        </BadgeVanilla>
        <BadgeVanilla size="small" variant="green">
          Green
        </BadgeVanilla>
        <BadgeVanilla size="small" variant="neon">
          Neon
        </BadgeVanilla>
        <BadgeVanilla size="small" variant="orange">
          Orange
        </BadgeVanilla>
        <BadgeVanilla size="small" variant="red">
          Red
        </BadgeVanilla>
        <BadgeVanilla size="small" variant="purple">
          Purple
        </BadgeVanilla>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <BadgeVanilla interactive size="small" variant="gray">
          Interactive Gray
        </BadgeVanilla>
        <BadgeVanilla interactive size="small" variant="blue">
          Interactive Blue
        </BadgeVanilla>
        <BadgeVanilla interactive size="small" variant="green">
          Interactive Green
        </BadgeVanilla>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <BadgeVanilla alphaBg size="small" variant="gray">
          Alpha Gray
        </BadgeVanilla>
        <BadgeVanilla alphaBg size="small" variant="blue">
          Alpha Blue
        </BadgeVanilla>
        <BadgeVanilla borderless size="small" variant="neon">
          Borderless Neon
        </BadgeVanilla>
      </div>
    </div>
  </div>
);

export default Component;
