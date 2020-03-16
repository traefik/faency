import React from 'react'
import { render } from '@testing-library/react'
import { FormMessage } from './FormMessage'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from '../theme'
import { theme as defaultDarkTheme } from '../dark-theme'

const Component: React.FC = () => <FormMessage message="Message" variant="error" />

describe('FormMessage component', () => {
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
