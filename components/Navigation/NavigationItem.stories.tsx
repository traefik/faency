import {
  DashboardIcon,
  GearIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Badge } from '../Badge';
import { NavigationDrawer, NavigationItem } from './Navigation';

const Component: Meta<typeof NavigationDrawer> = {
  title: 'Components/NavigationItem',
  // @ts-expect-error
  component: NavigationItem,
  argTypes: {
    // @ts-expect-error
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
};

const Template: StoryFn<typeof NavigationItem> = (args) => (
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
              fontWeight: '$medium',
              color: '$hiContrast',
            }}
          >
            {args.endAdornment}
          </Badge>
        )
      }
    >
      Navigation Item
    </NavigationItem>
  </NavigationDrawer>
);

export const Basic: StoryFn<typeof NavigationItem> = Template.bind({});

Basic.args = {
  as: 'a',
  href: '#',
  startAdornment: 'Gear',
  endAdornment: 1,
  active: false,
};

export const ButtonProps: StoryFn<typeof NavigationItem> = (args) => {
  const noop = () => undefined;
  return (
    <NavigationDrawer css={{ height: '200px' }}>
      <NavigationItem {...args} onClick={noop} onMouseEnter={noop} onMouseLeave={noop}>
        Navigation Item
      </NavigationItem>
    </NavigationDrawer>
  );
};

export const LinkProps: StoryFn<typeof NavigationItem> = () => (
  <NavigationDrawer css={{ height: '200px' }}>
    <NavigationItem as="a" href="https://traefik.io">
      Navigation Item
    </NavigationItem>
  </NavigationDrawer>
);

export default Component;
