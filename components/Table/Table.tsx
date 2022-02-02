import { styled, VariantProps } from '../../stitches.config';
import { elevationVariants } from '../Elevation';
import { Label } from '../Label';

export const Caption = styled('caption', {
  textAlign: 'start',
  marginBottom: '$5',
});

export const Tbody = styled('tbody', {
  width: '100%',
});

export const Th = styled('th', Label, {
  // override Label
  display: 'table-cell',

  textAlign: 'start',
  p: '$2 $3',
  borderBottom: '1px solid $tableRowBorder',

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
      },
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

export const Td = styled('td', {
  p: '$5 $3',
  borderBottom: '1px solid $tableRowBorder',
  fontSize: '$3',
  lineHeight: '16px',
  variants: {
    subtle: {
      true: {
        fontWeight: '$regular',
        color: '$tableSubtleText',
      },
    },
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

export const Tr = styled('tr', {
  '&:hover': {
    color: '$tableHoverText',
  },

  [`&:last-child ${Td}`]: {
    borderBottom: 'none',
  },

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
        fontWeight: '$semiBold',
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

export const Tfoot = styled('tfoot', {
  position: 'relative',

  '&::after': {
    pointerEvents: 'none',
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: '$tableFooterLayerBackground',
  },

  [`& ${Td}`]: {
    fontSize: '$1',
    color: '$tableHeaderText',
    fontWeight: '$light',
    borderTop: '1px solid $tableRowBorder',
    p: '$2 $3',
  },
});

export const Thead = styled('thead', {
  position: 'relative',

  '&::after': {
    pointerEvents: 'none',
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: '$tableHeaderLayerBackground',
  },

  [`& ${Th}`]: {
    fontSize: '$1',
    color: '$tableHeaderText',
    fontWeight: '$light',
  },
});

export const Table = styled('table', {
  width: '100%',
  tableLayout: 'fixed',
  borderSpacing: 0,
  fontFamily: '$rubik',
  color: '$tableText',
  borderRadius: '$3',

  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 1,
  },
});

export type TableVariants = VariantProps<typeof Table>;
export type TableProps = TableVariants & {};
