import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Flex } from '../Flex';
import { Text } from '../Text';
import { Elevation } from './Elevation';

const Component: Meta<typeof Elevation> = {
  title: 'Components/Elevation',
  component: Elevation,
};

export const Basic: StoryFn<typeof Elevation> = () => (
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Customize: StoryFn<typeof Elevation> = () => (
  <Elevation css={{ c: '$hiContrast' }} variant={0} />
);

export default Component;
