import { styled } from '../../stitches.config';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { elevationVariants } from '../Elevation';
import { Flex } from '../Flex';

// CONSTANTS
export const Toolbar = styled(ToolbarPrimitive.Root, Flex, {
  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
  },
  variants: {
    elevation: elevationVariants
  },
  defaultVariants: {
    elevation: 1,
  },
});

const itemStyles = {
  outline: 'none',
  position: 'relative',
  '&::before': {
    borderRadius: 'inherit',
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },
  '&::after': {
    borderRadius: 'inherit',
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },
  '&:focus': {
    '&::before': {
      backgroundColor: '$toolbarItemFocusVisibleBg',
    },
    '&::after': {
      backgroundColor: '$primary',
      opacity: 0.05,
    },
  },
}

export const ToolbarButton = styled(ToolbarPrimitive.Button, {
  ...itemStyles,
  variants: {
    elevation: elevationVariants
  },
  defaultVariants: {
    elevation: 0,
  }
});

export const ToolbarLink = styled(ToolbarPrimitive.Link, {
  ...itemStyles,
  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 0,
  }
});

/**
 * ToolbarSeparator
 * Has reversed orientation
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/toolbar/src/Toolbar.tsx#L91
 */
export const ToolbarSeparator = styled(ToolbarPrimitive.Separator, {
  bc: '$divider',
  alignSelf: 'stretch',
  m: 0,
  boxSizing: 'border-box',
  '&[data-orientation="horizontal"]': {
    width: '100%',
    height: 1,
    my: '$3',
  },
  '&[data-orientation="vertical"]': {
    width: 1,
  },
});