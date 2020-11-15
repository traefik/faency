import React, { useContext } from 'react'
import { CSSObject, ThemeContext } from 'styled-components'
import { transparentize } from 'polished'
import { Card as CardPrimitive, CardProps as CardPrimitiveProps, StyleConfig, CardParts } from '@modulz/primitives'
import { theme } from '../theme'

function createShadow(defaultOpacity: number): CSSObject {
  return {
    position: 'relative',
    transition: 'opacity 80ms linear, transform 150ms ease, border-color 150ms ease-in-out',
    '&::before': {
      content: `""`,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      pointerEvents: 'none',
      transitionProperty: 'all',
      transitionDuration: '80ms',
      transitionTimingFunction: 'linear',
      boxShadow: `0 4px 12px 0px ${transparentize(0.9, theme.colors.black)}`,
      opacity: defaultOpacity,
    },
  }
}

export type Variant = 'border' | 'shadow' | 'ghost'

export type CardProps = CardPrimitiveProps & {
  variant?: Variant
  as?: any
}

export const getCardStyleConfig = (theme: any): StyleConfig<CardParts> => ({
  base: {
    card: {
      normal: {
        backgroundColor: theme.colors.white,
        padding: theme.space[4],
        borderRadius: theme.radii[2],
        border: '1px solid transparent',
      },
    },
  },
  variants: {
    variant: {
      border: {
        card: {
          normal: {
            borderColor: theme.colors.grays[3],
          },
        },
      },
      shadow: {
        card: {
          normal: {
            borderColor: theme.colors.grays[3],
            ...createShadow(1),
          },
        },
      },
      ghost: {
        card: {
          normal: {
            borderColor: 'transparent',
            ...createShadow(0),
          },
        },
      },
    },
  },
})

export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, forwardedRef) => {
  const theme = useContext(ThemeContext)

  return <CardPrimitive {...props} ref={forwardedRef} styleConfig={getCardStyleConfig(theme)} />
})

Card.displayName = 'Card'

Card.defaultProps = {
  variant: 'border',
}
