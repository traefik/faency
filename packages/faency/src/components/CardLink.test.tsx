import React from 'react'
import { render } from '@testing-library/react'
import { CardLink } from './CardLink'

describe('CardLink component', () => {
  test('renders without crashing', () => {
    render(<CardLink />)
  })
})
