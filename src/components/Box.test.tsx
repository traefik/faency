import React from 'react'
import { render } from '@testing-library/react'
import { Box } from './Box'

describe('Box component', () => {
  test('renders without crashing', () => {
    render(<Box />)
  })
})
