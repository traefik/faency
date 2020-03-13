import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { Heading } from './Heading'
import { PropRender } from './PropRender'

storiesOf('Components|PropRender', module).add('default', () => (
  <>
    <Box mb={2}>
      <Heading>Auto detected types from content</Heading>
      <Box>
        String prop: <PropRender>value</PropRender>
      </Box>
      <Box>
        Number prop: <PropRender>123</PropRender>
      </Box>
      <Box>
        Boolean prop: <PropRender>true</PropRender>
      </Box>
      <Box>
        Color prop: <PropRender>blue</PropRender>
      </Box>
    </Box>

    <Box>
      <Heading>Explicit types</Heading>
      <Box>
        Forced string prop: <PropRender string>123</PropRender>
      </Box>
      <Box>
        Forced Number prop: <PropRender number>NaN</PropRender>
      </Box>
      <Box>
        Forced Boolean prop: <PropRender bool>bool</PropRender>
      </Box>
      <Box>
        Forced Color prop: <PropRender color>primary</PropRender>
      </Box>
    </Box>
  </>
))
