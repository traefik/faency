import { CrossCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Bubble as BubbleComponent } from '../Bubble';
import { Button } from '../Button';
import { ButtonVanilla } from '../Button/Button.vanilla';
import { Container } from '../Container';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import { Text } from '../Text';
import { TextVanilla } from '../Text/Text.vanilla';
import { Tooltip, TooltipProps, TooltipVariants } from './Tooltip';
import { TooltipVanilla } from './Tooltip.vanilla';

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
const multilineContent =
  'This is some tooltip text. This box shows the max amount of text to display. If more room is needed, use a modal instead.';

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6} css={{ paddingTop: '$9' }}>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <FlexVanilla gap={4} wrap="wrap">
        <Tooltip content="This is some tooltip text">
          <Button>Basic</Button>
        </Tooltip>
        <Tooltip multiline content={multilineContent}>
          <Button>Multiline</Button>
        </Tooltip>
        <Tooltip content={WarningOption}>
          <Button>Node content</Button>
        </Tooltip>
      </FlexVanilla>
    </BoxVanilla>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <FlexVanilla gap={4} wrap="wrap">
        <TooltipVanilla content="This is some tooltip text">
          <ButtonVanilla>Basic</ButtonVanilla>
        </TooltipVanilla>
        <TooltipVanilla multiline content={multilineContent}>
          <ButtonVanilla>Multiline</ButtonVanilla>
        </TooltipVanilla>
        <TooltipVanilla
          content={
            <FlexVanilla align="center" gap={2}>
              <ExclamationTriangleIcon />
              <TextVanilla css={{ color: 'currentColor' }}>Warning message</TextVanilla>
            </FlexVanilla>
          }
        >
          <ButtonVanilla>Node content</ButtonVanilla>
        </TooltipVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
