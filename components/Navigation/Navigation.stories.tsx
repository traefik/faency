import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  DashboardIcon,
  PersonIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { VariantProps } from '@stitches/react';
import { CSS } from '../../stitches.config';

import {
  NavigationDrawer,
  NavigationContainer,
  NavigationLink,
  NavigationButton,
  NavigationDrawerProps,
  NavigationContainerProps,
  NavigationDrawerVariants,
  NavigationItem,
} from './Navigation';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Badge } from '../Badge';
import { Text } from '../Text';

export default {
  title: 'Components/Navigation',
  component: NavigationDrawer,
  subComponents: { NavigationContainer, NavigationLink, NavigationButton },
  // argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof NavigationDrawer>;

const BaseNavigationDrawer = (props: NavigationDrawerProps): JSX.Element => (
  <NavigationDrawer {...props} />
);
const NavigationDrawerForStory = modifyVariantsForStory<
  NavigationDrawerVariants,
  NavigationDrawerProps
>(BaseNavigationDrawer);

const Template: ComponentStory<typeof NavigationDrawerForStory> = (args) => (
  <NavigationDrawerForStory {...args}>
    <NavigationButton active>Dashboard</NavigationButton>
    <NavigationButton>Profile</NavigationButton>
    <NavigationButton>Settings</NavigationButton>
    <NavigationLink href="#">Help</NavigationLink>
  </NavigationDrawerForStory>
);

export const Basic = Template.bind({});

Basic.args = {
  elevation: 1,
};

const AdornmentsTemplate: ComponentStory<typeof NavigationDrawerForStory> = (args) => (
  <NavigationDrawer css={{ height: '100%' }} {...args}>
    <NavigationItem startAdornment={<DashboardIcon />} active>
      Dashboard
    </NavigationItem>
    <NavigationItem startAdornment={<PersonIcon />}>Profile</NavigationItem>
    <NavigationItem
      as="button"
      startAdornment={<GearIcon />}
      endAdornment={
        <Badge
          css={{
            height: '$3',
            borderRadius: '$pill',
            fontSize: '$0',
            fontWeight: 500,
            color: '$hiContrast',
          }}
        >
          99+
        </Badge>
      }
    >
      Settings
    </NavigationItem>
    <NavigationItem startAdornment={<QuestionMarkCircledIcon />} as="a" href="#">
      Help
    </NavigationItem>
  </NavigationDrawer>
);

export const Adornments = AdornmentsTemplate.bind({});

Adornments.args = {
  elevation: 1,
};

const MultipleSectionsTemplate: ComponentStory<typeof NavigationDrawerForStory> = (args) => (
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
      <NavigationItem startAdornment={<DashboardIcon />} active>
        Dashboard
      </NavigationItem>
      <NavigationItem startAdornment={<PersonIcon />}>Profile</NavigationItem>
      <NavigationItem startAdornment={<GearIcon />}>Settings</NavigationItem>
    </NavigationContainer>
    <NavigationContainer>
      <NavigationItem startAdornment={<QuestionMarkCircledIcon />} as="a" href="#">
        Help
      </NavigationItem>
    </NavigationContainer>
  </NavigationDrawer>
);

export const MultiSection = MultipleSectionsTemplate.bind({});

MultiSection.args = {
  elevation: 1,
};
