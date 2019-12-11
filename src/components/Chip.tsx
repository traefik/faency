import React from 'react';
import css from '@styled-system/css';
import { Box as BoxPrimitive, BoxProps as BoxPrimitiveProps } from 'mdlz-prmtz';
import { variant, Prop } from '@modulz/radix-system';
import { setLightness } from 'polished';
import {theme} from '../theme';

type ChipProps = BoxPrimitiveProps & {
  variant?: Prop<'gray' | 'primary' | 'blue' | 'lightBlue' | 'green' | 'purple' | 'orange'>;
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
            backgroundColor: setLightness(0.90, theme.colors.gray),
          },
          primary: {
            color: 'primary',
            backgroundColor: setLightness(0.90, theme.colors.primary),
          },
          blue: {
            color: 'blue',
            backgroundColor: setLightness(0.90, theme.colors.blue),
          },
          lightBlue: {
            color: 'lightBlue',
            backgroundColor: setLightness(0.90, theme.colors.lightBlue),
          },
          green: {
            color: 'green',
            backgroundColor: setLightness(0.90, theme.colors.green),
          },
          purple: {
            color: 'purple',
            backgroundColor: setLightness(0.90, theme.colors.purple),
          },
          orange: {
            color: 'orange',
            backgroundColor: setLightness(0.90, theme.colors.orange),
          }
        },
      }),
      variant({
        size: {
          0: {
            fontSize: 1,
            letterSpacing: '.032em',
            height: 3,
            lineHeight: 1,
          },
          1: {
            fontSize: 1,
            lineHeight: 2,
            letterSpacing: '.032em',
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