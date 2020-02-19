import React from 'react'
import { Chip as FaencyChip, ChipProps } from './Chip'
import Icon from 'react-eva-icons'
import styled from 'styled-components'
import { theme } from '../theme'
import { Button } from './Button'

const Chip = styled(FaencyChip)`
  display: flex;
  align-items: center;
  padding-right: 4px;
  line-height: ${theme.lineHeights[2]};
  flex-shrink: 0;
`

const CloseButton = styled(Button)`
  padding: 0;
  height: ${theme.sizes[3]};
  min-width: ${theme.sizes[2]};
  margin-left: 4px;

  i {
    transition: opacity 200ms ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }
`

type DismissableChipProps = ChipProps & {
  dismiss: () => void
}

export const DismissableChip: React.FC<DismissableChipProps> = ({ children, dismiss, ...props }) => (
  <Chip {...props} variant={props.variant || 'blue'}>
    <span>{children}</span>
    <CloseButton onClick={() => dismiss()}>
      <Icon name="close-outline" />
    </CloseButton>
  </Chip>
)

DismissableChip.displayName = 'DismissableChip'
