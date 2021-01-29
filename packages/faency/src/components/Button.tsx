import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import styled, { css as _css, keyframes, Keyframes } from 'styled-components'
import css from '@styled-system/css'
import { Button as ButtonPrimitive, ButtonProps as ButtonPrimitiveProps } from '@modulz/primitives'
import { transparentize } from 'polished'

type Variant = 'gray' | 'blue' | 'green' | 'red' | 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 0 | 1

export type ButtonProps = ButtonPrimitiveProps & {
  variant?: Variant
  isWaiting?: boolean
  size?: Size
  theme?: any
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, forwardedRef) => {
  const themeContext = useContext(ThemeContext)

  return (
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
              borderRadius: themeContext.radii[3],
              cursor: 'pointer',
              fontFamily: themeContext.fonts.normal,
              textTransform: 'uppercase',
              fontWeight: 500,
              outline: 'none',
              paddingY: 0,
              position: 'relative',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              transition: 'background 0.3s ease-out',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            },
            disabled: {
              opacity: 0.7,
              color: themeContext.colors.grays[3],
              cursor: 'not-allowed',
            },
          },
        },
        variants: {
          variant: {
            primary: {
              button: {
                normal: {
                  backgroundColor: themeContext.colors.blue,
                  boxShadow: `0 7px 16px -3px ${transparentize(0.9, themeContext.colors.black)}`,
                  color: 'white',
                },
                hover: {
                  backgroundColor: themeContext.colors.blues[4],
                },
                active: {
                  backgroundColor: themeContext.colors.blues[6],
                },
              },
            },
            secondary: {
              button: {
                normal: {
                  boxShadow: `0 7px 16px -3px ${transparentize(0.9, themeContext.colors.black)}`,
                  border: 'solid 1px #e5e5e5',
                  backgroundColor: 'white',
                  color: themeContext.colors.dark,
                },
                hover: {
                  border: 'solid 1px #c6c6c7',
                },
                active: {
                  border: 'solid 1px #c6c6c7',
                  backgroundColor: themeContext.colors.blues[0],
                },
              },
            },
            outline: {
              button: {
                normal: {
                  backgroundColor: 'transparent',
                  color: themeContext.colors.blue,
                  border: `solid 2px ${themeContext.colors.blue}`,
                },
                hover: {
                  backgroundColor: themeContext.colors.blue,
                  color: 'white',
                },
                active: {
                  backgroundColor: themeContext.colors.blues[4],
                  color: 'white',
                },
              },
            },
            ghost: {
              button: {
                normal: {
                  backgroundColor: 'transparent',
                  color: themeContext.colors.blue,
                },
                hover: {
                  color: themeContext.colors.blues[4],
                },
                active: {
                  color: themeContext.colors.blues[6],
                },
              },
            },
            gray: {
              button: {
                normal: {
                  boxShadow: `0 7px 16px -3px ${transparentize(0.9, themeContext.colors.black)}`,
                  backgroundColor: themeContext.colors.grays[5],
                  color: 'white',
                },
                hover: {
                  backgroundColor: themeContext.colors.grays[6],
                },
                active: {
                  backgroundColor: themeContext.colors.grays[7],
                },
              },
            },
            blue: {
              button: {
                normal: {
                  boxShadow: `0 7px 16px -3px ${transparentize(0.9, themeContext.colors.black)}`,
                  backgroundColor: themeContext.colors.blue,
                  color: 'white',
                },
                hover: {
                  backgroundColor: themeContext.colors.blue[4],
                },
                active: {
                  backgroundColor: themeContext.colors.blues[6],
                },
              },
            },
            green: {
              button: {
                normal: {
                  boxShadow: `0 7px 16px -3px ${transparentize(0.9, themeContext.colors.black)}`,
                  backgroundColor: themeContext.colors.green,
                  color: 'white',
                },
                hover: {
                  backgroundColor: themeContext.colors.greens[4],
                },
                active: {
                  backgroundColor: themeContext.colors.greens[6],
                },
              },
            },
            red: {
              button: {
                normal: {
                  boxShadow: `0 7px 16px -3px ${transparentize(0.9, themeContext.colors.black)}`,
                  backgroundColor: themeContext.colors.red,
                  color: 'white',
                },
                hover: {
                  backgroundColor: themeContext.colors.reds[4],
                },
                active: {
                  backgroundColor: themeContext.colors.reds[6],
                },
              },
            },
          },
          size: {
            0: {
              button: {
                normal: {
                  fontSize: themeContext.fontSizes[1],
                  paddingLeft: themeContext.space[2],
                  paddingRight: themeContext.space[2],
                  height: themeContext.sizes[6],
                  minWidth: themeContext.sizes[5],
                },
              },
            },
            1: {
              button: {
                normal: {
                  fontSize: themeContext.fontSizes[2],
                  paddingLeft: themeContext.space[3],
                  paddingRight: themeContext.space[3],
                  height: themeContext.sizes[7],
                  minWidth: themeContext.sizes[8],
                },
              },
            },
          },
          isWaiting: {
            true: {
              button: {
                normal: {
                  backgroundColor: themeContext.colors.grays[2],
                  boxShadow: `inset 0 0 0 1px ${themeContext.colors.grays[3]}`,
                  color: 'transparent',
                  overflow: 'hidden',
                  pointerEvents: 'none',
                },
                focus: {
                  boxShadow: `inset 0 0 0 1px ${themeContext.colors.grays[3]}`,
                },
              },
            },
          },
        },
      }}
    >
      {children}
      {props.isWaiting && <Waiting theme={themeContext} size={props.size} />}
    </ButtonPrimitive>
  )
})

Button.displayName = 'Button'

Button.defaultProps = {
  variant: 'secondary',
  size: 0,
}

const waitingAnimation = (props: ButtonProps): Keyframes => keyframes`
  100% {
    transform: translateX(${props.size === 1 ? props.theme.space[9] : props.theme.space[7]});
	}
`

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
                ${props.theme.colors.grays[3]} 33%,
                ${props.theme.colors.grays[3]} 66%,
                transparent 66%
              )`,
      backgroundSize:
        props.size === 1
          ? `${props.theme.space[9]} ${props.theme.space[7]}`
          : `${props.theme.space[7]} ${props.theme.space[6]}`,
    })(props),

  props => _css`
      animation: ${waitingAnimation(props)} 500ms linear infinite
    `,
)
