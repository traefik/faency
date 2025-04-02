import { CrossCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Bubble as BubbleComponent } from '../Bubble';
import { Container } from '../Container';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Tooltip, TooltipProps, TooltipVariants } from './Tooltip';

const BaseTooltip = (props: TooltipProps): JSX.Element => <Tooltip {...props} />;
const TooltipForStory = modifyVariantsForStory<TooltipVariants, TooltipProps>(BaseTooltip);

const Component: Meta<typeof TooltipForStory> = {
  title: 'Components/Tooltip',
  component: TooltipForStory,
};

const Template: StoryFn<typeof TooltipForStory> = (args) => (
  <Container>
    <TooltipForStory {...args}>
      <Text css={{ display: 'inline-block' }}>Tooltip label</Text>
    </TooltipForStory>
  </Container>
);

export const Basic: StoryFn<typeof TooltipForStory> = Template.bind({});

Basic.args = {
  content: 'This is some tooltip text',
};

export const MultiLine: StoryFn<typeof TooltipForStory> = Template.bind({});

MultiLine.args = {
  multiline: true,
  content:
    'This is some tooltip text. This box shows the max amount of text to display. If more room is needed, use a modal instead.',
};

export const NodeContent: StoryFn<typeof TooltipForStory> = Template.bind({});

const WarningOption = (
  <Flex align="center" gap={2}>
    <ExclamationTriangleIcon />
    <Text css={{ color: 'currentColor' }}>Warning message</Text>
  </Flex>
);
const DisabledOption = (
  <Flex align="center" gap={2}>
    <CrossCircledIcon />
    <Text css={{ color: 'currentColor' }}>Disabled message</Text>
  </Flex>
);
const HeadingOption = (
  <Flex align="center" gap={2}>
    <Text css={{ fontWeight: 700, color: 'CurrentColor' }}>Heading</Text>
    <Text css={{ color: 'currentColor' }}>Content</Text>
  </Flex>
);

NodeContent.args = {
  content: WarningOption,
};

NodeContent.argTypes = {
  content: {
    options: ['Warning', 'Disabled', 'Heading'],
    mapping: {
      Warning: WarningOption,
      Disabled: DisabledOption,
      Heading: HeadingOption,
    },
  },
};

export const Bubble: StoryFn<typeof TooltipForStory> = (args) => (
  <TooltipForStory {...args} content={<Text css={{ color: 'black' }}>This is a green bubble</Text>}>
    <BubbleComponent variant="green" size="large" />
  </TooltipForStory>
);
export default Component;
