import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from './Box';
import { Chip } from './Chip';
import { Button } from './Button';
import { Flex } from './Flex';

storiesOf('Components|Chip', module).add('default', () => (
  <>
    <Flex mb="2" flexWrap="wrap">
      <Chip mr={1}>Default Chip</Chip>
      <Chip mr={1}>1</Chip>
      <Chip>123</Chip>
    </Flex>
    <Box mb="2" maxWidth="150px">
      <Chip truncate title="Some very long text that could be collapsed or truncated">
        Some very long text that could be collapsed or truncated
      </Chip>
    </Box>
    <Box>
      <Button variant="primary">
        Chip in a button <Chip ml={1}>123</Chip>
      </Button>
    </Box>
  </>
));

storiesOf('Components|Chip', module).add('colors', () => (
  <>
    <Flex mb="2" flexWrap="wrap">
      <Chip mr={2} variant="blue">Blue chip</Chip>
      <Chip mr={2} variant="purple">Purple chip</Chip>
    </Flex>
    <Flex mb="2" flexWrap="wrap">
      <Chip mr={2} variant="orange">Orange chip</Chip>
      <Chip mr={2} variant="lightBlue">Light blue chip</Chip>
    </Flex>
    <Flex mb="2" flexWrap="wrap">
      <Chip mr={2} variant="green">Green chip</Chip>
      <Chip mr={2} variant="gray">Gray chip</Chip>
    </Flex>
  </>
));

storiesOf('Components|Chip', module).add('sizes', () => (
  <>
    <Flex mb="2" flexDirection="column">
      <Chip mb={1}>Chip default size</Chip>
      <Chip mb={1} size={0}>Chip size 0</Chip>
      <Chip mb={1} size={1}>Chip size 1</Chip>
      <Chip size={2}>Chip size 2</Chip>
    </Flex>
  </>
));