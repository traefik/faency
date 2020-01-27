import styled from 'styled-components';

const NavIcon = styled.span`
  background: white;
  display: block;
  height: 2px;
  position: relative;
  transition: background 0.2s ease-out;
  width: 18px;

  &:before,
  &:after {
    background: white;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    transition: all 0.2s ease-out;
    width: 100%;
  }

  &:before {
    top: 5px;
  }

  &:after {
    top: -5px;
  }
`;

export default NavIcon;
