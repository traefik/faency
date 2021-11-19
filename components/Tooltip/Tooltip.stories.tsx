import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tooltip, TooltipProps, TooltipVariants } from './Tooltip';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Container } from '../Container';
import { Text } from '../Text';
import { Flex } from '../Flex';
import {
  CrossCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';

const BaseTooltip = (props: TooltipProps): JSX.Element => <Tooltip {...props} />;
const TooltipForStory = modifyVariantsForStory<TooltipVariants, TooltipProps>(BaseTooltip);

export default {
  title: 'Components/Tooltip',
  component: TooltipForStory,
} as ComponentMeta<typeof TooltipForStory>;

const Template: ComponentStory<typeof TooltipForStory> = (args) => (
  <Container>
    <TooltipForStory {...args}>
      <Text css={{ display: 'inline-block' }}>Tooltip label</Text>
    </TooltipForStory>
  </Container>
);

export const Basic = Template.bind({});

Basic.args = {
  content: 'This is some tooltip text',
};

export const MultiLine = Template.bind({});

MultiLine.args = {
  multiline: true,
  content:
    'This is some tooltip text. This box shows the max amount of text to display. If more room is needed, use a modal instead.',
};

export const NodeContent = Template.bind({});

const WarningOption = <Flex align="center" gap={1}><ExclamationTriangleIcon /><Text css={{ color: 'currentColor' }}>Warning message</Text></Flex>

NodeContent.args = {
  content: WarningOption
};

NodeContent.argTypes = {
  content: {
    options: ['Warning', 'Disabled', 'Heading'],
    mapping: {
      Warning: WarningOption,
      Disabled: <Flex align="center" gap={1}><CrossCircledIcon /><Text css={{ color: 'currentColor' }}>Disabled message</Text></Flex>,
      Heading: <Flex align="center" gap={1}><Text css={{ fontWeight: 700, color: 'CurrentColor' }} >Heading</Text><Text css={{ color: 'currentColor' }}>Content</Text></Flex>,
    },
  }
}