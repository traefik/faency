import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Li, Ol, Ul } from './List';

const Component: Meta<typeof Ul> = {
  title: 'Components/List',
  component: Ul,
};

const Template: StoryFn<typeof Ul> = (args) => (
  <Ul {...args}>
    <Li>Dashboard</Li>
    <Li>Profile</Li>
    <Li>Settings</Li>
    <Li>Help</Li>
  </Ul>
);

export const Basic: StoryFn<typeof Ul> = Template.bind({});

export const Checkboxes: StoryFn<typeof Ul> = (args) => (
  <Ul {...args}>
    <Li>
      <input type="checkbox" disabled />
      Dashboard
    </Li>
    <Li>
      <input type="checkbox" disabled />
      Profile
    </Li>
    <Li>
      <input type="checkbox" disabled />
      Settings
    </Li>
    <Li>
      <input type="checkbox" disabled />
      Help
    </Li>
  </Ul>
);

export const Ordered: StoryFn<typeof Ol> = (args) => (
  <Ol {...args}>
    <Li>Dashboard</Li>
    <Li>Profile</Li>
    <Li>Settings</Li>
    <Li>Help</Li>
  </Ol>
);

export const Interactive: StoryFn<typeof Ul> = Template.bind({});
Interactive.args = {
  interactive: true,
};

export const Users: StoryFn<typeof Ul> = (args) => (
  <Ul css={{ listStyleType: 'none' }} {...args}>
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

export const Controls: StoryFn<typeof Ul> = (args) => (
  <Ul css={{ listStyleType: 'none' }} {...args}>
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

export default Component;
