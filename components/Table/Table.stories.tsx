import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Table, TableForStory, Tbody, Td, Th, Thead, Tr} from './Table';
import {Badge} from "../Badge";
import {Card} from "../Card";

export default {
  title: 'Components/Table',
  component: TableForStory,
} as ComponentMeta<typeof TableForStory>;

export const Basic: ComponentStory<typeof TableForStory> = (args) => (
  <Card>
    <Table {...args}>
      <Thead>
        <Th>Firstname</Th>
        <Th>Lastname</Th>
        <Th>Status</Th>
        <Th>Role</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td><Badge variant="green">Connected</Badge></Td>
          <Td>Developer</Td>
        </Tr>
        <Tr>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td><Badge variant="orange">AFK</Badge></Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td><Badge variant="green">Connected</Badge></Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td><Badge variant="red">Disconnected</Badge></Td>
          <Td>Star wars</Td>
        </Tr>
      </Tbody>
    </Table>
  </Card>
);

export const Alignment: ComponentStory<any> = (args) => (
  <Card>
    <Table>
      <Thead>
        <Th {...args}>Firstname</Th>
        <Th {...args}>Lastname</Th>
        <Th {...args}>Status</Th>
        <Th {...args}>Role</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td {...args}>John</Td>
          <Td {...args}>Doe</Td>
          <Td {...args}><Badge variant="green">Connected</Badge></Td>
          <Td {...args}>Developer</Td>
        </Tr>
        <Tr>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td><Badge variant="orange">AFK</Badge></Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td><Badge variant="green">Connected</Badge></Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td><Badge variant="red">Disconnected</Badge></Td>
          <Td>Star wars</Td>
        </Tr>
      </Tbody>
    </Table>
  </Card>
);

Alignment.argTypes = {
  align: {
    control: 'inline-radio',
    options: ['start', 'center', 'end']
  }
};

Alignment.args = {
  align: 'start'
}

export const Interactive: ComponentStory<any> = (args) => (
  <Card>
    <Table>
      <Thead>
        <Th>Firstname</Th>
        <Th>Lastname</Th>
        <Th>Status</Th>
        <Th>Role</Th>
      </Thead>
      <Tbody>
        <Tr {...args}>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td><Badge variant="green">Connected</Badge></Td>
          <Td>Developer</Td>
        </Tr>
        <Tr {...args}>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td><Badge variant="orange">AFK</Badge></Td>
          <Td>Actor</Td>
        </Tr>
        <Tr {...args} active>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td><Badge variant="green">Connected</Badge></Td>
          <Td>Actor</Td>
        </Tr>
        <Tr {...args}>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td><Badge variant="red">Disconnected</Badge></Td>
          <Td>Star Wars</Td>
        </Tr>
      </Tbody>
    </Table>
  </Card>
);

Interactive.args = {
  interactive: true
}