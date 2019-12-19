import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { variant } from 'styled-system';
import {
  Button as ButtonPrimitive,
  ButtonProps as ButtonPrimitiveProps,
  LinkProps as LinkPrimitiveProps,
} from 'mdlz-prmtz';
import { theme } from '../theme';

export const Nav = styled('nav')(
  css({
    height: 64,
    backgroundColor: 'dark',
    display: 'flex',
    paddingX: 0
  })
);

type NavItemProps = ButtonPrimitiveProps & LinkPrimitiveProps & {
  as?: 'button'| 'a';
  variant?: 'left' | 'right';
};

type NavGroupProps = {
  variant?: 'left' | 'right';
};

const navGroupStyleProps = {};

export const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  ({ ...props }, forwardedRef) => (
    <ButtonPrimitive
      {...props}
      ref={forwardedRef}
      styleConfig={{
        base: {
          button: {
            normal: {
              alignItems: 'center',
              backgroundColor: 'transparent',
              border: 0,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              outline: '1px solid transparent',
              outlineOffset: '-1px',
              paddingTop: theme.space[1],
              paddingBottom: theme.space[1],
              paddingLeft: theme.space[3],
              paddingRight: theme.space[3],
              color: theme.colors.grays[5],
              textDecoration: 'none',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
              transition: 'color 0.3s, background-color 0.3s',
              '&::-moz-focus-inner': {
                border: 0
              },
              '&:hover, &:active': {
                backgroundColor: theme.colors.blues[7]
              }
            },
            active: {
              color: 'white'
            }
          }
        }
      }}
    />
  )
);

NavItem.defaultProps = {
  as: 'button',
  variant: 'left',
};

export const NavGroup = styled('div')<NavGroupProps>(
  css({
    display: 'flex',
  }),
  variant({
    variants: {
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
