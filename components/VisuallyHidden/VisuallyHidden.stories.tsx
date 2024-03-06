import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { VisuallyHidden } from './VisuallyHidden';
import { Table, Caption } from '../Table';
import { Card } from '../Card';
import { GearIcon } from '@radix-ui/react-icons';
import { styled } from '../../stitches.config';

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

export default {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
} as Meta<typeof VisuallyHidden>;

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
