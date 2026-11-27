// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React, { LinkHTMLAttributes } from 'react';

import { VariantProps } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box';
import { FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { Text, TextVanilla } from '../Text';
import { Link } from './Link';
import { LinkVanilla } from './Link.vanilla';

type LinkVariants = VariantProps<typeof Link>;
type LinkProps = LinkVariants & NonNullable<unknown>;

const BaseLink = (props: LinkProps): JSX.Element => <Link {...props} />;
const LinkForStory = modifyVariantsForStory<LinkVariants, LinkProps & LinkHTMLAttributes<any>>(
  BaseLink,
);

const Component: Meta<typeof LinkForStory> = {
  title: 'Components/Link',
  component: LinkForStory,
};

const Template: StoryFn<typeof LinkForStory> = (args) => (
  <LinkForStory href="https://traefik.io" {...args}>
    https://traefik.io
  </LinkForStory>
);

export const Basic: StoryFn<typeof LinkForStory> = Template.bind({});

Basic.args = {};

export const Variant: StoryFn<typeof LinkForStory> = Template.bind({});

Variant.args = {
  variant: 'primary',
};
Variant.argTypes = {
  variant: {
    options: ['blue', 'primary', 'subtle', 'contrast'],
    control: 'inline-radio',
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Customize: StoryFn<typeof LinkForStory> = (args) => (
  <Link css={{ c: '$hiContraqt' }} href="https://traefik.io" {...args}>
    https://traefik.io
  </Link>
);

const variants = ['blue', 'primary', 'subtle', 'contrast'] as const;

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <FlexVanilla gap={4} wrap="wrap">
        {variants.map((variant) => (
          <Link key={variant} href="https://traefik.io" variant={variant}>
            {variant}
          </Link>
        ))}
        <Link href="https://traefik.io">
          <Text>With Text</Text>
        </Link>
      </FlexVanilla>
    </BoxVanilla>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <FlexVanilla gap={4} wrap="wrap">
        {variants.map((variant) => (
          <LinkVanilla key={variant} href="https://traefik.io" variant={variant}>
            {variant}
          </LinkVanilla>
        ))}
        <LinkVanilla href="https://traefik.io">
          <TextVanilla>With Text</TextVanilla>
        </LinkVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
