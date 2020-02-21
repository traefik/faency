import React from 'react'
import { CardLink as CardLinkPrimitive, CardLinkProps as CardLinkPrimitiveProps } from 'mdlz-prmtz'
import { theme } from '../theme'
import { cardStyleConfig } from './Card'

export type Variant = 'border' | 'shadow' | 'ghost'

export type CardLinkProps = CardLinkPrimitiveProps & {
  variant?: Variant
}

export const CardLink = React.forwardRef<HTMLAnchorElement, CardLinkProps>((props, forwardedRef) => (
  <CardLinkPrimitive
    ref={forwardedRef}
    {...props}
    styleConfig={{
      base: {
        card: {
          normal: {
            ...cardStyleConfig.base.card?.normal,
            transition: 'border-color 150ms ease-in-out',
          },
          hover: {
            cursor: 'pointer',
            borderColor: theme.colors.blue,
          },
        },
      },
      variants: {
        ...cardStyleConfig.variants,
      },
    }}
  />
))

CardLink.displayName = 'CardLink'
