import React from 'react'
import { Text as TextPrimitive, TextProps as TextPrimitiveProps } from 'mdlz-prmtz'
import { theme } from '../theme'

type Variant = 'gray' | 'blue' | 'lightBlue' | 'green' | 'purple' | 'orange' | 'red'
type Size = 0 | 1 | 2

type ChipProps = TextPrimitiveProps & {
  variant?: Variant
  size?: Size
  truncate?: boolean
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>((props, ref) => (
  <TextPrimitive
    {...props}
    ref={ref}
    styleConfig={{
      base: {
        text: {
          normal: {
            fontWeight: 600,
            display: 'inline-block',
            minWidth: theme.sizes[4],
            textAlign: 'center',
            borderRadius: theme.radii[3],
            padding: theme.sizes[1],
            whiteSpace: 'nowrap',
          },
        },
      },
      variants: {
        variant: {
          gray: {
            text: {
              normal: {
                color: theme.colors.grays[5],
                backgroundColor: theme.colors.grays[2],
              },
            },
          },
          blue: {
            text: {
              normal: {
                color: theme.colors.blue,
                backgroundColor: theme.colors.blues[2],
              },
            },
          },
          lightBlue: {
            text: {
              normal: {
                color: theme.colors.lightBlue,
                backgroundColor: theme.colors.lightBlues[2],
              },
            },
          },
          green: {
            text: {
              normal: {
                color: theme.colors.green,
                backgroundColor: theme.colors.greens[2],
              },
            },
          },
          purple: {
            text: {
              normal: {
                color: theme.colors.purple,
                backgroundColor: theme.colors.purples[2],
              },
            },
          },
          orange: {
            text: {
              normal: {
                color: theme.colors.orange,
                backgroundColor: theme.colors.oranges[2],
              },
            },
          },
          red: {
            text: {
              normal: {
                color: theme.colors.red,
                backgroundColor: theme.colors.reds[2],
              },
            },
          },
        },
        size: {
          0: {
            text: {
              normal: {
                fontSize: theme.fontSizes[1],
                lineHeight: theme.lineHeights[1],
                height: theme.sizes[3],
              },
            },
          },
          1: {
            text: {
              normal: {
                fontSize: theme.fontSizes[1],
                lineHeight: theme.lineHeights[2],
                height: theme.sizes[4],
              },
            },
          },
          2: {
            text: {
              normal: {
                fontSize: theme.fontSizes[2],
                lineHeight: theme.lineHeights[3],
                height: theme.sizes[5],
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

Chip.displayName = 'Chip'

Chip.defaultProps = { size: 0, truncate: false, variant: 'gray' }
