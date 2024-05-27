import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { NavigationTreeItem } from './NavigationTreeItem';
import { NavigationTreeContainer } from './NavigationTreeContainer';
import {
  ArchiveIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
} from '@radix-ui/react-icons';
import { NavigationTreeDrawer } from '.';

const Component: Meta<typeof NavigationTreeContainer> = {
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
};

const Template: StoryFn<typeof NavigationTreeContainer> = (args) => {
  const [currentRoute, setCurrentRoute] = useState('/');

  const navigationHandlerProps = (route: string) => ({
    active: route === currentRoute,
    onClick: () => setCurrentRoute(route),
  });

  return (
    <NavigationTreeDrawer>
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
        <NavigationTreeItem
          {...navigationHandlerProps('two')}
          label="Two"
          subtitle="/two"
          defaultExpanded
        >
          <NavigationTreeItem
            {...navigationHandlerProps('two-one')}
            as="a"
            label="Two.One"
            subtitle="/two-one"
          />
          <NavigationTreeItem
            {...navigationHandlerProps('two-two')}
            label="Two.Two"
            subtitle="/two-two"
          >
            <NavigationTreeItem
              {...navigationHandlerProps('two-two-one')}
              startAdornment={<ArchiveIcon />}
              label="Two.Two.One"
            />
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem {...navigationHandlerProps('three')} label="Three" />
      </NavigationTreeContainer>
    </NavigationTreeDrawer>
  );
};

export const Basic: StoryFn<typeof NavigationTreeContainer> = Template.bind({});

Basic.args = {};

const FullWidthStory: StoryFn<typeof NavigationTreeContainer> = (args) => {
  const [currentRoute, setCurrentRoute] = useState('/');

  const navigationHandlerProps = (route: string) => ({
    active: route === currentRoute,
    onClick: () => setCurrentRoute(route),
  });

  return (
    <NavigationTreeDrawer fullWidth>
      <NavigationTreeContainer {...args}>
        <NavigationTreeItem label="One" subtitle="/one">
          <NavigationTreeItem
            {...navigationHandlerProps('one-one')}
            as="a"
            label="One.One"
            subtitle="/one-one"
          />
          <NavigationTreeItem label="One.Two" nestedChildrenLevel={2}>
            <NavigationTreeItem
              {...navigationHandlerProps('one-two-one')}
              startAdornment={<ArchiveIcon />}
              label="One.Two.One"
            />
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem label="Two" subtitle="/two" defaultExpanded>
          <NavigationTreeItem
            {...navigationHandlerProps('two-one')}
            as="a"
            label="Two.One"
            subtitle="/two-one"
          />
          <NavigationTreeItem label="Two.Two" subtitle="/two-two" nestedChildrenLevel={2}>
            <NavigationTreeItem label="Two.Two.One" nestedChildrenLevel={3}>
              <NavigationTreeItem
                {...navigationHandlerProps('two-two-one-one')}
                startAdornment={<ArchiveIcon />}
                label="Two.Two.One.One"
              />
            </NavigationTreeItem>
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem {...navigationHandlerProps('three')} label="Three" />
      </NavigationTreeContainer>
    </NavigationTreeDrawer>
  );
};

export const FullWidth: StoryFn<typeof NavigationTreeContainer> = FullWidthStory.bind({});

FullWidth.args = {};

export default Component;
