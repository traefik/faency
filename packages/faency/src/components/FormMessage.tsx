import React, { ReactNode } from 'react'
import { Text } from './Text'
import styled, { SimpleInterpolation } from 'styled-components'
import { theme } from '../theme'
import { Flex } from './Flex'

const IconContainer = styled(Flex)<{ color: string }>`
  border-radius: ${theme.radii[1]};
  display: inline-flex;
  padding: 4px;
  margin-right: 10px;

  ${({ color }): SimpleInterpolation => `
    background-color: ${color};
  `}
`

const ColoredMessage = styled(Text)<{ color: string }>`
  ${({ color }): SimpleInterpolation => `
    color: ${color};
  `}
`

type FormMessageProps = {
  message: string
  variant?: 'error' | 'warning' | 'info' | 'success'
  icon?: ReactNode
}

const variantColors = {
  error: theme.colors.red,
  warning: theme.colors.orange,
  info: theme.colors.blue,
  success: theme.colors.positive,
}

export const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  ({ message, variant = 'error', icon }, forwardedRef) => (
    <Flex ref={forwardedRef} alignItems="center">
      {icon && <IconContainer color={variantColors[variant]}>{icon}</IconContainer>}
      <ColoredMessage color={variantColors[variant]}>{message}</ColoredMessage>
    </Flex>
  ),
)

FormMessage.displayName = 'FormMessage'
