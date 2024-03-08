import React, { LinkHTMLAttributes } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { VariantProps } from '../../stitches.config';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Link } from './Link';

type LinkVariants = VariantProps<typeof Link>;
type LinkProps = LinkVariants & {};

const BaseLink = (props: LinkProps): JSX.Element => <Link {...props} />;
const LinkForStory = modifyVariantsForStory<LinkVariants, LinkProps & LinkHTMLAttributes<any>>(
  BaseLink
);

export default {
  title: 'Components/Link',
  component: LinkForStory,
} as Meta<typeof LinkForStory>;

const Template: StoryFn<typeof LinkForStory> = (args) => (
  <LinkForStory href="https://traefik.io" {...args}>
    https://traefik.io
  </LinkForStory>
);

export const Basic = Template.bind({});

Basic.args = {};

export const Variant = Template.bind({});

Variant.args = {
  variant: 'primary',
};
Variant.argTypes = {
  variant: {
    options: ['blue', 'primary', 'subtle', 'contrast'],
    control: 'inline-radio',
  },
};

const Customize: StoryFn<typeof LinkForStory> = (args) => (
  <Link css={{ c: '$hiContraqt' }} href="https://traefik.io" {...args}>
    https://traefik.io
  </Link>
);
