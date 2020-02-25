import React from 'react'
import { storiesOf } from '@storybook/react'
import { CardLink } from './CardLink'
import { Flex } from './Flex'
import { Heading } from './Heading'
import { Text } from './Text'

storiesOf('Components|CardLink', module).add('default', () => (
  <Flex>
    <CardLink
      href="https://jaxenter.com/containous-ambassador-program-traefik-164647.html"
      target="_blank"
      m={4}
      maxWidth="300px"
    >
      <Heading size={1} mb="3">
        CardLink
      </Heading>
      <Text as="p" mb="3" size={3}>
        At Kubecon last week, Containous launched their new Traefik Ambassador Program in an effort to give contributors
        to the open source cloud-native edge router some recognition for their contributions. Community members are
        already expressing their enthusiasm for the new initiative. Let’s take a closer look.
      </Text>
      <Text size={2} color="grays.5">
        Today
      </Text>
    </CardLink>
    <CardLink
      href="https://jaxenter.com/containous-ambassador-program-traefik-164647.html"
      target="_blank"
      variant="shadow"
      m={4}
      maxWidth="300px"
    >
      <Heading size={1} mb="3">
        CardLink
      </Heading>
      <Text as="p" mb="3" size={3}>
        At Kubecon last week, Containous launched their new Traefik Ambassador Program in an effort to give contributors
        to the open source cloud-native edge router some recognition for their contributions. Community members are
        already expressing their enthusiasm for the new initiative. Let’s take a closer look.
      </Text>
      <Text size={2} color="grays.5">
        Today
      </Text>
    </CardLink>
    <CardLink
      href="https://jaxenter.com/containous-ambassador-program-traefik-164647.html"
      target="_blank"
      variant="ghost"
      m={4}
      maxWidth="300px"
    >
      <Heading size={1} mb="3">
        CardLink
      </Heading>
      <Text as="p" mb="3" size={3}>
        At Kubecon last week, Containous launched their new Traefik Ambassador Program in an effort to give contributors
        to the open source cloud-native edge router some recognition for their contributions. Community members are
        already expressing their enthusiasm for the new initiative. Let’s take a closer look.
      </Text>
      <Text size={2} color="grays.5">
        Today
      </Text>
    </CardLink>
  </Flex>
))
