import { css } from 'styled-components';
import { default as NunitoWoff } from './Nunito-Regular.woff';
import { default as NunitoWoff2 } from './Nunito-Regular.woff2';
import { default as NunitoSemiBoldWoff } from './Nunito-SemiBold.woff';
import { default as NunitoSemiBoldWoff2 } from './Nunito-SemiBold.woff2';
import { default as NunitoBoldWoff } from './Nunito-Bold.woff';
import { default as NunitoBoldWoff2 } from './Nunito-Bold.woff2';

export const fontStyles = css`
  @font-face {
    font-family: 'Nunito';
    font-weight: 400;
    font-display: swap;
    src: local('Nunito-Regular'), url(${NunitoWoff2}) format('woff2'),
      url(${NunitoWoff}) format('woff');
  }

  @font-face {
    font-family: 'Nunito';
    font-weight: 600;
    font-display: swap;
    src: local('Nunito-SemiBold'), url(${NunitoSemiBoldWoff2}) format('woff2'),
      url(${NunitoSemiBoldWoff}) format('woff');
  }

  @font-face {
    font-family: 'Nunito';
    font-weight: 700;
    font-display: swap;
    src: local('Nunito-Bold'), url(${NunitoBoldWoff2}) format('woff2'),
      url(${NunitoBoldWoff}) format('woff');
  }
`;