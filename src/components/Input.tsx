import React from 'react';
import {
  Input as InputPrimitive,
  InputProps as InputPrimitiveProps
} from 'mdlz-prmtz';
import { theme } from '../theme';

type Variant = 'normal' | 'ghost';
type Size = 0 | 1;

export type InputProps = InputPrimitiveProps & {
  variant?: Variant;
  size?: Size & any;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, forwardedRef) => (
    <InputPrimitive
      {...props}
      ref={forwardedRef}
      styleConfig={{
        base: {
          input: {
            normal: {
              appearance: 'none',
              cursor: 'default',
              color: theme.colors.black,
              fontFamily: theme.fonts.normal,
              outline: 'none',
              paddingTop: theme.space[0],
              paddingBottom: theme.space[0],
              borderRadius: theme.radii[4],
              verticalAlign: 'middle',
              width: '100%',
              boxSizing: 'border-box',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
              transition: 'border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
            },
            readOnly: {
              borderColor: theme.colors.gray,
              color: 'black'
            },
            disabled: {
              borderColor: theme.colors.gray,
              color: 'gray',
              cursor: 'not-allowed'
            },
            focus: {
              backgroundColor: 'white',
              border: '2px solid',
              borderColor: 'black',
              cursor: 'text'
            }
          },
          placeholder: {
            normal: {
              color: theme.colors.grays[5]
            }
          }
        },
        variants: {
          variant: {
            normal: {
              input: {
                normal: {
                  backgroundColor: 'white',
                  border: '1px solid',
                  borderColor: theme.colors.gray
                }
              }
            },
            ghost: {
              input: {
                normal: {
                  cursor: 'text'
                }
              }
            }
          },
          size: {
            0: {
              input: {
                normal: {
                  fontSize: theme.fontSizes[1],
                  letterSpacing: '-0.01em',
                  height: theme.sizes[5],
                  lineHeight: theme.sizes[2],
                  paddingLeft: '12px',
                  paddingRight: '12px'
                }
              }
            },
            1: {
              input: {
                normal: {
                  fontSize: theme.fontSizes[2],
                  letterSpacing: '-0.01em',
                  height: theme.sizes[6],
                  lineHeight: theme.sizes[4],
                  paddingLeft: theme.space[2],
                  paddingRight: theme.space[2]
                }
              }
            }
          }
        }
      }}
    />
  )
);

Input.defaultProps = { type: 'text', variant: 'normal', size: 0 };
