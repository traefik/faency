import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { CardLink as CardLinkPrimitive, CardLinkProps as CardLinkPrimitiveProps } from '@modulz/primitives'
import { getCardStyleConfig } from './Card'

export type Variant = 'border' | 'shadow' | 'ghost'

export type CardLinkProps = CardLinkPrimitiveProps & {
  variant?: Variant
}

export const CardLink = React.forwardRef<HTMLAnchorElement, CardLinkProps>((props, forwardedRef) => {
  const theme = useContext(ThemeContext)
  const cardStyleConfig = getCardStyleConfig(theme)

  return (
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
  )
})

CardLink.displayName = 'CardLink'
