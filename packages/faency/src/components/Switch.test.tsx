import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { Switch } from './Switch'
import { theme as defaultTheme } from '../theme'
import { theme as defaultDarkTheme } from '../dark-theme'

describe('Switch component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Switch />
      </ThemeProvider>,
    )
  })

  test('renders without crashing on dark theme', () => {
    render(
      <ThemeProvider theme={defaultDarkTheme}>
        <Switch />
      </ThemeProvider>,
    )
  })

  test('toggling the switch value onChange should be triggered', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Switch onChange={onChange} />
      </ThemeProvider>,
    )
    const switchElement = getByTestId('switch')
    fireEvent.click(switchElement)
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
