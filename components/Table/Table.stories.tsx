import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { Table, TableProps, TableVariants, Tbody, Td, Th, Thead, Tr, Tfoot, Caption } from './Table';
import { Badge } from '../Badge';
import { Flex } from '../Flex';
import { Heading } from '../Heading';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { VisuallyHidden } from '../VisuallyHidden';
import { Button } from '../Button';

const BaseTable = (props: TableProps): JSX.Element => <Table {...props} />;
const TableForStory = modifyVariantsForStory<TableVariants, TableProps>(BaseTable);

export default {
  title: 'Components/Table',
  component: TableForStory,
} as ComponentMeta<typeof TableForStory>;

export const Basic: ComponentStory<any> = ({ transform, ...args }) => (
  <TableForStory {...args}>
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
        <Td>Johnny</Td>
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
        <Th {...args}>First name</Th>
        <Th {...args}>Last name</Th>
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
        <Td {...args}>Johnny</Td>
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

export const Interactive: ComponentStory<any> = ({ interactive, ...args }) => {
  const [selectedRow, setSelectedRow] = useState(3);
  const makeSelectableRowProps = useCallback(
    (rowNum: number) => ({
      active: selectedRow === rowNum,
      onClick: () => setSelectedRow(rowNum),
    }),
    [selectedRow, setSelectedRow]
  );

  return (
    <TableForStory {...args}>
      <Thead>
        <Tr>
          <Th>First name</Th>
          <Th>Last name</Th>
          <Th>Status</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr interactive={interactive} {...makeSelectableRowProps(1)}>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td subtle>Developer</Td>
        </Tr>
        <Tr interactive={interactive} {...makeSelectableRowProps(2)}>
          <Td>Johnny</Td>
          <Td>Depp</Td>
          <Td subtle>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td subtle>Actor</Td>
        </Tr>
        <Tr interactive={interactive} {...makeSelectableRowProps(3)}>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td subtle>Actor</Td>
        </Tr>
        <Tr interactive={interactive} {...makeSelectableRowProps(4)}>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td subtle>Star Wars</Td>
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
};

Interactive.args = {
  interactive: true,
  elevation: '1',
};

Interactive.argTypes = {
  elevation: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4', '5'],
  }
}
export const WithFooter: ComponentStory<any> = (args) => (
  <TableForStory {...args}>
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
        <Td colSpan={4}>
          Footer information
        </Td>
      </Tr>
    </Tfoot>
  </TableForStory>
)

export const WithCaption: ComponentStory<any> = (args) => {
  const id = "described-heading"
  const title = 'Title not child of table'
  return (
    <>
      <Flex direction="column" gap="4">
        <TableForStory {...args}>
          <Caption size="10">Caption child of table</Caption>
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
        <div>
          <Heading size="4" as="h1">
            {title}
          </Heading>
          <TableForStory {...args}>
            <VisuallyHidden asChild>
              <Caption>{title}</Caption>
            </VisuallyHidden>
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
        </div>
        <div>
          <Heading id={id} size="4" as="h1">
            {title}
          </Heading>
          <TableForStory aria-describedby={id} {...args}>
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
        </div>
      </Flex>
    </>
  )
}