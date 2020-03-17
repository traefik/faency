import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { Text } from './Text'
import { Heading } from './Heading'
import { Avatar } from './Avatar'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1579380287268-aa88d096651c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80'

storiesOf('Components|Avatar', module).add('default', () => {
  return (
    <>
      <Box mb={4} padding={2}>
        <Heading>Using the current theme by default</Heading>

        <Avatar mr={1} src={SAMPLE_IMAGE}>
          KS
        </Avatar>
        <Avatar mr={1} src="">
          KS
        </Avatar>
        <Avatar src="">
          <Text textColor="white" marginBottom={1}>
            K
          </Text>
          <Text textColor="white" marginTop={1}>
            S
          </Text>
        </Avatar>
      </Box>

      <Box mb={4} backgroundColor="white" padding={2}>
        <Heading>Avatar using existing image on a light variant</Heading>
        <Avatar src={SAMPLE_IMAGE} variant="light">
          KS
        </Avatar>
      </Box>

      <Box mb={4} backgroundColor="white" padding={2}>
        <Heading>Avatar using non-existing image with fallback to initials on a light variant</Heading>
        <Avatar mr={1} src="" variant="light">
          KS
        </Avatar>
        <Avatar src="" variant="light">
          <Text textColor="white" marginBottom={1}>
            K
          </Text>
          <Text textColor="white" marginTop={1}>
            S
          </Text>
        </Avatar>
      </Box>

      <Box mb={4} backgroundColor="dark" padding={2}>
        <Heading textColor="white">Avatar using existing image on a dark variant</Heading>
        <Avatar src={SAMPLE_IMAGE} variant="dark">
          KS
        </Avatar>
      </Box>

      <Box mb={4} backgroundColor="dark" padding={2}>
        <Heading textColor="white">Avatar using non-existing image with fallback to initials on a dark variant</Heading>
        <Avatar mr={1} src="" variant="dark">
          KS
        </Avatar>
        <Avatar src="" variant="dark">
          <Text textColor="white" marginBottom={1}>
            K
          </Text>
          <Text textColor="white" marginTop={1}>
            S
          </Text>
        </Avatar>
      </Box>
    </>
  )
})
