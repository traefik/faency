import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import faviconPng from '../../static/favicon.png'
import faviconSvg from '../../static/favicon.svg'
import faviconLightPng from '../../static/favicon-light.png'
import faviconLightSvg from '../../static/favicon-light.svg'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body, #gatsby-focus-wrapper {
    min-height: 100vh;
  }
`

function Layout({ children }) {
  const [systemTheme, setSystemTheme] = useState('light')

  useEffect(() => {
    const listener = window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    })

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener(listener)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Faency</title>
        <link rel="icon" href={systemTheme === 'dark' ? faviconLightSvg : faviconSvg} type="image/svg+xml" />
        <link rel="alternate icon" href={systemTheme === 'dark' ? faviconLightPng : faviconPng} type="image/png" />

        <meta property="og:url" content="https://traefik.github.io/faency/" />
        <meta property="og:title" content="Faency" />
        <meta property="og:description" content="Traefik Labs React Component Library" />

        <meta name="twitter:url" content="https://traefik.github.io/faency/" />
        <meta name="twitter:title" content="Faency" />
        <meta name="twitter:description" content="Traefik Labs React Component Library" />
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
