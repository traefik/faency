import React from 'react'
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

type FormErrorProps = {
  message: string
  color?: string
  iconColor?: string
  icon?: string
}

export const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ message, color = theme.colors.red, icon = 'alert-triangle', iconColor = theme.colors.white }, forwardedRef) => (
    <Flex ref={forwardedRef} alignItems="center">
      {icon && (
        <IconContainer color={color}>
          <Icon name={icon} fill={iconColor} />
        </IconContainer>
      )}
      <ColoredMessage color={color}>{message}</ColoredMessage>
    </Flex>
  ),
)

FormError.displayName = 'FormError'
