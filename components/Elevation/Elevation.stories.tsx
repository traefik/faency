import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Elevation } from './Elevation';
import { Flex } from '../Flex';
import { Text } from '../Text';

export default {
  title: 'Components/Elevation',
  component: Elevation,
} as ComponentMeta<typeof Elevation>;

export const Basic: ComponentStory<typeof Elevation> = (args) => (
  <Flex gap={3}>
    <Elevation variant={0}>
      <Flex
        justify="center"
        align="center"
        css={{ width: '100px', height: '100px', bg: '$cardBackground' }}
      >
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
    <Elevation variant={1}>
      <Flex
        justify="center"
        align="center"
        css={{ width: '100px', height: '100px', bg: '$cardBackground' }}
      >
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
    <Elevation variant={2}>
      <Flex
        justify="center"
        align="center"
        css={{ width: '100px', height: '100px', bg: '$cardBackground' }}
      >
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
    <Elevation variant={3}>
      <Flex
        justify="center"
        align="center"
        css={{ width: '100px', height: '100px', bg: '$cardBackground' }}
      >
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
    <Elevation variant={4}>
      <Flex
        justify="center"
        align="center"
        css={{ width: '100px', height: '100px', bg: '$cardBackground' }}
      >
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
    <Elevation variant={5}>
      <Flex
        justify="center"
        align="center"
        css={{ width: '100px', height: '100px', bg: '$cardBackground' }}
      >
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
  </Flex>
);

Basic.args = {};

Basic.argTypes = {
  variant: {
    control: 'inline-radio',
    options: [0, 1, 2, 3, 4, 5],
  },
};

const Customize: ComponentStory<typeof Elevation> = () => (
  <Elevation css={{ c: '$hiContrast' }} variant={0} />
)