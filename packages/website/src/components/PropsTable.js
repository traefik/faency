import React from 'react'
import PropTypes from 'prop-types'
import { Box, Chip, Table, Thead, Tr, Th, Tbody, Td, Text, Heading } from '@containous/faency'
import { PropRender } from './PropRender'

export function PropsTable({ data, title = 'Props' }) {
  const hasProps = Object.keys(data).length > 0

  return (
    <Box mt={8} mb={7} overflow={['scroll', 'visible']} style={{ WebkitOverflowScrolling: 'touch' }}>
      <Heading as="h3" size={3} mt={45} mb={25}>
        {title}
      </Heading>
      {hasProps ? (
        <Box minWidth={['540px', '0']}>
          <Table>
            <Thead>
              <Tr>
                <Th>Prop</Th>
                <Th>Type</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(data).map(([key, value]) => {
                return (
                  <Tr key={key}>
                    <Td>
                      <Text>
                        <code variant="fade">{key}</code>
                      </Text>
                    </Td>
                    <Td>
                      <Chip variant="blue">{value.type}</Chip>
                    </Td>
                    <Td>
                      <Text>
                        {value.description}
                        {value.default && (
                          <Text>
                            {' '}
                            (Default: <PropRender type={value.defaultType}>{value.default}</PropRender>)
                          </Text>
                        )}
                      </Text>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <Text as="p">No props</Text>
      )}
    </Box>
  )
}

PropsTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    default: PropTypes.string,
    defaultType: PropTypes.string,
  }),
}
