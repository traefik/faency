import { globalStyle, style } from '@vanilla-extract/css';

import { tokens } from '@/styles/tokens.css';

import { radioBase } from '@/components/Radio/Radio.vanilla.css';

export const radioAccordionItem = style({
  display: 'inherit',
  flexDirection: 'column',
});

export const radioAccordionTrigger = style({});

export const radioAccordionRadio = style([
  radioBase,
  {
    width: 18,
    height: 18,
    marginRight: tokens.space['2'],
    selectors: {
      '[data-state=open] > &': {
        backgroundColor: tokens.colors.radioIndicator,
      },
    },
  },
]);

globalStyle(`${radioAccordionTrigger}:not([disabled]):hover ${radioAccordionRadio}`, {
  '@media': {
    '(any-hover: hover)': {
      boxShadow: `inset 0 0 0 1px ${tokens.colors.radioHoverBorder}`,
    },
  },
});
