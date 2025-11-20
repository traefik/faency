import { Meta, StoryFn } from '@storybook/react-vite';
import React, { useCallback, useState } from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Image } from '../Image';
import { UnstyledLink } from '../Link';
import { Text } from '../Text';
import {
  AriaTableProps,
  AriaTableVariants,
  Caption,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from './AriaTable';

const BaseTable = (props: AriaTableProps): JSX.Element => <Table {...props} />;
const TableForStory = modifyVariantsForStory<AriaTableVariants, AriaTableProps>(BaseTable);

const Component: Meta<typeof TableForStory> = {
  title: 'Components/AriaTable',
  component: TableForStory,
};

export const Basic: StoryFn<any> = ({ transform, ...args }) => (
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
        <Td fullColSpan aria-colspan={4} css={{ textAlign: 'center' }}>
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

export const Alignment: StoryFn<any> = (args) => (
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

export const Interactive: StoryFn<any> = (args) => {
  const [selectedRow, setSelectedRow] = useState(3);
  const makeSelectableRowProps = useCallback(
    (rowNum: number) => ({
      active: selectedRow === rowNum,
      onClick: () => setSelectedRow(rowNum),
    }),
    [selectedRow, setSelectedRow],
  );

  return (
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
        <Tr {...args} {...makeSelectableRowProps(1)}>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr {...args} {...makeSelectableRowProps(2)}>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr {...args} {...makeSelectableRowProps(3)}>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr {...args} {...makeSelectableRowProps(4)}>
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
};

Interactive.args = {
  interactive: true,
};

export const Links: StoryFn<any> = (args) => (
  <Table hasCollapsibleChildren aria-label="Empty" aria-describedby="empty-table-caption" {...args}>
    <Caption id="empty-table-caption">Table with empty data</Caption>
    <Thead>
      <Tr emptyFirstColumn tableHead>
        <Th>first name</Th>
        <Th>last name</Th>
        <Th>Status</Th>
        <Th>Role</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr
        interactive
        asChild
        collapsedContent={
          <Flex>
            <Text>Additional description for this row.</Text>
          </Flex>
        }
      >
        <UnstyledLink href="https://traefik.io" target="_blank">
          <Td>Johnny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </UnstyledLink>
      </Tr>
      <Tr emptyFirstColumn interactive asChild>
        <UnstyledLink href="https://traefik.io" target="_blank">
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Admin</Td>
        </UnstyledLink>
      </Tr>
      <Tr interactive asChild collapsedContent={<VerticalAlignment />}>
        <UnstyledLink href="https://traefik.io" target="_blank">
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="red">Offline</Badge>
          </Td>
          <Td>Developer</Td>
        </UnstyledLink>
      </Tr>
    </Tbody>
  </Table>
);

export const Columns: StoryFn<any> = ({ transform, ...args }) => (
  <Flex direction="column" gap="4">
    <TableForStory aria-label="People" aria-describedby="basic-table-caption" {...args}>
      <Caption size="10" id="basic-table-caption">
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
          <Td fullColSpan aria-colspan={4} css={{ textAlign: 'center' }}>
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
    <TableForStory aria-label="People" aria-describedby="basic-table-caption" {...args}>
      <Caption size="10" id="basic-table-caption">
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
          <Td css={{ textAlign: 'left' }}>
            <Button
              ghost
              variant="secondary"
              css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
            >
              One
            </Button>
          </Td>
          <Td css={{ textAlign: 'left' }}>
            <Button
              ghost
              variant="secondary"
              css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
            >
              Two
            </Button>
          </Td>
          <Td css={{ textAlign: 'left' }}>
            <Button
              ghost
              variant="secondary"
              css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
            >
              Three
            </Button>
          </Td>
          <Td css={{ textAlign: 'left' }}>
            <Button
              ghost
              variant="secondary"
              css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
            >
              Four
            </Button>
          </Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory
      css={{ tableLayout: 'auto' }}
      aria-label="People"
      aria-describedby="basic-table-caption"
      {...args}
    >
      <Caption size="10" id="basic-table-caption">
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
          <Td fullColSpan aria-colspan={4} css={{ textAlign: 'center' }}>
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
  </Flex>
);

const FlexIssue = () => (
  <Flex align="center" justify="center">
    <Image src="https://picsum.photos/38/38" />
  </Flex>
);

export const VerticalAlignment: StoryFn<any> = () => (
  <TableForStory>
    <Thead>
      <Tr>
        <Th>Flex issue column</Th>
        <Th>Column</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>
          <FlexIssue />
        </Td>
        <Td>
          <Flex align="center" justify="center">
            <Text>Cell</Text>
          </Flex>
        </Td>
      </Tr>
    </Tbody>
  </TableForStory>
);

export const CollapsibleRow: StoryFn<any> = (args) => {
  const [selectedRow, setSelectedRow] = useState(3);
  const makeSelectableRowProps = useCallback(
    (rowNum: number) => ({
      active: selectedRow === rowNum,
      onClick: () => setSelectedRow(rowNum),
    }),
    [selectedRow, setSelectedRow],
  );

  return (
    <Table hasCollapsibleChildren>
      <Thead>
        <Tr emptyFirstColumn tableHead>
          <Th>Firstname</Th>
          <Th>Lastname</Th>
          <Th>Status</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr emptyFirstColumn {...makeSelectableRowProps(1)} {...args}>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr
          collapsedContent={
            <Flex>
              <Text>Additional description.</Text>
            </Flex>
          }
          {...makeSelectableRowProps(2)}
          {...args}
        >
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr collapsedContent={<VerticalAlignment />} {...args} {...makeSelectableRowProps(3)}>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

CollapsibleRow.args = {
  interactive: true,
};

export default Component;
