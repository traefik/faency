import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ButtonForStory } from './Button';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { UnstyledLink } from '../Link';

export default {
  title: 'Components/Button',
  component: ButtonForStory,
  argTypes: { onClick: { action: 'clicked' } },
} as Meta<typeof ButtonForStory>;

const Template: StoryFn<typeof ButtonForStory> = (args) => (
  <ButtonForStory {...args}>Button</ButtonForStory>
);

export const Primary = Template.bind({});

Primary.args = {};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: 'secondary',
};

export const Red = Template.bind({});

Red.args = {
  variant: 'red',
};

export const Ghost = Template.bind({});

Ghost.args = {
  ghost: true,
  variant: 'secondary',
};

export const Disabled = Template.bind({});

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

export const WithIcon = TemplateWithIcon.bind({});

const TemplateWithActive: StoryFn<typeof ButtonForStory> = ({ state, ...args }) => {
  const [active, setActive] = React.useState(0);

  return (
    <>
      <Text css={{ pb: '$3' }}>Tab {active + 1} is active</Text>
      <Flex css={{ gap: '$3' }}>
        {[...Array(4)].map((_, i) => (
          <ButtonForStory
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

export const Active = TemplateWithActive.bind({});

Active.args = {};

export const Waiting = Template.bind({});

Waiting.args = {
  state: 'waiting',
};

const Customize: StoryFn<typeof ButtonForStory> = (args) => (
  <ButtonForStory css={{ c: '$hiContrast' }} {...args}>
    Button
  </ButtonForStory>
);

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
