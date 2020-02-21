import React from 'react'
import {
  ToggleButtonGroup as ToggleButtonGroupPrimitive,
  ToggleButtonGroupProps as ToggleButtonGroupPrimitiveProps,
} from 'mdlz-prmtz'
import { transparentize } from 'polished'
import { theme } from '../theme'

export { ToggleButton } from 'mdlz-prmtz'

export type ToggleButtonGroupProps<T> = ToggleButtonGroupPrimitiveProps<T>

export const ToggleButtonGroup = <T extends string | string[] | null>(
  props: ToggleButtonGroupProps<T>,
): JSX.Element => (
  <ToggleButtonGroupPrimitive
    {...props}
    styleConfig={{
      base: {
        button: {
          normal: {
            fontFamily: theme.fonts.normal,
            height: '36px',
            marginRight: theme.space[3],
            padding: '4px 16px',
            borderRadius: theme.radii[4],
            background: 'transparent',
            color: theme.colors.grays[5],
            fontWeight: 600,
            fontSize: theme.fontSizes[1],
            transition:
              'background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.5, 1)',
          },
          hover: {
            background: theme.colors.grays[1],
            cursor: 'pointer',
          },
          toggled: {
            background: transparentize(0.9, theme.colors.primary),
            color: theme.colors.primary,
          },
        },
      },
    }}
  />
)
