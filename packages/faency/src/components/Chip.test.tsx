import React from 'react'
import { render } from '@testing-library/react'
import { Chip } from './Chip'

describe('Chip component', () => {
  test('renders without crashing', () => {
    render(<Chip />)
  })
})
