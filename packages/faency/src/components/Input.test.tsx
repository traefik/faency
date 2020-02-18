import React from 'react'
import { render } from '@testing-library/react'
import { Input } from './Input'

describe('Input component', () => {
  test('renders without crashing', () => {
    render(<Input />)
  })
})
