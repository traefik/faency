import React from 'react';
import styled, { css as _css, keyframes } from 'styled-components';
import css from '@styled-system/css';
import { Box, BoxProps as BoxPrimitiveProps } from 'mdlz-prmtz';
import { theme } from '../theme';

type LoadingProps = BoxPrimitiveProps & {
  progress?: number;
};

const loadingAnimation = keyframes`
  50% {
    width: 100%;
    margin-left: 0;
  }
  100% {
    width: 0%;
    margin-left: 100%;
  }
`;

export const Loading = styled(Box)<LoadingProps>`
  height: 4px;
  width: 0;
  background-color: ${theme.colors.primary};
  ${props =>
    props.progress
      ? `
          width: ${props.progress}%;
          transition: width 1s ease-in-out;
        `
      : _css`
          width: 0;
          animation: ${loadingAnimation} 2s ease-in-out infinite
      `}
`;
