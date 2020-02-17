import React from 'react'
import { storiesOf } from '@storybook/react'
import { Radio } from './Radio'
import { Flex } from './Flex'
import { Text } from './Text'

storiesOf('Components|Radio', module).add('default', () => (
  <>
    <Flex flexDirection="column" mb={2}>
      <label>
        <Radio name="direction" />
        <Text ml={1}>Up</Text>
      </label>
      <label>
        <Radio name="direction" />
        <Text ml={1}>Down</Text>
      </label>
    </Flex>
    <Flex>
      <Radio name="nolabel" />
      <Radio name="nolabel" />
      <Radio name="nolabel" />
    </Flex>
  </>
))
