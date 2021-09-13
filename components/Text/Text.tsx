import React from 'react';
import { VariantProps } from '@stitches/react';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { styled } from '../../stitches.config';

export const Text = styled('span', {
  // Reset
  lineHeight: '1',
  margin: '0',
  fontFamily: '$rubik',
  fontVariantNumeric: 'tabular-nums',
  display: 'block',

  variants: {
    size: {
      '0': {
        fontSize: '$0',
      },
      '1': {
        fontSize: '$1',
      },
      '2': {
        fontSize: '$2',
      },
      '3': {
        fontSize: '$3',
      },
      '4': {
        fontSize: '$4',
      },
      '5': {
        fontSize: '$5',
      },
      '6': {
        fontSize: '$6',
      },
      '7': {
        fontSize: '$7',
      },
      '8': {
        fontSize: '$8',
      },
      '9': {
        fontSize: '$9',
      },
      '10': {
        fontSize: '$10',
      },
      '11': {
        fontSize: '$11',
      },
      '12': {
        fontSize: '$12',
      },
    },
    variant: {
      red: {
        color: '$red10',
      },
      subtle: {
        color: '$textSubtle',
      },
      contrast: {
        color: '$textContrast',
      },
    },
    gradient: {
      true: {
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
  },
  defaultVariants: {
    size: '3',
    variant: 'contrast',
  },
});

type TextVariants = VariantProps<typeof Text>;
export interface TextProps extends TextVariants {}
const BaseText = (props: TextProps): JSX.Element => <Text {...props} />;
export const TextForStory = modifyVariantsForStory<
  TextVariants,
  TextProps & React.HTMLAttributes<any>
>(BaseText);
