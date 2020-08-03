import React, { useContext, forwardRef } from 'react'
import { Avatar as AvatarPrimitive, AvatarProps as AvatarPrimitiveProps } from '@modulz/primitives'
import { ThemeContext } from 'styled-components'

export type AvatarProps = AvatarPrimitiveProps & {
  variant?: 'normal' | 'dark' | 'light'
}

export const getBaseStyleConfig = (theme: any) => ({
  base: {
    avatar: {
      normal: {
        backgroundColor: theme.colors.primary,
        borderRadius: '50%',
        height: theme.space[8],
        width: theme.space[8],
        fontSize: theme.sizes[3],
        fontWeight: 'bold',
        color: '#fff',
        transition: 'all 200ms ease-in-out',
        '*': {
          color: '#fff',
        },
      },
    },
  },
})

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, forwardedRef) => {
  const theme = useContext(ThemeContext)
  const baseStyleConfig: any = getBaseStyleConfig(theme)

  return <AvatarPrimitive {...props} ref={forwardedRef} styleConfig={baseStyleConfig} />
})

Avatar.displayName = 'Avatar'

Avatar.defaultProps = { variant: 'normal' }
