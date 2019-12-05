import React from 'react';
import { withTheme } from 'styled-components';
import css from '@styled-system/css';
import { variant, Prop } from '@modulz/radix-system';
import { Input as InputPrimitive, InputProps as InputPrimitiveProps } from 'mdlz-prmtz';

type VariantProps = 'normal' | 'ghost';
type SizeProps = 0 | 1;

export type InputProps = InputPrimitiveProps & {
  variant?: Prop<VariantProps>;
  size?: Prop<SizeProps>;
  children?: React.ReactNode;
  theme?: any;
};

const placeholderStyle = {
  color: 'gray',
};

export const Input = withTheme(
  React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <InputPrimitive
      {...props}
      ref={ref}
      css={[
        css({
          appearance: 'none',
          backgroundColor: 'transparent',
          cursor: 'default',
          color: 'black',
          fontFamily: 'normal',
          outline: 'none',
          paddingY: 0,
          verticalAlign: 'middle',
          width: '100%',
          boxSizing: 'border-box',
          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
          border: '1px solid',
          borderColor: 'gray',
          borderRadius: 4,
          transition: 'border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:read-only': {
            borderColor: 'gray',
            color: 'black',
          },
          '&:disabled': {
            borderColor: 'gray',
            color: 'gray',
            cursor: 'not-allowed',
          },
          '&:focus': {
            border: '2px solid',
            borderColor: 'black',
            cursor: 'text',
          },
        }),
        variant({
          size: {
            0: {
              fontSize: 1,
              letterSpacing: '-0.01em',
              height: 5,
              lineHeight: 2,
              paddingX: '12px',
            },
            1: {
              fontSize: 2,
              letterSpacing: '-0.01em',
              height: 6,
              lineHeight: 4,
              paddingX: 2,
            },
          },
        }),
        variant({
          variant: {
            normal: {
              borderColor: 'gray',
            },
            ghost: {
              borderColor: 'transparent',
              cursor: 'text',
            },
          },
        }),
      ]}
      placeholderCss={placeholderStyle}
    />
  ))
);

Input.defaultProps = { type: 'text', variant: 'normal', size: 0 };