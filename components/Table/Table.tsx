import { styled, VariantProps } from '../../stitches.config';
import { elevationVariants } from '../Elevation';
import { Label } from '../Label';
import { Text } from '../Text';

export const Caption = styled('caption', Text, {
  display: 'table-caption',
  textAlign: 'start',
  fontVariantNumeric: 'proportional-nums',
  fontWeight: '$medium',
  lineHeight: '1.25',
});

export const Tbody = styled('tbody', {
  width: '100%',
  verticalAlign: 'middle',
});

export const Th = styled('th', Label, {
  // override Label
  display: 'table-cell',
  verticalAlign: 'inherit',

  borderTopLeftRadius: 'inherit',
  borderTopRightRadius: 'inherit',

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
  boxSizing: 'border-box',
  p: '$5 $3',
  borderBottom: '1px solid $tableRowBorder',
  fontSize: '$3',
  lineHeight: '16px',
  verticalAlign: 'inherit',
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
  verticalAlign: 'inherit',
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
  verticalAlign: 'middle',
  position: 'relative',
  borderRadius: 'inherit',

  '&::after': {
    pointerEvents: 'none',
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: '$tableFooterLayerBackground',
    borderRadius: 'inherit',
  },

  [`& ${Td}`]: {
    fontSize: '$1',
    color: '$tableHeaderText',
    fontWeight: '$light',
    p: '$2 $3',
  },
});

export const Thead = styled('thead', {
  position: 'relative',
  borderTopLeftRadius: 'inherit',
  borderTopRightRadius: 'inherit',
  verticalAlign: 'middle',

  '&::after': {
    pointerEvents: 'none',
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: '$tableHeaderLayerBackground',
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
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
  boxSizing: 'border-box',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontFamily: '$rubik',
  color: '$tableText',
  borderRadius: '$3',
  overflow: 'hidden',
  [`& ${Tbody}:not(:empty) ~ ${Tfoot}`]: {
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    [`& ${Td}`]: {
      borderTop: '1px solid $tableRowBorder',
    },
  },
  [`& ${Thead}:not(:empty) ~ ${Tfoot}`]: {
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  },

  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 1,
  },
});

export type TableVariants = VariantProps<typeof Table>;
export type TableProps = TableVariants & {};
