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

import { Button } from '../Button';
import { Flex } from '../Flex';
import { NavigationDrawer } from '../Navigation';
import { Text } from '../Text';
import { NavigationTreeContainer } from './NavigationTreeContainer';
import { NavigationTreeItem } from './NavigationTreeItem';

const Component: Meta<typeof NavigationTreeItem> = {
  title: 'Components/NavigationTree',
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

export default Component;
