import { InfoCircledIcon } from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { Flex } from '../Flex';
import { UnstyledLink } from '../Link';
import { Text } from '../Text';
import { ButtonForStory } from './Button';

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

export default Component;
