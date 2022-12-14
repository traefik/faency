import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './DropdownMenu';
import { Button } from '../Button';

export default {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  argTypes: { onOpenChange: { action: 'clicked' } },
} as ComponentMeta<typeof DropdownMenu>;

const Template: ComponentStory<typeof DropdownMenu> = (args) => (
  <DropdownMenu {...args}>
    <DropdownMenuTrigger asChild>
      <Button>Dropdown</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuGroup>
        <DropdownMenuItem>Item</DropdownMenuItem>
        <DropdownMenuItem>Item</DropdownMenuItem>
        <DropdownMenuItem>Item</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>Item</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Item</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Item</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Choose one</DropdownMenuLabel>
        <DropdownMenuRadioGroup value="one">
          <DropdownMenuRadioItem value="one">Item</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="two">Item</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="three">Item</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Basic = Template.bind({});

export const Modal = Template.bind({});

Modal.args = {
  modal: true,
};

export const DefaultOpen = Template.bind({});

DefaultOpen.args = {
  defaultOpen: true,
};

const Customize: ComponentStory<typeof DropdownMenu> = (args) => (
  <DropdownMenu {...args}>
    <DropdownMenuTrigger asChild>
      <Button>Dropdown</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent css={{ c: '$hiContrast' }} align="end">
      <DropdownMenuGroup css={{ c: '$hiContrast' }}>
        <DropdownMenuItem css={{ c: '$hiContrast' }}>Item</DropdownMenuItem>
        <DropdownMenuItem>Item</DropdownMenuItem>
        <DropdownMenuItem>Item</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem css={{ c: '$hiContrast' }}>Item</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Item</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Item</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator css={{ c: '$hiContrast' }} />
        <DropdownMenuLabel css={{ c: '$hiContrast' }}>Choose one</DropdownMenuLabel>
        <DropdownMenuRadioGroup css={{ c: '$hiContrast' }} value="one">
          <DropdownMenuRadioItem value="one" css={{ c: '$hiContrast' }}>
            Item
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="two">Item</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="three">Item</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);
