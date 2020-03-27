import React from 'react'
import themeGet from '@styled-system/theme-get'
import styled, { keyframes } from 'styled-components'
import { Box as BoxPrimitive } from '../components/Box'

const shimmerAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export type SkeletonTextProps = {
  size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

export const SkeletonBox = styled(BoxPrimitive)`
  position: relative;
  overflow: hidden;
  animation: ${shimmerAnimation} 1s linear infinite alternate;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    background-color: ${themeGet('colors.grays.2')};
    border-radius: 4px;
  }
`

export const SkeletonText = styled(SkeletonBox)<SkeletonTextProps>`
  height: ${(props: SkeletonTextProps): string => themeGet(`fontSizes.${props.size}`)};

  &:last-child:not(:first-child) {
    width: 80%;
  }

  & + & {
    margin-top: 12px;
  }
`

SkeletonText.defaultProps = {
  size: 2,
}

export type SkeletonTextGroupProps = {
  lines?: number
}

export const SkeletonTextGroup = React.forwardRef<HTMLDivElement, SkeletonTextGroupProps>((props, forwardedRef) => {
  const { lines = 3 } = props
  const bodyTextLines = []

  for (let i = 0; i < lines; i++) {
    bodyTextLines.push(<SkeletonText key={i} />)
  }

  return (
    <BoxPrimitive {...props} ref={forwardedRef}>
      {bodyTextLines}
    </BoxPrimitive>
  )
})

SkeletonTextGroup.displayName = 'SkeletonTextGroup'
