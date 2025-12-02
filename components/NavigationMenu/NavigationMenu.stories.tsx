import { GearIcon, PersonIcon } from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Container } from '../Container';
import { Link } from '../Link';
import { NavigationItem } from '../Navigation';
import { Text } from '../Text';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuProps,
  NavigationMenuTrigger,
  NavigationMenuVariants,
} from './NavigationMenu';

const BaseNavigationMenu = (props: NavigationMenuProps): JSX.Element => (
  <NavigationMenu {...props} />
);

const NavigationMenuForStory = modifyVariantsForStory<NavigationMenuVariants, NavigationMenuProps>(
  BaseNavigationMenu,
);

const Component: Meta<typeof NavigationMenuForStory> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenuForStory,
};

const Template: StoryFn<typeof NavigationMenuForStory> = (args) => (
  <Container>
    <NavigationMenuForStory {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Text css={{ cursor: 'pointer' }}>Links</Text>
          </NavigationMenuTrigger>
          <NavigationMenuContent css={{ display: 'flex', flexDirection: 'column', gap: '$1' }}>
            <NavigationMenuLink asChild>
              <Link href="#">A link</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="#">Another link</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Text css={{ cursor: 'pointer' }}>Navigation items</Text>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
              <NavigationItem startAdornment={<PersonIcon />}>Profile</NavigationItem>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <NavigationItem startAdornment={<GearIcon />}>Settings</NavigationItem>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuForStory>
  </Container>
);

export const Basic: StoryFn<typeof NavigationMenuForStory> = Template.bind({});

export default Component;
