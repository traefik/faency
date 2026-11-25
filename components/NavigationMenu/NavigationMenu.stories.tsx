import { GearIcon, PersonIcon } from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box';
import { Container } from '../Container';
import { FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { Link } from '../Link';
import { NavigationItem, NavigationLinkVanilla } from '../Navigation';
import { Text, TextVanilla } from '../Text';
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
import {
  NavigationMenuContentVanilla,
  NavigationMenuItemVanilla,
  NavigationMenuLinkVanilla,
  NavigationMenuListVanilla,
  NavigationMenuTriggerVanilla,
  NavigationMenuVanilla,
} from './NavigationMenu.vanilla';

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

const StitchesMenu = () => (
  <NavigationMenu>
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
  </NavigationMenu>
);

const VanillaMenu = () => (
  <NavigationMenuVanilla>
    <NavigationMenuListVanilla>
      <NavigationMenuItemVanilla>
        <NavigationMenuTriggerVanilla>
          <TextVanilla css={{ cursor: 'pointer' }}>Links</TextVanilla>
        </NavigationMenuTriggerVanilla>
        <NavigationMenuContentVanilla css={{ display: 'flex', flexDirection: 'column', gap: '$1' }}>
          <NavigationMenuLinkVanilla as={Link} href="#">
            A link
          </NavigationMenuLinkVanilla>
          <NavigationMenuLinkVanilla as={Link} href="#">
            Another link
          </NavigationMenuLinkVanilla>
        </NavigationMenuContentVanilla>
      </NavigationMenuItemVanilla>

      <NavigationMenuItemVanilla>
        <NavigationMenuTriggerVanilla>
          <TextVanilla css={{ cursor: 'pointer' }}>Navigation items</TextVanilla>
        </NavigationMenuTriggerVanilla>
        <NavigationMenuContentVanilla>
          <NavigationMenuLinkVanilla
            as={NavigationLinkVanilla}
            href="#"
            startAdornment={<PersonIcon />}
          >
            Profile
          </NavigationMenuLinkVanilla>
          <NavigationMenuLinkVanilla
            as={NavigationLinkVanilla}
            href="#"
            startAdornment={<GearIcon />}
          >
            Settings
          </NavigationMenuLinkVanilla>
        </NavigationMenuContentVanilla>
      </NavigationMenuItemVanilla>
    </NavigationMenuListVanilla>
  </NavigationMenuVanilla>
);

export const Comparison: StoryFn = () => (
  <FlexVanilla gap={6}>
    <BoxVanilla css={{ width: 360, minHeight: 200 }}>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <StitchesMenu />
    </BoxVanilla>
    <BoxVanilla css={{ width: 360, minHeight: 200 }}>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <VanillaMenu />
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
