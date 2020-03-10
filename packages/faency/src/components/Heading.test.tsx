import React from 'react'
import { render } from '@testing-library/react'
import { Heading } from './Heading'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from '../theme'
import { theme as defaultDarkTheme } from '../dark-theme'

describe('Heading component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Heading />
      </ThemeProvider>,
    )
  })

  test('renders without crashing on dark theme', () => {
    render(
      <ThemeProvider theme={defaultDarkTheme}>
        <Heading />
      </ThemeProvider>,
    )
  })
})
