import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from '.';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { VariantProps } from '../../stitches.config';

import { Badge } from '../Badge';
import { Text } from '../Text';
import { Card } from '../Card';
import { Flex } from '../Flex';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

type AccordionVariants = VariantProps<typeof AccordionRoot>

const BaseAccordion = (props: any): JSX.Element => <AccordionRoot {...props} />;
const AccordionForStory = modifyVariantsForStory<AccordionVariants, any>(BaseAccordion);

export default {
  title: 'Components/Accordion',
  component: AccordionForStory,
} as ComponentMeta<typeof AccordionForStory>;

const Template: ComponentStory<typeof AccordionForStory> = (args) => (
  <Card css={{ width: 300 }}>
    <AccordionForStory {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Item1 Trigger</AccordionTrigger>
        <AccordionContent>Item1 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Item2 Trigger</AccordionTrigger>
        <AccordionContent>Item2 Content</AccordionContent>
      </AccordionItem>
    </AccordionForStory>
  </Card>
)

export const Single = Template.bind({});
Single.args = {
  type: 'single',
};

export const Collapsible = Template.bind({});
Collapsible.args = {
  type: 'single',
  collapsible: true,
}

export const MultipleCollapsible = Template.bind({});
MultipleCollapsible.args = {
  type: 'multiple',
  collapsible: true,
};


export const Complex
  : ComponentStory<typeof AccordionForStory> = (args) => (
    <Card css={{ width: 300 }}>
      <AccordionForStory {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Flex
              css={{ flexGrow: 1 }}
              align="center"
              justify="space-between"
            >
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
    </Card>
  )

Complex.args = {
  type: 'multiple',
  collapsible: true,
};