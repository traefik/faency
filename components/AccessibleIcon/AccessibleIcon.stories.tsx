import * as Icons from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import { IconButton } from '../IconButton';
import { AccessibleIcon } from './AccessibleIcon';
import { AccessibleIconVanilla } from './AccessibleIcon.vanilla';

const Component: Meta<typeof AccessibleIcon> = {
  title: 'Components/AccessibleIcon',
  component: AccessibleIcon,
  tags: ['autodocs'],
};

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

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <FlexVanilla gap={3} align="center">
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

        <IconButton>
          <AccessibleIcon label="search">
            <Icons.MagnifyingGlassIcon />
          </AccessibleIcon>
        </IconButton>

        <IconButton>
          <AccessibleIcon label="home">
            <Icons.HomeIcon />
          </AccessibleIcon>
        </IconButton>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <FlexVanilla gap={3} align="center">
        <IconButton>
          <AccessibleIconVanilla label="notification">
            <Icons.BellIcon />
          </AccessibleIconVanilla>
        </IconButton>

        <IconButton>
          <AccessibleIconVanilla label="user settings">
            <Icons.AvatarIcon />
          </AccessibleIconVanilla>
        </IconButton>

        <IconButton>
          <AccessibleIconVanilla label="search">
            <Icons.MagnifyingGlassIcon />
          </AccessibleIconVanilla>
        </IconButton>

        <IconButton>
          <AccessibleIconVanilla label="home">
            <Icons.HomeIcon />
          </AccessibleIconVanilla>
        </IconButton>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
