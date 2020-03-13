import React, { ReactNode } from 'react'
import { Text } from './Text'
import { Box } from './Box'
import { Flex } from './Flex'

const isNumeric = (value: any): boolean => !isNaN(value)
const isBoolean = (value: any): boolean => ['true', 'false'].includes(value)
const isColor = (strColor: any): boolean => {
  const s = new Option().style
  s.color = strColor
  return s.color == strColor
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
  let renderType = type
  const booleanPresent = string && number && boolean && bool && color
  const renderMap = {
    string: renderString,
    number: renderNumber,
    boolean: renderBoolean,
    color: renderColor,
  }

  if (renderType === 'auto' || booleanPresent) {
    renderType = 'string'

    if (number || isNumeric(children)) {
      renderType = 'number'
    }

    if (bool || boolean || isBoolean(children)) {
      renderType = 'boolean'
    }

    if (color || isColor(children)) {
      renderType = 'color'
    }

    if (string) {
      renderType = 'string'
    }
  }

  return renderMap[renderType](children)
}
