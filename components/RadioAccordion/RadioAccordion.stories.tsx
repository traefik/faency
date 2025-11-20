import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '../Accordion';
import { Box } from '../Box';
import { Text } from '../Text';
import {
  RadioAccordionContent,
  RadioAccordionItem,
  RadioAccordionRoot,
  RadioAccordionTrigger,
} from './RadioAccordion';

const Component: Meta<typeof RadioAccordionRoot> = {
  title: 'Components/RadioAccordion',
  component: RadioAccordionRoot,
};

export const Basic: StoryFn<typeof RadioAccordionRoot> = (args) => (
  <Box css={{ width: 300 }}>
    <RadioAccordionRoot {...args}>
      <RadioAccordionItem value="item-1">
        <RadioAccordionTrigger>Item1 Trigger</RadioAccordionTrigger>
        <RadioAccordionContent>Item1 Content</RadioAccordionContent>
      </RadioAccordionItem>
      <RadioAccordionItem value="item-2">
        <RadioAccordionTrigger>Item2 Trigger</RadioAccordionTrigger>
        <RadioAccordionContent>Item2 Content</RadioAccordionContent>
      </RadioAccordionItem>
      <RadioAccordionItem value="item-3">
        <RadioAccordionTrigger>Item3 Trigger</RadioAccordionTrigger>
        <RadioAccordionContent>Item3 Content</RadioAccordionContent>
      </RadioAccordionItem>
    </RadioAccordionRoot>
  </Box>
);

export const UnderAccordion: StoryFn<typeof RadioAccordionRoot> = (args) => (
  <AccordionRoot type="single" collapsible>
    <AccordionItem value="default" css={{ boxShadow: 'none' }}>
      <AccordionTrigger>
        <Text>Open the accordion</Text>
      </AccordionTrigger>
      <AccordionContent>
        <RadioAccordionRoot {...args}>
          <RadioAccordionItem value="item-1">
            <RadioAccordionTrigger>Item1 Trigger</RadioAccordionTrigger>
            <RadioAccordionContent>Item1 Content</RadioAccordionContent>
          </RadioAccordionItem>
          <RadioAccordionItem value="item-2">
            <RadioAccordionTrigger>Item2 Trigger</RadioAccordionTrigger>
            <RadioAccordionContent>Item2 Content</RadioAccordionContent>
          </RadioAccordionItem>
          <RadioAccordionItem value="item-3">
            <RadioAccordionTrigger>Item3 Trigger</RadioAccordionTrigger>
            <RadioAccordionContent>Item3 Content</RadioAccordionContent>
          </RadioAccordionItem>
        </RadioAccordionRoot>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
);

export default Component;
