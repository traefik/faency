import { Rect } from './geometry';

export type PreferredPosition = 'bottom' | 'top';
export type PreferredAlignment = 'left' | 'center' | 'right';
export type Margins = {
  activator: number;
  container: number;
  horizontal: number;
};

export type CalculatePositionType = {
  activatorRect: Rect;
  containerRect: Rect;
  overlayRect: Rect;
  overlayMargins: Margins;
};

type CalculateVerticalPositionType = CalculatePositionType & {
  scrollableContainerRect: Rect;
  preferredPosition: PreferredPosition;
};

type CalculateHorizontalPositionType = CalculatePositionType & {
  preferredAlignment: PreferredAlignment;
};

export type StyleByAlignmentType = { [key in PreferredAlignment]?: any };

export const calculateVerticalPosition = ({
  activatorRect,
  containerRect,
  overlayRect,
  overlayMargins,
  scrollableContainerRect,
  preferredPosition
}: CalculateVerticalPositionType) => {
  const activatorTop = activatorRect.top;
  const activatorBottom = activatorTop + activatorRect.height;
  const spaceAbove = activatorRect.top;
  const containerRectTop = containerRect.top;

  const spaceBelow =
    containerRect.height - activatorRect.top - activatorRect.height;
  const desiredHeight = overlayRect.height;
  const verticalMargins = overlayMargins.activator + overlayMargins.container;

  const minimumSpaceToScroll = overlayMargins.container;
  const distanceToTopScroll =
    activatorRect.top - Math.max(scrollableContainerRect.top, 0);
  const distanceToBottomScroll =
    containerRect.top +
    Math.min(
      containerRect.height,
      scrollableContainerRect.top + scrollableContainerRect.height
    ) -
    (activatorRect.top + activatorRect.height);
  const enoughSpaceFromTopScroll = distanceToTopScroll >= minimumSpaceToScroll;
  const enoughSpaceFromBottomScroll =
    distanceToBottomScroll >= minimumSpaceToScroll;
  const heightIfBelow = Math.min(spaceBelow, desiredHeight);
  const heightIfAbove = Math.min(spaceAbove, desiredHeight);

  const positionIfAbove = {
    height: heightIfAbove - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove,
    positioning: 'top'
  };

  const positionIfBelow = {
    height: heightIfBelow - verticalMargins,
    top: activatorBottom + containerRectTop,
    positioning: 'bottom'
  };

  if (preferredPosition === 'top') {
    return (enoughSpaceFromTopScroll ||
      (distanceToTopScroll >= distanceToBottomScroll &&
        !enoughSpaceFromBottomScroll)) &&
      (spaceAbove > desiredHeight || spaceAbove > spaceBelow)
      ? positionIfAbove
      : positionIfBelow;
  }

  if (preferredPosition === 'bottom') {
    return (enoughSpaceFromBottomScroll ||
      (distanceToBottomScroll >= distanceToTopScroll &&
        !enoughSpaceFromTopScroll)) &&
      (spaceBelow > desiredHeight || spaceBelow > spaceAbove)
      ? positionIfBelow
      : positionIfAbove;
  }

  if (enoughSpaceFromTopScroll && enoughSpaceFromBottomScroll) {
    return spaceAbove > spaceBelow ? positionIfAbove : positionIfBelow;
  }

  return distanceToTopScroll > minimumSpaceToScroll
    ? positionIfAbove
    : positionIfBelow;
};

export const calculateHorizontalPosition = ({
  activatorRect,
  containerRect,
  overlayRect,
  overlayMargins,
  preferredAlignment
}: CalculateHorizontalPositionType) => {
  const maximum = containerRect.width - overlayRect.width;

  let overlayHorizontalPosition;

  if (preferredAlignment === 'left') {
    overlayHorizontalPosition = Math.min(
      maximum,
      Math.max(0, activatorRect.left - overlayMargins.horizontal)
    );
  } else if (preferredAlignment === 'right') {
    const activatorRight = activatorRect.left + activatorRect.width;
    overlayHorizontalPosition = Math.min(
      maximum,
      Math.max(
        0,
        activatorRight - overlayRect.width + overlayMargins.horizontal
      )
    );
  } else {
    overlayHorizontalPosition = Math.min(
      maximum,
      Math.max(0, activatorRect.center.x - overlayRect.width / 2)
    );
  }


  const arrowStyleByOverlayAlignment: StyleByAlignmentType = {
    center: {
      left: '50%'
    },
    left: {
      left:
        overlayRect.width + activatorRect.left > containerRect.width
          ? (overlayRect.width + activatorRect.left) - containerRect.width + 10
          : 10
    },
    right: {
      right: overlayHorizontalPosition
        ? 10
        : `calc(100% - ${activatorRect.width + activatorRect.left - 10}px)`
    }
  };

    return {
      overlay: overlayHorizontalPosition,
      arrowStyle: arrowStyleByOverlayAlignment[preferredAlignment]
    }
};
