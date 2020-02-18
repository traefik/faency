import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { Heading } from './Heading'

storiesOf('Components|Heading', module).add('default', () => (
  <>
    <Box mb={6}>
      <Heading as="p" size={0}>
        Heading 0
      </Heading>
      <Heading as="p" size={0} fontWeight={500}>
        Heading 0
      </Heading>
    </Box>

    <Box mb={6}>
      <Heading as="p" size={1}>
        Heading 1
      </Heading>
      <Heading as="p" size={1} fontWeight={500}>
        Heading 1
      </Heading>
    </Box>

    <Box mb={6}>
      <Heading as="p" size={2}>
        Heading 2
      </Heading>
      <Heading as="p" size={2} fontWeight={500}>
        Heading 2
      </Heading>
    </Box>

    <Box mb={6}>
      <Heading as="p" size={3}>
        Heading 3
      </Heading>
      <Heading as="p" size={3} fontWeight={500}>
        Heading 3
      </Heading>
    </Box>

    <Box mb={6}>
      <Heading as="p" size={4}>
        Heading 4
      </Heading>
      <Heading as="p" size={4} fontWeight={500}>
        Heading 4
      </Heading>
    </Box>

    <Box mb={6}>
      <Heading as="p" size={5}>
        Heading 5
      </Heading>
      <Heading as="p" size={5} fontWeight={500}>
        Heading 5
      </Heading>
    </Box>

    <Box my={8}>
      <Box width={200}>
        <Heading size={1} mb="3" truncate title="Close the gap Close the gap Close the gap Close the gap">
          Close the gap Close the gap Close the gap Close the gap
        </Heading>
      </Box>
      <Heading fontWeight={500} mb="3" as="h2">
        Bold
      </Heading>
    </Box>
  </>
))
