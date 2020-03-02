import React from 'react'
import { Box, Button, Provider as FaencyProvider } from '@containous/faency'
import useDarkMode from 'use-dark-mode'
import App from './App'

const Wrapper = props => {
  const darkMode = useDarkMode()

  return (
    <FaencyProvider useDarkTheme={darkMode.value}>
      <Box position={('absolute', 'absolute', 'fixed')} top={[70, 2]} right={['6px', 2]}>
        <Button size={1} onClick={darkMode.toggle}>
          {darkMode.value ? 'light' : 'dark'}
        </Button>
      </Box>
      <App {...props} />
    </FaencyProvider>
  )
}

export const wrapPageElement = props => <Wrapper {...props} />
