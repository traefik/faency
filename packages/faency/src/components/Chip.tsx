import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Text as TextPrimitive, TextProps as TextPrimitiveProps } from 'mdlz-prmtz'

type Variant = 'gray' | 'blue' | 'lightBlue' | 'green' | 'purple' | 'orange' | 'red'
type Size = 0 | 1 | 2

export type ChipProps = TextPrimitiveProps & {
  variant?: Variant
  size?: Size
  truncate?: boolean
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>((props, ref) => {
  const themeContext = useContext(ThemeContext)

  return (
    <TextPrimitive
      {...props}
      ref={ref}
      styleConfig={{
        base: {
          text: {
            normal: {
              fontWeight: 600,
              display: 'inline-block',
              minWidth: themeContext.sizes[4],
              textAlign: 'center',
              borderRadius: themeContext.radii[3],
              padding: themeContext.sizes[1],
              whiteSpace: 'nowrap',
            },
          },
        },
        variants: {
          variant: {
            gray: {
              text: {
                normal: {
                  color: themeContext.colors.grays[5],
                  backgroundColor: themeContext.colors.grays[2],
                  svg: {
                    fill: themeContext.colors.grays[5],
                  },
                },
              },
            },
            blue: {
              text: {
                normal: {
                  color: themeContext.colors.blues[4],
                  backgroundColor: themeContext.colors.blues[2],
                  svg: {
                    fill: themeContext.colors.blues[4],
                  },
                },
              },
            },
            lightBlue: {
              text: {
                normal: {
                  color: themeContext.colors.lightBlues[4],
                  backgroundColor: themeContext.colors.lightBlues[2],
                  svg: {
                    fill: themeContext.colors.lightBlues[4],
                  },
                },
              },
            },
            green: {
              text: {
                normal: {
                  color: themeContext.colors.greens[5],
                  backgroundColor: themeContext.colors.greens[2],
                  svg: {
                    fill: themeContext.colors.greens[5],
                  },
                },
              },
            },
            purple: {
              text: {
                normal: {
                  color: themeContext.colors.purples[5],
                  backgroundColor: themeContext.colors.purples[2],
                  svg: {
                    fill: themeContext.colors.purples[5],
                  },
                },
              },
            },
            orange: {
              text: {
                normal: {
                  color: themeContext.colors.oranges[5],
                  backgroundColor: themeContext.colors.oranges[2],
                  svg: {
                    fill: themeContext.colors.oranges[5],
                  },
                },
              },
            },
            red: {
              text: {
                normal: {
                  color: themeContext.colors.reds[5],
                  backgroundColor: themeContext.colors.reds[2],
                  svg: {
                    fill: themeContext.colors.reds[5],
                  },
                },
              },
            },
          },
          size: {
            0: {
              text: {
                normal: {
                  fontSize: themeContext.fontSizes[1],
                  lineHeight: themeContext.lineHeights[1],
                  height: themeContext.sizes[3],
                },
              },
            },
            1: {
              text: {
                normal: {
                  fontSize: themeContext.fontSizes[1],
                  lineHeight: themeContext.lineHeights[2],
                  height: themeContext.sizes[4],
                },
              },
            },
            2: {
              text: {
                normal: {
                  fontSize: themeContext.fontSizes[2],
                  lineHeight: themeContext.lineHeights[3],
                  height: themeContext.sizes[5],
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

Chip.displayName = 'Chip'

Chip.defaultProps = { size: 0, truncate: false, variant: 'gray' }
