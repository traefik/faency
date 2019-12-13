import styled from 'styled-components';
import css from '@styled-system/css';
import {
  compose,
  height,
  HeightProps,
  margin,
  MarginProps,
  minHeight,
  MinHeightProps,
  minWidth,
  MinWidthProps,
  padding,
  PaddingProps,
  variant,
  width,
  WidthProps,
} from '@modulz/radix-system';

type SubNavProps = MarginProps & PaddingProps & HeightProps & MinHeightProps;

const styleProps = compose(margin, padding, height, minHeight);

export const SubNav = styled('nav')<SubNavProps>(
  css({
    height: 48,
    display: 'flex',
    boxShadow: '0 1px 0 0 #dcdcdc',
    padding: 0,
  }),
  styleProps
);

type SubNavItemProps = PaddingProps & WidthProps & MinWidthProps & {
  variant?: 'active' | 'normal';
  as?: 'a' | 'button';
};

const subNavItemStyleProps = compose(
  padding,
  minWidth,
  width,
);

export const SubNavItem = styled('a')<SubNavItemProps>(
  css({
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 0,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    fontWeight: 600,
    outline: 'none',
    paddingX: 3,
    paddingY: 0,
    textDecoration: 'none',
    transition: 'color 0.3s, background-color 0.3s',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    '&::-moz-focus-inner': {
      border: 0,
    },
    '&:hover, &:active': {
      backgroundColor: 'grays.2',
    },
  }),
  variant({
    variant: {
      normal: {
        color: 'grays.5',
      },
      active: {
        color: 'primary',
      },
    }
  }),
  subNavItemStyleProps
);

SubNavItem.defaultProps = {
  variant: 'normal',
  as: 'button',
};
