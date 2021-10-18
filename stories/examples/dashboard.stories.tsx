import React from 'react';

import { Badge, Box, Button, Card, Flex, Heading, Text, TextField } from '../../index';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export const Dashboard = () => (
  <Box css={{ p: '$6' }}>
    <Heading size="4" css={{ mb: '$3' }}>
      Dashboard Example
    </Heading>
    <Box as="section" css={{ mb: '$3' }}>
      <Flex css={{ justifyContent: 'space-between' }}>
        <Heading as="h2" size="3" css={{ mb: '$3' }}>
          Items
        </Heading>

        <Flex align="center" css={{ gap: '$3' }}>
          <TextField
            startAdornment={<MagnifyingGlassIcon />}
            placeholder='Search...'
            clearable
          />
          <Button variant="secondary">Go</Button>
        </Flex>
      </Flex>
      <Flex css={{ gap: '$3' }}>
        <Card css={{ flex: 1 }}>
          <Flex css={{ gap: '$3', mb: '$3' }}>
            <Heading as="h3" size="2">
              Item 1
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
              Item 2
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
              Item 3
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, numquam aspernatur
            beatae hic cum voluptatibus omnis quisquam consequatur autem eos? Quidem ipsum odit,
            consequatur aperiam nulla dolore! Corrupti, odio amet?
          </Text>
          <Flex css={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button ghost>Details</Button>
          </Flex>
        </Card>
      </Flex>
    </Box>

    <Flex css={{ gap: '$3' }}>
      <Button variant="secondary">Cancel</Button>
      <Button>Add item</Button>
    </Flex>
  </Box>
);

export default {
  title: 'Examples/Dashboard',
  component: Dashboard,
};
