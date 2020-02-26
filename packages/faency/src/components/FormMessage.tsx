import React, { ReactNode } from 'react'
import { Text } from './Text'
import styled, { SimpleInterpolation } from 'styled-components'
import { theme } from '../theme'
import { Flex } from './Flex'
import Icon from 'react-eva-icons'

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
  hasIcon?: boolean
  icon?: ReactNode
}

const variantProps = {
  error: {
    color: theme.colors.red,
    icon: 'alert-triangle',
  },
  warning: {
    color: theme.colors.orange,
    icon: 'alert-triangle',
  },
  info: {
    color: theme.colors.blue,
    icon: 'alert-circle',
  },
  success: {
    color: theme.colors.positive,
    icon: 'checkmark-circle-2',
  },
}

export const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  ({ message, variant = 'error', hasIcon, icon }, forwardedRef) => (
    <Flex ref={forwardedRef} alignItems="center">
      {icon ||
        (hasIcon && (
          <IconContainer color={variantProps[variant].color}>
            <Icon name={variantProps[variant].icon} fill="#FFF" />
          </IconContainer>
        ))}
      <ColoredMessage color={variantProps[variant].color}>{message}</ColoredMessage>
    </Flex>
  ),
)

FormMessage.displayName = 'FormMessage'
