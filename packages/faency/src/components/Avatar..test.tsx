import React from 'react'
import { render } from '@testing-library/react'
import { Avatar } from './Avatar'

describe('Avatar component', () => {
  test('renders without crashing', () => {
    render(<Avatar src="https://avatars0.githubusercontent.com/u/invalid-user" />)
  })
})
