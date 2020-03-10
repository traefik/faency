import React, { useContext, forwardRef } from 'react'
import { Avatar as AvatarPrimitive, AvatarProps as AvatarPrimitiveProps } from 'mdlz-prmtz'
import { ThemeContext } from 'styled-components'

type AvatarProps = AvatarPrimitiveProps & {
  textColor?: string
  variant?: 'dark' | 'light'
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
              color: theme.colors.white,
              transition: 'all 200ms ease-in-out',
            },
          },
        },
        variants: {
          variant: {
            light: {
              avatar: {
                normal: {
                  '&:hover': {
                    boxShadow: `0 0 0 2px ${theme.colors.blue}`,
                    backgroundColor: theme.colors.white,
                    color: `${theme.colors.blue}`,
                    '*': {
                      color: `${theme.colors.blue}`,
                    },
                  },
                },
              },
            },
            dark: {
              avatar: {
                normal: {
                  '&:hover': {
                    boxShadow: `0 0 0 2px ${theme.colors.white}`,
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

Avatar.defaultProps = { variant: 'light' }
