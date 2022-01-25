import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioAccordionRoot, RadioAccordionItem, RadioAccordionContent, RadioAccordionTrigger } from './RadioAccordion';
import { Box } from '../Box';

export default {
  title: 'Components/RadioAccordion',
  component: RadioAccordionRoot,
} as ComponentMeta<typeof RadioAccordionRoot>;

export const Basic: ComponentStory<typeof RadioAccordionRoot> = (args) => (
  <Box css={{ width: 300 }}>
    <RadioAccordionRoot {...args}>
      <RadioAccordionItem value="item-1">
        <RadioAccordionTrigger >Item1 Trigger</RadioAccordionTrigger>
        <RadioAccordionContent >Item1 Content</RadioAccordionContent>
      </RadioAccordionItem>
      <RadioAccordionItem value="item-2">
        <RadioAccordionTrigger >Item2 Trigger</RadioAccordionTrigger>
        <RadioAccordionContent >Item2 Content</RadioAccordionContent>
      </RadioAccordionItem>
      <RadioAccordionItem value="item-3">
        <RadioAccordionTrigger >Item3 Trigger</RadioAccordionTrigger>
        <RadioAccordionContent >Item3 Content</RadioAccordionContent>
      </RadioAccordionItem>
    </RadioAccordionRoot>
  </Box>
);