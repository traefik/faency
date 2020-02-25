import React from 'react'
import { render } from '@testing-library/react'
import { FormError } from './FormError'

describe('FormError component', () => {
  test('renders without crashing', () => {
    render(<FormError message="Message" />)
  })
})
