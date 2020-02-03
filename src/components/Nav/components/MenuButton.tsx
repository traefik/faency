import styled from 'styled-components';
import Menu from './Menu';
import MenuIcon from './MenuIcon';
import NavIcon from './NavIcon';

type MenuButtonProps = {
  uuid: string
}

const MenuButton = styled.input.attrs((props: MenuButtonProps) => ({
  id: `menu-${props.uuid}`,
  type: 'checkbox'
}))<MenuButtonProps>`
  display: none;

  &:checked ~ ${Menu} {
    display: flex;
  }

  &:checked ~ ${MenuIcon} ${NavIcon} {
    background: transparent;
  }

  &:checked ~ ${MenuIcon} ${NavIcon}:after {
    transform: rotate(45deg);
  }

  &:checked ~ ${MenuIcon} ${NavIcon}:before {
    transform: rotate(-45deg);
  }

  &:checked
    ~ ${MenuIcon}
    ${NavIcon}:before,
    &:checked
    ~ ${MenuIcon}
    ${NavIcon}:after {
    top: 0;
  }
`;

export default MenuButton;
