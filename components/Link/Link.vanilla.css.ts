import { globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { breakpoints } from '@/styles/breakpoints.css';
import { tokens } from '@/styles/tokens.css';

import { textRecipe } from '@/components/Text/Text.vanilla.css';

const variantColors = (color: string, decoration: string, outline: string, hover?: string) => ({
  color,
  textDecorationColor: decoration,
  selectors: {
    '&:focus-visible': { outlineColor: outline },
  },
  ...(hover && {
    '@media': {
      [breakpoints.hover]: {
        selectors: { '&:hover': { textDecorationColor: hover } },
      },
    },
  }),
});

export const linkRecipe = recipe({
  base: {
    alignItems: 'center',
    gap: tokens.space['1'],
    flexShrink: 0,
    outline: 'none',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    lineHeight: 'inherit',
    fontFamily: tokens.fonts.rubik,
    '@media': {
      [breakpoints.hover]: {
        selectors: { '&:hover': { textDecorationLine: 'underline' } },
      },
    },
    selectors: {
      '&:focus-visible': {
        outlineWidth: '2px',
        outlineStyle: 'solid',
        outlineOffset: '2px',
        textDecorationLine: 'none',
      },
    },
  },

  variants: {
    variant: {
      blue: {
        ...variantColors(
          tokens.colors.linkBlue,
          tokens.colors.linkBlueTextDecoration,
          tokens.colors.linkBlueFocusOutline,
        ),
        textDecorationLine: 'none',
      },
      primary: variantColors(
        tokens.colors.linkPrimary,
        tokens.colors.linkPrimaryTextDecoration,
        tokens.colors.linkPrimaryFocusOutline,
        tokens.colors.linkPrimaryHoverTextDecoration,
      ),
      subtle: variantColors(
        tokens.colors.linkSubtle,
        tokens.colors.linkSubtleTextDecoration,
        tokens.colors.linkSubtleFocusOutline,
        tokens.colors.linkSubtleHoverTextDecoration,
      ),
      contrast: variantColors(
        tokens.colors.linkContrast,
        tokens.colors.linkContrastTextDecoration,
        tokens.colors.linkContrastFocusOutline,
        tokens.colors.linkContrastHoverTextDecoration,
      ),
    },
  },

  defaultVariants: {
    variant: 'contrast',
  },
});

globalStyle(`${linkRecipe.classNames.base} ${textRecipe.classNames.base}`, {
  color: 'inherit',
});
