import React from 'react'
import { Heading as FaencyHeading, Text, code, Table, Thead, Tbody, Tr, Th, Td } from '@traefiklabs/faency'

export function APISection() {
  return (
    <>
      <Heading>Props</Heading>
      <Text size={3} color="gray.4" pb={4}>
        All components include the following props.
      </Text>

      <Table mb={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <code variant="fade">sx</code>
            </Td>
            <Td>Object</Td>
            <Td>Theme-aware styles</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">variant</code>
            </Td>
            <Td>String</Td>
            <Td>Applies a variant, if available</Td>
          </Tr>
        </Tbody>
      </Table>

      <Heading>Style Props</Heading>
      <Text size={3} color="gray.4">
        All components include the following style props.
      </Text>

      <Table mb={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>

            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <code variant="fade">margin</code>,<code variant="fade">m</code>
            </Td>
            <Td>Margin</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">marginTop</code>,<code variant="fade">mt</code>
            </Td>
            <Td>Margin top</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">marginRight</code>,<code variant="fade">mr</code>
            </Td>
            <Td>Margin right</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">marginBottom</code>,<code variant="fade">mb</code>
            </Td>
            <Td>Margin bottom</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">marginLeft</code>,<code variant="fade">ml</code>
            </Td>
            <Td>Margin left</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">marginX</code>,<code variant="fade">mx</code>
            </Td>
            <Td>Margin horizontal</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">marginY</code>,<code variant="fade">my</code>
            </Td>
            <Td>Margin vertical</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">padding</code>,<code variant="fade">p</code>
            </Td>
            <Td>Padding</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">paddingTop</code>,<code variant="fade">pt</code>
            </Td>
            <Td>Padding top</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">paddingRight</code>,<code variant="fade">pr</code>
            </Td>
            <Td>Padding right</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">paddingBottom</code>,<code variant="fade">pb</code>
            </Td>
            <Td>Padding bottom</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">paddingLeft</code>,<code variant="fade">pl</code>
            </Td>
            <Td>Padding left</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">paddingX</code>,<code variant="fade">px</code>
            </Td>
            <Td>Padding horizontal</Td>
          </Tr>
          <Tr>
            <Td>
              <code variant="fade">paddingY</code>,<code variant="fade">py</code>
            </Td>
            <Td>Padding vertical</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}

const Heading = props => <FaencyHeading as="h2" weight="medium" size={2} mt={8} mb={4} {...props} />
