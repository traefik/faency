import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from 'react-eva-icons'
import { Box } from './Box'
import { Flex } from './Flex'
import { Input } from './Input'
import { theme } from '../theme'

storiesOf('Components|Input', module).add('default', () => (
  <Box maxWidth="300px">
    <Box mb="4">
      <Input placeholder="Normal input" />
    </Box>

    <Box mb="4" position="relative">
      <Input placeholder="input with icon on the right" type="email" paddingRight={5} />

      <Box position="absolute" height="100%" top={0} right={1} color="grays.4" style={{ pointerEvents: 'none' }}>
        <Flex alignItems="center" height="100%">
          <Icon name="search" size="large" fill={theme.colors.grays[5]} />
        </Flex>
      </Box>
    </Box>

    <Box mb="4">
      <Input size={1} placeholder="size 1 input" />
    </Box>

    <Box mb="4" position="relative">
      <Input size={1} placeholder="size 1 input with icon" type="text" paddingLeft={5} />

      <Box position="absolute" height="100%" top={0} left={1} color="grays.4" style={{ pointerEvents: 'none' }}>
        <Flex alignItems="center" height="100%">
          <Icon name="search" size="large" fill={theme.colors.grays[5]} />
        </Flex>
      </Box>
    </Box>

    <Box mb="4">
      <Input variant="ghost" placeholder="Ghost input" />
    </Box>

    <Box mb="4">
      <Input variant="ghost" size={1} placeholder="Ghost input" />
    </Box>

    <Box mb="4">
      <Input disabled placeholder="Disabled" />
    </Box>
    <Box mb="4">
      <Input readOnly value="Read only" />
    </Box>
  </Box>
))
