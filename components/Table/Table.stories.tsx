import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Table, TableProps, TableVariants, Tbody, Td, Th, Thead, Tr, Tfoot, Caption } from './Table';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { Flex } from '../Flex';
import { Heading } from '../Heading';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { VisuallyHidden } from '../VisuallyHidden';

const BaseTable = (props: TableProps): JSX.Element => <Table {...props} />;
const TableForStory = modifyVariantsForStory<TableVariants, TableProps>(BaseTable);

export default {
  title: 'Components/Table',
  component: TableForStory,
} as ComponentMeta<typeof TableForStory>;

export const Basic: ComponentStory<any> = ({ transform, ...args }) => (
  <Card>
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


export const WithFooter: ComponentStory<any> = (args) => (
  <Card>
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
  </Card>
)

export const WithCaption: ComponentStory<any> = (args) => {
  const id = "described-heading"
  const title = 'Title not child of table'
  return (
    <>
      <Flex direction="column" gap="4">
        <Card>
          <TableForStory {...args}>
            <Caption>Caption child of table</Caption>
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
        </Card>
        <div>
          <Heading size="4" as="h1">
            {title}
          </Heading>
          <Card>
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
          </Card>
        </div>
        <div>
          <Heading id={id} size="4" as="h1">
            {title}
          </Heading>
          <Card>
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
          </Card>
        </div>
      </Flex>
    </>
  )
}