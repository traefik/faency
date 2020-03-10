import React from 'react'
import { transparentize } from 'polished'
import { StyleConfig, MenuParts, Menu as MenuPrimitive, MenuProps as MenuPrimitiveProps } from 'mdlz-prmtz'
import { theme } from '../theme'

export {
  MenuItem,
  MenuItemProps,
  MenuItemCheckbox,
  MenuItemCheckboxProps,
  MenuItemSeparator,
  MenuItemSeparatorProps,
  MenuItemLabel,
  MenuItemLabelProps,
  MenuItemRadio,
  MenuItemRadioProps,
  MenuItemRadioGroup,
  MenuItemRadioGroupProps,
} from 'mdlz-prmtz'

export const menuStyleConfig: StyleConfig<MenuParts> = {
  base: {
    menu: {
      normal: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii[1],
        paddingTop: theme.space[1],
        paddingBottom: theme.space[1],
        boxShadow: `0 10px 38px -10px ${transparentize(0.65, theme.colors.grays[8])},
  0 10px 20px -15px ${transparentize(0.8, theme.colors.grays[8])}`,
      },
    },
    item: {
      normal: {
        fontFamily: theme.fonts.normal,
        fontSize: theme.fontSizes[1],
        letterSpacing: '-0.01em',
        height: theme.sizes[4],
        paddingLeft: theme.space[5],
        paddingRight: theme.space[6],
      },
      highlighted: {
        backgroundColor: theme.colors.blues[5],
        color: theme.colors.white,
      },
      disabled: {
        color: theme.colors.grays[5],
      },
    },
    itemIcon: {
      normal: {
        left: theme.space[1],
      },
    },
    label: {
      normal: {
        fontFamily: theme.fonts.normal,
        fontSize: theme.fontSizes[1],
        letterSpacing: '-0.01em',
        height: theme.sizes[5],
        paddingLeft: theme.space[5],
        paddingRight: theme.space[6],
        color: theme.colors.grays[5],
      },
    },
    separator: {
      normal: {
        height: '1px',
        backgroundColor: theme.colors.grays[2],
        marginTop: theme.space[1],
        marginBottom: theme.space[1],
      },
    },
    scrollIndicator: {
      normal: {
        backgroundColor: theme.colors.white,
        height: theme.sizes[4],
      },
    },
  },
}

export type MenuProps = MenuPrimitiveProps

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, forwardedRef) => (
  <MenuPrimitive ref={forwardedRef} {...props} styleConfig={menuStyleConfig} />
))

Menu.displayName = 'Menu'
