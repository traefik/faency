import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { Text } from './Text'
import { Heading } from './Heading'
import { Avatar } from './Avatar'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1579380287268-aa88d096651c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80'

storiesOf('Components|Avatar', module).add('default', () => (
  <>
    <Box mb={4}>
      <Heading>Avatar using existing image</Heading>
      <Avatar src={SAMPLE_IMAGE}>KS</Avatar>
    </Box>

    <Box mb={4}>
      <Heading>Avatar using non-existing image with fallback to initials</Heading>
      <Avatar src="https://avatars0.githubusercontent.com/u/invalid-user">KS</Avatar>
    </Box>

    <Box mb={4}>
      <Heading>Avatar using non-existing image with fallback to custom initials</Heading>
      <Avatar src="https://avatars0.githubusercontent.com/u/invalid-user">
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
      <Avatar src="https://avatars0.githubusercontent.com/u/invalid-user" variant="dark">
        KS
      </Avatar>
    </Box>
  </>
))
