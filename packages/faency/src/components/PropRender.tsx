import React, { ReactNode } from 'react'
import { Text } from './Text'
import { Box } from './Box'
import { Flex } from './Flex'
import color from 'color'
import { useTheme } from '../hooks/use-theme'

const isNumeric = (value: any): boolean => !isNaN(value)
const isBoolean = (value: any): boolean => ['true', 'false'].includes(value)
const isColor = (value: any, themeContext: any): boolean => {
  if (Object.keys(themeContext.colors).includes(value)) {
    return true
  }

  try {
    color(value)
    return true
  } catch (e) {
    return false
  }
}

export type PropRenderProps = {
  children: ReactNode
  type?: 'auto' | 'string' | 'number' | 'boolean' | 'color'
  string?: boolean
  number?: boolean
  boolean?: boolean
  bool?: boolean
  color?: boolean
}

const renderString = (children: ReactNode): JSX.Element => (
  <Text fontWeight={700} textColor="green">
    &quot;{children}&quot;
  </Text>
)

const renderNumber = (children: ReactNode): JSX.Element => (
  <Text fontWeight={700} textColor="blue">
    {children}
  </Text>
)

const renderBoolean = (children: ReactNode): JSX.Element => (
  <Text fontWeight={700} textColor="lightBlue">
    {children}
  </Text>
)

const renderColor = (children: ReactNode): JSX.Element => (
  <Flex alignItems="center" style={{ display: 'inline-flex' }}>
    <Box bg={children as string} height="8px" width="8px" mr="4px" boxShadow="0 0 0 1px black" />
    <Text fontWeight={700}>{children}</Text>
  </Flex>
)

export const PropRender: React.FC<PropRenderProps> = ({
  children,
  type = 'auto',
  string,
  number,
  boolean,
  bool,
  color,
}) => {
  const themeContext = useTheme()
  const booleanPresent = string && number && boolean && bool && color
  const renderMap = {
    string: renderString,
    number: renderNumber,
    boolean: renderBoolean,
    color: renderColor,
  }
  let renderType = type

  if (renderType === 'auto' || booleanPresent) {
    renderType = 'string'

    if (number || isNumeric(children)) {
      renderType = 'number'
    }

    if (bool || boolean || isBoolean(children)) {
      renderType = 'boolean'
    }

    if (color || isColor(children, themeContext)) {
      renderType = 'color'
    }

    if (string) {
      renderType = 'string'
    }
  }

  return renderMap[renderType](children)
}
