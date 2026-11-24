import {
  DashboardIcon,
  GearIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React, { useState } from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Badge, BadgeVanilla } from '../Badge';
import { BoxVanilla } from '../Box';
import { FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { Text } from '../Text';
import {
  NavigationContainer,
  NavigationDrawer,
  NavigationDrawerProps,
  NavigationDrawerVariants,
  NavigationItem,
} from './Navigation';
import {
  NavigationContainerVanilla,
  NavigationDrawerVanilla,
  NavigationItemVanilla,
  NavigationLinkVanilla,
} from './Navigation.vanilla';

const Component: Meta<typeof NavigationDrawer> = {
  title: 'Components/Navigation',
  component: NavigationDrawer,
  argTypes: {
    elevation: {
      control: 'number',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

const BaseNavigationDrawer = (props: NavigationDrawerProps): JSX.Element => (
  <NavigationDrawer {...props} />
);
const NavigationDrawerForStory = modifyVariantsForStory<
  NavigationDrawerVariants,
  NavigationDrawerProps
>(BaseNavigationDrawer);

const useNavigationSample = (initialRoute = '/') => {
  const [currentRoute, setCurrentRoute] = useState(initialRoute);
  const navigateTo = (route: string) => setCurrentRoute(route);
  const navigationHandlerProps = (route: string) => ({
    active: route === currentRoute,
    onClick: () => navigateTo(route),
  });

  return { navigationHandlerProps };
};

const Template: StoryFn<typeof NavigationDrawerForStory> = (args) => {
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

export const Basic: StoryFn<typeof NavigationDrawerForStory> = Template.bind({});

Basic.args = {
  elevation: 1,
  fullWidth: false,
};

const AdornmentsTemplate: StoryFn<typeof NavigationDrawerForStory> = (args) => {
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

export const Adornments: StoryFn<typeof NavigationDrawerForStory> = AdornmentsTemplate.bind({});

Adornments.args = {
  elevation: 1,
};

const MultipleSectionsTemplate: StoryFn<typeof NavigationDrawerForStory> = (args) => {
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
        <NavigationItem
          css={{ c: '$hiContrast' }}
          {...navigationHandlerProps('/')}
          startAdornment={<DashboardIcon />}
        >
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

export const MultiSection: StoryFn<typeof NavigationDrawerForStory> = MultipleSectionsTemplate.bind(
  {},
);

MultiSection.args = {
  elevation: 1,
};

const badgeCss = {
  height: '$3',
  borderRadius: '$pill',
  fontSize: '$0',
  color: '$hiContrast',
};

const StitchesSample = ({ fullWidth }: { fullWidth?: boolean }) => {
  const { navigationHandlerProps } = useNavigationSample();

  return (
    <NavigationDrawer fullWidth={fullWidth}>
      <NavigationItem {...navigationHandlerProps('/')} startAdornment={<DashboardIcon />}>
        Dashboard
      </NavigationItem>
      <NavigationItem {...navigationHandlerProps('/profile')} startAdornment={<PersonIcon />}>
        Profile
      </NavigationItem>
      <NavigationItem
        {...navigationHandlerProps('/settings')}
        startAdornment={<GearIcon />}
        endAdornment={<Badge css={badgeCss}>99+</Badge>}
      >
        Settings
      </NavigationItem>
      <NavigationContainer>
        <NavigationItem as="a" href="#help" startAdornment={<QuestionMarkCircledIcon />}>
          Help (link)
        </NavigationItem>
      </NavigationContainer>
    </NavigationDrawer>
  );
};

const VanillaSample = ({ fullWidth }: { fullWidth?: boolean }) => {
  const { navigationHandlerProps } = useNavigationSample();

  return (
    <NavigationDrawerVanilla fullWidth={fullWidth}>
      <NavigationItemVanilla {...navigationHandlerProps('/')} startAdornment={<DashboardIcon />}>
        Dashboard
      </NavigationItemVanilla>
      <NavigationItemVanilla
        {...navigationHandlerProps('/profile')}
        startAdornment={<PersonIcon />}
      >
        Profile
      </NavigationItemVanilla>
      <NavigationItemVanilla
        {...navigationHandlerProps('/settings')}
        startAdornment={<GearIcon />}
        endAdornment={<BadgeVanilla css={badgeCss}>99+</BadgeVanilla>}
      >
        Settings
      </NavigationItemVanilla>
      <NavigationContainerVanilla>
        <NavigationLinkVanilla href="#help" startAdornment={<QuestionMarkCircledIcon />}>
          Help (link)
        </NavigationLinkVanilla>
      </NavigationContainerVanilla>
    </NavigationDrawerVanilla>
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
          <StitchesSample fullWidth={fullWidth} />
        </BoxVanilla>
        <BoxVanilla css={{ width: 260 }}>
          <H3Vanilla css={{ marginBottom: '16px' }}>
            Vanilla Extract Version{fullWidth ? ' (fullWidth)' : ''}
          </H3Vanilla>
          <VanillaSample fullWidth={fullWidth} />
        </BoxVanilla>
      </FlexVanilla>
    ))}
  </FlexVanilla>
);

export default Component;
