import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import styled, { css as _css, keyframes, Keyframes } from 'styled-components'
import css from '@styled-system/css'
import { Button as ButtonPrimitive, ButtonProps as ButtonPrimitiveProps } from '@modulz/primitives'
import { transparentize } from 'polished'

type Variant = 'gray' | 'blue' | 'green' | 'red' | 'transparent' | 'primary' | 'secondary'
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
              borderRadius: themeContext.radii[1],
              cursor: 'pointer',
              fontFamily: themeContext.fonts.normal,
              fontWeight: 700,
              outline: 'none',
              paddingY: 0,
              position: 'relative',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            },
            disabled: {
              color: themeContext.colors.gray,
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
                  color: 'white',
                },
                active: {
                  backgroundColor: themeContext.colors.blues[3],
                },
              },
            },
            secondary: {
              button: {
                normal: {
                  backgroundColor: 'transparent',
                  color: themeContext.colors.blue,
                },
                active: {
                  backgroundColor: transparentize(0.9, themeContext.colors.blue),
                  color: themeContext.colors.blues[3],
                },
                hover: {
                  backgroundColor: transparentize(0.9, themeContext.colors.blue),
                },
              },
            },
            transparent: {
              button: {
                normal: {
                  backgroundColor: 'transparent',
                  color: themeContext.colors.blue,
                },
                active: {
                  color: themeContext.colors.blues[2],
                },
              },
            },
            gray: {
              button: {
                normal: {
                  backgroundColor: themeContext.colors.grays[4],
                  color: 'white',
                },
                active: {
                  backgroundColor: themeContext.colors.grays[3],
                },
              },
            },
            blue: {
              button: {
                normal: {
                  backgroundColor: themeContext.colors.blue,
                  color: 'white',
                },
                active: {
                  backgroundColor: themeContext.colors.blues[2],
                },
              },
            },
            green: {
              button: {
                normal: {
                  backgroundColor: themeContext.colors.green,
                  color: 'white',
                },
                active: {
                  backgroundColor: themeContext.colors.greens[2],
                },
              },
            },
            red: {
              button: {
                normal: {
                  backgroundColor: themeContext.colors.red,
                  color: 'white',
                },
                active: {
                  backgroundColor: themeContext.colors.reds[2],
                },
              },
            },
          },
          size: {
            0: {
              button: {
                normal: {
                  fontSize: themeContext.fontSizes[2],
                  paddingLeft: themeContext.space[2],
                  paddingRight: themeContext.space[2],
                  height: themeContext.sizes[5],
                  minWidth: themeContext.sizes[5],
                },
              },
            },
            1: {
              button: {
                normal: {
                  fontSize: themeContext.fontSizes[3],
                  paddingLeft: themeContext.space[3],
                  paddingRight: themeContext.space[3],
                  height: themeContext.sizes[6],
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
  variant: 'transparent',
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
          ? `${props.theme.space[9]} ${props.theme.space[6]}`
          : `${props.theme.space[7]} ${props.theme.space[5]}`,
    })(props),

  props => _css`
      animation: ${waitingAnimation(props)} 500ms linear infinite
    `,
)
