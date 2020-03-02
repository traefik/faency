import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

export const useTheme = (): any => {
  return useContext(ThemeContext)
}
