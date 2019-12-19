import styled from 'styled-components';
import css from '@styled-system/css';
import { variant } from 'styled-system';
import { theme } from '../theme';

type SubNavItemProps = {
  as?: 'button' | 'a';
  variant?: 'active' | 'normal';
};

export const SubNav = styled('nav')(
  css({
    height: 48,
    display: 'flex',
    boxShadow: '0 1px 0 0 #dcdcdc',
    padding: 0,
    backgroundColor: 'white'
  })
);

export const SubNavItem = styled('a')<SubNavItemProps>(
  css({
    alignItems: 'center',
    border: 0,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    fontWeight: 600,
    outline: 'none',
    paddingTop: theme.space[0],
    paddingBottom: theme.space[0],
    paddingLeft: theme.space[3],
    paddingRight: theme.space[3],
    textDecoration: 'none',
    transition: 'color 0.3s, background-color 0.3s',
    userSelect: 'none',
    backgroundColor: 'white',
    color: theme.colors.grays[5],
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    '&::-moz-focus-inner': {
      border: 0
    },
    '&:hover, &:active': {
      backgroundColor: theme.colors.grays[2]
    }
  }),
  variant({
    variants: {
      normal: {
        backgroundColor: 'white',
        color: theme.colors.grays[5]
      },
      active: {
        color: theme.colors.primary,
        fontWeight: 700
      }
    }
  })
);

SubNavItem.defaultProps = {
  as: 'button',
  variant: 'normal'
};
