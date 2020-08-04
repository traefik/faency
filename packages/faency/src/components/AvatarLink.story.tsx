import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { Text } from './Text'
import { Heading } from './Heading'
import { AvatarLink } from './AvatarLink'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1579380287268-aa88d096651c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80'

storiesOf('Components|AvatarLink', module).add('default', () => {
  return (
    <>
      <Box mb={4} padding={2}>
        <Heading>Using the current theme by default</Heading>

        <AvatarLink mr={1} src={SAMPLE_IMAGE} href="https://traefik.io">
          KS
        </AvatarLink>
        <AvatarLink mr={1} src="" href="https://traefik.io">
          KS
        </AvatarLink>
        <AvatarLink src="" href="https://traefik.io">
          <Text sx={{ color: 'white' }} mb={1}>
            K
          </Text>
          <Text sx={{ color: 'white' }} mt={1}>
            S
          </Text>
        </AvatarLink>
      </Box>

      <Box mb={4} sx={{ backgroundColor: 'white' }} p={2}>
        <Heading>AvatarLink using existing image on a light variant</Heading>
        <AvatarLink src={SAMPLE_IMAGE} variant="light" href="https://traefik.io">
          KS
        </AvatarLink>
      </Box>

      <Box mb={4} sx={{ backgroundColor: 'white' }} p={2}>
        <Heading>AvatarLink using non-existing image with fallback to initials on a light variant</Heading>
        <AvatarLink mr={1} src="" variant="light" href="https://traefik.io">
          KS
        </AvatarLink>
        <AvatarLink src="" variant="light" href="https://traefik.io">
          <Text sx={{ color: 'white' }} mb={1}>
            K
          </Text>
          <Text sx={{ color: 'white' }} mt={1}>
            S
          </Text>
        </AvatarLink>
      </Box>

      <Box mb={4} sx={{ backgroundColor: 'dark' }} p={2}>
        <Heading sx={{ color: 'white' }}>AvatarLink using existing image on a dark variant</Heading>
        <AvatarLink src={SAMPLE_IMAGE} variant="dark" href="https://traefik.io">
          KS
        </AvatarLink>
      </Box>

      <Box mb={4} sx={{ backgroundColor: 'dark' }} p={2}>
        <Heading sx={{ color: 'white' }}>
          AvatarLink using non-existing image with fallback to initials on a dark variant
        </Heading>
        <AvatarLink mr={1} src="" variant="dark" href="https://traefik.io">
          KS
        </AvatarLink>
        <AvatarLink src="" variant="dark" href="https://traefik.io">
          <Text sx={{ color: 'white' }} mb={1}>
            K
          </Text>
          <Text sx={{ color: 'white' }} mt={1}>
            S
          </Text>
        </AvatarLink>
      </Box>
    </>
  )
})
