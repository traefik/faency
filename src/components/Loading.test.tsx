import React from 'react'
import { render } from '@testing-library/react'
import { Loading } from './Loading'

describe('Loading component', () => {
  test('renders without crashing', () => {
    render(<Loading />)
  })
})
