import React from 'react'
import { render } from '@testing-library/react'
import { Tooltip } from './Tooltip'

describe('Tooltip component', () => {
  test('renders without crashing', () => {
    render(<Tooltip label="Some contextual message">Some content with a tooltip</Tooltip>)
  })
})
