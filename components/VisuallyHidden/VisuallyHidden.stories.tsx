import { GearIcon } from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { styled } from '../../stitches.config';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Card } from '../Card';
import { FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { Caption, Table } from '../Table';
import { TextVanilla } from '../Text';
import { VisuallyHidden } from './VisuallyHidden';
import { VisuallyHiddenVanilla } from './VisuallyHidden.vanilla';

const FlexButton = styled('button', {
  m: 0,
  p: 0,
  color: '$hiContrast',
  border: '1px dashed $hiContrast',
  display: 'flex',
  background: 'none',
});

const ContrastDiv = styled('div', {
  color: '$hiContrast',
});

const Component: Meta<typeof VisuallyHidden> = {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
};

export const Basic: StoryFn<typeof VisuallyHidden> = (args) => (
  <ContrastDiv>
    <VisuallyHidden {...args}>Hidden visually</VisuallyHidden>
  </ContrastDiv>
);

export const HiddenButtonText: StoryFn<typeof VisuallyHidden> = (args) => (
  <FlexButton>
    <GearIcon />
    <VisuallyHidden {...args}>Settings</VisuallyHidden>
  </FlexButton>
);

export const AsChild: StoryFn<typeof VisuallyHidden> = (args) => (
  <ContrastDiv>
    <Card>
      <Table css={{ minHeight: 50, border: '1px dashed $hiContrast' }}>
        <VisuallyHidden {...args}>
          <Caption>Hidden visually</Caption>
        </VisuallyHidden>
      </Table>
    </Card>
    <Card>
      <Table css={{ minHeight: 50, border: '1px dashed $hiContrast' }}>
        <Caption>Not hidden visually</Caption>
      </Table>
    </Card>
  </ContrastDiv>
);

AsChild.args = {
  asChild: true,
};

const COLUMN_WIDTH = 240;

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={4}>
    <FlexVanilla gap={4}>
      <BoxVanilla css={{ width: 160 }} />
      <H3Vanilla css={{ width: COLUMN_WIDTH }}>Stitches</H3Vanilla>
      <H3Vanilla css={{ width: COLUMN_WIDTH }}>Vanilla Extract</H3Vanilla>
    </FlexVanilla>
    <FlexVanilla gap={4} align="center">
      <TextVanilla size="1" variant="subtle" css={{ width: 160 }}>
        Button text
      </TextVanilla>
      <BoxVanilla css={{ width: COLUMN_WIDTH }}>
        <FlexButton>
          <GearIcon />
          <VisuallyHidden>Settings</VisuallyHidden>
        </FlexButton>
      </BoxVanilla>
      <BoxVanilla css={{ width: COLUMN_WIDTH }}>
        <FlexButton>
          <GearIcon />
          <VisuallyHiddenVanilla>Settings</VisuallyHiddenVanilla>
        </FlexButton>
      </BoxVanilla>
    </FlexVanilla>
    <FlexVanilla gap={4} align="center">
      <TextVanilla size="1" variant="subtle" css={{ width: 160 }}>
        asChild / as
      </TextVanilla>
      <BoxVanilla css={{ width: COLUMN_WIDTH }}>
        <Table css={{ minHeight: 50, border: '1px dashed $hiContrast' }}>
          <VisuallyHidden asChild>
            <Caption>Hidden visually</Caption>
          </VisuallyHidden>
        </Table>
      </BoxVanilla>
      <BoxVanilla css={{ width: COLUMN_WIDTH }}>
        <Table css={{ minHeight: 50, border: '1px dashed $hiContrast' }}>
          <VisuallyHiddenVanilla as={Caption}>Hidden visually</VisuallyHiddenVanilla>
        </Table>
      </BoxVanilla>
    </FlexVanilla>
  </FlexVanilla>
);

export default Component;
