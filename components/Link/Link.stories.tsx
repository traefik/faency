import React, { LinkHTMLAttributes } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VariantProps } from '@stitches/react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Link } from './Link';

type LinkVariants = VariantProps<typeof Link>;

export interface LinkProps extends LinkVariants {}

const BaseLink = (props: LinkProps): JSX.Element => <Link {...props} />;
export const LinkForStory = modifyVariantsForStory<
  LinkVariants,
  LinkProps & LinkHTMLAttributes<any>
>(BaseLink);

export default {
  title: 'Components/Link',
  component: LinkForStory,
} as ComponentMeta<typeof LinkForStory>;

const Template: ComponentStory<typeof LinkForStory> = (args) => (
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
