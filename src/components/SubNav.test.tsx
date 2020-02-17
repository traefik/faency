import React from 'react'
import { render } from '@testing-library/react'
import { SubNav } from './SubNav'

describe('SubNav component', () => {
  test('renders without crashing', () => {
    render(<SubNav />)
  })
})
