import React from 'react'
import { theme } from '@containous/faency'

function Divider({ ...props }) {
  return (
    <hr
      style={{
        border: 0,
        borderTop: `1px solid ${theme.colors.grays[3]}`,
        height: 1,
        marginTop: '1em',
        marginBottom: '1em',
      }}
      {...props}
    />
  )
}

export default Divider
