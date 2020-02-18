import React from 'react'
import { render } from '@testing-library/react'
import { Radio } from './Radio'

describe('Radio component', () => {
  test('renders without crashing', () => {
    render(<Radio />)
  })
})
