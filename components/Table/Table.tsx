import { styled, VariantProps } from '../../stitches.config';
import { Label } from '../Label';

export const Caption = styled('caption', {
  textAlign: 'start',
  marginBottom: '$5',
});

export const Tbody = styled('tbody', {
  width: '100%',
});

export const Tfoot = styled('tfoot', {});

export const Tr = styled('tr', {
  variants: {
    interactive: {
      true: {
        '&:hover': {
          backgroundColor: '$tableHoverBackground',
          cursor: 'pointer',
        },
      },
    },
    active: {
      true: {
        backgroundColor: '$tableHoverBackground',
        color: '$tableActiveText',
      },
    },
  },
  compoundVariants: [
    {
      interactive: true,
      active: true,
      css: {
        '&:hover': {
          color: '$tableActiveHoverText',
        },
      },
    },
  ],
});

export const Th = styled('th', Label, {
  // override Label
  display: 'table-cell',

  textAlign: 'start',
  pt: '$2',
  pb: '$3',
  borderBottom: '1px solid $deepBlue3',
  variants: {
    align: {
      start: {
        textAlign: 'start',
      },
      center: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
      },
    },
    transform: {
      capitalize: {
        display: 'table-cell', // revert Label enforced value
      }
    }
  },
  defaultVariants: {
    align: 'start',
  },
});

export const Td = styled('td', {
  py: '$2',
  borderBottom: '1px solid $deepBlue3',
  fontSize: '$2',
  variants: {
    align: {
      start: {
        textAlign: 'start',
      },
      center: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
      },
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

export const Thead = styled('thead', {
  [`& ${Td}`]: {
    fontSize: '$1',
    color: '$deepBlue6',
    textTransform: 'uppercase',
    fontWeight: '$light',
  },
});

export const Table = styled('table', {
  width: '100%',
  tableLayout: 'fixed',
  borderSpacing: 0,
  fontFamily: '$rubik',
  color: '$tableText',
});

export type TableVariants = VariantProps<typeof Table>;
export type TableProps = TableVariants & {};
