import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import {
  ToggleButtonGroup as ToggleButtonGroupPrimitive,
  ToggleButtonGroupProps as ToggleButtonGroupPrimitiveProps,
} from '@modulz/primitives'

export { ToggleButton } from '@modulz/primitives'

export type ToggleButtonGroupProps<T> = ToggleButtonGroupPrimitiveProps<T>

export const ToggleButtonGroup = <T extends string | string[] | null>(
  props: ToggleButtonGroupProps<T>,
): JSX.Element => {
  const themeContext = useContext(ThemeContext)

  return (
    <ToggleButtonGroupPrimitive
      {...props}
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
}
