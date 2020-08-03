import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AvatarLink } from './AvatarLink'
import { ThemeProvider } from 'styled-components'
import { theme as defaultDarkTheme } from '../dark-theme'
import { theme as defaultTheme } from '../theme'
import 'jest-styled-components'

describe('AvatarLink component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <AvatarLink src="" href="#" />
      </ThemeProvider>,
    )
  })

  test('renders without crashing on dark theme', () => {
    render(
      <ThemeProvider theme={defaultDarkTheme}>
        <AvatarLink src="" href="#" />
      </ThemeProvider>,
    )
  })

  test('should show initials when image cannot be loaded', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AvatarLink src="" href="#">
          AvatarLink Placeholder
        </AvatarLink>
      </ThemeProvider>,
    )

    expect(container.innerHTML).toContain('AvatarLink Placeholder')
  })

  test('should have right style on hover', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AvatarLink src="" href="#" data-testid="avatar-link">
          AvatarLink Placeholder
        </AvatarLink>
      </ThemeProvider>,
    )

    const Elem = getByTestId('avatar-link')
    fireEvent.mouseOver(Elem)
    expect(Elem).toHaveStyleRule('cursor', 'pointer', { modifier: ':hover' })
  })
})
