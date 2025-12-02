// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';
import { useState } from 'react';

import { ButtonSwitchContainer, ButtonSwitchItem } from './ButtonSwitch';

const Component: Meta<typeof ButtonSwitchContainer> = {
  title: 'Components/ButtonSwitch',
  component: ButtonSwitchContainer,
};

export const Basic: StoryFn<typeof ButtonSwitchContainer> = () => {
  const [value, setValue] = useState('left');

  return (
    <ButtonSwitchContainer type="single" value={value} onValueChange={setValue}>
      <ButtonSwitchItem value="left">Left</ButtonSwitchItem>
      <ButtonSwitchItem value="right">Right</ButtonSwitchItem>
    </ButtonSwitchContainer>
  );
};

export const Multiple: StoryFn<typeof ButtonSwitchContainer> = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <ButtonSwitchContainer type="multiple" value={value} onValueChange={setValue}>
      <ButtonSwitchItem value="option1">Option 1</ButtonSwitchItem>
      <ButtonSwitchItem value="option2">Option 2</ButtonSwitchItem>
      <ButtonSwitchItem value="option3">Option 3</ButtonSwitchItem>
      <ButtonSwitchItem value="option4">Option 4</ButtonSwitchItem>
    </ButtonSwitchContainer>
  );
};

export default Component;
