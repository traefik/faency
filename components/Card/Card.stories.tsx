import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { VariantProps } from '@stitches/react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Text } from '../Text';
import { Card } from './Card';
import { Heading } from '../Heading';
import { Flex } from '../Flex';

type CardVariants = VariantProps<typeof Card>;
type CardProps = CardVariants & {};

const BaseCard = (props: CardProps): JSX.Element => <Card {...props} />;
const CardForStory = modifyVariantsForStory<CardVariants, CardProps>(BaseCard);

export default {
  title: 'Components/Card',
  component: CardForStory,
} as ComponentMeta<typeof CardForStory>;

export const Basic: ComponentStory<typeof CardForStory> = (args) => (
  <CardForStory {...args}>
    <Heading size="2" css={{ mb: '$3' }}>
      Card
    </Heading>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  </CardForStory>
);

Basic.args = {
  active: false,
  interactive: false,
};

export const Ghost: ComponentStory<typeof CardForStory> = (args) => (
  <CardForStory {...args}>
    <Heading size="2" css={{ mb: '$3' }}>
      Card
    </Heading>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  </CardForStory>
);

Ghost.args = {
  variant: 'ghost',
  active: false,
  interactive: false,
};

export const Active: ComponentStory<typeof CardForStory> = (args) => (
  <Flex css={{ gap: '$3' }}>
    <Card>
      <Heading size="2" css={{ mb: '$3' }}>
        Non-active Card
      </Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </Card>
    <Card {...args}>
      <Heading size="2" css={{ mb: '$3' }}>
        Active Card
      </Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </Card>
    <Card>
      <Heading size="2" css={{ mb: '$3' }}>
        Non-active Card
      </Heading>
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

Active.args = {
  active: true,
  interactive: false,
};

export const Inner: ComponentStory<typeof CardForStory> = (args) => (
  <CardForStory>
    <Heading size="2" css={{ mb: '$3' }}>
      Card
    </Heading>
    <Flex css={{ gap: '$3' }}>
      <Card variant="inner">
        <Text css={{ mb: '$3' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>
        <Card {...args}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>
        </Card>
      </Card>
      <Card variant="inner">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>
      </Card>
      <Card variant="inner">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>
      </Card>
    </Flex>
  </CardForStory>
);

Inner.args = {
  variant: 'inner',
  active: false,
  interactive: false,
};
