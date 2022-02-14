import React, { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Toolbar, ToolbarButton, ToolbarLink, ToolbarSeparator } from './Toolbar';
import { Button } from '../Button';
import { Link } from '../Link';
import { VariantProps, styled } from '../../stitches.config'
import { Avatar } from '../Avatar';
import { Label } from '../Label';
import { Flex } from '../Flex';
import { Text } from '../Text';

export default {
  title: 'Components/Toolbar',
  component: Toolbar,
} as ComponentMeta<typeof Toolbar>;

interface ToolbarProps extends Omit<ComponentProps<typeof Toolbar>, 'css'>, VariantProps<typeof Toolbar> { }

const ToolbarBase: (props: ToolbarProps) => JSX.Element = (props) => <Toolbar {...props} />

export const Basic: ComponentStory<typeof ToolbarBase> = (args) => (
  <Toolbar {...args}>
    <Flex align="center" gap="2" css={{ ml: '$2' }}>
      <Avatar id="basic" src="https://picsum.photos/100" shape="square" />
      <Label htmlFor='basic'>Picsum photo #100</Label>
    </Flex>
    <Flex css={{ flexGrow: 1 }} />
    <ToolbarLink asChild>
      <Link href="#">See original</Link>
    </ToolbarLink>
    <ToolbarSeparator />
    <ToolbarButton asChild>
      <Button>Download</Button>
    </ToolbarButton>
    <ToolbarButton asChild>
      <Button>Share</Button>
    </ToolbarButton>
    <ToolbarButton asChild>
      <Button>Delete</Button>
    </ToolbarButton>
  </Toolbar>
);

Basic.args = {
  direction: 'row',
  justify: 'end',
  align: 'center',
  orientation: 'horizontal',
  gap: '2',
};

const ListItem = styled(Flex, {
  borderRadius: '$3',
  p: '$2',
});

export const List: ComponentStory<typeof ToolbarBase> = (args) => (
  <Toolbar {...args}>
    <ToolbarButton elevation="1" asChild>
      <ListItem gap="3">
        <Avatar id="100" src="https://picsum.photos/100" />
        <Flex direction="column">
          <Text>John Doe</Text>
          <Text>john.doe@john.doe</Text>
        </Flex>
      </ListItem>
    </ToolbarButton>
    <ToolbarButton elevation="1" asChild>
      <ListItem gap="3">
        <Avatar id="42" src="https://picsum.photos/42" />
        <Flex direction="column">
          <Text>Jane Doe</Text>
          <Text>jane.doe@jane.doe</Text>
        </Flex>
      </ListItem>
    </ToolbarButton>
    <ToolbarButton elevation="1" asChild>
      <ListItem gap="3">
        <Avatar id="67" src="https://picsum.photos/67" />
        <Flex direction="column">
          <Text>Doe Jane</Text>
          <Text>doe.jane@doe.jane</Text>
        </Flex>
      </ListItem>
    </ToolbarButton>
    <ToolbarButton elevation="1" asChild>
      <ListItem gap="3">
        <Avatar id="31" src="https://picsum.photos/31" />
        <Flex direction="column">
          <Text>Doe John</Text>
          <Text>doe.john@doe.john</Text>
        </Flex>
      </ListItem>
    </ToolbarButton>
  </Toolbar>
);

List.args = {
  elevation: 0,
  orientation: 'vertical',
  gap: '2',
}