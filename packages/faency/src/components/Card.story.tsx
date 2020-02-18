import React from 'react'
import { storiesOf } from '@storybook/react'
import { Heading } from './Heading'
import { Text } from './Text'
import { Card } from './Card'
import { Flex } from './Flex'

storiesOf('Components|Card', module).add('default', () => (
  <>
    <Flex>
      <Card m={4} maxWidth="300px">
        <Heading size={1} mb="3">
          Card
        </Heading>
        <Text as="p" mb="3" size={3}>
          At Kubecon last week, Containous launched their new Traefik Ambassador Program in an effort to give
          contributors to the open source cloud-native edge router some recognition for their contributions. Community
          members are already expressing their enthusiasm for the new initiative. Let’s take a closer look.
        </Text>
        <Text size={2} color="grays.5">
          Today
        </Text>
      </Card>
      <Card variant="shadow" m={4} maxWidth="300px">
        <Heading size={1} mb="3">
          Card
        </Heading>
        <Text as="p" mb="3" size={3}>
          At Kubecon last week, Containous launched their new Traefik Ambassador Program in an effort to give
          contributors to the open source cloud-native edge router some recognition for their contributions. Community
          members are already expressing their enthusiasm for the new initiative. Let’s take a closer look.
        </Text>
        <Text size={2} color="grays.5">
          Today
        </Text>
      </Card>
      <Card variant="ghost" m={4} maxWidth="300px">
        <Heading size={1} mb="3">
          Card
        </Heading>
        <Text as="p" mb="3" size={3}>
          At Kubecon last week, Containous launched their new Traefik Ambassador Program in an effort to give
          contributors to the open source cloud-native edge router some recognition for their contributions. Community
          members are already expressing their enthusiasm for the new initiative. Let’s take a closer look.
        </Text>
        <Text size={2} color="grays.5">
          Today
        </Text>
      </Card>
    </Flex>
  </>
))
