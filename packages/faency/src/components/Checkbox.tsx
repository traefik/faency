import React from 'react'
import { theme } from '../theme'
import { Checkbox as CheckboxPrimitive, CheckboxProps } from '@modulz/primitives'

export { CheckboxProps } from '@modulz/primitives'

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, forwardedRef) => (
  <CheckboxPrimitive
    {...props}
    ref={forwardedRef}
    styleConfig={{
      base: {
        icon: {
          normal: {
            color: theme.colors.white,
          },
        },
        checkbox: {
          normal: {
            width: theme.sizes[3],
            height: theme.sizes[3],
            borderRadius: theme.radii[2],
            borderColor: theme.colors.gray,
            transition: 'border 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: 'white',
          },
          hover: {
            borderColor: `${theme.colors.grays[5]}`,
          },
          checked: {
            backgroundColor: theme.colors.blue,
            borderColor: theme.colors.blue,
          },
        },
      },
    }}
  />
))

Checkbox.displayName = 'Checkbox'
