import React from 'react'
import { render } from '@testing-library/react'
import { Heading } from './Heading'

describe('Heading component', () => {
  test('renders without crashing', () => {
    render(<Heading />)
  })
})
