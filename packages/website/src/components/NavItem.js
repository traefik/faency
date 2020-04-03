import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Button, Text, useTheme } from '@containous/faency'
import useDarkMode from 'use-dark-mode'

function NavItem({ children, isExternal, active, ...props }) {
  const theme = useTheme()
  const darkMode = useDarkMode()

  return (
    <Button as={Link} {...props} variant="secondary" px={5} minHeight={6} style={{ justifyContent: 'flex-start' }}>
      <Text
        size={2}
        sx={{ color: active ? 'blue' : darkMode.value ? theme.colors.grays[4] : undefined }}
        mr={isExternal ? 1 : 0}
      >
        {children}
      </Text>
    </Button>
  )
}

NavItem.propTypes = {
  children: PropTypes.elementType,
  isExternal: PropTypes.bool,
  active: PropTypes.bool,
  props: PropTypes.object,
}

export default NavItem
