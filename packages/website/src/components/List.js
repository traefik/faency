import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@containous/faency'

function List({ children, ...props }) {
  return (
    <Flex sx={{ flexDirection: 'column' }} py={2} {...props}>
      {children}
    </Flex>
  )
}

List.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object,
}

export default List
