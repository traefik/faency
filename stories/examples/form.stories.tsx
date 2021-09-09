import React from 'react';
import { TextField } from '../../components/TextField';

import { Button, Card, Flex, Heading } from '../../index';

export const Form = () => (
  <Flex css={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <Heading size="4" css={{ mb: '$6' }}>
      Form Example
    </Heading>
    <Card css={{ p: '$6' }}>
      <form>
        <TextField
          type="email"
          name="email"
          size="large"
          placeholder="Email"
          autoComplete="email"
          css={{ mb: '$3' }}
        />
        <TextField
          type="password"
          name="password"
          size="large"
          placeholder="Password"
          autoComplete="new-password"
          css={{ mb: '$3' }}
        />

        <Flex css={{ ai: 'center', jc: 'space-between' }}>
          <Button as="a" href="#" size="large" variant="secondary" ghost css={{ p: 0 }}>
            Forgot password
          </Button>
          <Button type="submit" size="large" variant="primary">
            Log in
          </Button>
        </Flex>
      </form>
    </Card>
  </Flex>
);

export default {
  title: 'Examples/Form',
  component: Form,
};
