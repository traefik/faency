import React from 'react'
import { Flex, Text, Provider as FaencyProvider, Switch } from '@traefiklabs/faency'
import useDarkMode from 'use-dark-mode'
import App from './App'

const Wrapper = props => {
  const darkMode = useDarkMode()

  return (
    <FaencyProvider useDarkTheme={darkMode.value}>
      <Flex
        ml={['-42px', 'inherit']}
        sx={{
          alignItems: 'center',
          position: ['absolute', 'absolute', 'fixed'],
          top: [0, 2],
          left: ['50%', 'inherit'],
          right: [null, 2],
          height: 49,
        }}
      >
        <Text mr={1} onClick={darkMode.toggle} style={{ cursor: 'default' }}>
          Dark Mode {darkMode.value ? 'On' : 'Off'}
        </Text>
        <Switch checked={darkMode.value} onChange={darkMode.toggle} />
      </Flex>
      <App {...props} />
    </FaencyProvider>
  )
}

export const wrapPageElement = props => <Wrapper {...props} />
