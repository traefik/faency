import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ButtonSwitchContainer, ButtonSwitchItem } from './ButtonSwitch';
import { useState } from 'react';

export default {
  title: 'Components/ButtonSwitch',
  component: ButtonSwitchContainer,
} as ComponentMeta<typeof ButtonSwitchContainer>;

export const Basic: ComponentStory<any> = (args) => {
  const [value, setValue] = useState('left');

  return (
    <ButtonSwitchContainer type="single" value={value} onValueChange={setValue}>
      <ButtonSwitchItem value="left">Left</ButtonSwitchItem>
      <ButtonSwitchItem value="right">Right</ButtonSwitchItem>
    </ButtonSwitchContainer>
  );
};

export const Multiple: ComponentStory<any> = (args) => {
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
