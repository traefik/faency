import React, { ReactNode, useRef, useState } from 'react'
import { Box as BoxPrimitive, BoxProps, Text as TextPrimitive } from 'mdlz-prmtz'
import useToggle from '../../hooks/use-toggle'
import { Button } from '../Button'
import Portal from './components/Portal'
import TooltipOverlay from './components/TooltipOverlay'
import { PreferredPosition, PreferredAlignment } from './utils/math'

export type TooltipProps = BoxProps & {
  label: string
  children: ReactNode
  preferredPosition?: PreferredPosition
  preferredAlignment?: PreferredAlignment
  active?: boolean
  action?: 'copy'
}

interface RefObject<T> {
  current: T | null
}

export const Tooltip: React.FC<TooltipProps> = props => {
  const { value: active, setTrue: handleFocus, setFalse: handleBlur } = useToggle(Boolean(props.active))

  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null)
  const activatorContainer = useRef<HTMLElement>(null)
  const mouseEntered = useRef(false)

  const setActivator = (node: HTMLElement | null): void => {
    const activatorContainerRef: RefObject<HTMLElement> = activatorContainer
    if (node == null) {
      activatorContainerRef.current = null
      setActivatorNode(null)
      return
    }

    setActivatorNode(node.firstElementChild as HTMLElement)
    activatorContainerRef.current = node
  }

  const renderAction = (): JSX.Element | null => {
    if (props.action === 'copy') {
      return (
        <Button
          style={{ height: 0, padding: 0, marginLeft: 8 }}
          onClick={(e: React.MouseEvent): void => {
            e.stopPropagation()
            navigator.clipboard.writeText(props.label)
          }}
        >
          Copy
        </Button>
      )
    }

    return null
  }

  const portal = activatorNode ? (
    <Portal>
      {active ? (
        <TooltipOverlay
          activator={activatorNode}
          preferredPosition={props.preferredPosition}
          preferredAlignment={props.preferredAlignment}
        >
          <>
            <BoxPrimitive bg="dark" textColor="white" borderRadius={2} p="1">
              {props.label} {renderAction()}
            </BoxPrimitive>
          </>
        </TooltipOverlay>
      ) : null}
    </Portal>
  ) : null

  function handleMouseLeave(): void {
    mouseEntered.current = false
    handleBlur()
  }

  function handleMouseEnter(): void {
    mouseEntered.current = true
    handleFocus()
  }

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  function handleMouseEnterFix(): void {
    !mouseEntered.current && handleMouseEnter()
  }

  return (
    <TextPrimitive
      ref={setActivator}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseEnterFix}
      styleConfig={{
        base: {
          text: {
            normal: {
              position: 'relative',
            },
          },
        },
      }}
    >
      {portal}
      {props.children}
    </TextPrimitive>
  )
}
