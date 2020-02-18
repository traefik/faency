import React from 'react'
import { render } from '@testing-library/react'
import { Card } from './Card'

describe('Card component', () => {
  test('renders without crashing', () => {
    render(<Card />)
  })
})
