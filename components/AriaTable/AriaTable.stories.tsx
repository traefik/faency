import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Table, TableProps, TableVariants, Tbody, Td, Th, Thead, Tr, Caption } from './AriaTable';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const BaseTable = (props: TableProps): JSX.Element => <Table {...props} />;
const TableForStory = modifyVariantsForStory<TableVariants, TableProps>(BaseTable);

export default {
  title: 'Components/AriaTable',
  component: TableForStory,
} as ComponentMeta<typeof TableForStory>;

export const Basic: ComponentStory<any> = ({ transform, ...args }) => (
  <Card>
    <TableForStory aria-label="People" aria-describedby="basic-table-caption" {...args}>
      <Caption id="basic-table-caption">People with some information</Caption>
      <Thead>
        <Tr>
          <Th transform={transform}>first name</Th>
          <Th transform={transform}>last name</Th>
          <Th transform={transform}>Status</Th>
          <Th transform={transform}>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td>Star wars</Td>
        </Tr>
      </Tbody>
    </TableForStory>
  </Card>
);

Basic.args = {
  transform: 'capitalize',
};
Basic.argTypes = {
  transform: {
    control: 'inline-radio',
    options: ['capitalize', 'capitalizeWords', 'uppercase', 'none'],
    mapping: {
      capitalize: 'capitalize',
      capitalizeWords: 'capitalizeWords',
      uppercase: 'uppercase',
      none: '',
    }
  },
};

export const Alignment: ComponentStory<any> = (args) => (
  <Card>
    <TableForStory>
      <Thead>
        <Tr>
          <Th {...args}>Firstname</Th>
          <Th {...args}>Lastname</Th>
          <Th {...args}>Status</Th>
          <Th {...args}>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td {...args}>John</Td>
          <Td {...args}>Doe</Td>
          <Td {...args}>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td {...args}>Developer</Td>
        </Tr>
        <Tr>
          <Td {...args}>Johny</Td>
          <Td {...args}>Depp</Td>
          <Td {...args}>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td {...args}>Natalie</Td>
          <Td {...args}>Portman</Td>
          <Td {...args}>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td {...args}>Actor</Td>
        </Tr>
        <Tr>
          <Td {...args}>Luke</Td>
          <Td {...args}>Skywalker</Td>
          <Td {...args}>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td {...args}>Star wars</Td>
        </Tr>
      </Tbody>
    </TableForStory>
  </Card>
);

Alignment.argTypes = {
  align: {
    control: 'inline-radio',
    options: ['start', 'center', 'end'],
  },
};

Alignment.args = {
  align: 'start',
};

export const Interactive: ComponentStory<any> = (args) => (
  <Card>
    <TableForStory>
      <Thead>
        <Tr>
          <Th>Firstname</Th>
          <Th>Lastname</Th>
          <Th>Status</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr {...args}>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr {...args}>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr {...args} active>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr {...args}>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td>Star Wars</Td>
        </Tr>
      </Tbody>
    </TableForStory>
  </Card>
);

Interactive.args = {
  interactive: true,
};