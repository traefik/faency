import React from 'react';
import {css as _css, keyframes} from 'styled-components';
import css from '@styled-system/css';
import {Box as BoxPrimitive, BoxProps as BoxPrimitiveProps} from 'mdlz-prmtz';

type LoadingProps = BoxPrimitiveProps & {
  progress?: number;
};

const loadingAnimation = () => keyframes`
  50% {
    width: 100%;
    margin-left: 0;
  }
  100% {
    width: 0%;
    margin-left: 100%;
  }
`;

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>((props, ref) => (
  <BoxPrimitive {...props} ref={ref} css={[
    css({
      height: '4px',
      '::after': {
        content: `""`,
        backgroundColor: 'primary',
        display: 'flex',
        height: '4px',
        width: 0,
      }
    }),
    props.hasOwnProperty('progress') ? css({
      '::after': {
        transition: 'width 1s ease-in-out',
        width: `${props.progress}%`,
      }
    }) : _css`
      &::after {
        animation: ${loadingAnimation()} 2s ease-in-out infinite
      }
    `,
  ]} />
));