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
    <H1>Heading level 1</H1>
    <H2>Heading level 2</H2>
    <H3>Heading level 3</H3>
    <H4>Heading level 4</H4>
    <H5>Heading level 5</H5>
    <H6>Heading level 6</H6>
  </Flex>
);

export const Basic = Template.bind({});

Basic.args = {};

const Customize: ComponentStory<typeof H1> = (args) => (
  <H1 css={{ fontWeight: '$semiBold' }} {...args}>
    Heading level 1 SemiBold
  </H1>
);
