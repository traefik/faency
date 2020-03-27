import React, { useContext, forwardRef } from 'react'
import { Avatar as AvatarPrimitive, AvatarProps as AvatarPrimitiveProps } from '@modulz/primitives'
import { ThemeContext } from 'styled-components'

export type AvatarProps = AvatarPrimitiveProps & {
  textColor?: string
  variant?: 'normal' | 'dark' | 'light'
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, forwardedRef) => {
  const theme = useContext(ThemeContext)

  return (
    <AvatarPrimitive
      {...props}
      ref={forwardedRef}
      styleConfig={{
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
                color: '#fff !important',
              },
            },
          },
        },
        variants: {
          variant: {
            normal: {
              avatar: {
                normal: {
                  '&:hover': {
                    boxShadow: `0 0 0 2px ${theme.colors.borderColor}`,
                    backgroundColor: theme.colors.primaryHoverBg,
                    color: theme.colors.primaryHoverText,
                    '*': {
                      color: `${theme.colors.primaryHoverText} !important`,
                    },
                  },
                },
              },
            },
            light: {
              avatar: {
                normal: {
                  '&:hover': {
                    boxShadow: `0 0 0 2px ${theme.colors.blue}`,
                    backgroundColor: '#fff',
                    color: theme.colors.blue,
                    '*': {
                      color: `${theme.colors.blue} !important`,
                    },
                  },
                },
              },
            },
            dark: {
              avatar: {
                normal: {
                  '&:hover': {
                    boxShadow: '0 0 0 2px #fff',
                  },
                },
              },
            },
          },
        },
      }}
    />
  )
})

Avatar.displayName = 'Avatar'

Avatar.defaultProps = { variant: 'normal' }
