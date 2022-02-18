import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from '.';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { VariantProps } from '../../stitches.config';

import { Badge } from '../Badge';
import { Text } from '../Text';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

type AccordionVariants = VariantProps<typeof AccordionRoot>

const BaseAccordion = (props: any): JSX.Element => <AccordionRoot {...props} />;
const AccordionForStory = modifyVariantsForStory<AccordionVariants, any>(BaseAccordion);

export default {
  title: 'Components/Accordion',
  component: AccordionForStory,
} as ComponentMeta<typeof AccordionForStory>;

const Template: ComponentStory<typeof AccordionForStory> = ({ size, ...args }) => (
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
)

export const Single = Template.bind({});
Single.args = {
  type: 'single',
  size: 'small',
};
Single.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['small', 'medium', 'large'],
  }
}

export const Large = Template.bind({});
Large.args = {
  size: 'large',
}

export const Collapsible = Template.bind({});
Collapsible.args = {
  type: 'single',
  collapsible: true,
}
Collapsible.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['small', 'medium', 'large'],
  }
}

export const MultipleCollapsible = Template.bind({});
MultipleCollapsible.args = {
  type: 'multiple',
  collapsible: true,
};
MultipleCollapsible.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['small', 'medium', 'large'],
  }
}

export const Complex
  : ComponentStory<typeof AccordionForStory> = (args) => (
    <Box css={{ width: 300 }}>
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
    </Box>
  )

Complex.args = {
  type: 'multiple',
  collapsible: true,
};
Complex.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['small', 'medium', 'large'],
  }
}

const Customize: ComponentStory<typeof AccordionForStory> = ({ size, ...args }) => (
  <Box css={{ width: 300 }}>
    <AccordionForStory css={{ maxWidth: 250 }} {...args}>
      <AccordionItem css={{ bc: '$hiContrast' }} value="item-1">
        <AccordionTrigger css={{ c: '$hiContrast' }} size={size}>Item1 Trigger</AccordionTrigger>
        <AccordionContent css={{ c: '$hiContrast' }} size={size}>Item1 Content</AccordionContent>
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
)