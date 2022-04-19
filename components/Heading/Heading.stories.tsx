import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Flex } from '../Flex';
import { H1, H2, H3, H4, H5, H6 } from './Heading';

export default {
  title: 'Components/Heading',
  component: H1,
} as ComponentMeta<typeof H1>;

const Template: ComponentStory<typeof H1> = (args) => (
  <Flex direction="column">
    <H1 {...args}>Heading level 1</H1>
    <H2 {...args}>Heading level 2</H2>
    <H3 {...args}>Heading level 3</H3>
    <H4 {...args}>Heading level 4</H4>
    <H5 {...args}>Heading level 5</H5>
    <H6 {...args}>Heading level 6</H6>
  </Flex>
);

export const Basic = Template.bind({});

Basic.args = {};
Basic.argTypes = {
  transform: {
    options: ['uppercase', 'capitalize', 'capitalizeWords'],
    control: 'inline-radio',
  },
};

export const Transform: ComponentStory<typeof H1> = (args) => (
  <Flex direction="column">
    <H1 {...args}>heading level 1 default</H1>
    <H1 {...args} transform="uppercase">
      heading level 1 uppercase
    </H1>
    <H1 {...args} transform="capitalize">
      heading level 1 capitalize
    </H1>
    <H1 {...args} transform="capitalizeWords">
      heading level 1 capitalize each word
    </H1>
  </Flex>
);

const Customize: ComponentStory<typeof H1> = (args) => (
  <H1 css={{ fontWeight: '$semiBold' }} {...args}>
    Heading level 1 SemiBold
  </H1>
);
