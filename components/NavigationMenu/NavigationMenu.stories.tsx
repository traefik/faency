import { GearIcon, PersonIcon } from '@radix-ui/react-icons';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Container } from '../Container';
import { Flex } from '../Flex';
import { Link } from '../Link';
import { NavigationTreeContainer, NavigationTreeItem } from '../NavigationTree';
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
  NavigationMenuViewport,
} from './NavigationMenu';

const BaseNavigationMenu = (props: NavigationMenuProps): JSX.Element => (
  <NavigationMenu {...props} />
);

const NavigationMenuForStory = modifyVariantsForStory<NavigationMenuVariants, NavigationMenuProps>(
  BaseNavigationMenu
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
            <Text css={{ cursor: 'pointer' }}>Menu links</Text>
          </NavigationMenuTrigger>
          <NavigationMenuContent css={{ maxWidth: 265, p: '$2' }}>
            <Flex direction="column" gap={1}>
              <NavigationMenuLink asChild>
                <Link href="#">A link</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="#">Another link</Link>
              </NavigationMenuLink>
            </Flex>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Text css={{ cursor: 'pointer' }}>Navigation tree items</Text>
          </NavigationMenuTrigger>
          <NavigationMenuContent css={{ maxWidth: 265, p: '$2' }}>
            <NavigationTreeContainer>
              <NavigationTreeItem label="Profile" startAdornment={<PersonIcon />} />
              <NavigationTreeItem label="Settings" startAdornment={<GearIcon />} />
            </NavigationTreeContainer>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenuForStory>
  </Container>
);

export const Basic: StoryFn<typeof NavigationMenuForStory> = Template.bind({});

// export const IconTrigger: StoryFn<typeof NavigationMenuForStory> = (args) => (
//   <Container>
//     <NavigationMenuForStory {...args}>
//       <PopoverTrigger asChild>
//         <Button size="small">
//           <HamburgerMenuIcon />
//         </Button>
//       </PopoverTrigger>
//       <PopoverPortal>
//         <PopoverContent arrowCss={{ fill: '$primary' }} css={{ bc: '$primary', p: '$2' }}>
//           <Text css={{ c: '$loContrast' }}>Content</Text>
//         </PopoverContent>
//       </PopoverPortal>
//     </NavigationMenuForStory>
//   </Container>
// );

export default Component;
