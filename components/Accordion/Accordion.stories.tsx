import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { VariantProps } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Badge } from '../Badge';
import { Box } from '../Box';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from '../Dialog';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '.';

type AccordionVariants = VariantProps<typeof AccordionRoot>;

const BaseAccordion = (props: any): JSX.Element => <AccordionRoot {...props} />;
const AccordionForStory = modifyVariantsForStory<AccordionVariants, any>(BaseAccordion);

const Component: Meta<typeof AccordionForStory> = {
  title: 'Components/Accordion',
  component: AccordionForStory,
};

const Template: StoryFn<typeof AccordionForStory> = ({ size, ...args }) => (
  <Box css={{ width: 300 }}>
    <AccordionForStory {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger size={size}>Item1 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item1 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger size={size}>Item2 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item2 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger size={size}>Item3 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item3 Content</AccordionContent>
      </AccordionItem>
    </AccordionForStory>
  </Box>
);

export const Single: StoryFn<typeof AccordionForStory> = Template.bind({});
Single.args = {
  type: 'single',
  size: 'small',
};
Single.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['small', 'medium', 'large'],
  },
};

export const Large: StoryFn<typeof AccordionForStory> = Template.bind({});
Large.args = {
  size: 'large',
};

export const Collapsible: StoryFn<typeof AccordionForStory> = Template.bind({});
Collapsible.args = {
  type: 'single',
  collapsible: true,
};
Collapsible.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['small', 'medium', 'large'],
  },
};

export const MultipleCollapsible: StoryFn<typeof AccordionForStory> = Template.bind({});
MultipleCollapsible.args = {
  type: 'multiple',
  // @FIXME console warning of this props not being a boolean attribute
  collapsible: true,
};
MultipleCollapsible.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['small', 'medium', 'large'],
  },
};

export const Complex: StoryFn<typeof AccordionForStory> = (args) => (
  <Box css={{ width: 300 }}>
    <AccordionForStory {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Flex css={{ flexGrow: 1 }} align="center" justify="space-between">
            <Text>Title</Text>
            <Badge>Status</Badge>
            <Text>Metadata</Text>
          </Flex>
        </AccordionTrigger>
        <AccordionContent>
          <Flex gap="2">
            <MagnifyingGlassIcon />
            <Text>More information</Text>
            <Text>Version</Text>
          </Flex>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Item2 Trigger</AccordionTrigger>
        <AccordionContent>Item2 Content</AccordionContent>
      </AccordionItem>
    </AccordionForStory>
  </Box>
);

Complex.args = {
  type: 'multiple',
  collapsible: true,
};
Complex.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['small', 'medium', 'large'],
  },
};

export const InsideModal: StoryFn<typeof AccordionForStory> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
      </DialogTrigger>

      <Box>
        {[...Array(10)].map((_, i) => (
          <Text key={i} css={{ my: '$1' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>
        ))}
      </Box>

      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Box css={{ width: 300, mt: '$5' }}>
            <AccordionForStory {...args}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <Flex css={{ flexGrow: 1 }} align="center" justify="space-between">
                    <Text>Title</Text>
                    <Badge>Status</Badge>
                    <Text>Metadata</Text>
                  </Flex>
                </AccordionTrigger>
                <AccordionContent>
                  <Flex gap="2">
                    <MagnifyingGlassIcon />
                    <Text>More information</Text>
                    <Text>Version</Text>
                  </Flex>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Item2 Trigger</AccordionTrigger>
                <AccordionContent>Item2 Content</AccordionContent>
              </AccordionItem>
            </AccordionForStory>
          </Box>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

InsideModal.args = {
  type: 'multiple',
  collapsible: true,
};
InsideModal.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['small', 'medium', 'large'],
  },
};

export default Component;
