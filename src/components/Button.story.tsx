import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from './Box';
import { Text } from './Text';
import { Button } from './Button';

storiesOf('Components|Button', module).add('default', () => (
  <>
    <Box mb="4">
      <Button mr="4">Default Button</Button>
      <Button size={1}>Default Button</Button>
    </Box>

    <Box mb="4">
      <Button variant="primary" mr="4">
        Primary
      </Button>
      <Button variant="primary" size={1} mr="4">
        Primary
      </Button>
    </Box>

    <Box mb="4">
      <Button variant="secondary" mr="4">
        Secondary
      </Button>
      <Button variant="secondary" size={1} mr="4">
        Secondary
      </Button>
    </Box>

    <Box mb="4">
      <Button variant="green" mr="4">
        Green
      </Button>
      <Button variant="green" size={1}>
        Green
      </Button>
    </Box>

    <Box mb="4">
      <Button variant="red" mr="4">
        Red
      </Button>
      <Button variant="red" size={1}>
        Red
      </Button>
    </Box>

    <Box mb="4">
      <Button variant="gray" mr="4">
        Gray
      </Button>
      <Button variant="gray" size={1}>
        Gray
      </Button>
    </Box>

    <Box mb="4">
      <Button disabled={true} mr="4">
        Disabled
      </Button>
      <Button disabled={true} size={1}>
        Disabled
      </Button>
    </Box>

    <Box mb="4">
      <Button isWaiting mr="4">
        Waiting
      </Button>
      <Button isWaiting size={1}>
        Waiting
      </Button>
    </Box>

    <Box mb="4">
      <Button variant="blue" mr="4">
        <Box as="span" mr={2}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 25 25"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <path d="M0 0H14" transform="translate(5.5 12.5)" strokeLinecap="round"  stroke-width="3" />
            <path d="M0 14V0" transform="translate(12.5 5.5)" strokeLinecap="round"  stroke-width="3" />
          </svg>
        </Box>
        Follow
      </Button>
      <Button variant="blue" size={1}>
        <Box as="span" mr={2}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <path d="M0 0H14" transform="translate(5.5 12.5)" strokeLinecap="round" stroke-width="2" />
            <path d="M0 14V0" transform="translate(12.5 5.5)" strokeLinecap="round" stroke-width="2" />
          </svg>
        </Box>
        Follow
      </Button>
    </Box>

    <Box mb="4">
      <Button variant="blue" mr="4">
        Add
        <Box as="span" ml={2}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 25 25"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <path d="M0 0H14" transform="translate(5.5 12.5)" strokeLinecap="round" stroke-width="2" />
            <path d="M0 14V0" transform="translate(12.5 5.5)" strokeLinecap="round" stroke-width="2" />
          </svg>
        </Box>
      </Button>
      <Button variant="blue" size={1}>
        Add
        <Box as="span" ml={2}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <path d="M0 0H14" transform="translate(5.5 12.5)" strokeLinecap="round" stroke-width="2" />
            <path d="M0 14V0" transform="translate(12.5 5.5)" strokeLinecap="round" stroke-width="2" />
          </svg>
        </Box>
      </Button>
    </Box>
  </>
));