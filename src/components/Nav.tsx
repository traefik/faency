import styled from 'styled-components';
import css from '@styled-system/css';
import themeGet from '@styled-system/theme-get';
import {
  margin,
  MarginProps,
  padding,
  PaddingProps,
  height,
  HeightProps,
  minHeight,
  MinHeightProps,
  width,
  WidthProps,
  minWidth,
  MinWidthProps,
  variant,
  compose
} from '@modulz/radix-system';

type NavProps = MarginProps & PaddingProps & HeightProps & MinHeightProps;

const styleProps = compose(margin, padding, height, minHeight);

export const Nav = styled('nav')<NavProps>(
  css({
    height: 64,
    backgroundColor: 'dark',
    display: 'flex',
    paddingX: 0
  }),
  styleProps
);

type NavItemProps = PaddingProps & WidthProps & MinWidthProps & {
    variant?: 'normal' | 'active';
  };

const navItemStyleProps = compose(
  padding,
  minWidth,
  width,
);

type NavGroupProps = {
  variant?: 'left' | 'right';
};

const navGroupStyleProps = {}

export const NavItem = styled('button')<NavItemProps>(
  css({
    alignItems: 'center',
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 0,
    boxSizing: 'border-box',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    outline: '1px solid transparent',
    outlineOffset: '-1px',
    paddingY: 1,
    paddingX: 3,
    position: 'relative',
    textAlign: 'left',
    textDecoration: 'none',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    transition: 'transition: color 0.3s, background-color 0.3s',
    '&::-moz-focus-inner': {
      border: 0,
    },
    '&:hover': {
      backgroundColor: 'blues.7',
    },
  }),
  variant({
    variant: {
      normal: {
        color: 'grays.5',
      },
      active: {
        color: 'white',
      },
    }
  }),
  navItemStyleProps
);

NavItem.defaultProps = {
  variant: 'normal',
};

export const NavGroup = styled('div')<NavGroupProps>(
  css({
    display: 'flex',
  }),
  variant({
    variant: {
      left: {
        order: 1,
      },
      right: {
        order: 2,
        marginLeft: 'auto',
      },
    }
  }),
  navGroupStyleProps
);