import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from './theme'
import { GlobalStyles } from './GlobalStyles'

type ProviderProps = {
  // TODO: type Theme
  theme?: any
}

export const Provider: FC<ProviderProps> = ({ theme = defaultTheme, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        {children}
      </>
    </ThemeProvider>
  )
}
