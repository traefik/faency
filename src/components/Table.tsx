import styled from 'styled-components';
import css from '@styled-system/css';

export const Table = styled('table')(
  css({
    width: 'calc(100% - 8px)',
    textAlign: 'left',
    backgroundColor: 'white',
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'grays.3',
    borderSpacing: 0,
    boxShadow: '0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)',
    margin: '4px',
  })
);

export const Thead = styled('thead')({});
export const Tbody = styled('tbody')(
  css({
    '& tr:hover': {
      backgroundColor: 'blues.1',
    },
  })
);
export const Tr = styled('tr')(
  css({
    height: 6,
    fontSize: 1,
  })
);
export const Td = styled('td')(
  css({
    borderX: '1px solid',
    borderTop: '1px solid',
    borderColor: 'grays.3',
    paddingX: 2,
    paddingY: 1, 
    fontSize: 1,
    color: 'black',
  })
);

export const Th = styled(Td)(
  css({
    fontFamily: 'normal',
    fontWeight: 700,
    borderWidth: 2,
    paddingX: 2,
    paddingY: 1,
    opacity: 0.54,
    transition: 'opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)',
    color: 'black',
  })
).withComponent('th');

export const Tfoot = styled('tfoot')(
  css({
    '& td': {
      borderTop: '1px solid',
      borderColor: 'grays.3',
      paddingX: 2,
      paddingY: 1, 
      fontSize: 1,
      color: 'black',
    }
  })
);