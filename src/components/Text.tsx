import React from 'react'
import { Text as TextPrimitive, TextProps as TextPrimitiveProps } from 'mdlz-prmtz'
import { theme } from '../theme'

type FontWeight = 500 | 600 | 700
type Size = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type TextProps = TextPrimitiveProps & {
  fontWeight?: FontWeight
  size?: Size
  truncate?: boolean
  as?: any
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>((props, forwardedRef) => (
  <TextPrimitive
    {...props}
    ref={forwardedRef}
    styleConfig={{
      base: {
        text: {
          normal: {
            fontSize: 'inherit',
            color: theme.colors.grays[7],
            margin: 0,
          },
        },
      },
      variants: {
        size: {
          0: {
            text: {
              normal: {
                fontSize: theme.fontSizes[0],
                letterSpacing: props.fontWeight === 500 ? '-0.01em' : 0,
              },
            },
          },
          1: {
            text: {
              normal: {
                fontSize: theme.fontSizes[1],
                letterSpacing: props.fontWeight === 500 ? '-0.02em' : '-0.01em',
              },
            },
          },
          2: {
            text: {
              normal: {
                fontSize: theme.fontSizes[2],
                letterSpacing: props.fontWeight === 500 ? '-0.02em' : '-0.01em',
              },
            },
          },
          3: {
            text: {
              normal: {
                fontSize: theme.fontSizes[3],
                letterSpacing: props.fontWeight === 500 ? '-0.025em' : '-0.01em',
              },
            },
          },
          4: {
            text: {
              normal: {
                fontSize: theme.fontSizes[4],
                letterSpacing: props.fontWeight === 500 ? '-0.03em' : '-0.015em',
              },
            },
          },
          5: {
            text: {
              normal: {
                fontSize: theme.fontSizes[5],
                letterSpacing: props.fontWeight === 500 ? '-0.035em' : '-0.02em',
              },
            },
          },
          6: {
            text: {
              normal: {
                fontSize: theme.fontSizes[6],
                letterSpacing: props.fontWeight === 500 ? '-0.04em' : '-0.02em',
              },
            },
          },
          7: {
            text: {
              normal: {
                fontSize: theme.fontSizes[7],
                letterSpacing: props.fontWeight === 500 ? '-0.04em' : '-0.02em',
              },
            },
          },
          8: {
            text: {
              normal: {
                fontSize: theme.fontSizes[8],
                letterSpacing: props.fontWeight === 500 ? '-0.045em' : '-0.025em',
              },
            },
          },
          9: {
            text: {
              normal: {
                fontSize: theme.fontSizes[9],
                letterSpacing: props.fontWeight === 500 ? '-0.045em' : '-0.025em',
              },
            },
          },
          10: {
            text: {
              normal: {
                fontSize: theme.fontSizes[10],
                letterSpacing: props.fontWeight === 500 ? '-0.05em' : '-0.03em',
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
))

Text.displayName = 'Text'

Text.defaultProps = { truncate: false }
