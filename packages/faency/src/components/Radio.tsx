import React from 'react'
import { Radio as RadioPrimitive, RadioProps } from '@modulz/primitives'
import { theme } from '../theme'

export { RadioProps } from '@modulz/primitives'

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>((props, forwardedRef) => (
  <RadioPrimitive
    {...props}
    ref={forwardedRef}
    styleConfig={{
      base: {
        radio: {
          normal: {
            height: theme.sizes[3],
            width: theme.sizes[3],
            borderColor: theme.colors.gray,
            backgroundColor: 'white !important',
            transition: 'all 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          checked: {
            borderColor: theme.colors.blue,
            '> div': {
              backgroundColor: theme.colors.blue,
              transition: 'all 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
          hover: {
            borderColor: `${theme.colors.grays[5]}`,
          },
        },
        icon: {
          normal: {
            height: theme.sizes[2],
            width: theme.sizes[2],
          },
        },
      },
    }}
  />
))

Radio.displayName = 'Radio'
