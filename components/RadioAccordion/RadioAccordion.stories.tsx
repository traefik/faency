// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import {
  AccordionContent,
  AccordionContentVanilla,
  AccordionItem,
  AccordionItemVanilla,
  AccordionRoot,
  AccordionRootVanilla,
  AccordionTrigger,
  AccordionTriggerVanilla,
} from '../Accordion';
import { Box } from '../Box';
import { FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { Text } from '../Text';
import {
  RadioAccordionContent,
  RadioAccordionItem,
  RadioAccordionRoot,
  RadioAccordionTrigger,
} from './RadioAccordion';
import {
  RadioAccordionContentVanilla,
  RadioAccordionItemVanilla,
  RadioAccordionRootVanilla,
  RadioAccordionTriggerVanilla,
} from './RadioAccordion.vanilla';

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

const ITEMS = ['item-1', 'item-2', 'item-3'];

export const Comparison: StoryFn = () => (
  <FlexVanilla gap={6}>
    <FlexVanilla direction="column" gap={5} css={{ width: 300 }}>
      <H3Vanilla>Stitches Version</H3Vanilla>
      <RadioAccordionRoot defaultValue="item-1">
        {ITEMS.map((item) => (
          <RadioAccordionItem key={item} value={item}>
            <RadioAccordionTrigger size="medium">{item} trigger</RadioAccordionTrigger>
            <RadioAccordionContent size="medium">{item} content</RadioAccordionContent>
          </RadioAccordionItem>
        ))}
      </RadioAccordionRoot>
      <AccordionRoot type="single" collapsible defaultValue="outer">
        <AccordionItem value="outer" css={{ boxShadow: 'none' }}>
          <AccordionTrigger>Under an accordion</AccordionTrigger>
          <AccordionContent>
            <RadioAccordionRoot>
              {ITEMS.map((item) => (
                <RadioAccordionItem key={item} value={item}>
                  <RadioAccordionTrigger>{item} trigger</RadioAccordionTrigger>
                  <RadioAccordionContent>{item} content</RadioAccordionContent>
                </RadioAccordionItem>
              ))}
            </RadioAccordionRoot>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </FlexVanilla>
    <FlexVanilla direction="column" gap={5} css={{ width: 300 }}>
      <H3Vanilla>Vanilla Extract Version</H3Vanilla>
      <RadioAccordionRootVanilla defaultValue="item-1">
        {ITEMS.map((item) => (
          <RadioAccordionItemVanilla key={item} value={item}>
            <RadioAccordionTriggerVanilla size="medium">
              {item} trigger
            </RadioAccordionTriggerVanilla>
            <RadioAccordionContentVanilla size="medium">
              {item} content
            </RadioAccordionContentVanilla>
          </RadioAccordionItemVanilla>
        ))}
      </RadioAccordionRootVanilla>
      <AccordionRootVanilla type="single" collapsible defaultValue="outer">
        <AccordionItemVanilla value="outer" css={{ boxShadow: 'none' }}>
          <AccordionTriggerVanilla>Under an accordion</AccordionTriggerVanilla>
          <AccordionContentVanilla>
            <RadioAccordionRootVanilla>
              {ITEMS.map((item) => (
                <RadioAccordionItemVanilla key={item} value={item}>
                  <RadioAccordionTriggerVanilla>{item} trigger</RadioAccordionTriggerVanilla>
                  <RadioAccordionContentVanilla>{item} content</RadioAccordionContentVanilla>
                </RadioAccordionItemVanilla>
              ))}
            </RadioAccordionRootVanilla>
          </AccordionContentVanilla>
        </AccordionItemVanilla>
      </AccordionRootVanilla>
    </FlexVanilla>
  </FlexVanilla>
);

export default Component;
