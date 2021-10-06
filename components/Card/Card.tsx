import {CSS, styled} from '../../stitches.config';
import {Elevation} from "../Elevation/Elevation";
import React, {forwardRef} from "react";
import {ComponentProps, ScaleValue, VariantProps} from "@stitches/react";

const StyledCard = styled('div', {
  appearance: 'none',
  border: 'none',
  boxSizing: 'border-box',
  font: 'inherit',
  lineHeight: '1',
  outline: 'none',
  padding: '$3',
  textAlign: 'inherit',
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

  backgroundColor: '$cardBackground',
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '$3',
  position: 'relative',
  boxShadow: '0 0 10px 0px $colors$cardShadow',

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    boxShadow: 'inset 0 0 0 1px $colors$cardBorder',
    borderRadius: '$3',
    pointerEvents: 'none',
  },

  variants: {
    variant: {
      inner: {
        backgroundColor: 'rgba(255,255,255,.07)',
      },
      ghost: {
        backgroundColor: '$cardGhostBackground',
        '&::before': {
          boxShadow: 'none',
        },
      },
    },
    interactive: {
      true: {
        '@hover': {
          '&:hover': {
            '&::before': {
              boxShadow: 'inset 0 0 0 1px $colors$cardHoverBorder',
              backgroundColor: '$cardHoverBackground',
            },
          },
        },
      },
    },
    active: {
      true: {
        '&::before': {
          boxShadow: 'inset 0 0 0 1px $colors$cardActiveBorder',
          backgroundColor: '$cardActiveBackground',
        },
      },
    },
  },
});

type CardVariantProps = VariantProps<typeof StyledCard>;
type CardComponentProps = React.ComponentProps<typeof StyledCard>;
type CardProps = CardVariantProps & CardComponentProps & { css?: CSS, elevation: 0 | 1 | 2 | 3 | 4 | 5 };

export const Card2 = forwardRef<React.ElementRef<typeof StyledCard>, CardProps>(({elevation, ...props}, forwardedRed) => (
  <Elevation height={elevation}>
    <StyledCard ref={forwardedRed} {...props} />
  </Elevation>
))