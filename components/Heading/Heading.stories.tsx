import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Heading } from './Heading';
import { Flex } from '../Flex';


export default {
  title: 'Components/Heading',
  component: Heading,
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args}>Title {args?.size}</Heading>
);

export const Basic = Template.bind({});

Basic.args = {};

export const Size: ComponentStory<typeof Heading> = ({ size, ...args }) => (
  <>
    <Template {...args} size="1" />
    <Template {...args} size="2" />
    <Template {...args} size="3" />
    <Template {...args} size="4" />
  </>
);

export const Variant: ComponentStory<typeof Heading> = ({ variant, ...args }) => (
  <Flex gap={2} direction="column">
    <Heading {...args} variant="default">
      Default
    </Heading>
    <Heading {...args} variant="subtle">
      Subtle
    </Heading>
    <Heading {...args} variant="contrast">
      Contrast
    </Heading>
    <Heading {...args} variant="red">
      Red (error text)
    </Heading>
    <Heading {...args} variant="invalid">
      Invalid (invalid field)
    </Heading>
  </Flex>
);

export const Transform: ComponentStory<typeof Heading> = ({ transform, ...args }) => (
  <Flex gap={2}>
    <Heading {...args} >
      default text
    </Heading>
    <Heading {...args} transform='uppercase'>
      uppercase text
    </Heading>
    <Heading {...args} transform='capitalize'>
      capitalize text
    </Heading>
    <Heading {...args} transform='capitalizeWords'>
      capitalize each word
    </Heading>
  </Flex>
);