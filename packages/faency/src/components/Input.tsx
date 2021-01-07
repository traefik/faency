import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Input as InputPrimitive, InputProps as InputPrimitiveProps } from '@modulz/primitives'

type Variant = 'normal' | 'ghost' | 'shadow'
type Size = 0 | 1

export type InputProps = InputPrimitiveProps & {
  variant?: Variant
  size?: Size & any
  error?: boolean
}

type getInputBorderStyleProps = {
  mode: 'normal' | 'hover' | 'readOnly' | 'disabled' | 'focus'
  themeContext: any
  variant?: Variant
  error?: boolean
}

export const getInputBorderStyle = ({ mode, themeContext, variant, error }: getInputBorderStyleProps): string => {
  const colorsByMode = {
    normal: themeContext.colors.gray,
    hover: themeContext.colors.grays[5],
    readOnly: themeContext.colors.gray,
    disabled: themeContext.colors.gray,
    focus: themeContext.colors.primary,
  }
  const borderStyle = error ? `inset 0 0 0 1px ${themeContext.colors.reds[5]}` : `inset 0 0 0 1px ${colorsByMode[mode]}`
  const shadowStyle = variant === 'shadow' ? `, 0 2px 4px 0 rgba(0, 0, 0, 0.05)` : ''

  return `${borderStyle}${shadowStyle}`
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  const themeContext = useContext(ThemeContext)

  return (
    <InputPrimitive
      {...props}
      ref={forwardedRef}
      styleConfig={{
        base: {
          input: {
            normal: {
              appearance: 'none',
              cursor: 'default',
              color: themeContext.colors.black,
              fontFamily: themeContext.fonts.normal,
              outline: 'none',
              paddingTop: themeContext.space[0],
              paddingBottom: themeContext.space[0],
              borderRadius: themeContext.radii[1],
              verticalAlign: 'middle',
              width: '100%',
              boxSizing: 'border-box',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
              transition: 'all 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: getInputBorderStyle({
                mode: 'normal',
                variant: props.variant,
                error: props.error,
                themeContext,
              }),
            },
            hover: {
              boxShadow: getInputBorderStyle({
                mode: 'hover',
                variant: props.variant,
                error: props.error,
                themeContext,
              }),
            },
            readOnly: {
              boxShadow: getInputBorderStyle({
                mode: 'readOnly',
                variant: props.variant,
                error: props.error,
                themeContext,
              }),
              color: themeContext.colors.black,
              cursor: 'default',
            },
            disabled: {
              backgroundColor: themeContext.colors.grays[1],
              boxShadow: getInputBorderStyle({
                mode: 'disabled',
                variant: props.variant,
                error: props.error,
                themeContext,
              }),
              color: 'gray',
              cursor: 'not-allowed',
            },
            focus: {
              backgroundColor: themeContext.colors.white,
              boxShadow: getInputBorderStyle({
                mode: 'focus',
                variant: props.variant,
                error: props.error,
                themeContext,
              }),
              cursor: 'text',
            },
          },
          placeholder: {
            normal: {
              color: themeContext.colors.grays[5],
            },
          },
        },
        variants: {
          variant: {
            normal: {
              input: {
                normal: {
                  backgroundColor: themeContext.colors.white,
                },
              },
            },
            ghost: {
              input: {
                normal: {
                  ...(!props.error ? { boxShadow: 'none' } : {}),
                  cursor: 'text',
                },
                disabled: {
                  boxShadow: 'none',
                },
                readOnly: {
                  boxShadow: 'none',
                },
              },
            },
          },
          size: {
            0: {
              input: {
                normal: {
                  fontSize: themeContext.fontSizes[1],
                  letterSpacing: '-0.01em',
                  height: themeContext.sizes[5],
                  lineHeight: themeContext.sizes[2],
                  paddingLeft: '12px',
                  paddingRight: '12px',
                },
              },
            },
            1: {
              input: {
                normal: {
                  fontSize: themeContext.fontSizes[2],
                  letterSpacing: '-0.01em',
                  height: themeContext.sizes[6],
                  lineHeight: themeContext.sizes[4],
                  paddingLeft: themeContext.space[2],
                  paddingRight: themeContext.space[2],
                },
              },
            },
          },
        },
      }}
    />
  )
})

Input.displayName = 'Input'

Input.defaultProps = { type: 'text', variant: 'normal', size: 0 }
