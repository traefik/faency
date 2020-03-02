import React from 'react'
import PropTypes from 'prop-types'
import { Box, Table, Tr, Tbody, Td, Thead, Th, Text, Heading } from '@containous/faency'

export function SystemPropsTable({ props: systemProps }) {
  return (
    <Box mt={8} mb={7}>
      <Heading as="h3" size={3} mt={45} mb={25}>
        System props
      </Heading>
      <Box my={4}>
        <Table>
          <Thead>
            <Tr>
              <Th>Prop</Th>
            </Tr>
          </Thead>
          <Tbody>
            {systemProps.sort().map(prop => (
              <Tr key={prop}>
                <Td>
                  <Text>
                    <code>{prop}</code>
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

SystemPropsTable.propTypes = {
  props: PropTypes.object,
}
