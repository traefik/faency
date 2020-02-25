import React from 'react'
import { render } from '@testing-library/react'
import { FormMessage } from './FormMessage'

describe('FormMessage component', () => {
  test('renders without crashing', () => {
    render(<FormMessage message="Message" />)
  })
})
