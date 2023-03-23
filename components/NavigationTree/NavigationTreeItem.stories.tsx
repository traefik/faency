import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavigationTreeItem } from './NavigationTreeItem';
import { NavigationTreeContainer } from './NavigationTreeContainer';
import { NavigationDrawer } from '../Navigation';
import {
  ArchiveIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  DashboardIcon,
  PersonIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';

export default {
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
} as ComponentMeta<typeof NavigationTreeItem>;

const Template: ComponentStory<typeof NavigationTreeItem> = (args) => {
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
      </NavigationTreeContainer>
    </NavigationDrawer>
  );
};

export const TreeItem = Template.bind({});
TreeItem.args = {
  label: 'One.One',
};
