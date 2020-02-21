import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { Box } from '../Box'
import { Nav, NavContainer, NavItem, NavGroup, NavGroups } from './Nav'
import { Text } from '../Text'
import breakpoints from '../../breakpoints'

const Container = styled(NavContainer)`
  display: flex;
  flex-grow: 1;
  margin: 0 12px;

  @media (min-width: ${breakpoints.laptop}) {
    margin: 0 24px;
  }

  @media (min-width: ${breakpoints.laptopL}) {
    max-width: ${breakpoints.laptopL};
    margin: 0 auto;
  }
`

storiesOf('Components|Nav', module).add('default', () => (
  <>
    <Box mb="4">
      <Nav>
        <Container>
          <NavItem>
            <img src="https://containo.us/assets/img/traefik-logo.svg" height="30px" />
          </NavItem>
          <NavGroups>
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
          </NavGroups>
        </Container>
      </Nav>
    </Box>
    <Box mb="4">
      <Nav>
        <NavGroup variant="right">
          <NavItem variant="active">
            <Text size={2} textColor="white" fontWeight={600}>
              Documentation
            </Text>
          </NavItem>
          <NavItem>
            <Text size={2} textColor="grays.5" fontWeight={600}>
              Github
            </Text>
          </NavItem>
        </NavGroup>
      </Nav>
    </Box>
    <Box mb="4">
      <Nav>
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
    </Box>

    <Box mb="4">
      <Nav>
        <NavGroup variant="left">
          <NavItem as="a" href="https://containo.us">
            Containous Website
          </NavItem>
        </NavGroup>
      </Nav>
    </Box>
  </>
))
