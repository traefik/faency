import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Elevation} from "./Elevation";
import {Flex} from "../Flex";
import {Text} from '../Text'

export default {
  title: 'Components/Elevations',
  component: Elevation,
} as ComponentMeta<typeof Elevation>;

export const Basic: ComponentStory<typeof Elevation> = (args) => (
  <Flex gap={3}>
    <Elevation height={0}>
      <Flex justify="center" align="center" css={{width: '100px', height: '100px', bg: '$cardBackground'}}>
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
    <Elevation height={1}>
      <Flex justify="center" align="center" css={{width: '100px', height: '100px', bg: '$cardBackground'}}>
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
    <Elevation height={2}>
      <Flex justify="center" align="center" css={{width: '100px', height: '100px', bg: '$cardBackground'}}>
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
    <Elevation height={3}>
      <Flex justify="center" align="center" css={{width: '100px', height: '100px', bg: '$cardBackground'}}>
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
    <Elevation height={4}>
      <Flex justify="center" align="center" css={{width: '100px', height: '100px', bg: '$cardBackground'}}>
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
    <Elevation height={5}>
      <Flex justify="center" align="center" css={{width: '100px', height: '100px', bg: '$cardBackground'}}>
        <Text>Hello world</Text>
      </Flex>
    </Elevation>
  </Flex>
);

Basic.args = {
  height: 0
};

Basic.argTypes = {
  height: {
    control: 'inline-radio',
    options: [0, 1, 2, 3, 4, 5]
  }
}