import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'

storiesOf('Components|Box', module).add('default', () => (
  <>
    <Box mb={4}>
      <Box sx={{ width: 120, height: 120, bg: 'blue' }} />
    </Box>
    <Box mb={4}>
      <Box p="4" sx={{ bg: 'black' }}>
        <Box sx={{ height: 50, bg: 'blue' }} mb="4" />
        <Box sx={{ height: 50, bg: 'blue' }} mb="4" />
        <Box sx={{ height: 50, bg: 'blue' }} />
      </Box>
    </Box>

    <Box sx={{ border: '4px solid', borderColor: 'reds.6', bg: 'reds.4', height: 50, padding: 1, margin: 4 }} />

    <Box my={4} sx={{ position: 'relative', width: '100%', height: '200px', bg: 'black' }}>
      <Box p={5} sx={{ bg: 'blue', position: 'absolute', top: '10px', left: '10px', zIndex: 1 }} />
      <Box p={5} sx={{ bg: 'blues.6', position: 'absolute', top: '15px', left: '15px' }} />
      Hello
    </Box>

    <Box my={4} p={4} sx={{ bg: 'black', color: 'blue' }}>
      Faency
    </Box>

    <Box sx={{ flexShrink: 0, flexGrow: 1, flexBasis: '100%' }}>Testing flex</Box>
  </>
))
