import { Meta, StoryFn } from '@storybook/react-vite';
import React, { LinkHTMLAttributes } from 'react';

import { VariantProps } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Link } from './Link';

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

export default Component;
