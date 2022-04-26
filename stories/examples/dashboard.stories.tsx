import React from 'react';

import { Badge, Box, Button, Card, Flex, H1, H2, H3, Text, TextField } from '../../index';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export const Dashboard = () => (
  <Box css={{ p: '$6' }}>
    <H1 css={{ mb: '$3' }}>Dashboard Example</H1>
    <Box as="section" css={{ mb: '$3' }}>
      <Flex css={{ justifyContent: 'space-between' }}>
        <H2 css={{ mb: '$3' }}>Items</H2>

        <Flex align="center" css={{ gap: '$3' }}>
          <TextField startAdornment={<MagnifyingGlassIcon />} placeholder="Search..." clearable />
          <Button variant="secondary">Go</Button>
        </Flex>
      </Flex>
      <Flex css={{ gap: '$3' }}>
        <Card css={{ flex: 1 }}>
          <Flex css={{ gap: '$3', mb: '$3' }}>
            <H3>Item 1</H3>
            <Flex css={{ gap: '$2', alignItems: 'center' }}>
              <Badge variant="blue" interactive>
                Article
              </Badge>
              <Badge variant="orange" interactive>
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
            <H3>Item 2</H3>
            <Flex css={{ gap: '$2', alignItems: 'center' }}>
              <Badge variant="blue" interactive>
                Article
              </Badge>
              <Badge variant="green" interactive>
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
            <H3>Item 3</H3>
            <Flex css={{ gap: '$2', alignItems: 'center' }}>
              <Badge variant="red" interactive>
                Video
              </Badge>
              <Badge variant="neon" interactive>
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
