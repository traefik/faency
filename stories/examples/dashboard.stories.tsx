import React from 'react';

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
          <Button variant="secondary">Add item</Button>
          <Button>Add item</Button>
        </Flex>
      </Flex>
      <Flex css={{ gap: '$3' }}>
        <Card css={{ flex: 1 }}>
          <Heading as="h3" size="2" css={{ mb: '$3' }}>
            Card 1
          </Heading>
          <Text as="p" css={{ mb: '$3' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur necessitatibus libero,
            quaerat molestiae, nemo esse reprehenderit mollitia nihil ullam laudantium aut aliquid
            odit optio omnis, nam quidem eos impedit hic!
          </Text>
          <Button ghost>Details</Button>
        </Card>
        <Card css={{ flex: 1 }}>
          <Heading as="h3" size="2" css={{ mb: '$3' }}>
            Card 2
          </Heading>
          <Text as="p" css={{ mb: '$3' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, numquam aspernatur
            beatae hic cum voluptatibus omnis quisquam consequatur autem eos? Quidem ipsum odit,
            consequatur aperiam nulla dolore! Corrupti, odio amet?
          </Text>
          <Button>Details</Button>
        </Card>
        <Card css={{ flex: 1 }}>
          <Heading as="h3" size="2" css={{ mb: '$3' }}>
            Card 3
          </Heading>
          <Text as="p" css={{ mb: '$3' }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti numquam velit
            repellat magni aut eveniet nisi tempora! Amet eaque obcaecati numquam labore. At ratione
            enim labore esse quaerat repellendus nobis!
          </Text>
          <Button>Details</Button>
        </Card>
      </Flex>
    </Box>

    <Button>Test</Button>
  </Box>
);

export default {
  title: 'Dashboard',
  component: Dashboard,
};
