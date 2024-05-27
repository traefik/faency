import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Text } from '../Text';
import { Card } from './Card';
import { H2 } from '../Heading';
import { Flex } from '../Flex';

const Component: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

const Template: StoryFn<typeof Card> = (args) => (
  <Card {...args}>
    <H2 css={{ mb: '$3' }}>Card</H2>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  </Card>
);

export const Basic: StoryFn<typeof Card> = Template.bind({});

Basic.args = {};

export const Ghost: StoryFn<typeof Card> = Template.bind({});

Ghost.args = {
  variant: 'ghost',
};

export const Active: StoryFn<typeof Card> = Template.bind({});

Active.args = {
  active: true,
};

export const Interactive: StoryFn<typeof Card> = Template.bind({});

Interactive.args = {
  interactive: true,
};

export const Inner: StoryFn<typeof Card> = (args) => (
  <Card>
    <H2 css={{ mb: '$3' }}>Wrapping Card</H2>
    <Template {...args} />
  </Card>
);

Inner.args = {
  variant: 'inner',
};

export const Elevation: StoryFn<typeof Card> = (args) => (
  <Flex css={{ gap: '$3' }}>
    <Card elevation={0}>
      <H2 css={{ mb: '$3' }}>No Elevation</H2>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </Card>
    <Card>
      <H2 css={{ mb: '$3' }}>Default Elevation</H2>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </Card>
    <Card elevation={2}>
      <H2 css={{ mb: '$3' }}>Elevation 2</H2>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </Card>
    <Card elevation={3}>
      <H2 css={{ mb: '$3' }}>Elevation 3</H2>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </Card>
    <Card elevation={4}>
      <H2 css={{ mb: '$3' }}>Elevation 4</H2>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </Card>
    <Card elevation={5}>
      <H2 css={{ mb: '$3' }}>Elevation 5</H2>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </Card>
  </Flex>
);

Elevation.args = {};

const Customize: StoryFn<typeof Card> = (args) => (
  <Card css={{ c: '$hiContrast' }} {...args}></Card>
);

export default Component;
