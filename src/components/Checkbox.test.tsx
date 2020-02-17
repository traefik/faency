import React from 'react'
import { render } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox component', () => {
  test('renders without crashing', () => {
    render(<Checkbox />)
  })
})
