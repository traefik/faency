import React from 'react'
import { render, getByPlaceholderText } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from '../theme'
import { theme as defaultDarkTheme } from '../dark-theme'
import { InputTags } from './InputTags'

describe('InputTags component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <InputTags />
      </ThemeProvider>,
    )
  })

  test('renders without crashing on dark theme', () => {
    render(
      <ThemeProvider theme={defaultDarkTheme}>
        <InputTags />
      </ThemeProvider>,
    )
  })

  test('should show tags when provided', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <InputTags tags={['Sample 1', 'Sample 2', 'Sample 3']} />
      </ThemeProvider>,
    )

    expect(container.innerHTML).toContain('Sample 1')
    expect(container.innerHTML).toContain('Sample 2')
    expect(container.innerHTML).toContain('Sample 3')
  })

  test('should show options when provided and input focused', () => {
    const { container, getByPlaceholderText } = render(
      <ThemeProvider theme={defaultTheme}>
        <InputTags placeholder="input-tags" options={['Option 1', 'Option 2', 'Option 3']} />
      </ThemeProvider>,
    )

    expect(container.innerHTML).not.toContain('Option 1')
    expect(container.innerHTML).not.toContain('Option 2')
    expect(container.innerHTML).not.toContain('Option 3')

    const inputTagsInstance = getByPlaceholderText('input-tags')

    inputTagsInstance.click()

    expect(container.innerHTML).toContain('Option 1')
    expect(container.innerHTML).toContain('Option 2')
    expect(container.innerHTML).toContain('Option 3')
  })
})
