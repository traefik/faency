import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from './Box';
import { Nav, NavItem, NavGroup } from './Nav';
import { Text } from './Text';

function NavStory() {
  return (
    <>
      <Box mb="4">
        <Nav>
          <NavGroup variant="right">
            <NavItem variant="active">
              Documentation
            </NavItem>
            <NavItem>
              <Text size={2} textColor="grays.5" fontWeight={600}>Github</Text>
            </NavItem>
          </NavGroup>
          <NavGroup variant="left">
            <NavItem>
              <Text size={2} textColor="grays.5" fontWeight={600}>Box</Text>
            </NavItem>
            <NavItem variant="active">
              <Text size={2} textColor="white" fontWeight={600}>Layout</Text>
            </NavItem>
            <NavItem>
              <Text size={2} textColor="grays.5" fontWeight={600}>Button</Text>
            </NavItem>
          </NavGroup>
        </Nav>
      </Box>
      <Box mb="4">
        <Nav>
          <NavGroup variant="right">
            <NavItem variant="active">
              <Text size={2} textColor="white" fontWeight={600}>Documentation</Text>
            </NavItem>
            <NavItem>
              <Text size={2} textColor="grays.5" fontWeight={600}>Github</Text>
            </NavItem>
          </NavGroup>
        </Nav>
      </Box>
      <Box mb="4">
        <Nav>
          <NavGroup variant="left">
            <NavItem>
              <Text size={2} textColor="grays.5" fontWeight={600}>Box</Text>
            </NavItem>
            <NavItem variant="active">
              <Text size={2} textColor="white" fontWeight={600}>Layout</Text>
            </NavItem>
            <NavItem>
              <Text size={2} textColor="grays.5" fontWeight={600}>Button</Text>
            </NavItem>
          </NavGroup>
        </Nav>
      </Box>

      <Box mb="4">
        <Nav>
          <NavGroup variant="left">
            <NavItem as="a" href="https://containo.us">Containous Website</NavItem>
          </NavGroup>
        </Nav>
      </Box>
    </>
  );
}

storiesOf('Components|Nav', module).add('default', () => <NavStory />);