import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Ul, Li, ListProps } from './List';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';

import { InfoCircledIcon } from '@radix-ui/react-icons';

export default {
  title: 'Components/List',
  component: Ul,
} as ComponentMeta<typeof Ul>;

const Template: ComponentStory<typeof Ul> = (args) => (
  <Ul {...args}>
    <Li>Dashboard</Li>
    <Li>Profile</Li>
    <Li>Settings</Li>
    <Li>Help</Li>
  </Ul>
);

const Customize: ComponentStory<typeof Ul> = (args) => (
  <Ul css={{ mt: '$1' }} {...args}>
    <Li css={{ color: '$hiContrast' }}>Dashboard</Li>
    <Li>Profile</Li>
    <Li>Settings</Li>
    <Li>Help</Li>
  </Ul>
);

export const Basic = Template.bind({});

export const Interactive = Template.bind({});
Interactive.args = {
  interactive: true,
};

export const Users: ComponentStory<typeof Ul> = (args) => (
  <Ul {...args}>
    <Li gap="3">
      <Avatar id="100" src="https://picsum.photos/100" />
      <Flex align="start" direction="column">
        <Text size="3">John Doe</Text>
        <Text size="1">john.doe@john.doe</Text>
      </Flex>
    </Li>
    <Li gap="3">
      <Avatar id="42" src="https://picsum.photos/42" />
      <Flex align="start" direction="column">
        <Text size="3">Jane Doe</Text>
        <Text size="1">jane.doe@jane.doe</Text>
      </Flex>
    </Li>
    <Li gap="3">
      <Avatar id="67" src="https://picsum.photos/67" />
      <Flex align="start" direction="column">
        <Text size="3">Doe Jane</Text>
        <Text size="1">doe.jane@doe.jane</Text>
      </Flex>
    </Li>
  </Ul>
);
Users.args = {
  interactive: true,
};

export const Controls: ComponentStory<typeof Ul> = (args) => (
  <Ul {...args}>
    <Li gap="3" controls={<Checkbox />}>
      <Avatar id="100" src="https://picsum.photos/100" />
      <Flex align="start" direction="column">
        <Text size="3">John Doe</Text>
        <Text size="1">john.doe@john.doe</Text>
      </Flex>
    </Li>
    <Li gap="3" controls={<Button variant="red">Delete</Button>}>
      <Avatar id="42" src="https://picsum.photos/42" />
      <Flex align="start" direction="column">
        <Text size="3">Jane Doe</Text>
        <Text size="1">jane.doe@jane.doe</Text>
      </Flex>
    </Li>
    <Li gap="3" controls={<InfoCircledIcon />}>
      <Avatar id="67" src="https://picsum.photos/67" />
      <Flex align="start" direction="column">
        <Text size="3">Doe Jane</Text>
        <Text size="1">doe.jane@doe.jane</Text>
      </Flex>
    </Li>
  </Ul>
);
Controls.args = {
  interactive: true,
};
