import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Text } from '../Text';

storiesOf('Components|Tooltip', module).add('default', () => (
  <>
    <Box mb="6">
      <Tooltip label="Some contextual message 1">
        <Text>#1 - Default tooltip (bottom/centered)</Text>
      </Tooltip>
    </Box>
    <Box mb="6">
      <Tooltip label="Some contextual message 2" preferredAlignment="left">
        <Text>#2 - Tooltip displayed on bottom and align on the left</Text>
      </Tooltip>
    </Box>
    <Box mb="6">
      <Tooltip label="Some contextual message 3" preferredAlignment="right">
        <Text>#3 - Tooltip displayed on bottom and align on the right</Text>
      </Tooltip>
    </Box>
    <Box mb="6">
      <Tooltip label="Some contextual message 4" preferredPosition="top">
        <Text>#4 - Tooltip displayed on top and centered</Text>
      </Tooltip>
    </Box>
    <Box mb="6">
      <Tooltip label="Some contextual message 5" active>
        <Text>#5 - A tooltip active by default</Text>
      </Tooltip>
    </Box>
    <Box mb="6">
      <Tooltip label="default tooltip">
        <Box width={120} height={120} bg="blue" />
      </Tooltip>
    </Box>
    <Box mb="6">
      <Tooltip label="tooltip left" preferredAlignment="left">
        <Box width={120} height={120} bg="blue" />
      </Tooltip>
    </Box>
    <Box mb="6">
      <Tooltip label="tooltip right" preferredAlignment="right">
        <Box width={120} height={120} bg="blue" />
      </Tooltip>
    </Box>
    <Box mb="6">
      <Tooltip label="tooltip right but too long" preferredAlignment="right">
        <Box width={120} height={120} bg="blue" />
      </Tooltip>
    </Box>
    <Flex mb="6" justifyContent="flex-end">
      <Tooltip label="tooltip left but too long" preferredAlignment="left">
        <Box width={120} height={120} bg="blue" />
      </Tooltip>
    </Flex>

    <Box mb="6">
      <Tooltip label="Some copyable contextual message" action="copy">
        <Text>A tooltip with copy action</Text>
      </Tooltip>
    </Box>
  </>
));
