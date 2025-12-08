// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { Flex } from '../Flex';
import { H2 } from '../Heading';
import { Text } from '../Text';
import { Card } from './Card';
import { CardVanilla } from './Card.vanilla';

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

export const Elevation: StoryFn<typeof Card> = () => (
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

export const Comparison: StoryFn = () => {
  const cardContent = (
    <>
      <H2 css={{ mb: '$3' }}>Card Title</H2>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </Text>
    </>
  );

  return (
    <Flex css={{ gap: '$3' }}>
      {/* Stitches Column */}
      <Flex css={{ flex: 1, flexDirection: 'column', gap: '$3' }}>
        <Text css={{ fontWeight: 'bold' }}>Stitches</Text>

        <div>
          <Text css={{ mb: '$2' }}>Basic</Text>
          <Card>{cardContent}</Card>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Ghost</Text>
          <Card variant="ghost">{cardContent}</Card>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Inner</Text>
          <Card>
            <H2 css={{ mb: '$3' }}>Outer Card</H2>
            <Card variant="inner">{cardContent}</Card>
          </Card>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Active</Text>
          <Card active>{cardContent}</Card>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Interactive</Text>
          <Card interactive>{cardContent}</Card>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Elevation 2</Text>
          <Card elevation={2}>{cardContent}</Card>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Elevation 5</Text>
          <Card elevation={5}>{cardContent}</Card>
        </div>
      </Flex>

      {/* Vanilla Extract Column */}
      <Flex css={{ flex: 1, flexDirection: 'column', gap: '$3' }}>
        <Text css={{ fontWeight: 'bold' }}>Vanilla Extract</Text>

        <div>
          <Text css={{ mb: '$2' }}>Basic</Text>
          <CardVanilla>{cardContent}</CardVanilla>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Ghost</Text>
          <CardVanilla variant="ghost">{cardContent}</CardVanilla>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Inner</Text>
          <CardVanilla>
            <H2 css={{ mb: '$3' }}>Outer Card</H2>
            <CardVanilla variant="inner">{cardContent}</CardVanilla>
          </CardVanilla>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Active</Text>
          <CardVanilla active>{cardContent}</CardVanilla>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Interactive</Text>
          <CardVanilla interactive>{cardContent}</CardVanilla>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Elevation 2</Text>
          <CardVanilla elevation={2}>{cardContent}</CardVanilla>
        </div>

        <div>
          <Text css={{ mb: '$2' }}>Elevation 5</Text>
          <CardVanilla elevation={5}>{cardContent}</CardVanilla>
        </div>
      </Flex>
    </Flex>
  );
};

export default Component;
