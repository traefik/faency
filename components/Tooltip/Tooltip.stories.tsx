import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tooltip, TooltipProps, TooltipVariants } from './Tooltip';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Container } from '../Container';
import { Text } from '../Text';

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
