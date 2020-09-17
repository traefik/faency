import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import favicon from '../../static/favicon.png'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body, #gatsby-focus-wrapper {
    min-height: 100vh;
  }
`

function Layout({ children }) {
  return (
    <>
      <Helmet>
        <title>Faency</title>
        <link rel="icon" type="image/png" href={favicon} />

        <meta property="og:url" content="https://traefik.github.io/faency/" />
        <meta property="og:title" content="Faency" />
        <meta property="og:description" content="Traefik Labs Design System and Component Library" />

        <meta name="twitter:url" content="https://traefik.github.io/faency/" />
        <meta name="twitter:title" content="Faency" />
        <meta name="twitter:description" content="Traefik Labs Design System and Component Library" />
        <meta name="twitter:site" content="@traefik" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@traefik" />
      </Helmet>
      <GlobalStyle />
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
