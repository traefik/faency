import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from '../theme'
import { theme as defaultDarkTheme } from '../dark-theme'
import { Autocomplete } from './Autocomplete'

describe('Autocomplete component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Autocomplete />
      </ThemeProvider>,
    )
  })

  test('renders without crashing on dark theme', () => {
    render(
      <ThemeProvider theme={defaultDarkTheme}>
        <Autocomplete />
      </ThemeProvider>,
    )
  })

  test('should show tags when provided', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Autocomplete tags={['Sample 1', 'Sample 2', 'Sample 3']} />
      </ThemeProvider>,
    )

    expect(container.innerHTML).toContain('Sample 1')
    expect(container.innerHTML).toContain('Sample 2')
    expect(container.innerHTML).toContain('Sample 3')
  })

  test('should show options when provided and input focused', () => {
    const { container, getByPlaceholderText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Autocomplete placeholder="input-tags" options={['Option 1', 'Option 2', 'Option 3']} />
      </ThemeProvider>,
    )

    expect(container.innerHTML).not.toContain('Option 1')
    expect(container.innerHTML).not.toContain('Option 2')
    expect(container.innerHTML).not.toContain('Option 3')

    const AutocompleteInstance = getByPlaceholderText('input-tags')

    AutocompleteInstance.click()

    expect(container.innerHTML).toContain('Option 1')
    expect(container.innerHTML).toContain('Option 2')
    expect(container.innerHTML).toContain('Option 3')
  })
})
