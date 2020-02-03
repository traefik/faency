import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import variant from '@styled-system/variant';
import {
  Button as ButtonPrimitive,
  ButtonProps as ButtonPrimitiveProps,
  LinkProps as LinkPrimitiveProps
} from 'mdlz-prmtz';
import { theme } from '../../theme';
import breakpoints from '../../breakpoints';
import uuidv4 from './utils/uuidv4';
import MenuButton from './components/MenuButton';
import MenuIcon from './components/MenuIcon';
import Menu from './components/Menu';

type NavItemProps = ButtonPrimitiveProps &
  LinkPrimitiveProps & {
    as?: 'button' | 'a';
    variant?: 'active' | 'normal';
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
              height: 64,
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
        },
        variants: {
          variant: {
            active: {
              button: {
                normal: {
                  color: 'white'
                }
              }
            }
          }
        }
      }}
    />
  )
);

NavItem.defaultProps = {
  as: 'button',
  variant: 'normal'
};

export const NavGroup = styled('div')<NavGroupProps>(
  css({
    display: 'flex',
    flexWrap: 'wrap',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      flexDirection: 'column',
      marginLeft: 'inherit'
    }
  }),
  variant({
    variants: {
      left: {
        order: 1
      },
      right: {
        order: 2,
        marginLeft: 'auto'
      }
    }
  }),
  navGroupStyleProps
);

const NavWrapper = styled('nav')(
  css({
    minHeight: 64,
    backgroundColor: 'dark',
    display: 'flex',
    flexWrap: 'wrap',
    paddingX: 0
  })
);

const ResponsiveWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const Nav = React.forwardRef<HTMLDivElement>(
  ({ children, ...props }, forwardedRef) => {
    const uuid = uuidv4();

    return (
      <NavWrapper {...props} ref={forwardedRef}>
        <ResponsiveWrapper>
          <MenuButton uuid={uuid} />
          <MenuIcon uuid={uuid} />
          <Menu>{children}</Menu>
        </ResponsiveWrapper>
      </NavWrapper>
    );
  }
);
