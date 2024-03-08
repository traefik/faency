import { Meta, StoryFn } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import {
  Table,
  TableProps,
  TableVariants,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tfoot,
  Caption,
} from './Table';
import { Badge } from '../Badge';
import { Flex } from '../Flex';
import { H1 } from '../Heading';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { VisuallyHidden } from '../VisuallyHidden';
import { Button } from '../Button';

import { VerticalAlignment as AriaTableStory } from '../AriaTable/AriaTable.stories';
import { Box } from '../Box';
import { Text } from '../Text';

const BaseTable = (props: TableProps): JSX.Element => <Table {...props} />;
const TableForStory = modifyVariantsForStory<TableVariants, TableProps>(BaseTable);

export default {
  title: 'Components/Table',
  component: TableForStory,
} as Meta<typeof TableForStory>;

export const Basic: StoryFn<any> = ({ transform, ...args }) => (
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

export const Alignment: StoryFn<any> = (args) => (
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

export const Interactive: StoryFn<any> = ({ interactive, ...args }) => {
  const [selectedRow, setSelectedRow] = useState(3);
  const makeSelectableRowProps = useCallback(
    (rowNum: number) => ({
      active: selectedRow === rowNum,
      onClick: () => setSelectedRow(rowNum),
    }),
    [selectedRow, setSelectedRow]
  );

  return (
    <Flex direction="column" gap="4">
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
          <Tr interactive={interactive} {...makeSelectableRowProps(5)}>
            <Td>John</Td>
            <Td>Doe</Td>
            <Td>
              <Badge variant="green">Connected</Badge>
            </Td>
            <Td subtle>Developer</Td>
          </Tr>
          <Tr interactive={interactive} {...makeSelectableRowProps(6)}>
            <Td>Johnny</Td>
            <Td>Depp</Td>
            <Td subtle>
              <Badge variant="orange">AFK</Badge>
            </Td>
            <Td subtle>Actor</Td>
          </Tr>
          <Tr interactive={interactive} {...makeSelectableRowProps(7)}>
            <Td>Natalie</Td>
            <Td>Portman</Td>
            <Td>
              <Badge variant="green">Connected</Badge>
            </Td>
            <Td subtle>Actor</Td>
          </Tr>
          <Tr interactive={interactive} {...makeSelectableRowProps(8)}>
            <Td>Luke</Td>
            <Td>Skywalker</Td>
            <Td>
              <Badge variant="red">Disconnected</Badge>
            </Td>
            <Td subtle>Star Wars</Td>
          </Tr>
        </Tbody>
      </TableForStory>
    </Flex>
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
  },
};
export const WithFooter: StoryFn<any> = (args) => (
  <TableForStory {...args}>
    <Thead>
      <Tr>
        <Th>Firstname</Th>
        <Th>Lastname</Th>
        <Th>Status</Th>
        <Th>Role</Th>
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
        <Td colSpan={2}>Footer information</Td>
        <Td colSpan={2}>Footer information</Td>
      </Tr>
    </Tfoot>
  </TableForStory>
);

export const WithCaption: StoryFn<any> = (args) => {
  const id = 'described-heading';
  const title = 'Title not child of table';
  return (
    <Flex direction="column" gap="4">
      <TableForStory {...args}>
        <Caption size="10">Caption child of table</Caption>
        <Thead>
          <Tr>
            <Th>Firstname</Th>
            <Th>Lastname</Th>
            <Th>Status</Th>
            <Th>Role</Th>
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
      <div>
        <H1>{title}</H1>
        <TableForStory {...args}>
          <VisuallyHidden asChild>
            <Caption>{title}</Caption>
          </VisuallyHidden>
          <Thead>
            <Tr>
              <Th>Firstname</Th>
              <Th>Lastname</Th>
              <Th>Status</Th>
              <Th>Role</Th>
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
      </div>
      <div>
        <H1 id={id}>{title}</H1>
        <TableForStory aria-describedby={id} {...args}>
          <Thead>
            <Tr>
              <Th>Firstname</Th>
              <Th>Lastname</Th>
              <Th>Status</Th>
              <Th>Role</Th>
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
      </div>
    </Flex>
  );
};

export const Empty: StoryFn<any> = (args) => (
  <Flex direction="column" gap="4">
    <TableForStory {...args}>
      <Thead />
      <Tbody />
      <Tfoot>
        <Tr>
          <Td colSpan={4}>Empty head and body</Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory {...args}>
      <Tfoot>
        <Tr>
          <Td colSpan={4}>No head, no body</Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory {...args}>
      <Tbody />
      <Tfoot>
        <Tr>
          <Td colSpan={4}>No head and empty body</Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory {...args}>
      <Thead />
      <Tfoot>
        <Tr>
          <Td colSpan={4}>Empty head and no body</Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory {...args}>
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
          <Td colSpan={4}>No head and filled body</Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory {...args}>
      <Thead />
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
          <Td colSpan={4}>Empty head and filled body</Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory {...args}>
      <Thead>
        <Tr>
          <Th>Firstname</Th>
          <Th>Lastname</Th>
          <Th>Status</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tfoot>
        <Tr>
          <Td colSpan={4}>Filled head and no body</Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory {...args}>
      <Thead>
        <Tr>
          <Th>Firstname</Th>
          <Th>Lastname</Th>
          <Th>Status</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tbody />
      <Tfoot>
        <Tr>
          <Td colSpan={4}>Filled head and empty body</Td>
        </Tr>
      </Tfoot>
    </TableForStory>
  </Flex>
);

const Customize: StoryFn<any> = (args) => (
  <TableForStory css={{ c: '$hiContrast' }} {...args}>
    <Thead css={{ c: '$hiContrast' }}>
      <Tr css={{ c: '$hiContrast' }}>
        <Th css={{ c: '$hiContrast' }}>Firstname</Th>
        <Th>Lastname</Th>
        <Th>Status</Th>
        <Th>Role</Th>
      </Tr>
    </Thead>
    <Tbody css={{ c: '$hiContrast' }}>
      <Tr css={{ c: '$hiContrast' }}>
        <Td css={{ c: '$hiContrast' }}>John</Td>
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
        <Td colSpan={4}>Footer information</Td>
      </Tr>
    </Tfoot>
  </TableForStory>
);

export const CollapsibleRow: StoryFn<any> = ({ interactive, ...args }) => {
  const [selectedRow, setSelectedRow] = useState(1);
  const makeSelectableRowProps = useCallback(
    (rowNum: number) => ({
      active: selectedRow === rowNum,
      onClick: () => setSelectedRow(rowNum),
    }),
    [selectedRow, setSelectedRow]
  );

  return (
    <Flex direction="column" gap="4">
      <TableForStory {...args}>
        <Thead>
          <Tr emptyFirstColumn tableHead>
            <Th>First name</Th>
            <Th>Last name</Th>
            <Th>Status</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr emptyFirstColumn interactive={interactive} {...makeSelectableRowProps(1)}>
            <Td>John</Td>
            <Td>Doe</Td>
            <Td>
              <Badge variant="green">Connected</Badge>
            </Td>
            <Td subtle>Developer</Td>
          </Tr>
          <Tr
            interactive={interactive}
            collapsedContent={
              <Text>
                This is an additional description of this row above. It could be anything.
              </Text>
            }
            collapsedContentColSpan={5}
            {...makeSelectableRowProps(2)}
          >
            <Td>Johnny</Td>
            <Td>Depp</Td>
            <Td subtle>
              <Badge variant="orange">AFK</Badge>
            </Td>
            <Td subtle>Actor</Td>
          </Tr>
          <Tr
            collapsedContent={<AriaTableStory />}
            collapsedContentColSpan={5}
            interactive={interactive}
            {...makeSelectableRowProps(3)}
          >
            <Td>Natalie</Td>
            <Td>Portman</Td>
            <Td>
              <Badge variant="green">Connected</Badge>
            </Td>
            <Td subtle>Actor</Td>
          </Tr>
        </Tbody>
      </TableForStory>
    </Flex>
  );
};

CollapsibleRow.args = {
  interactive: true,
  elevation: '1',
};
