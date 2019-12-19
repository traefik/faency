import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from './Box';
import { SubNav, SubNavItem } from './SubNav';
import { Text } from './Text';

function SubNavStory() {
  return (
    <>
      <Box mb="4">
        <SubNav>
          <SubNavItem as="a" href="#">
            This is a link
          </SubNavItem>
          <SubNavItem as="button" variant="active" onClick={() => {}}>
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
  );
}

storiesOf('Components|SubNav', module).add('default', () => <SubNavStory />);
