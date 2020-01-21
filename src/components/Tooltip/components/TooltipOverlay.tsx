import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { getRectForNode, Rect } from '../utils/geometry';
import {
  calculateVerticalPosition,
  calculateHorizontalPosition,
  PreferredPosition,
  PreferredAlignment,
  StyleByAlignmentType
} from '../utils/math';
import { theme } from '../../../theme';

type Position = {
  left?: number;
  height?: number;
  top?: number;
  width?: number | null;
  positioning: PreferredPosition;
  arrowStyle: StyleByAlignmentType;
};;

type TooltipOverlayProps = {
  children?: React.ReactNode;
  activator: HTMLElement;
  preferredPosition?: PreferredPosition;
  preferredAlignment?: PreferredAlignment;
};

type StyleByPositionType = { [key in PreferredPosition]: any };


function getMarginsForNode(node: HTMLElement) {
  const nodeStyles = window.getComputedStyle(node);
  return {
    activator: parseFloat(nodeStyles.marginTop || ''),
    container: parseFloat(nodeStyles.marginBottom || ''),
    horizontal: parseFloat(nodeStyles.marginLeft || '')
  };
}

const TooltipOverlay = (props: TooltipOverlayProps) => {
  const { preferredPosition = 'bottom', preferredAlignment = 'center' } = props;
  const [measurementIsInit, setMeasurementInit] = useState(false);
  const [overlayNode, setOverlayNode] = useState<HTMLElement | null>(null);
  const [overlayPosition, setOverlayPosition] = useState<Position>({
    left: 0,
    height: 0,
    top: 0,
    width: null,
    positioning: 'bottom',
    arrowStyle: {}
  });

  const observer = useRef<MutationObserver>();

  const handleMeasurement = () => {
    if (observer.current) {
      observer.current.disconnect();
    }

    const activatorRect = getRectForNode(props.activator);
    const overlayRect = getRectForNode(overlayNode);

    const containerRect = new Rect({
      top: window.scrollY,
      left: window.scrollX,
      height: window.innerHeight,
      width: window.innerWidth
    });

    const scrollableElement = document.body;
    const scrollableContainerRect = getRectForNode(scrollableElement);

    const overlayMargins =
      overlayNode && overlayNode.firstElementChild
        ? getMarginsForNode(overlayNode.firstElementChild as HTMLElement)
        : { activator: 0, container: 0, horizontal: 0 };

    const verticalPosition = calculateVerticalPosition({
      activatorRect,
      overlayRect,
      containerRect,
      overlayMargins,
      scrollableContainerRect,
      preferredPosition
    });

    const horizontalPosition = calculateHorizontalPosition({
      activatorRect,
      overlayRect,
      containerRect,
      overlayMargins,
      preferredAlignment
    });

    setOverlayPosition({
      height: verticalPosition.height || 0,
      left: horizontalPosition.overlay,
      width: null,
      top: verticalPosition.top,
      positioning: verticalPosition.positioning as PreferredPosition,
      arrowStyle: horizontalPosition.arrowStyle
    });
  };

  useEffect(() => {
    if (overlayNode && !measurementIsInit) {
      handleMeasurement();
      setMeasurementInit(true);
    }
  }, [overlayNode, measurementIsInit]);

  useLayoutEffect(() => {
    observer.current = new MutationObserver(handleMeasurement);
    window.addEventListener('resize', handleMeasurement);
  }, []);

  const overlayPaddingByPosition: StyleByPositionType = {
    top: {
      padding: '5px 0 9px 0'
    },
    bottom: {
      padding: '9px 0 5px 0'
    }
  };

  const arrowStyleByOverlayPosition: StyleByPositionType = {
    top: {
      bottom: 4,
      borderWidth: '5px 5px 0',
      borderTopColor: theme.colors.dark
    },
    bottom: {
      top: 4,
      borderWidth: '0 5px 5px',
      borderBottomColor: theme.colors.dark
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        display: 'inline-block',
        top: overlayPosition.top || undefined,
        left: overlayPosition.left || undefined,
        width: overlayPosition.width || undefined,
        ...overlayPaddingByPosition[
          overlayPosition.positioning as PreferredPosition
        ]
      }}
      ref={setOverlayNode}
    >
      <div
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          borderColor: 'transparent',
          borderStyle: 'solid',
          ...arrowStyleByOverlayPosition[
            overlayPosition.positioning as PreferredPosition
          ],
          ...overlayPosition.arrowStyle
        }}
      />
      <div role="tooltip" style={{ position: 'relative' }}>
        {props.children}
      </div>
    </div>
  );
};

export default TooltipOverlay;
