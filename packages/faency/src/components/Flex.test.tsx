import React from 'react'
import { render } from '@testing-library/react'
import { Flex } from './Flex'

describe('Flex component', () => {
  test('renders without crashing', () => {
    render(<Flex />)
  })
})
