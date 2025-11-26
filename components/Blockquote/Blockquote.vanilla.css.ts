import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import {
  colorVariants,
  gradientVariants,
  noWrapVariants,
  sizeVariants,
  transformVariants,
  weightVariants,
} from '../../styles/textVariants.css';
import { tokens } from '../../styles/tokens.css';

// Base blockquote styles (inherits from Text component with blockquote-specific overrides)
const blockquoteBase = style({
  lineHeight: '1',
  margin: '0',
  fontFamily: tokens.fonts.rubik,
  fontVariantNumeric: 'tabular-nums',
  display: 'inline-block',
  borderLeft: `2px solid ${tokens.colors.textDefault}`,
  padding: `${tokens.space['2']} ${tokens.space['3']}`,
});

export const blockquoteRecipe = recipe({
  base: blockquoteBase,

  variants: {
    size: sizeVariants,
    weight: weightVariants,
    variant: colorVariants,
    gradient: gradientVariants,
    transform: transformVariants,
    noWrap: noWrapVariants,
  },

  defaultVariants: {
    size: '3',
    variant: 'default',
  },
});
