import React from 'react';
import { Link } from '../../components/Link';

import { Box, Button, Card, Checkbox, Flex, Label, Heading, TextField } from '../../index';

export const Form = () => (
  <Flex css={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <Heading size="4" css={{ mb: '$6' }}>
      Form Example
    </Heading>
    <Card css={{ p: '$6' }}>
      <form>
        <>
          <Label htmlFor="email">Email</Label>
          <TextField
            id="email"
            type="email"
            name="email"
            size="large"
            placeholder="Your e-mail address"
            autoComplete="email"
            css={{ mb: '$3' }}
          />
        </>

        <>
          <Label htmlFor="password">Password</Label>
          <TextField
            id="password"
            type="password"
            name="password"
            size="large"
            placeholder="A secured password"
            autoComplete="new-password"
            css={{ mb: '$4' }}
          />
        </>

        <Flex css={{ alignItems: 'center', mb: '$3' }}>
          <Checkbox id="terms" name="terms" css={{ mr: '$2' }} />
          <Label
            htmlFor="terms"
            css={{ fontSize: '$1', fontWeight: 'normal', textTransform: 'initial' }}
          >
            By signing up, you agree to the{' '}
            <Link href="#terms" variant="subtle">
              Terms of Service
            </Link>
          </Label>
        </Flex>

        <Button type="submit" size="large" variant="primary" css={{ width: '100%' }}>
          Sign Up
        </Button>
      </form>
    </Card>
  </Flex>
);

export default {
  title: 'Examples/Form',
  component: Form,
};
