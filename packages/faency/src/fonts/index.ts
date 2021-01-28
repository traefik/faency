import { css } from 'styled-components'
import { default as RubikWoff2 } from './Rubik-Regular.woff2'
import { default as RubikSemiBoldWoff2 } from './Rubik-SemiBold.woff2'
import { default as RubikBoldWoff2 } from './Rubik-Bold.woff2'

export const fontStyles = css`
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Rubik-Regular'), url(${RubikWoff2}) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: 600;
    font-display: swap;
    src: local('Rubik-SemiBold'), url(${RubikSemiBoldWoff2}) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: 700;
    font-display: swap;
    src: local('Rubik-Bold'), url(${RubikBoldWoff2}) format('woff2');
  }
`
