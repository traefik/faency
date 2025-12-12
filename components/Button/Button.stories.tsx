import { InfoCircledIcon } from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
import { UnstyledLink } from '../Link';
import { Text } from '../Text';
import { ButtonForStory } from './Button';
import { ButtonVanilla } from './Button.vanilla';

const Component: Meta<typeof ButtonForStory> = {
  title: 'Components/Button',
  component: ButtonForStory,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template: StoryFn<typeof ButtonForStory> = (args) => (
  <ButtonForStory {...args}>Button</ButtonForStory>
);

export const Primary: StoryFn<typeof ButtonForStory> = Template.bind({});

Primary.args = {};

export const Secondary: StoryFn<typeof ButtonForStory> = Template.bind({});

Secondary.args = {
  variant: 'secondary',
};

export const Red: StoryFn<typeof ButtonForStory> = Template.bind({});

Red.args = {
  variant: 'red',
};

export const Ghost: StoryFn<typeof ButtonForStory> = Template.bind({});

Ghost.args = {
  ghost: true,
  variant: 'secondary',
};

export const Disabled: StoryFn<typeof ButtonForStory> = Template.bind({});

Disabled.args = {
  disabled: true,
};

const TemplateWithIcon: StoryFn<typeof ButtonForStory> = (args) => (
  <ButtonForStory {...args}>
    <Flex css={{ gap: '$2', alignItems: 'center' }}>
      <InfoCircledIcon />
      <Text css={{ color: 'currentColor', lineHeight: 'normal' }}>Button</Text>
    </Flex>
  </ButtonForStory>
);

export const WithIcon: StoryFn<typeof ButtonForStory> = TemplateWithIcon.bind({});

const TemplateWithActive: StoryFn<typeof ButtonForStory> = ({ ...args }) => {
  const [active, setActive] = React.useState(0);

  return (
    <>
      <Text css={{ pb: '$3' }}>Tab {active + 1} is active</Text>
      <Flex css={{ gap: '$3' }}>
        {[...Array(4)].map((_, i) => (
          <ButtonForStory
            key={`button-story-${i}`}
            {...args}
            {...(active === i ? { state: 'active' } : {})}
            onClick={() => setActive(i)}
          >
            Tab {i + 1}
          </ButtonForStory>
        ))}
      </Flex>
    </>
  );
};

export const Active: StoryFn<typeof ButtonForStory> = TemplateWithActive.bind({});

Active.args = {};

export const Waiting: StoryFn<typeof ButtonForStory> = Template.bind({});

Waiting.args = {
  state: 'waiting',
};

export const ButtonLink: StoryFn<typeof ButtonForStory> = (args) => (
  <ButtonForStory asChild {...args}>
    <UnstyledLink href="https://traefik.io">Button</UnstyledLink>
  </ButtonForStory>
);
ButtonLink.argTypes = {
  state: {
    options: ['waiting', undefined],
    control: 'inline-radio',
  },
};

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Stitches Version</H3>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonForStory size="small">Small</ButtonForStory>
          <ButtonForStory size="medium">Medium</ButtonForStory>
          <ButtonForStory size="large">Large</ButtonForStory>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonForStory variant="primary">Primary</ButtonForStory>
          <ButtonForStory variant="secondary">Secondary</ButtonForStory>
          <ButtonForStory variant="red">Red</ButtonForStory>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonForStory variant="primary" ghost>
            Primary Ghost
          </ButtonForStory>
          <ButtonForStory variant="secondary" ghost>
            Secondary Ghost
          </ButtonForStory>
          <ButtonForStory variant="red" ghost>
            Red Ghost
          </ButtonForStory>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonForStory variant="primary" state="active">
            Primary Active
          </ButtonForStory>
          <ButtonForStory variant="red" state="active">
            Red Active
          </ButtonForStory>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonForStory variant="primary" state="waiting">
            Waiting
          </ButtonForStory>
          <ButtonForStory variant="secondary" state="waiting" size="small">
            Waiting Small
          </ButtonForStory>
          <ButtonForStory variant="red" state="waiting" size="large">
            Waiting Large
          </ButtonForStory>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonForStory rounded>Rounded</ButtonForStory>
          <ButtonForStory disabled>Disabled</ButtonForStory>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonVanilla size="small">Small</ButtonVanilla>
          <ButtonVanilla size="medium">Medium</ButtonVanilla>
          <ButtonVanilla size="large">Large</ButtonVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonVanilla variant="primary">Primary</ButtonVanilla>
          <ButtonVanilla variant="secondary">Secondary</ButtonVanilla>
          <ButtonVanilla variant="red">Red</ButtonVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonVanilla variant="primary" ghost>
            Primary Ghost
          </ButtonVanilla>
          <ButtonVanilla variant="secondary" ghost>
            Secondary Ghost
          </ButtonVanilla>
          <ButtonVanilla variant="red" ghost>
            Red Ghost
          </ButtonVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonVanilla variant="primary" state="active">
            Primary Active
          </ButtonVanilla>
          <ButtonVanilla variant="red" state="active">
            Red Active
          </ButtonVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonVanilla variant="primary" state="waiting">
            Waiting
          </ButtonVanilla>
          <ButtonVanilla variant="secondary" state="waiting" size="small">
            Waiting Small
          </ButtonVanilla>
          <ButtonVanilla variant="red" state="waiting" size="large">
            Waiting Large
          </ButtonVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ButtonVanilla rounded>Rounded</ButtonVanilla>
          <ButtonVanilla disabled>Disabled</ButtonVanilla>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
