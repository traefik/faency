import React, { useContext, forwardRef } from 'react'
import { Avatar as AvatarPrimitive, AvatarProps as AvatarPrimitiveProps } from '@modulz/primitives'
import { ThemeContext } from 'styled-components'
import useDarkMode from 'use-dark-mode'

type AvatarProps = AvatarPrimitiveProps & {
  textColor?: string
  variant?: 'dark' | 'light'
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, forwardedRef) => {
  const theme = useContext(ThemeContext)
  const darkMode = useDarkMode(false)
  let forwardedProps = props

  if (typeof props.variant === 'undefined') {
    forwardedProps = { ...props, variant: darkMode.value ? 'dark' : 'light' }
  }

  // FIXME: Needed to handle the colors relative to the theme, since the
  // Black and White colors are inverted on Dark theme. Should be solved on faency#75.
  const relativeColors = darkMode.value
    ? {
        black: theme.colors.white,
        white: theme.colors.black,
      }
    : {
        black: theme.colors.black,
        white: theme.colors.white,
      }

  return (
    <AvatarPrimitive
      {...forwardedProps}
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
              color: relativeColors.white,
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
                    backgroundColor: relativeColors.white,
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
                  color: relativeColors.white,
                  '*': {
                    color: `${relativeColors.white} !important`,
                  },
                  '&:hover': {
                    boxShadow: `0 0 0 2px ${relativeColors.white}`,
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
