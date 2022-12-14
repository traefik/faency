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

const Template: ComponentStory<typeof NavigationItem> = (args) => (
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

export const Basic = Template.bind({});

Basic.args = {
  as: 'a',
  href: '#',
  startAdornment: 'Gear',
  endAdornment: 1,
  active: false,
};

export const ButtonProps: ComponentStory<typeof NavigationItem> = (args) => {
  const noop = () => undefined;
  return (
    <NavigationDrawer css={{ height: '200px' }}>
      <NavigationItem {...args} onClick={noop} onMouseEnter={noop} onMouseLeave={noop}>
        Navigation Item
      </NavigationItem>
    </NavigationDrawer>
  );
  ButtonProps.args = {
    as: 'button',
  };
};

export const LinkProps: ComponentStory<typeof NavigationItem> = (args) => (
  <NavigationDrawer css={{ height: '200px' }}>
    <NavigationItem as="a" href="https://traefik.io">
      Navigation Item
    </NavigationItem>
  </NavigationDrawer>
);
LinkProps.args = {
  as: 'a',
};
