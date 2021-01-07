import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from 'react-eva-icons'
import { Box } from './Box'
import { Flex } from './Flex'
import { Input } from './Input'
import { theme } from '../theme'

storiesOf('Components|Input', module).add('default', () => (
  <Flex>
    <Box sx={{ width: '300px', mr: 2 }}>
      <Box mb="4">
        <Input placeholder="Normal input" />
      </Box>

      <Box mb="4" sx={{ position: 'relative' }}>
        <Input placeholder="input with icon on the right" type="email" paddingRight={5} />

        <Box sx={{ position: 'absolute', height: '100%', top: 0, right: 1, color: 'grays.4', pointerEvents: 'none' }}>
          <Flex sx={{ alignItems: 'center', height: '100%' }}>
            <Icon name="search" size="large" fill={theme.colors.grays[5]} />
          </Flex>
        </Box>
      </Box>

      <Box mb="4">
        <Input size={1} placeholder="size 1 input" />
      </Box>

      <Box mb="4" sx={{ position: 'relative' }}>
        <Input size={1} placeholder="size 1 input with icon" type="text" paddingLeft={5} />

        <Box sx={{ position: 'absolute', height: '100%', top: 0, left: 1, color: 'grays.4', pointerEvents: 'none' }}>
          <Flex sx={{ alignItems: 'center', height: '100%' }}>
            <Icon name="search" size="large" fill={theme.colors.grays[5]} />
          </Flex>
        </Box>
      </Box>

      <Box mb="4">
        <Input disabled placeholder="Disabled" />
      </Box>
      <Box mb="4">
        <Input readOnly value="Read only" />
      </Box>
      <Box mb="4">
        <Input error value="Error" />
      </Box>
    </Box>
  
    <Box sx={{ width: '300px', mr: 2 }}>
      <Box mb="4">
        <Input variant="shadow" placeholder="Normal input" />
      </Box>

      <Box mb="4" sx={{ position: 'relative' }}>
        <Input variant="shadow" placeholder="input with icon on the right" type="email" paddingRight={5} />

        <Box sx={{ position: 'absolute', height: '100%', top: 0, right: 1, color: 'grays.4', pointerEvents: 'none' }}>
          <Flex sx={{ alignItems: 'center', height: '100%' }}>
            <Icon name="search" size="large" fill={theme.colors.grays[5]} />
          </Flex>
        </Box>
      </Box>

      <Box mb="4">
        <Input variant="shadow" size={1} placeholder="size 1 input" />
      </Box>

      <Box mb="4" sx={{ position: 'relative' }}>
        <Input variant="shadow" size={1} placeholder="size 1 input with icon" type="text" paddingLeft={5} />

        <Box sx={{ position: 'absolute', height: '100%', top: 0, left: 1, color: 'grays.4', pointerEvents: 'none' }}>
          <Flex sx={{ alignItems: 'center', height: '100%' }}>
            <Icon name="search" size="large" fill={theme.colors.grays[5]} />
          </Flex>
        </Box>
      </Box>

      <Box mb="4">
        <Input variant="shadow" disabled placeholder="Disabled" />
      </Box>
      <Box mb="4">
        <Input variant="shadow" readOnly value="Read only" />
      </Box>
      <Box mb="4">
        <Input variant="shadow" error value="Error" />
      </Box>
    </Box>

    <Box sx={{ width: '300px' }}>
      <Box mb="4">
        <Input variant="ghost" placeholder="Normal input" />
      </Box>

      <Box mb="4" sx={{ position: 'relative' }}>
        <Input variant="ghost" placeholder="input with icon on the right" type="email" paddingRight={5} />

        <Box sx={{ position: 'absolute', height: '100%', top: 0, right: 1, color: 'grays.4', pointerEvents: 'none' }}>
          <Flex sx={{ alignItems: 'center', height: '100%' }}>
            <Icon name="search" size="large" fill={theme.colors.grays[5]} />
          </Flex>
        </Box>
      </Box>

      <Box mb="4">
        <Input variant="ghost" size={1} placeholder="size 1 input" />
      </Box>

      <Box mb="4" sx={{ position: 'relative' }}>
        <Input variant="ghost" size={1} placeholder="size 1 input with icon" type="text" paddingLeft={5} />

        <Box sx={{ position: 'absolute', height: '100%', top: 0, left: 1, color: 'grays.4', pointerEvents: 'none' }}>
          <Flex sx={{ alignItems: 'center', height: '100%' }}>
            <Icon name="search" size="large" fill={theme.colors.grays[5]} />
          </Flex>
        </Box>
      </Box>

      <Box mb="4">
        <Input variant="ghost" disabled placeholder="Disabled" />
      </Box>
      <Box mb="4">
        <Input variant="ghost" readOnly value="Read only" />
      </Box>
      <Box mb="4">
        <Input variant="ghost" error value="Error" />
      </Box>
    </Box>
  </Flex>
))
