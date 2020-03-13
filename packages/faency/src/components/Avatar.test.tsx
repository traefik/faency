import React from 'react'
import { render } from '@testing-library/react'
import { Avatar } from './Avatar'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from '../theme'
import { theme as defaultDarkTheme } from '../dark-theme'

describe('Avatar component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Avatar src="" />
      </ThemeProvider>,
    )
  })

  test('renders without crashing on dark theme', () => {
    render(
      <ThemeProvider theme={defaultDarkTheme}>
        <Avatar src="" />
      </ThemeProvider>,
    )
  })

  test('should show initials when image cannot be loaded', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Avatar src="">Avatar Placeholder</Avatar>
      </ThemeProvider>,
    )

    expect(container.innerHTML).toContain('Avatar Placeholder')
  })
})
