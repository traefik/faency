import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from './theme'
import { theme as defaultDarkTheme } from './dark-theme'
import { GlobalStyles } from './GlobalStyles'

type ProviderProps = {
  // TODO: type Theme
  theme?: any
  darkTheme?: any
  useDarkTheme?: boolean
}

export const Provider: FC<ProviderProps> = ({
  theme = defaultTheme,
  darkTheme = defaultDarkTheme,
  useDarkTheme = false,
  children,
}) => {
  const usedTheme = useDarkTheme ? darkTheme : theme

  return (
    <ThemeProvider theme={usedTheme}>
      <>
        <GlobalStyles />
        {children}
      </>
    </ThemeProvider>
  )
}
