import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import {
  Select as SelectPrimitive,
  SelectProps as SelectPrimitiveProps,
  StyleConfig,
  SelectParts,
} from '@modulz/primitives'
import merge from 'lodash.merge'
import { menuStyleConfig } from './Menu'
import { getInputBorderStyle } from './Input'

export { Option, OptionProps, OptionGroup, OptionGroupProps } from '@modulz/primitives'

type Variant = 'normal' | 'ghost'
type Size = 0 | 1

export type SelectProps = SelectPrimitiveProps & {
  variant?: Variant
  size?: Size
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, forwardedRef) => {
  const theme = useContext(ThemeContext)

  const selectStyleConfigOverrides: StyleConfig<SelectParts> = {
    base: {
      button: {
        normal: {
          fontFamily: theme.fonts.normal,
          borderRadius: theme.radii[1],
          letterSpacing: '-0.01em',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          color: theme.colors.black,
          transition: 'all 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: getInputBorderStyle({
            mode: 'normal',
            variant: props.variant,
            error: false,
            themeContext: theme,
          }),
        },
        focus: {
          boxShadow: getInputBorderStyle({
            mode: 'focus',
            variant: props.variant,
            error: false,
            themeContext: theme,
          }),
        },
        disabled: {
          color: theme.colors.grays[4],
          cursor: 'not-allowed',
          boxShadow: getInputBorderStyle({
            mode: 'disabled',
            variant: props.variant,
            error: false,
            themeContext: theme,
          }),
        },
      },
      buttonIcon: {
        normal: {
          marginLeft: theme.space[1],
        },
      },
      item: {
        normal: {},
        grouped: {
          paddingLeft: theme.space[6],
        },
      },
    },
    variants: {
      variant: {
        normal: {
          button: {
            normal: {
              backgroundColor: theme.colors.white,
              boxShadow: `inset 0 0 0 1px ${theme.colors.gray}`,
            },
            hover: {
              boxShadow: `inset 0 0 0 1px ${theme.colors.grays[5]}`,
            },
          },
        },
      },
      size: {
        0: {
          button: {
            normal: {
              fontSize: theme.fontSizes[1],
              height: theme.sizes[5],
              paddingLeft: theme.space[1],
              paddingRight: theme.space[1],
            },
          },
        },
        1: {
          button: {
            normal: {
              fontSize: theme.fontSizes[2],
              height: theme.sizes[6],
              paddingLeft: theme.space[2],
              paddingRight: theme.space[2],
            },
          },
        },
      },
    },
  }

  const selectStyleConfig: StyleConfig<SelectParts> = merge({}, menuStyleConfig, selectStyleConfigOverrides)

  return <SelectPrimitive ref={forwardedRef} styleConfig={selectStyleConfig} {...props} />
})

Select.displayName = 'Select'

Select.defaultProps = {
  variant: 'normal',
  size: 0 as const,
}
