import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tooltip, TooltipProps, TooltipVariants } from './Tooltip';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Text } from '../Text';
import { Container } from '../Container';
import { Flex } from '../Flex';
import { Button } from '../Button';
import { Box } from '../Box';
import { Bubble } from '../Bubble';
import { TextField } from '../TextField';
import {
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import { styled } from '../../stitches.config';

const BaseTooltip = (props: TooltipProps): JSX.Element => <Tooltip {...props} />;
const TooltipForStory = modifyVariantsForStory<TooltipVariants, TooltipProps>(BaseTooltip);

const SpacedBox = styled(Box, {
  my: '$8',
  border: '1px dashed $primary',
});

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
    <SpacedBox>
      <TooltipForStory {...args}>
        <Button disabled>Disabled</Button>
      </TooltipForStory>
    </SpacedBox>
    <SpacedBox>
      <TooltipForStory {...args}>
        <TextField type="text" id="disabled" label="disabled" defaultValue="value" disabled />
      </TooltipForStory>
    </SpacedBox>
    <SpacedBox css={{
      display: 'flex', flexDirection: 'column'
    }}>
      <TooltipForStory {...args}>
        <Button disabled>Disabled Flex</Button>
      </TooltipForStory>
    </SpacedBox>
    <SpacedBox css={{
      display: 'flex', flexDirection: 'column'
    }}>
      <TooltipForStory {...args}>
        <TextField type="text" id="disabledflex" label="disabled flex" defaultValue="value" disabled />
      </TooltipForStory>
    </SpacedBox>
    <SpacedBox css={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <TooltipForStory {...args}>
        <Button disabled>Disabled Flex Center</Button>
      </TooltipForStory>
    </SpacedBox>
    <SpacedBox css={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <TooltipForStory {...args}>
        <TextField type="text" id="disabledflexcenter" label="disabled flex center" defaultValue="value" disabled />
      </TooltipForStory>
    </SpacedBox>
  </Container>
);

DisabledChildren.args = {
  trigger: 'disabled',
  content: 'This is some tooltip text',
}

DisabledChildren.argTypes = {
  trigger: {
    options: ['disabled', undefined],
    control: 'inline-radio'
  },
}