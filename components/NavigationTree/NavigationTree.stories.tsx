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
} from '@radix-ui/react-icons';

export default {
  title: 'Components/NavigationTree',
  component: NavigationTreeContainer,
  argTypes: {
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
  },
} as ComponentMeta<typeof NavigationTreeContainer>;

const Template: ComponentStory<typeof NavigationTreeContainer> = (args) => {
  const [currentRoute, setCurrentRoute] = useState('/');

  const navigationHandlerProps = (route: string) => ({
    active: route === currentRoute,
    onClick: () => setCurrentRoute(route),
  });

  return (
    <NavigationDrawer>
      <NavigationTreeContainer {...args}>
        <NavigationTreeItem {...navigationHandlerProps('one')} label="One" subtitle="/one">
          <NavigationTreeItem
            {...navigationHandlerProps('one-one')}
            as="a"
            label="One.One"
            subtitle="/one-one"
          />
          <NavigationTreeItem {...navigationHandlerProps('one-two')} label="One.Two">
            <NavigationTreeItem
              {...navigationHandlerProps('one-two-one')}
              startAdornment={<ArchiveIcon />}
              label="One.Two.One"
            />
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem {...navigationHandlerProps('two')} label="Two" />
      </NavigationTreeContainer>
    </NavigationDrawer>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
