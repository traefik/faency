import React from 'react';
import styled, { css as _css, keyframes } from 'styled-components';
import css from '@styled-system/css';
import {
  Button as ButtonPrimitive,
  ButtonProps as ButtonPrimitiveProps
} from 'mdlz-prmtz';
import { theme } from '../theme';

type Variant =
  | 'gray'
  | 'blue'
  | 'green'
  | 'red'
  | 'transparent'
  | 'primary'
  | 'secondary';
type Size = 0 | 1;

type ButtonProps = ButtonPrimitiveProps & {
  variant?: Variant;
  isWaiting?: boolean;
  size?: Size;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, forwardedRef) => (
    <ButtonPrimitive
      {...props}
      ref={forwardedRef}
      styleConfig={{
        base: {
          button: {
            normal: {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              borderRadius: theme.radii[1],
              cursor: 'pointer',
              fontFamily: theme.fonts.normal,
              fontWeight: 700,
              outline: 'none',
              paddingY: 0,
              position: 'relative',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
            },
            disabled: {
              color: theme.colors.gray,
              cursor: 'not-allowed'
            }
          }
        },
        variants: {
          variant: {
            primary: {
              button: {
                normal: {
                  backgroundColor: theme.colors.blue,
                  color: 'white'
                },
                active: {
                  backgroundColor: theme.colors.blues[3]
                }
              }
            },
            secondary: {
              button: {
                normal: {
                  backgroundColor: 'transparent',
                  color: theme.colors.blue
                },
                active: {
                  color: theme.colors.blues[3]
                }
              }
            },
            transparent: {
              button: {
                normal: {
                  backgroundColor: 'transparent',
                  color: theme.colors.blue
                },
                active: {
                  color: theme.colors.blues[3]
                }
              }
            },
            gray: {
              button: {
                normal: {
                  backgroundColor: theme.colors.gray,
                  color: 'white'
                },
                active: {
                  backgroundColor: theme.colors.grays[3]
                }
              }
            },
            blue: {
              button: {
                normal: {
                  backgroundColor: theme.colors.blue,
                  color: 'white'
                },
                active: {
                  backgroundColor: theme.colors.blues[3]
                }
              }
            },
            green: {
              button: {
                normal: {
                  backgroundColor: theme.colors.green,
                  color: 'white'
                },
                active: {
                  backgroundColor: theme.colors.greens[1]
                }
              }
            },
            red: {
              button: {
                normal: {
                  backgroundColor: theme.colors.red,
                  color: 'white'
                },
                active: {
                  backgroundColor: theme.colors.reds[1]
                }
              }
            }
          },
          size: {
            0: {
              button: {
                normal: {
                  fontSize: theme.fontSizes[2],
                  paddingLeft: theme.space[2],
                  paddingRight: theme.space[2],
                  height: theme.sizes[5],
                  minWidth: theme.sizes[5]
                }
              }
            },
            1: {
              button: {
                normal: {
                  fontSize: theme.fontSizes[3],
                  paddingLeft: theme.space[3],
                  paddingRight: theme.space[3],
                  height: theme.sizes[6],
                  minWidth: theme.sizes[8]
                }
              }
            }
          },
          isWaiting: {
            true: {
              button: {
                normal: {
                  backgroundColor: theme.colors.grays[2],
                  boxShadow: `inset 0 0 0 1px ${theme.colors.grays[3]}`,
                  color: 'transparent',
                  overflow: 'hidden',
                  pointerEvents: 'none'
                },
                focus: {
                  boxShadow: `inset 0 0 0 1px ${theme.colors.grays[3]}`
                }
              }
            }
          }
        }
      }}
    >
      {children}
      {props.isWaiting && <Waiting size={props.size} />}
    </ButtonPrimitive>
  )
);

Button.defaultProps = {
  variant: 'transparent',
  size: 0
};

const waitingAnimation = (props: ButtonProps) => keyframes`
  100% {
    transform: translateX(${
      props.size === 1 ? theme.space[9] : theme.space[7]
    });
	}
`;

const Waiting = styled('div')<ButtonProps>(
  props =>
    css({
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '200%',
      height: '100%',
      backgroundImage: `linear-gradient(
                -45deg,
                transparent 33%,
                rgba(0, 0, 0, 0.03) 33%,
                rgba(0, 0, 0, 0.03) 66%,
                transparent 66%
              )`,
      backgroundSize:
        props.size === 1
          ? `${theme.space[9]} ${theme.space[6]}`
          : `${theme.space[7]} ${theme.space[5]}`
    })(props),

  props => _css`
      animation: ${waitingAnimation(props)} 500ms linear infinite
    `
);
