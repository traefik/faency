import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { Nav, NavItem, NavGroup } from './Nav'
import { SubNav, SubNavItem } from './SubNav'
import { Text } from './Text'

storiesOf('Components|SubNav', module).add('default', () => (
  <>
    <Box mb="4">
      <SubNav>
        <SubNavItem as="a" href="#">
          This is a link
        </SubNavItem>
        <SubNavItem as="button" variant="active" onClick={(): void => alert('clicked!')}>
          This is a button
        </SubNavItem>
        <SubNavItem>
          <Text size={2} textColor="grays.5">
            Defaults to Button
          </Text>
        </SubNavItem>
      </SubNav>
    </Box>

    <Box mb="4">
      <Nav>
        <NavGroup variant="right">
          <NavItem variant="active">Documentation</NavItem>
          <NavItem>
            <Text size={2} textColor="grays.5" fontWeight={600}>
              Github
            </Text>
          </NavItem>
        </NavGroup>
        <NavGroup variant="left">
          <NavItem>
            <Text size={2} textColor="grays.5" fontWeight={600}>
              Box
            </Text>
          </NavItem>
          <NavItem variant="active">
            <Text size={2} textColor="white" fontWeight={600}>
              Layout
            </Text>
          </NavItem>
          <NavItem>
            <Text size={2} textColor="grays.5" fontWeight={600}>
              Button
            </Text>
          </NavItem>
        </NavGroup>
      </Nav>
      <SubNav>
        <SubNavItem as="a" href="#">
          This is a link
        </SubNavItem>
        <SubNavItem as="button" variant="active" onClick={(): void => alert('clicked!')}>
          This is a button
        </SubNavItem>
        <SubNavItem>
          <Text size={2} textColor="grays.5">
            Defaults to Button
          </Text>
        </SubNavItem>
      </SubNav>
    </Box>
  </>
))
