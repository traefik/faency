import React from 'react'
import styled from 'styled-components'
import { useTheme } from '@containous/faency'

const Link = styled.a`
  color: ${props => props.color};
  text-decoration: none;
`

const ThemedLink = props => {
  const theme = useTheme()

  return <Link color={theme.colors.primary} {...props} />
}

export default ThemedLink
