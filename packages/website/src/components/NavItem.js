import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Button, Text } from '@containous/faency'

function NavItem({ children, isExternal, active, ...props }) {
  return (
    <Button
      as={Link}
      {...props}
      variant={active ? 'active' : undefined}
      px={5}
      minHeight={6}
      style={{ justifyContent: 'flex-start' }}
    >
      <Text size={2} textColor={active ? 'blue' : undefined} mr={isExternal ? 1 : 0}>
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
