// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { Button } from '../Button';
import { ButtonVanilla } from '../Button/Button.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';
import {
  DropdownMenuCheckboxItemVanilla,
  DropdownMenuContentVanilla,
  DropdownMenuGroupVanilla,
  DropdownMenuItemVanilla,
  DropdownMenuLabelVanilla,
  DropdownMenuPortalVanilla,
  DropdownMenuRadioGroupVanilla,
  DropdownMenuRadioItemVanilla,
  DropdownMenuSeparatorVanilla,
  DropdownMenuTriggerVanilla,
  DropdownMenuVanilla,
} from './DropdownMenu.vanilla';

const Component: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  argTypes: { onOpenChange: { action: 'clicked' } },
};

const Template: StoryFn<typeof DropdownMenu> = (args) => (
  <DropdownMenu {...args}>
    <DropdownMenuTrigger asChild>
      <Button>Dropdown</Button>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
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
    </DropdownMenuPortal>
  </DropdownMenu>
);

export const Basic: StoryFn<typeof DropdownMenu> = Template.bind({});

export const Modal: StoryFn<typeof DropdownMenu> = Template.bind({});

Modal.args = {
  modal: true,
};

export const DefaultOpen: StoryFn<typeof DropdownMenu> = Template.bind({});

DefaultOpen.args = {
  defaultOpen: true,
};

const VanillaTemplate: StoryFn<typeof DropdownMenuVanilla> = (args) => (
  <DropdownMenuVanilla {...args}>
    <DropdownMenuTriggerVanilla as={ButtonVanilla}>Dropdown</DropdownMenuTriggerVanilla>
    <DropdownMenuPortalVanilla>
      <DropdownMenuContentVanilla align="end">
        <DropdownMenuGroupVanilla>
          <DropdownMenuItemVanilla>Item</DropdownMenuItemVanilla>
          <DropdownMenuItemVanilla>Item</DropdownMenuItemVanilla>
          <DropdownMenuItemVanilla>Item</DropdownMenuItemVanilla>
          <DropdownMenuSeparatorVanilla />
          <DropdownMenuCheckboxItemVanilla>Item</DropdownMenuCheckboxItemVanilla>
          <DropdownMenuCheckboxItemVanilla checked>Item</DropdownMenuCheckboxItemVanilla>
          <DropdownMenuCheckboxItemVanilla>Item</DropdownMenuCheckboxItemVanilla>
          <DropdownMenuSeparatorVanilla />
          <DropdownMenuLabelVanilla>Choose one</DropdownMenuLabelVanilla>
          <DropdownMenuRadioGroupVanilla value="one">
            <DropdownMenuRadioItemVanilla value="one">Item</DropdownMenuRadioItemVanilla>
            <DropdownMenuRadioItemVanilla value="two">Item</DropdownMenuRadioItemVanilla>
            <DropdownMenuRadioItemVanilla value="three">Item</DropdownMenuRadioItemVanilla>
          </DropdownMenuRadioGroupVanilla>
        </DropdownMenuGroupVanilla>
      </DropdownMenuContentVanilla>
    </DropdownMenuPortalVanilla>
  </DropdownMenuVanilla>
);

export const Comparison: StoryFn = () => (
  <FlexVanilla gap={9}>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <Template />
    </BoxVanilla>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <VanillaTemplate />
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
