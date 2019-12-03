import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from './Box';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from './Table';

storiesOf('Components|Table', module).add('default', () => (
  <>
    <Box maxWidth="300px" mb={4}>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Default</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>size</Td>
            <Td>boolean</Td>
            <Td>3</Td>
            <Td>font size</Td>
          </Tr>
          <Tr>
            <Td>size</Td>
            <Td>boolean</Td>
            <Td>3</Td>
            <Td>font size</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <td colSpan={100}>Table footer</td>
          </Tr>
        </Tfoot>
      </Table>
    </Box>

    <Box maxWidth="100%" width="100%" overflow="auto">
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Default</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>size</Td>
            <Td>boolean</Td>
            <Td>3</Td>
            <Td>font size</Td>
          </Tr>
          <Tr>
            <Td>size</Td>
            <Td>boolean</Td>
            <Td>3</Td>
            <Td>font size</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <td colSpan={100}>Table footer</td>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  </>
));