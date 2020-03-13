import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flex } from './Flex'
import { Heading } from './Heading'
import { PropRender } from './PropRender'

storiesOf('Components|PropRender', module).add('default', () => (
  <>
    <Flex flexDirection="column" mb={2}>
      <Heading>Auto detected types from content</Heading>
      <span>
        String prop: <PropRender>value</PropRender>
      </span>
      <span>
        Number prop: <PropRender>123</PropRender>
      </span>
      <span>
        Boolean prop: <PropRender>true</PropRender>
      </span>
      <span>
        Color prop: <PropRender>blue</PropRender>
      </span>
    </Flex>

    <Flex flexDirection="column">
      <Heading>Explicit types</Heading>
      <span>
        Forced string prop: <PropRender string>123</PropRender>
      </span>
      <span>
        Forced Number prop: <PropRender number>NaN</PropRender>
      </span>
      <span>
        Forced Boolean prop: <PropRender boolean>bool</PropRender>
      </span>
      <span>
        Forced Color prop: <PropRender color>primary</PropRender>
      </span>
    </Flex>
  </>
))
