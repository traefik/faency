import React, { useState } from 'react'
import { render } from '@testing-library/react'
import { ToggleButton } from './ToggleButton'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from '../theme'
import { theme as defaultDarkTheme } from '../dark-theme'
import { Flex } from '../components/Flex'

const Component: React.FC = () => {
  const [value, setValue] = useState<string>('center')

  return (
    <Flex>
      {value}
      <ToggleButton
        onToggle={(): void => {
          console.log('setValue left')
          setValue('left')
        }}
        isToggled={value === 'left'}
      >
        Left
      </ToggleButton>
      <ToggleButton
        onToggle={(): void => {
          console.log('setValue center')
          setValue('center')
        }}
        isToggled={value === 'center'}
      >
        Center
      </ToggleButton>
      <ToggleButton
        onToggle={(): void => {
          console.log('setValue right')
          setValue('right')
        }}
        isToggled={value === 'right'}
      >
        Right
      </ToggleButton>
    </Flex>
  )
}

describe('ToggleButton component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Component />
      </ThemeProvider>,
    )
  })

  test('renders without crashing on dark theme', () => {
    render(
      <ThemeProvider theme={defaultDarkTheme}>
        <Component />
      </ThemeProvider>,
    )
  })
})
