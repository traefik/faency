import React from 'react'
import { render } from '@testing-library/react'
import { Card } from './Card'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from '../theme'
import { theme as defaultDarkTheme } from '../dark-theme'

describe('Card component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Card />
      </ThemeProvider>,
    )
  })

  test('renders without crashing on dark theme', () => {
    render(
      <ThemeProvider theme={defaultDarkTheme}>
        <Card />
      </ThemeProvider>,
    )
  })
})
