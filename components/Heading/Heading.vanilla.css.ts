import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles';

const headingBase = style({
  fontFamily: tokens.fonts.rubik,
  fontVariantNumeric: 'proportional-nums',
  display: 'block',
  lineHeight: '1.25',
  fontWeight: tokens.fontWeights.medium,
  margin: 0,
  color: tokens.colors.headingDefault,
});

export const h1Recipe = recipe({
  base: [
    headingBase,
    {
      fontSize: tokens.fontSizes['12'],
    },
  ],
  variants: {
    transform: {
      uppercase: {
        textTransform: 'uppercase',
      },
      capitalize: {
        display: 'block',
        selectors: {
          '&::first-letter': {
            textTransform: 'uppercase',
          },
        },
      },
      capitalizeWords: {
        textTransform: 'capitalize',
      },
    },
  },
});

export const h1Style = style([
  headingBase,
  {
    fontSize: tokens.fontSizes['12'],
  },
]);

export const h2Recipe = recipe({
  base: [
    headingBase,
    {
      fontSize: tokens.fontSizes['10'],
    },
  ],
  variants: {
    transform: {
      uppercase: {
        textTransform: 'uppercase',
      },
      capitalize: {
        display: 'block',
        selectors: {
          '&::first-letter': {
            textTransform: 'uppercase',
          },
        },
      },
      capitalizeWords: {
        textTransform: 'capitalize',
      },
    },
  },
});

export const h2Style = style([
  headingBase,
  {
    fontSize: tokens.fontSizes['10'],
  },
]);

export const h3Recipe = recipe({
  base: [
    headingBase,
    {
      fontSize: tokens.fontSizes['8'],
    },
  ],
  variants: {
    transform: {
      uppercase: {
        textTransform: 'uppercase',
      },
      capitalize: {
        display: 'block',
        selectors: {
          '&::first-letter': {
            textTransform: 'uppercase',
          },
        },
      },
      capitalizeWords: {
        textTransform: 'capitalize',
      },
    },
  },
});

export const h3Style = style([
  headingBase,
  {
    fontSize: tokens.fontSizes['8'],
  },
]);

export const h4Recipe = recipe({
  base: [
    headingBase,
    {
      fontSize: tokens.fontSizes['7'],
    },
  ],
  variants: {
    transform: {
      uppercase: {
        textTransform: 'uppercase',
      },
      capitalize: {
        display: 'block',
        selectors: {
          '&::first-letter': {
            textTransform: 'uppercase',
          },
        },
      },
      capitalizeWords: {
        textTransform: 'capitalize',
      },
    },
  },
});

export const h4Style = style([
  headingBase,
  {
    fontSize: tokens.fontSizes['7'],
  },
]);

export const h5Recipe = recipe({
  base: [
    headingBase,
    {
      fontSize: tokens.fontSizes['6'],
    },
  ],
  variants: {
    transform: {
      uppercase: {
        textTransform: 'uppercase',
      },
      capitalize: {
        display: 'block',
        selectors: {
          '&::first-letter': {
            textTransform: 'uppercase',
          },
        },
      },
      capitalizeWords: {
        textTransform: 'capitalize',
      },
    },
  },
});

export const h5Style = style([
  headingBase,
  {
    fontSize: tokens.fontSizes['6'],
  },
]);

export const h6Recipe = recipe({
  base: [
    headingBase,
    {
      fontSize: tokens.fontSizes['4'],
    },
  ],
  variants: {
    transform: {
      uppercase: {
        textTransform: 'uppercase',
      },
      capitalize: {
        display: 'block',
        selectors: {
          '&::first-letter': {
            textTransform: 'uppercase',
          },
        },
      },
      capitalizeWords: {
        textTransform: 'capitalize',
      },
    },
  },
});

export const h6Style = style([
  headingBase,
  {
    fontSize: tokens.fontSizes['4'],
  },
]);
