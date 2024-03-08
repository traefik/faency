import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import {
  RadioAccordionRoot,
  RadioAccordionItem,
  RadioAccordionContent,
  RadioAccordionTrigger,
} from './RadioAccordion';
import { Box } from '../Box';
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '../Accordion';
import { Text } from '../Text';

export default {
  title: 'Components/RadioAccordion',
  component: RadioAccordionRoot,
} as Meta<typeof RadioAccordionRoot>;

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

const Customize: StoryFn<typeof RadioAccordionRoot> = (args) => (
  <Box css={{ width: 300 }}>
    <RadioAccordionRoot {...args} css={{ bc: '$red9' }}>
      <RadioAccordionItem value="item-1" css={{ bc: '$red9' }}>
        <RadioAccordionTrigger css={{ bc: '$red9' }}>Item1 Trigger</RadioAccordionTrigger>
        <RadioAccordionContent css={{ bc: '$red9' }}>Item1 Content</RadioAccordionContent>
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
