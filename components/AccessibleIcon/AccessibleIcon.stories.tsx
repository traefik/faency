import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AccessibleIcon } from './AccessibleIcon';
import * as Icons from '@radix-ui/react-icons';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';

export default {
  title: 'Components/AccessibleIcon',
  component: AccessibleIcon,
  tags: ['autodocs'],
} as Meta<typeof AccessibleIcon>;

export const Basic: StoryFn<typeof AccessibleIcon> = () => (
  <Flex gap={3} align="center">
    <IconButton>
      <AccessibleIcon label="notification">
        <Icons.BellIcon />
      </AccessibleIcon>
    </IconButton>

    <IconButton>
      <AccessibleIcon label="user settings">
        <Icons.AvatarIcon />
      </AccessibleIcon>
    </IconButton>
  </Flex>
);
