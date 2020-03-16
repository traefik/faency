import React from 'react'
import { Flex, Text, Provider as FaencyProvider, Switch } from '@containous/faency'
import useDarkMode from 'use-dark-mode'
import App from './App'

const Wrapper = props => {
  const darkMode = useDarkMode(false)

  return (
    <FaencyProvider useDarkTheme={darkMode.value}>
      <Flex
        position={('absolute', 'absolute', 'fixed')}
        top={[0, 2]}
        left={['50%', 'inherit']}
        right={[null, 2]}
        height={49}
        ml={['-42px', 'inherit']}
        alignItems="center"
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
