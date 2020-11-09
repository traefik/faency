import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { Text } from './Text'

storiesOf('Components|Text', module).add('default', () => (
  <>
    <Box mb="4">
      <Text as="p">Default text</Text>
    </Box>

    <Box mb="4">
      <Text as="p" size={0}>
        Traefik Labs
      </Text>
      <Text as="p" size={1}>
        Traefik Labs
      </Text>
      <Text as="p" size={2}>
        Traefik Labs
      </Text>
      <Text as="p" size={3}>
        Traefik Labs
      </Text>
      <Text as="p" size={4}>
        Traefik Labs
      </Text>
      <Text as="p" size={5}>
        Traefik Labs
      </Text>
      <Text as="p" size={6}>
        Traefik Labs
      </Text>
      <Text as="p" size={7}>
        Traefik Labs
      </Text>
      <Text as="p" size={8}>
        Traefik Labs
      </Text>
    </Box>

    <Box mb="4">
      <Text as="p" sx={{ fontStyle: 'italic' }}>
        Enabling the Cloud.
      </Text>
      <Text as="p" sx={{ fontWeight: 500 }}>
        Enabling the Cloud.
      </Text>
    </Box>

    <Box mb="4">
      <Text as="p">We are Traefik Labs</Text>
      <Text as="p" sx={{ color: 'blue' }}>
        We are Traefik Labs
      </Text>
      <Text as="p" sx={{ color: 'red' }}>
        We are Traefik Labs
      </Text>
      <Text as="p" sx={{ color: 'green' }}>
        We are Traefik Labs
      </Text>
      <Text as="p" sx={{ color: 'gray' }}>
        We are Traefik Labs
      </Text>
    </Box>

    <Box mb="4">
      <Text as="p" sx={{ textAlign: 'center' }} padding="4">
        We are Traefik Labs. We strive to provide the cloud with the most powerful tools to ease the demanding
        infrastructures strain on your IT.
      </Text>
    </Box>
    <Box mb="4" sx={{ width: 200 }}>
      <Text as="p" sx={{ textAlign: 'center' }} padding="4" truncate>
        We are Traefik Labs. We strive to provide the cloud with the most powerful tools to ease the demanding
        infrastructures strain on your IT.
      </Text>
    </Box>

    <Box mb="4">
      <Text size={5}>
        We are Traefik Labs. We strive to provide the cloud with the most powerful tools to ease the demanding
        infrastructures strain on your IT.
      </Text>
    </Box>
  </>
))
