import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { Flex } from './Flex'

storiesOf('Components|Flex', module).add('default', () => (
  <>
    <Box mb={4}>
      <Flex p="4" bg="black">
        <Box sx={{ flex: 1, height: 50, bg: 'blue' }} m="4" />
        <Box sx={{ flex: 1, height: 50, bg: 'blue' }} m="4" />
        <Box sx={{ flex: 1, height: 50, bg: 'blue' }} m="4" />
      </Flex>
    </Box>

    <Box mb={4}>
      <Flex p="4" sx={{ bg: 'black', flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 100%', height: 50, bg: 'blue' }} m="4" />
        <Box sx={{ flex: 1, height: 50, bg: 'blue' }} m="4" />
        <Box sx={{ flex: 1, height: 50, bg: 'blue' }} m="4" />
      </Flex>
    </Box>
  </>
))
