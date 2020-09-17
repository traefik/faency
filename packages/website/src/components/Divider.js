import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@traefiklabs/faency'

function Divider({ style = {}, ...props }) {
  const theme = useTheme()

  return (
    <hr
      style={{
        border: 0,
        borderTop: `1px solid ${theme.colors.grays[3]}`,
        height: 1,
        marginTop: '1em',
        marginBottom: '1em',
        ...style,
      }}
      {...props}
    />
  )
}

Divider.propTypes = {
  style: PropTypes.object,
}

export default Divider
