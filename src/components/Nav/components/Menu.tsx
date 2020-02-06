import styled from 'styled-components';
import breakpoints from '../../../breakpoints';

export const NavContainer = styled.div`
  flex-direction: column;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
  }
`;

const Menu = styled(NavContainer)`
  height: 100%;
  flex: 1;
  display: none;
  flex-wrap: wrap;
  padding: 20px 0;

  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
    padding: 0;
  }
`;

export default Menu;
