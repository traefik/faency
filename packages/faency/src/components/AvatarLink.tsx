import React, { useContext, forwardRef } from 'react'
import {
  Link as LinkPrimitive,
  Avatar as AvatarPrimitive,
  AvatarProps as AvatarPrimitiveProps,
  LinkProps as LinkPrimitiveProps,
} from '@modulz/primitives'
import { ThemeContext } from 'styled-components'
import merge from 'lodash.merge'
import omit from 'lodash.omit'
import pick from 'lodash.pick'
import { getBaseStyleConfig } from './Avatar'

export type AvatarLinkProps = AvatarPrimitiveProps &
  LinkPrimitiveProps & {
    variant?: 'normal' | 'dark' | 'light'
  }

export const AvatarLink = forwardRef<HTMLAnchorElement, AvatarLinkProps>((props, forwardedRef) => {
  const theme = useContext(ThemeContext)
  const baseStyleConfig: any = getBaseStyleConfig(theme)
  const avatarPropNames = ['variant', 'src', 'alt', 'children']
  const avatarProps = pick(props, avatarPropNames)
  const linkProps = omit(props, avatarPropNames)

  return (
    <LinkPrimitive
      {...linkProps}
      ref={forwardedRef}
      styleConfig={{
        base: {
          link: {
            hover: {
              cursor: 'pointer',
            },
          },
        },
      }}
    >
      <AvatarPrimitive
        {...avatarProps}
        styleConfig={merge(baseStyleConfig, {
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
        })}
      />
    </LinkPrimitive>
  )
})

AvatarLink.displayName = 'Avatar'

AvatarLink.defaultProps = { variant: 'normal' }
