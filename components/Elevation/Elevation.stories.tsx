// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { Flex } from '../Flex';
import { Text } from '../Text';
import { Elevation } from './Elevation';
import { ElevationVanilla } from './Elevation.vanilla';

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

export const Comparison: StoryFn = () => {
  const elevationContent = (
    <Flex
      justify="center"
      align="center"
      css={{ width: '100px', height: '100px', bg: '$cardBackground' }}
    >
      <Text>Hello world</Text>
    </Flex>
  );

  return (
    <Flex css={{ flexDirection: 'column', gap: '$6' }}>
      {/* Header */}
      <Flex css={{ gap: '$3', alignItems: 'center' }}>
        <Text css={{ width: '80px' }} />
        <Text css={{ width: '100px', textAlign: 'center', fontWeight: 'bold' }}>Stitches</Text>
        <Text css={{ width: '100px', textAlign: 'center', fontWeight: 'bold' }}>
          Vanilla Extract
        </Text>
      </Flex>

      {/* Variant 0 */}
      <Flex css={{ gap: '$3', alignItems: 'center' }}>
        <Text css={{ width: '80px' }}>Variant 0</Text>
        <Elevation variant={0}>{elevationContent}</Elevation>
        <ElevationVanilla variant={0}>{elevationContent}</ElevationVanilla>
      </Flex>

      {/* Variant 1 */}
      <Flex css={{ gap: '$3', alignItems: 'center' }}>
        <Text css={{ width: '80px' }}>Variant 1</Text>
        <Elevation variant={1}>{elevationContent}</Elevation>
        <ElevationVanilla variant={1}>{elevationContent}</ElevationVanilla>
      </Flex>

      {/* Variant 2 */}
      <Flex css={{ gap: '$3', alignItems: 'center' }}>
        <Text css={{ width: '80px' }}>Variant 2</Text>
        <Elevation variant={2}>{elevationContent}</Elevation>
        <ElevationVanilla variant={2}>{elevationContent}</ElevationVanilla>
      </Flex>

      {/* Variant 3 */}
      <Flex css={{ gap: '$3', alignItems: 'center' }}>
        <Text css={{ width: '80px' }}>Variant 3</Text>
        <Elevation variant={3}>{elevationContent}</Elevation>
        <ElevationVanilla variant={3}>{elevationContent}</ElevationVanilla>
      </Flex>

      {/* Variant 4 */}
      <Flex css={{ gap: '$3', alignItems: 'center' }}>
        <Text css={{ width: '80px' }}>Variant 4</Text>
        <Elevation variant={4}>{elevationContent}</Elevation>
        <ElevationVanilla variant={4}>{elevationContent}</ElevationVanilla>
      </Flex>

      {/* Variant 5 */}
      <Flex css={{ gap: '$3', alignItems: 'center' }}>
        <Text css={{ width: '80px' }}>Variant 5</Text>
        <Elevation variant={5}>{elevationContent}</Elevation>
        <ElevationVanilla variant={5}>{elevationContent}</ElevationVanilla>
      </Flex>
    </Flex>
  );
};

export default Component;
