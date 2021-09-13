import { CSS, styled } from '../stitches.config';

export const panelStyles: CSS = {
  backgroundColor: '$slate4',
  borderRadius: '$3',
  boxShadow: '$colors$shadowLight 0px 10px 38px -10px, $colors$slate4 0px 10px 20px -15px',
};

export const Panel = styled('div', panelStyles);
