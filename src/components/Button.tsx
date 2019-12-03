import React from 'react';
import { css as _css, keyframes, withTheme } from 'styled-components';
import css from '@styled-system/css';
import themeGet from '@styled-system/theme-get';
import { variant, Prop } from '@modulz/radix-system';
import { Button as ButtonPrimitive, ButtonProps as ButtonPrimitiveProps } from 'mdlz-prmtz';

const waitingAnimation = (props: ButtonProps) => keyframes`
  100% {
    transform: translateX(${themeGet(props.size === 1 ? 'space.9' : 'space.7')(props)});
	}
`;

type Variants = 'gray' | 'blue' | 'green' | 'red' | 'transparent' | 'primary' | 'secondary';
type Sizes = 0 | 1;

type ButtonProps = ButtonPrimitiveProps & {
  variant?: Prop<Variants>;
  isActive?: boolean;
  isWaiting?: boolean;
  size?: Prop<Sizes>;
  // TODO: type Theme
  theme?: any;
};

export const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <ButtonPrimitive
    {...props}
    ref={ref}
    css={[
      css({
        alignItems: 'center',
        display: 'inline-flex',
        border: 'none',
        borderRadius: 1,
        cursor: 'pointer',
        fontFamily: 'normal',
        fontWeight: 700,
        outline: 'none',
        paddingY: 0,
        position: 'relative',
        textAlign: 'center',
        textDecoration: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        '&:disabled': {
          color: 'gray',
          cursor: 'not-allowed',
          pointerEvents: 'none',
        },
      }),
      variant({
        variant: {
          primary: {
            backgroundColor: 'blue',
            color: 'white',
            '&:active': {
              backgroundColor: 'blues.3',
            },
          },
          secondary: {
            color: 'blue',
          },
          transparent: {
            color: 'blue',
          },
          gray: {
            backgroundColor: 'gray',
            color: 'white',
          },
          blue: {
            backgroundColor: 'blue',
            color: 'white',
            '&:active': {
              backgroundColor: 'blues.3',
            },
          },
          green: {
            backgroundColor: 'green',
            color: 'white',
            '&:active': {
              backgroundColor: 'greens.1',
            },
          },
          red: {
            backgroundColor: 'red',
            color: 'white',
          },
        },
      }),
      variant({
        isActive: {
          true: {
            backgroundColor: 'grays.1',
            color: 'grays.5',
            '&:active': {
              backgroundColor: 'grays.1',
            },
          },
        },
      }),
      variant({
        size: {
          0: {
            fontSize: 2,
            paddingX: 2,
            height: 5,
            minWidth: 5,
          },
          1: {
            fontSize: 3,
            paddingX: 3,
            height: 6,
            minWidth: 6,
          },
        },
      }),
      variant({
        isWaiting: {
          true: {
            backgroundColor: 'grays.2',
            color: 'transparent',
            overflow: 'hidden',
            position: 'relative',
            pointerEvents: 'none',
            '&::before': {
              position: 'absolute',
              content: `''`,
              top: 0,
              left: '-100%',
              width: '200%',
              height: '100%',
              backgroundImage: `linear-gradient(
              -45deg,
              transparent 33%,
              rgba(0, 0, 0, 0.05) 33%,
              rgba(0, 0, 0, 0.05) 66%,
              transparent 66%
            )`,
              backgroundSize:
                props.size === 1
                  ? `${themeGet('space.9')(props)} ${themeGet('space.6')(props)}`
                  : `${themeGet('space.7')(props)} ${themeGet('space.5')(props)}`,
            },
          },
        },
      }),
      // Code below specifically for the `isWaiting` variant
      props.isWaiting &&
        _css`
      &::before {
        animation: ${waitingAnimation(props)} 500ms linear infinite
      }
    `,
      { lineHeight: '1' },
      props.css,
    ]}
  />
));

export const Button = withTheme(BaseButton);

BaseButton.defaultProps = {
  variant: 'transparent',
  size: 0,
};