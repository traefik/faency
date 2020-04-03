import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import {
  ToggleButton as ToggleButtonPrimitive,
  ToggleButtonProps as ToggleButtonPrimitiveProps,
} from '@modulz/primitives'

type Size = 0 | 1
type Variant = 'normal' | 'fade'

export type ToggleButtonProps = ToggleButtonPrimitiveProps & {
  size?: Size
  variant?: Variant
}

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>((props, forwardedRef) => {
  const themeContext = useContext(ThemeContext)

  return (
    <ToggleButtonPrimitive
      {...props}
      ref={forwardedRef}
      styleConfig={{
        base: {
          button: {
            normal: {
              fontFamily: themeContext.fonts.normal,
              height: '36px',
              marginRight: themeContext.space[3],
              padding: '4px 16px',
              borderRadius: themeContext.radii[4],
              background: 'transparent',
              color: themeContext.colors.grays[5],
              fontWeight: 600,
              fontSize: themeContext.fontSizes[1],
              transition:
                'background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.5, 1)',
            },
            hover: {
              background: themeContext.colors.grays[1],
              cursor: 'pointer',
            },
            toggled: {
              background: themeContext.colors.blues[2],
              color: themeContext.colors.blue,
            },
          },
        },
      }}
    />
  )
})

ToggleButton.displayName = 'ToggleButton'

ToggleButton.defaultProps = {
  size: 1,
  variant: 'normal',
}
