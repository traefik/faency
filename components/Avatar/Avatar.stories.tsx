import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from './Avatar';
import { Flex } from '../Flex';

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as ComponentMeta<any>;

export const Size: ComponentStory<typeof Avatar> = (args) => (
  <Flex gap={3}>
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
  </Flex>
);

Size.args = {
  src:
    'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.wikia.com%2Fstarwars%2Fimages%2F5%2F57%2FLuke_Skywalker_SWGTCG.jpg&f=1&nofb=1',
  size: '4',
};

Size.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4', '5', '6'],
  },
};

export const Shape: ComponentStory<typeof Avatar> = (args) => (
  <Flex gap={3}>
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
  </Flex>
);

Shape.args = {
  src:
    'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.wikia.com%2Fstarwars%2Fimages%2F5%2F57%2FLuke_Skywalker_SWGTCG.jpg&f=1&nofb=1',
  shape: 'square',
  size: '4',
};

Shape.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4', '5', '6'],
  },
  shape: {
    control: 'inline-radio',
    options: ['square', 'circle'],
  },
};

export const Variants: ComponentStory<typeof Avatar> = (args) => (
  <Flex gap={3}>
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
  </Flex>
);

Variants.args = {
  src:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Forig00.deviantart.net%2F6da4%2Ff%2F2013%2F092%2Ff%2F0%2Fyoda_icon_by_slamiticon-d605vp9.png&f=1&nofb=1',
  shape: 'circle',
  size: '4',
  variant: 'red',
};

Variants.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4', '5', '6'],
  },
  shape: {
    control: 'inline-radio',
    options: ['square', 'circle'],
  },
  variant: {
    control: 'inline-radio',
    options: ['gray', 'red', 'purple', 'blue', 'green', 'grass', 'amber', 'orange'],
  },
};

export const Fallback: ComponentStory<typeof Avatar> = (args) => (
  <Flex gap={3}>
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
  </Flex>
);

Fallback.args = {
  fallback: 'M',
  shape: 'circle',
  size: '4',
  variant: 'red',
};

Fallback.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4', '5', '6'],
  },
  shape: {
    control: 'inline-radio',
    options: ['square', 'circle'],
  },
  variant: {
    control: 'inline-radio',
    options: ['gray', 'red', 'purple', 'blue', 'green', 'grass', 'amber', 'orange'],
  },
  fallback: {
    control: 'string',
  },
};
