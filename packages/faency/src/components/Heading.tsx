import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Text as TextPrimitive, TextProps as TextPrimitiveProps } from '@modulz/primitives'

type FontWeight = 400 | 500
type Size = 0 | 1 | 2 | 3 | 4 | 5

export type HeadingProps = TextPrimitiveProps & {
  fontWeight?: FontWeight
  size?: Size
  truncate?: boolean
  as?: any
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>((props, forwardedRef) => {
  const themeContext = useContext(ThemeContext)

  return (
    <TextPrimitive
      {...props}
      ref={forwardedRef}
      styleConfig={{
        base: {
          text: {
            normal: {
              fontFamily: themeContext.fonts.normal,
              fontWeight: 700,
              lineHeight: 1.2,
              color: themeContext.colors.black,
            },
          },
        },
        variants: {
          size: {
            0: {
              text: {
                normal: {
                  fontSize: themeContext.fontSizes[3],
                  lineHeight: themeContext.lineHeights[3],
                  letterSpacing: props.fontWeight === 500 ? '-0.025em' : '-0.01em',
                  textIndent: '-0.01em',
                },
              },
            },
            1: {
              text: {
                normal: {
                  fontSize: themeContext.fontSizes[4],
                  lineHeight: themeContext.lineHeights[3],
                  letterSpacing: props.fontWeight === 500 ? '-0.035em' : '-0.02em',
                  textIndent: '-0.02em',
                },
              },
            },
            2: {
              text: {
                normal: {
                  fontSize: themeContext.fontSizes[5],
                  lineHeight: themeContext.lineHeights[4],
                  letterSpacing: props.fontWeight === 500 ? '-0.04em' : '-0.02em',
                  textIndent: '-0.025em',
                },
              },
            },
            3: {
              text: {
                normal: {
                  fontSize: themeContext.fontSizes[6],
                  lineHeight: themeContext.lineHeights[5],
                  letterSpacing: props.fontWeight === 500 ? '-0.045em' : '-0.025em',
                  textIndent: '-0.03em',
                },
              },
            },
            4: {
              text: {
                normal: {
                  fontSize: themeContext.fontSizes[7],
                  lineHeight: themeContext.lineHeights[6],
                  letterSpacing: props.fontWeight === 500 ? '-0.045em' : '-0.025em',
                  textIndent: '-0.04em',
                },
              },
            },
            5: {
              text: {
                normal: {
                  fontSize: themeContext.fontSizes[8],
                  lineHeight: themeContext.lineHeights[9],
                  letterSpacing: props.fontWeight === 500 ? '-0.05em' : '-0.03em',
                  textIndent: '-0.04em',
                },
              },
            },
          },
          truncate: {
            true: {
              text: {
                normal: {
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                },
              },
            },
          },
        },
      }}
    />
  )
})

Heading.displayName = 'Heading'

Heading.defaultProps = {
  as: 'h1',
  truncate: false,
  size: 2,
}
