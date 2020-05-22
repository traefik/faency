import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, useTheme } from '@containous/faency'
import color from 'color'

const isNumeric = value => !isNaN(value)
const isBoolean = value => ['true', 'false'].includes(value)
const isColor = (value, themeContext) => {
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

const renderString = children => <Text sx={{ fontWeight: 700, color: 'green' }}>&quot;{children}&quot;</Text>

const renderNumber = children => <Text sx={{ fontWeight: 700, color: 'blue' }}>{children}</Text>

const renderBoolean = children => <Text sx={{ fontWeight: 700, color: 'lightblue' }}>{children}</Text>

const renderColor = children => (
  <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
    <Box sx={{ backgroundColor: children, height: '8px', width: '8px', boxShadow: '0 0 0 1px black' }} mr="4px" />
    <Text sx={{ fontWeight: 700 }}>{children}</Text>
  </Box>
)

export const PropRender = ({ children, type = 'auto', string, number, boolean, bool, color }) => {
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

PropRender.propTypes = {
  type: PropTypes.oneOf(['auto', 'string', 'number', 'boolean', 'color']),
  string: PropTypes.bool,
  number: PropTypes.bool,
  boolean: PropTypes.bool,
  bool: PropTypes.bool,
  color: PropTypes.bool,
}

export default PropRender
