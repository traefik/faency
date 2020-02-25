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
  color?: string
  icon?: ReactNode
}

export const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  ({ message, color = theme.colors.red, icon }, forwardedRef) => (
    <Flex ref={forwardedRef} alignItems="center">
      {icon && <IconContainer color={color}>{icon}</IconContainer>}
      <ColoredMessage color={color}>{message}</ColoredMessage>
    </Flex>
  ),
)

FormMessage.displayName = 'FormMessage'
