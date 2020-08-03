import React, { FC, ComponentProps } from 'react'
import styled from 'styled-components'
import css from '@styled-system/css'
import omit from 'lodash.omit'
import pick from 'lodash.pick'
import { margin, MarginProps } from '@modulz/radix-system'
import themeGet from '@styled-system/theme-get'

export type SwitchProps = MarginProps & ComponentProps<'input'>

const marginPropNames = margin.propNames

export const Switch: FC<SwitchProps> = ({ children, ...props }) => {
  const marginProps = pick(props, marginPropNames)
  const inputProps = omit(props, marginPropNames)

  return (
    <SwitchWrapper {...marginProps} data-testid="switch">
      <Input type="checkbox" {...inputProps} />
      <FakeSwitch />
    </SwitchWrapper>
  )
}

const SwitchWrapper = styled('label')<MarginProps>(
  css({
    position: 'relative',
    display: 'inline-block',
    width: 5,
    height: 3,
    boxSizing: 'content-box',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  }),
  margin,
)

const Input = styled('input')({
  appearance: 'none',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  outline: 'none',
  margin: 0,
  opacity: 0,
})

const FakeSwitch = styled('div')(props =>
  css({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    cursor: 'default',
    userSelect: 'none',
    '&::before': {
      content: `''`,
      display: 'block',
      height: 3,
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255)',
      borderRadius: 9999,
      boxShadow: `inset 0 0 0 1px ${themeGet('colors.gray')(props)}`,
      transition: 'all 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '&::after': {
      content: `''`,
      position: 'absolute',
      width: '22px',
      height: '22px',
      top: '1px',
      left: '1px',
      borderRadius: 9999,
      backgroundColor: 'white',
      boxShadow: `0px 0px 1px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.2)`,
      transition: 'all 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    [`${Input}:checked + &`]: {
      '&::before': {
        backgroundColor: 'blue',
        boxShadow: `inset 0 0 0 1px ${themeGet('colors.blue')(props)}`,
      },
      '&::after': {
        transform: `translateX(${themeGet('space.2')(props)})`,
      },
    },
    [`${Input}:not(:disabled):not(:checked):hover + &`]: {
      '&::before': {
        boxShadow: `inset 0 0 0 1px ${themeGet('colors.grays.5')(props)}`,
      },
      '&::after': {
        boxShadow: `0px 0px 1px rgba(0, 0, 0, 0.4), 0px 1px 2px rgba(0, 0, 0, 0.3)`,
      },
    },
    [`${Input}:not(:disabled):active + &`]: {
      '&::before': {
        backgroundColor: 'hsl(0,0%,86%)',
      },
      '&::after': {
        backgroundColor: 'grays.1',
      },
    },
    [`${Input}:not(:disabled):active:checked + &`]: {
      '&::before': {
        backgroundColor: 'blue',
      },
    },
    [`${Input}:disabled + &`]: {
      cursor: 'not-allowed',
      '&::before': {
        backgroundColor: 'grays.1',
        boxShadow: `inset 0 0 0 1px ${themeGet('colors.gray')(props)}`,
      },
    },
  }),
)
