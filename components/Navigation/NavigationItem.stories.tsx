import {
  DashboardIcon,
  GearIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { Badge, BadgeVanilla } from '../Badge';
import { BoxVanilla } from '../Box';
import { FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { NavigationDrawer, NavigationItem } from './Navigation';
import {
  NavigationDrawerVanilla,
  NavigationItemVanilla,
  NavigationLinkVanilla,
} from './Navigation.vanilla';

const Component: Meta<typeof NavigationDrawer> = {
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

const comparisonBadgeCss = {
  height: '$3',
  borderRadius: '$pill',
  fontSize: '$0',
  fontWeight: '$medium',
  color: '$hiContrast',
};

export const Comparison: StoryFn = () => (
  <FlexVanilla gap={6}>
    <BoxVanilla css={{ width: 260 }}>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <NavigationDrawer>
        <NavigationItem>No adornment</NavigationItem>
        <NavigationItem startAdornment={<DashboardIcon />}>Start adornment</NavigationItem>
        <NavigationItem
          startAdornment={<GearIcon />}
          endAdornment={<Badge css={comparisonBadgeCss}>12</Badge>}
        >
          Both adornments
        </NavigationItem>
        <NavigationItem startAdornment={<PersonIcon />} active>
          Active
        </NavigationItem>
        <NavigationItem as="a" href="#link" startAdornment={<QuestionMarkCircledIcon />}>
          Link
        </NavigationItem>
        <NavigationItem
          as="a"
          href="#active-link"
          startAdornment={<QuestionMarkCircledIcon />}
          active
        >
          Active link
        </NavigationItem>
      </NavigationDrawer>
    </BoxVanilla>
    <BoxVanilla css={{ width: 260 }}>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <NavigationDrawerVanilla>
        <NavigationItemVanilla>No adornment</NavigationItemVanilla>
        <NavigationItemVanilla startAdornment={<DashboardIcon />}>
          Start adornment
        </NavigationItemVanilla>
        <NavigationItemVanilla
          startAdornment={<GearIcon />}
          endAdornment={<BadgeVanilla css={comparisonBadgeCss}>12</BadgeVanilla>}
        >
          Both adornments
        </NavigationItemVanilla>
        <NavigationItemVanilla startAdornment={<PersonIcon />} active>
          Active
        </NavigationItemVanilla>
        <NavigationLinkVanilla href="#link" startAdornment={<QuestionMarkCircledIcon />}>
          Link
        </NavigationLinkVanilla>
        <NavigationLinkVanilla
          href="#active-link"
          startAdornment={<QuestionMarkCircledIcon />}
          active
        >
          Active link
        </NavigationLinkVanilla>
      </NavigationDrawerVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
