import React from 'react';
import { Badge } from '../../components/Badge';
import { TextField } from '../../components/TextField';

import { Box, Button, Card, Flex, Heading, Text } from '../../index';

export const Dashboard = () => (
  <Box css={{ bc: '$bg', p: '$6' }}>
    <Heading size="4" css={{ mb: '$3' }}>
      Example
    </Heading>
    <Box as="section" css={{ mb: '$3' }}>
      <Flex css={{ justifyContent: 'space-between' }}>
        <Heading as="h2" size="3" css={{ mb: '$3' }}>
          Example
        </Heading>

        <Flex css={{ gap: '$3' }}>
          <TextField placeholder="Search..." />
          <Button variant="secondary">Go</Button>
        </Flex>
      </Flex>
      <Flex css={{ gap: '$3' }}>
        <Card css={{ flex: 1 }}>
          <Flex css={{ gap: '$3', mb: '$3' }}>
            <Heading as="h3" size="2">
              Card 1
            </Heading>
            <Flex css={{ gap: '$2', alignItems: 'center' }}>
              <Badge as="button" variant="blue" interactive>
                Article
              </Badge>
              <Badge as="button" variant="orange" interactive>
                Networking
              </Badge>
            </Flex>
          </Flex>
          <Text as="p" css={{ mb: '$3' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur necessitatibus libero,
            quaerat molestiae, nemo esse reprehenderit mollitia nihil ullam laudantium aut aliquid
            odit optio omnis, nam quidem eos impedit hic!
          </Text>
          <Flex css={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button ghost>Details</Button>
          </Flex>
        </Card>
        <Card css={{ flex: 1 }}>
          <Flex css={{ gap: '$3', mb: '$3' }}>
            <Heading as="h3" size="2">
              Card 2
            </Heading>
            <Flex css={{ gap: '$2', alignItems: 'center' }}>
              <Badge as="button" variant="blue" interactive>
                Article
              </Badge>
              <Badge as="button" variant="green" interactive>
                Kubernetes
              </Badge>
            </Flex>
          </Flex>
          <Text as="p" css={{ mb: '$3' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, numquam aspernatur
            beatae hic cum voluptatibus omnis quisquam consequatur autem eos? Quidem ipsum odit,
            consequatur aperiam nulla dolore! Corrupti, odio amet?
          </Text>
          <Flex css={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button ghost>Details</Button>
          </Flex>
        </Card>
        <Card css={{ flex: 1 }}>
          <Flex css={{ gap: '$3', mb: '$3' }}>
            <Heading as="h3" size="2">
              Card 2
            </Heading>
            <Flex css={{ gap: '$2', alignItems: 'center' }}>
              <Badge as="button" variant="red" interactive>
                Video
              </Badge>
              <Badge as="button" variant="neon" interactive>
                Traefik
              </Badge>
            </Flex>
          </Flex>
          <Text as="p" css={{ mb: '$3' }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti numquam velit
            repellat magni aut eveniet nisi tempora! Amet eaque obcaecati numquam labore. At ratione
            enim labore esse quaerat repellendus nobis!
          </Text>
          <Flex css={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button ghost>Details</Button>
          </Flex>
        </Card>
      </Flex>
    </Box>

    <Flex css={{ gap: '$3' }}>
      <Button variant="secondary">Add item</Button>
      <Button>Add item</Button>
    </Flex>
  </Box>
);

export default {
  title: 'Examples/Dashboard',
  component: Dashboard,
};
