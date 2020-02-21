import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

function Layout({ children }) {
  return (
    <>
      <Helmet>
        <title>Faency</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdn.containous.app/fonts/fonts.css" />

        <meta property="og:url" content="https://faency.containous.app/" />
        <meta property="og:title" content="Faency" />
        <meta property="og:description" content="Containous Design System and Component Library" />

        <meta name="twitter:url" content="https://faency.containous.app/" />
        <meta name="twitter:title" content="Faency" />
        <meta name="twitter:description" content="Containous Design System and Component Library" />
        <meta name="twitter:site" content="@containous" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@containous" />
      </Helmet>
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.elementType,
}

export default Layout
