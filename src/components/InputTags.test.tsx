import React from 'react'
import { render } from '@testing-library/react'
import { InputTags } from './InputTags'

describe('InputTags component', () => {
  test('renders without crashing', () => {
    render(<InputTags />)
  })
})
