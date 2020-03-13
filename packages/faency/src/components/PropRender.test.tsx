import React from 'react'
import { render } from '@testing-library/react'
import { PropRender } from './PropRender'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from '../theme'
import { theme as defaultDarkTheme } from '../dark-theme'

describe('PropRender component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <PropRender>anything</PropRender>
      </ThemeProvider>,
    )
  })

  test('renders without crashing on dark theme', () => {
    render(
      <ThemeProvider theme={defaultDarkTheme}>
        <PropRender>anything</PropRender>
      </ThemeProvider>,
    )
  })
})
