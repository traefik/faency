import React from 'react'
import PropTypes from 'prop-types'
import { Box, theme as faencyTheme } from '@traefiklabs/faency'
import useDarkMode from 'use-dark-mode'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { useMDXComponents, mdx } from '@mdx-js/react'
import nightOwl from 'prism-react-renderer/themes/nightOwl'

const CodeBlock = ({ children, live, removeFragment }) => {
  const components = useMDXComponents()
  const darkMode = useDarkMode()

  const liveProviderProps = {
    transformCode: code => (removeFragment ? code : `<>${code}</>`),
    scope: { mdx, ...components },
  }

  if (darkMode.value) {
    nightOwl.plain.backgroundColor = '#111726'
  }

  if (live) {
    return (
      <Box mt={4}>
        <LiveProvider code={children.trim()} {...liveProviderProps} theme={nightOwl}>
          <LivePreview
            style={{
              paddingBottom: faencyTheme.space[3],
            }}
          />

          <LiveEditor
            padding={faencyTheme.space[3]}
            style={{
              borderRadius: faencyTheme.radii[2],
              borderTop: 'none',
              fontSize: faencyTheme.fontSizes[2],
              fontFamily: faencyTheme.fonts.mono,
              fontWeight: 400,
              lineHeight: 1.5,
            }}
            css={{ textarea: { outline: 0 } }}
          />

          <LiveError />
        </LiveProvider>
      </Box>
    )
  }

  return (
    <Box mt={4}>
      <LiveProvider code={children.trim()} {...liveProviderProps} theme={nightOwl}>
        <LiveEditor
          padding={faencyTheme.space[3]}
          style={{
            borderRadius: faencyTheme.radii[2],
            fontSize: faencyTheme.fontSizes[2],
            fontFamily: faencyTheme.fonts.mono,
            fontWeight: 400,
            letterSpacing: '-0.0175em',
            lineHeight: 1.5,
          }}
          css={{ textarea: { paddingBottom: '0 !important' } }}
          disabled
        />
      </LiveProvider>
    </Box>
  )
}

CodeBlock.propTypes = {
  children: PropTypes.elementType,
  live: PropTypes.bool,
  removeFragment: PropTypes.bool,
}

export default CodeBlock
