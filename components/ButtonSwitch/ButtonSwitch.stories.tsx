// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';
import { useState } from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
import { ButtonSwitchContainer, ButtonSwitchItem } from './ButtonSwitch';
import { ButtonSwitchContainerVanilla, ButtonSwitchItemVanilla } from './ButtonSwitch.vanilla';

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

export const Comparison: StoryFn = () => {
  const [stitchesValue, setStitchesValue] = useState('left');
  const [vanillaValue, setVanillaValue] = useState('left');
  const [stitchesMultiple, setStitchesMultiple] = useState<string[]>([]);
  const [vanillaMultiple, setVanillaMultiple] = useState<string[]>([]);

  return (
    <FlexVanilla direction="column" gap={6}>
      <BoxVanilla>
        <H3 css={{ marginBottom: '16px' }}>Stitches Version</H3>
        <FlexVanilla direction="column" gap={3}>
          <FlexVanilla gap={2} wrap="wrap" align="center">
            <ButtonSwitchContainer
              type="single"
              value={stitchesValue}
              onValueChange={setStitchesValue}
            >
              <ButtonSwitchItem value="left">Left</ButtonSwitchItem>
              <ButtonSwitchItem value="right">Right</ButtonSwitchItem>
            </ButtonSwitchContainer>
          </FlexVanilla>
          <FlexVanilla gap={2} wrap="wrap" align="center">
            <ButtonSwitchContainer
              type="multiple"
              value={stitchesMultiple}
              onValueChange={setStitchesMultiple}
            >
              <ButtonSwitchItem value="option1">Option 1</ButtonSwitchItem>
              <ButtonSwitchItem value="option2">Option 2</ButtonSwitchItem>
              <ButtonSwitchItem value="option3">Option 3</ButtonSwitchItem>
              <ButtonSwitchItem value="option4">Option 4</ButtonSwitchItem>
            </ButtonSwitchContainer>
          </FlexVanilla>
        </FlexVanilla>
      </BoxVanilla>

      <BoxVanilla>
        <H3 css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3>
        <FlexVanilla direction="column" gap={3}>
          <FlexVanilla gap={2} wrap="wrap" align="center">
            <ButtonSwitchContainerVanilla
              type="single"
              value={vanillaValue}
              onValueChange={setVanillaValue}
            >
              <ButtonSwitchItemVanilla value="left">Left</ButtonSwitchItemVanilla>
              <ButtonSwitchItemVanilla value="right">Right</ButtonSwitchItemVanilla>
            </ButtonSwitchContainerVanilla>
          </FlexVanilla>
          <FlexVanilla gap={2} wrap="wrap" align="center">
            <ButtonSwitchContainerVanilla
              type="multiple"
              value={vanillaMultiple}
              onValueChange={setVanillaMultiple}
            >
              <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
              <ButtonSwitchItemVanilla value="option2">Option 2</ButtonSwitchItemVanilla>
              <ButtonSwitchItemVanilla value="option3">Option 3</ButtonSwitchItemVanilla>
              <ButtonSwitchItemVanilla value="option4">Option 4</ButtonSwitchItemVanilla>
            </ButtonSwitchContainerVanilla>
          </FlexVanilla>
        </FlexVanilla>
      </BoxVanilla>
    </FlexVanilla>
  );
};

export default Component;
