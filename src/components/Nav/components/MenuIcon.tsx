import React from 'react';
import styled from 'styled-components';
import NavIcon from './NavIcon';
import breakpoints from '../../../breakpoints';

type MenuIconProps = {
  uuid: string
}

const MenuIcon = styled.label.attrs((props: MenuIconProps) => ({
  for: `menu-${props.uuid}`,
  type: 'checkbox',
  children: <NavIcon />
}))<MenuIconProps>`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  display: inline-block;
  float: right;
  padding: 31px 20px;
  user-select: none;

  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;


export default MenuIcon;
