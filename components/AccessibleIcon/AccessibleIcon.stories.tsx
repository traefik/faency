import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AccessibleIcon } from './AccessibleIcon';
import * as Icons from '@radix-ui/react-icons';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';

export default {
  title: 'Components/AccessibleIcon',
  component: AccessibleIcon,
} as ComponentMeta<any>;

export const Basic: ComponentStory<any> = (args) => (
  <Flex gap={3} align="center">
    <IconButton>
      <AccessibleIcon label="notification" {...args} size="1">
        <Icons.BellIcon />
      </AccessibleIcon>
    </IconButton>

    <IconButton>
      <AccessibleIcon label="user settings" {...args} size="2">
        <Icons.AvatarIcon />
      </AccessibleIcon>
    </IconButton>
  </Flex>
);
