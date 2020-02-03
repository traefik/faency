import styled from 'styled-components';
import breakpoints from '../../../breakpoints';

const Menu = styled.div`
  height: 100%;
  flex: 1;
  display: none;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 60px 0 20px 0;

  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    padding: 0;
  }
`;

export default Menu;
