import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import {
  Table,
  TableProps,
  TableVariants,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Caption,
  Tfoot,
} from './AriaTable';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { UnstyledLink } from '../Link';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const BaseTable = (props: TableProps): JSX.Element => <Table {...props} />;
const TableForStory = modifyVariantsForStory<TableVariants, TableProps>(BaseTable);

export default {
  title: 'Components/AriaTable',
  component: TableForStory,
} as ComponentMeta<typeof TableForStory>;

export const Basic: ComponentStory<any> = ({ transform, ...args }) => (
  <TableForStory aria-label="People" aria-describedby="basic-table-caption" {...args}>
    <Caption id="basic-table-caption" size="10">
      People with some information
    </Caption>
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
    <Tfoot>
      <Tr>
        <Td colSpan={4} css={{ textAlign: 'center' }}>
          <Button
            ghost
            variant="secondary"
            css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
          >
            Load more...
          </Button>
        </Td>
      </Tr>
    </Tfoot>
  </TableForStory>
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
    },
  },
};

export const Alignment: ComponentStory<any> = (args) => (
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
        <Td {...args}>Actor</Td>
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
);

Interactive.args = {
  interactive: true,
};

export const Links: ComponentStory<any> = (args) => (
  <TableForStory aria-label="Empty" aria-describedby="empty-table-caption" {...args}>
    <Caption id="empty-table-caption">Table with empty data</Caption>
    <Thead>
      <Tr>
        <Th>first name</Th>
        <Th>last name</Th>
        <Th>Status</Th>
        <Th>Role</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr interactive asChild>
        <UnstyledLink href="https://traefik.io">
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </UnstyledLink>
      </Tr>
    </Tbody>
  </TableForStory>
);

const Customize: ComponentStory<any> = (args) => (
  <TableForStory
    css={{ c: '$hiContrast' }}
    aria-label="People"
    aria-describedby="basic-table-caption"
    {...args}
  >
    <Caption css={{ c: '$hiContrast' }} id="basic-table-caption">
      People with some information
    </Caption>
    <Thead css={{ c: '$hiContrast' }}>
      <Tr css={{ c: '$hiContrast' }}>
        <Th css={{ c: '$hiContrast' }}>first name</Th>
        <Th>last name</Th>
        <Th>Status</Th>
        <Th>Role</Th>
      </Tr>
    </Thead>
    <Tbody css={{ c: '$hiContrast' }}>
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
    <Tfoot css={{ c: '$hiContrast' }}>
      <Tr>
        <Td css={{ textAlign: 'center' }}>
          <Button
            ghost
            variant="secondary"
            css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
          >
            Load more...
          </Button>
        </Td>
      </Tr>
    </Tfoot>
  </TableForStory>
);

export const Columns: ComponentStory<any> = ({ transform, ...args }) => (
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
    <Tfoot>
      <Tr>
        <Td colSpan={4} css={{ textAlign: 'center' }}>
          <Button
            ghost
            variant="secondary"
            css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
          >
            Load more...
          </Button>
        </Td>
      </Tr>
    </Tfoot>
  </TableForStory>
);
