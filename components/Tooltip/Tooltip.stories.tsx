import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tooltip, TooltipProps, TooltipVariants } from './Tooltip';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Container } from '../Container';
import { Text } from '../Text';
import { Flex } from '../Flex';
import {
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import { Button } from '../Button';
import { TextField } from '../TextField';

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

NodeContent.args = {
  content: <Flex align="center" gap={1}><ExclamationTriangleIcon /><Text css={{ color: 'currentColor' }}>Warning message</Text></Flex>
}

export const DisabledChildren: ComponentStory<typeof TooltipForStory> = (args) => (
  <Container>
    <TooltipForStory {...args} />
  </Container>
);

const ButtonDisabled = <Button disabled>Tooltip button</Button>;
const TextFieldDisabled = <TextField id="disabled" label="disabled" value="value" disabled />;

DisabledChildren.args = {
  trigger: 'disabled',
  content: 'This is some tooltip text',
  children: ButtonDisabled
}

DisabledChildren.argTypes = {
  trigger: {
    control: false,
  },
  children: {
    options: ['Button', 'TextField'],
    mapping: {
      Button: ButtonDisabled,
      TextField: TextFieldDisabled
    }
  }
}