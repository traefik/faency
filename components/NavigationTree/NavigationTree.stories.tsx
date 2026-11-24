import {
  ArchiveIcon,
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React, { useState } from 'react';

import { BoxVanilla } from '../Box';
import { FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { NavigationTreeDrawer } from '.';
import {
  NavigationTreeContainerVanilla,
  NavigationTreeDrawerVanilla,
  NavigationTreeItemVanilla,
} from './NavigationTree.vanilla';
import { NavigationTreeContainer } from './NavigationTreeContainer';
import { NavigationTreeItem } from './NavigationTreeItem';

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

const useRoute = () => {
  const [currentRoute, setCurrentRoute] = useState('one-one');

  return (route: string) => ({
    active: route === currentRoute,
    onClick: () => setCurrentRoute(route),
  });
};

const StitchesTree = ({ fullWidth }: { fullWidth: boolean }) => {
  const navigationHandlerProps = useRoute();

  return (
    <NavigationTreeDrawer fullWidth={fullWidth}>
      <NavigationTreeContainer fullWidth={fullWidth}>
        <NavigationTreeItem label="One" subtitle="/one" defaultExpanded>
          <NavigationTreeItem {...navigationHandlerProps('one-one')} label="One.One" />
          <NavigationTreeItem label="One.Two" nestedChildrenLevel={2} defaultExpanded>
            <NavigationTreeItem
              {...navigationHandlerProps('one-two-one')}
              startAdornment={<ArchiveIcon />}
              label="One.Two.One"
            />
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem {...navigationHandlerProps('two')} label="Two" subtitle="/two" />
      </NavigationTreeContainer>
    </NavigationTreeDrawer>
  );
};

const VanillaTree = ({ fullWidth }: { fullWidth: boolean }) => {
  const navigationHandlerProps = useRoute();

  return (
    <NavigationTreeDrawerVanilla fullWidth={fullWidth}>
      <NavigationTreeContainerVanilla>
        <NavigationTreeItemVanilla label="One" subtitle="/one" defaultExpanded>
          <NavigationTreeItemVanilla {...navigationHandlerProps('one-one')} label="One.One" />
          <NavigationTreeItemVanilla label="One.Two" defaultExpanded>
            <NavigationTreeItemVanilla
              {...navigationHandlerProps('one-two-one')}
              startAdornment={<ArchiveIcon />}
              label="One.Two.One"
            />
          </NavigationTreeItemVanilla>
        </NavigationTreeItemVanilla>
        <NavigationTreeItemVanilla {...navigationHandlerProps('two')} label="Two" subtitle="/two" />
      </NavigationTreeContainerVanilla>
    </NavigationTreeDrawerVanilla>
  );
};

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    {[false, true].map((fullWidth) => (
      <FlexVanilla key={String(fullWidth)} gap={6}>
        <BoxVanilla css={{ width: 260 }}>
          <H3Vanilla css={{ marginBottom: '16px' }}>
            Stitches Version{fullWidth ? ' (fullWidth)' : ''}
          </H3Vanilla>
          <StitchesTree fullWidth={fullWidth} />
        </BoxVanilla>
        <BoxVanilla css={{ width: 260 }}>
          <H3Vanilla css={{ marginBottom: '16px' }}>
            Vanilla Extract Version{fullWidth ? ' (fullWidth)' : ''}
          </H3Vanilla>
          <VanillaTree fullWidth={fullWidth} />
        </BoxVanilla>
      </FlexVanilla>
    ))}
  </FlexVanilla>
);

export default Component;
