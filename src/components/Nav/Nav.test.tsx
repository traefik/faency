import React from 'react'
import { render } from '@testing-library/react'
import { Nav, NavGroup, NavItem } from './Nav'

describe('Nav component', () => {
  test('renders without crashing', () => {
    render(
      <Nav>
        <NavGroup variant="left">
          <NavItem as="a" href="https://containo.us">
            Containous Website
          </NavItem>
        </NavGroup>
      </Nav>,
    )
  })
})
