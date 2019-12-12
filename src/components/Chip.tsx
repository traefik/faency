import React from 'react';
import css from '@styled-system/css';
import { Box as BoxPrimitive, BoxProps as BoxPrimitiveProps } from 'mdlz-prmtz';
import { variant, Prop } from '@modulz/radix-system';

type ChipProps = BoxPrimitiveProps & {
  variant?: Prop<'gray' | 'blue' | 'lightBlue' | 'green' | 'purple' | 'orange'>;
  size?: Prop<0 | 1 | 2>;
  truncate?: Prop<boolean>;
};

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>((props, ref) => (
  <BoxPrimitive
    {...props}
    ref={ref}
    css={[
      css({
        fontWeight: 600,
        alignSelf: 'flex-start',
        display: 'block',
        minWidth: 4,
        textAlign: 'center',
        borderRadius: 3,
        padding: 1,
      }),
      variant({
        variant: {
          gray: {
            color: 'grays.5',
            backgroundColor: 'grays.2',
          },
          blue: {
            color: 'blue',
            backgroundColor: 'blues.2',
          },
          lightBlue: {
            color: 'lightBlue',
            backgroundColor: 'lightBlues.2',
          },
          green: {
            color: 'green',
            backgroundColor: 'greens.2',
          },
          purple: {
            color: 'purple',
            backgroundColor: 'purples.2',
          },
          orange: {
            color: 'orange',
            backgroundColor: 'oranges.2',
          }
        },
      }),
      variant({
        size: {
          0: {
            fontSize: 1,
            lineHeight: 1,
            height: 3,
          },
          1: {
            fontSize: 1,
            lineHeight: 2,
            height: 4,
          },
          2: {
            fontSize: 2,
            lineHeight: 3,
            height: 5,
          },
        },
      }),
      variant({
        truncate: {
          true: {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          },
        },
      }),
    ]}
  />
));

Chip.defaultProps = { size: 0, truncate: false, variant: 'gray' };