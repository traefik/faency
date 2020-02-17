import React from 'react'
import { render } from '@testing-library/react'
import { Text } from './Text'

describe('Text component', () => {
  test('renders without crashing', () => {
    render(<Text />)
  })
})
