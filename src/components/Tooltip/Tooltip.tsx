import React, { ReactNode, useRef, useState } from 'react';
import {
  Box as BoxPrimitive,
  BoxProps,
  Text as TextPrimitive
} from 'mdlz-prmtz';
import useToggle from '../../hooks/use-toggle';
import { Button } from '../Button';
import Portal from './components/Portal';
import TooltipOverlay from './components/TooltipOverlay';
import { PreferredPosition, PreferredAlignment } from './utils/math';

export type TooltipProps = BoxProps & {
  label: string;
  children: ReactNode;
  preferredPosition?: PreferredPosition;
  preferredAlignment?: PreferredAlignment;
  active?: boolean;
  action?: 'copy';
};

export const Tooltip = (props: TooltipProps) => {
  const {
    value: active,
    setTrue: handleFocus,
    setFalse: handleBlur
  } = useToggle(Boolean(props.active));

  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);
  const activatorContainer = useRef<HTMLElement>(null);
  const mouseEntered = useRef(false);

  const setActivator = (node: HTMLElement | null) => {
    const activatorContainerRef: any = activatorContainer;
    if (node == null) {
      activatorContainerRef.current = null;
      setActivatorNode(null);
      return;
    }

    setActivatorNode(node.firstElementChild as HTMLElement);
    activatorContainerRef.current = node;
  };

  const renderAction = () => {
    if (props.action === 'copy') {
      return (
        <Button
          style={{ height: 0, padding: 0, marginLeft: 8 }}
          onClick={e => {
            e.stopPropagation();
            navigator.clipboard.writeText(props.label);
          }}
        >
          Copy
        </Button>
      );
    }

    return null;
  };

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
  ) : null;

  function handleMouseLeave() {
    mouseEntered.current = false;
    handleBlur();
  }

  function handleMouseEnter() {
    mouseEntered.current = true;
    handleFocus();
  }

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  function handleMouseEnterFix() {
    !mouseEntered.current && handleMouseEnter();
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
              position: 'relative'
            }
          }
        }
      }}
    >
      {portal}
      {props.children}
    </TextPrimitive>
  );
};
