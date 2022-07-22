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
    <ButtonSwitchContainer
      type="single"
      value={value}
      onValueChange={(value) => {
        if (value) setValue(value);
      }}
    >
      <ButtonSwitchItem value="left">Left</ButtonSwitchItem>
      <ButtonSwitchItem value="right">Right</ButtonSwitchItem>
    </ButtonSwitchContainer>
  );
};
