import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  DashboardIcon,
  PersonIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';

import {
  NavigationDrawer,
  NavigationContainer,
  NavigationDrawerProps,
  NavigationDrawerVariants,
  NavigationItem,
} from './Navigation';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Badge } from '../Badge';
import { Text } from '../Text';
import { useDebouncedCallback } from 'use-debounce/lib';

export default {
  title: 'Components/Navigation',
  component: NavigationDrawer,
  argTypes: {
    elevation: {
      control: 'number',
    },
  },
} as ComponentMeta<typeof NavigationDrawer>;

const BaseNavigationDrawer = (props: NavigationDrawerProps): JSX.Element => (
  <NavigationDrawer {...props} />
);
const NavigationDrawerForStory = modifyVariantsForStory<
  NavigationDrawerVariants,
  NavigationDrawerProps
>(BaseNavigationDrawer);

const useNavigationSample = (initialRoute = '/') => {
  const [currentRoute, setCurrentRoute] = useState(initialRoute);
  const navigateTo = useDebouncedCallback((route: string) => setCurrentRoute(route), 300);
  const navigationHandlerProps = (route: string) => ({
    active: route === currentRoute,
    onClick: () => navigateTo(route),
  });

  return { navigationHandlerProps };
};

const Template: ComponentStory<typeof NavigationDrawerForStory> = (args) => {
  const { navigationHandlerProps } = useNavigationSample();

  return (
    <NavigationDrawerForStory {...args}>
      <NavigationItem {...navigationHandlerProps('/')}>Dashboard</NavigationItem>
      <NavigationItem {...navigationHandlerProps('/profile')}>Profile</NavigationItem>
      <NavigationItem {...navigationHandlerProps('/settings')}>Settings</NavigationItem>
      <NavigationItem {...navigationHandlerProps('/help')}>Help</NavigationItem>
    </NavigationDrawerForStory>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  elevation: 1,
};

const AdornmentsTemplate: ComponentStory<typeof NavigationDrawerForStory> = (args) => {
  const { navigationHandlerProps } = useNavigationSample();

  return (
    <NavigationDrawer css={{ height: '100%' }} {...args}>
      <NavigationItem {...navigationHandlerProps('/')} startAdornment={<DashboardIcon />}>
        Dashboard
      </NavigationItem>
      <NavigationItem {...navigationHandlerProps('/profile')} startAdornment={<PersonIcon />}>
        Profile
      </NavigationItem>
      <NavigationItem
        {...navigationHandlerProps('/settings')}
        startAdornment={<GearIcon />}
        endAdornment={
          <Badge
            css={{
              height: '$3',
              borderRadius: '$pill',
              fontSize: '$0',
              color: '$hiContrast',
            }}
          >
            99+
          </Badge>
        }
      >
        Settings
      </NavigationItem>
      <NavigationItem
        {...navigationHandlerProps('/help')}
        startAdornment={<QuestionMarkCircledIcon />}
      >
        Help
      </NavigationItem>
    </NavigationDrawer>
  );
};

export const Adornments = AdornmentsTemplate.bind({});

Adornments.args = {
  elevation: 1,
};

const MultipleSectionsTemplate: ComponentStory<typeof NavigationDrawerForStory> = (args) => {
  const { navigationHandlerProps } = useNavigationSample();

  return (
    <NavigationDrawer css={{ height: '90vh' }} {...args}>
      <NavigationContainer
        css={{
          mb: '$3',
          p: '$4',
          textAlign: 'center',
          border: '1px solid hsla(0, 0%, 50%, 0.51)',
          borderRadius: '$3',
        }}
      >
        <Text>Company Logo</Text>
      </NavigationContainer>
      <NavigationContainer css={{ flexGrow: 1 }}>
        <NavigationItem css={{ c: '$hiContrast' }} {...navigationHandlerProps('/')} startAdornment={<DashboardIcon />}>
          Dashboard
        </NavigationItem>
        <NavigationItem {...navigationHandlerProps('/profile')} startAdornment={<PersonIcon />}>
          Profile
        </NavigationItem>
        <NavigationItem {...navigationHandlerProps('/settings')} startAdornment={<GearIcon />}>
          Settings
        </NavigationItem>
      </NavigationContainer>
      <NavigationContainer>
        <NavigationItem
          {...navigationHandlerProps('/help')}
          startAdornment={<QuestionMarkCircledIcon />}
        >
          Help
        </NavigationItem>
      </NavigationContainer>
    </NavigationDrawer>
  );
};

export const MultiSection = MultipleSectionsTemplate.bind({});

MultiSection.args = {
  elevation: 1,
};
