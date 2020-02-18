import React from 'react'
import { render } from '@testing-library/react'
import { Table } from './Table'

describe('Table component', () => {
  test('renders without crashing', () => {
    render(<Table />)
  })
})
