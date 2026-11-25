import {
  ArchiveIcon,
  DashboardIcon,
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  GearIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Badge, BadgeVanilla } from '../Badge';
import { BoxVanilla } from '../Box';
import { Button } from '../Button';
import { Flex, FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { NavigationDrawer, NavigationDrawerVanilla } from '../Navigation';
import { Text } from '../Text';
import {
  NavigationTreeContainerVanilla,
  NavigationTreeItemVanilla,
} from './NavigationTree.vanilla';
import { NavigationTreeContainer } from './NavigationTreeContainer';
import { NavigationTreeItem } from './NavigationTreeItem';

const Component: Meta<typeof NavigationTreeItem> = {
  title: 'Components/NavigationTreeItem',
  component: NavigationTreeItem,
  argTypes: {
    customExpandIcon: {
      options: ['Default', 'Eye', 'Envelope'],
      mapping: {
        Default: undefined,
        Eye: <EyeClosedIcon />,
        Envelope: <EnvelopeOpenIcon />,
      },
    },
    customCollapseIcon: {
      options: ['Default', 'Eye', 'Envelope'],
      mapping: {
        Default: undefined,
        Eye: <EyeOpenIcon />,
        Envelope: <EnvelopeClosedIcon />,
      },
    },
    defaultCollapseIcon: {
      options: ['Default', 'Eye', 'Envelope'],
      mapping: {
        Default: undefined,
        Eye: <EyeClosedIcon />,
        Envelope: <EnvelopeOpenIcon />,
      },
    },
    defaultExpandIcon: {
      options: ['Default', 'Eye', 'Envelope'],
      mapping: {
        Default: undefined,
        Eye: <EyeOpenIcon />,
        Envelope: <EnvelopeClosedIcon />,
      },
    },
    label: {
      control: 'text',
    },
    startAdornment: {
      options: ['None', 'Dashboard', 'Gear', 'Person', 'Question'],
      mapping: {
        None: null,
        Dashboard: <DashboardIcon />,
        Gear: <GearIcon />,
        Person: <PersonIcon />,
        Question: <QuestionMarkCircledIcon />,
      },
    },
    endAdornment: {
      options: ['None', 'Dashboard', 'Gear', 'Person', 'Question'],
      mapping: {
        None: null,
        Dashboard: <DashboardIcon />,
        Gear: <GearIcon />,
        Person: <PersonIcon />,
        Question: <QuestionMarkCircledIcon />,
      },
    },
    active: {
      control: 'boolean',
    },
  },
};

const Template: StoryFn<typeof NavigationTreeItem> = (args) => {
  const [currentRoute, setCurrentRoute] = useState('/');

  const navigationHandlerProps = (route: string) => ({
    active: route === currentRoute,
    onClick: () => setCurrentRoute(route),
  });

  return (
    <NavigationDrawer>
      <NavigationTreeContainer
        defaultCollapseIcon={args.defaultCollapseIcon}
        defaultExpandIcon={args.defaultExpandIcon}
      >
        <NavigationTreeItem {...navigationHandlerProps('one')} label="One" subtitle="/parent">
          <NavigationTreeItem {...navigationHandlerProps('one-one')} {...args}>
            <NavigationTreeItem
              {...navigationHandlerProps('one-one-one')}
              startAdornment={<ArchiveIcon />}
              label="One.One.One"
            />
          </NavigationTreeItem>
        </NavigationTreeItem>

        <NavigationTreeItem
          {...navigationHandlerProps('two')}
          label={
            <Flex
              gap={2}
              align="center"
              justify="space-between"
              css={{ width: '100%', color: 'inherit' }}
            >
              <Text css={{ color: 'inherit' }}>Node label</Text>
              <Button as="div" size="small">
                Click
              </Button>
            </Flex>
          }
        >
          <NavigationTreeItem {...navigationHandlerProps('two-one')} {...args}>
            <NavigationTreeItem
              {...navigationHandlerProps('two-one-one')}
              startAdornment={<ArchiveIcon />}
              label="Two.One.One"
            />
          </NavigationTreeItem>
        </NavigationTreeItem>
      </NavigationTreeContainer>
    </NavigationDrawer>
  );
};

export const TreeItem: StoryFn<typeof NavigationTreeItem> = Template.bind({});
TreeItem.args = {
  label: 'One.One',
};

const comparisonBadgeCss = {
  height: '$3',
  borderRadius: '$pill',
  fontSize: '$0',
  fontWeight: '$medium',
  color: '$hiContrast',
};

export const Comparison: StoryFn = () => (
  <FlexVanilla gap={6}>
    <BoxVanilla css={{ width: 280 }}>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <NavigationDrawer>
        <NavigationTreeContainer>
          <NavigationTreeItem label="Leaf" />
          <NavigationTreeItem label="With subtitle" subtitle="/subtitle" />
          <NavigationTreeItem label="Start adornment" startAdornment={<GearIcon />} />
          <NavigationTreeItem
            label="End adornment"
            endAdornment={<Badge css={comparisonBadgeCss}>3</Badge>}
          />
          <NavigationTreeItem label="Active" active />
          <NavigationTreeItem label="Expanded" subtitle="/expanded" defaultExpanded>
            <NavigationTreeItem label="Child" />
            <NavigationTreeItem label="Child with icon" startAdornment={<ArchiveIcon />} />
          </NavigationTreeItem>
          <NavigationTreeItem
            label="Custom icons"
            customExpandIcon={<EyeOpenIcon />}
            customCollapseIcon={<EyeClosedIcon />}
          >
            <NavigationTreeItem label="Child" />
          </NavigationTreeItem>
        </NavigationTreeContainer>
      </NavigationDrawer>
    </BoxVanilla>
    <BoxVanilla css={{ width: 280 }}>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <NavigationDrawerVanilla>
        <NavigationTreeContainerVanilla>
          <NavigationTreeItemVanilla label="Leaf" />
          <NavigationTreeItemVanilla label="With subtitle" subtitle="/subtitle" />
          <NavigationTreeItemVanilla label="Start adornment" startAdornment={<GearIcon />} />
          <NavigationTreeItemVanilla
            label="End adornment"
            endAdornment={<BadgeVanilla css={comparisonBadgeCss}>3</BadgeVanilla>}
          />
          <NavigationTreeItemVanilla label="Active" active />
          <NavigationTreeItemVanilla label="Expanded" subtitle="/expanded" defaultExpanded>
            <NavigationTreeItemVanilla label="Child" />
            <NavigationTreeItemVanilla label="Child with icon" startAdornment={<ArchiveIcon />} />
          </NavigationTreeItemVanilla>
          <NavigationTreeItemVanilla
            label="Custom icons"
            customExpandIcon={<EyeOpenIcon />}
            customCollapseIcon={<EyeClosedIcon />}
          >
            <NavigationTreeItemVanilla label="Child" />
          </NavigationTreeItemVanilla>
        </NavigationTreeContainerVanilla>
      </NavigationDrawerVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
