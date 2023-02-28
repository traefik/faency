import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavigationTreeItem from './NavigationTreeItem';
import NavigationTreeContainer from './NavigationTreeContainer';
import { NavigationDrawer } from '../Navigation';
import { BookmarkIcon } from '@radix-ui/react-icons';

export default {
  title: 'Components/NavigationTreeItem',
  component: NavigationDrawer,
} as ComponentMeta<typeof NavigationDrawer>;

export const Basic: ComponentStory<typeof NavigationDrawer> = () => {
  const [currentRoute, setCurrentRoute] = useState('/');

  const navigationHandlerProps = (route: string) => ({
    active: route === currentRoute,
    onClick: () => setCurrentRoute(route),
  });

  return (
    <NavigationDrawer>
      <NavigationTreeContainer>
        <NavigationTreeItem {...navigationHandlerProps('one')} label="One">
          <NavigationTreeItem {...navigationHandlerProps('one-one')} as="a" label="One.One" />
          <NavigationTreeItem
            customCollapseIcon={<BookmarkIcon />}
            {...navigationHandlerProps('one-two')}
            label="One.Two"
          >
            <NavigationTreeItem {...navigationHandlerProps('one-two-one')} label="One.Two.One" />
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem {...navigationHandlerProps('two')} label="Two" />
      </NavigationTreeContainer>
    </NavigationDrawer>
  );
};
