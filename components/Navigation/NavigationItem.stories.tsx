import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  DashboardIcon,
  PersonIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';

import {
  NavigationDrawer,
  NavigationItem,
  NavigationItemProps,
  NavigationItemVariants,
} from './Navigation';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Badge } from '../Badge';
import { Text } from '../Text';

export default {
  title: 'Components/NavigationItem',
  component: NavigationItem,
  argTypes: {
    as: {
      options: ['a', 'button'],
    },
    href: {
      control: 'text',
    },
    startAdornment: {
      options: ['Dashboard', 'Gear', 'Person', 'Question'],
      mapping: {
        Dashboard: <DashboardIcon />,
        Gear: <GearIcon />,
        Person: <PersonIcon />,
        Question: <QuestionMarkCircledIcon />,
      },
    },
    endAdornment: {
      control: 'number',
    },
    active: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof NavigationDrawer>;

const BaseNavigationItem = (props: NavigationItemProps): JSX.Element => (
  <NavigationItem {...props} />
);
const NavigationItemForStory = modifyVariantsForStory<NavigationItemVariants, NavigationItemProps>(
  BaseNavigationItem
);

const Template: ComponentStory<typeof NavigationItemForStory> = (args) => (
  <NavigationDrawer css={{ height: '200px' }}>
    <NavigationItem
      {...args}
      endAdornment={
        !!args.endAdornment && (
          <Badge
            css={{
              height: '$3',
              borderRadius: '$pill',
              fontSize: '$0',
              fontWeight: 500,
              color: '$hiContrast',
            }}
          >
            <Text>{args.endAdornment}</Text>
          </Badge>
        )
      }
    >
      Navigation Item
    </NavigationItem>
  </NavigationDrawer>
);

export const Basic = Template.bind({});

Basic.args = {
  as: 'button',
  href: '#',
  startAdornment: 'Gear',
  endAdornment: 1,
  active: false,
};
