import React, { ComponentProps, createContext, ReactNode, useContext, useMemo } from 'react';

import { styled, VariantProps } from '../../stitches.config';
import { BUTTON_BASE_STYLES } from '../Button';
import { elevationVariants } from '../Elevation';
import { Flex } from '../Flex';

const LIST_ITEM_CONTENT_STYLES = {
  bc: 'transparent',
  c: 'inherit',
  borderRadius: 'inherit',
  fontFamily: '$rubik',
  fontSize: '$3',
  fontVariantNumeric: 'tabular-nums',
};

const StyledSpan = styled('span', Flex, {
  // APPLY BUTTON STYLES
  ...LIST_ITEM_CONTENT_STYLES,
  // CUSTOM
  p: '$1',
  gap: '$1',
});

const StyledListItemButton = styled('button', Flex, {
  ...BUTTON_BASE_STYLES,
  ...LIST_ITEM_CONTENT_STYLES,
  outline: 'none',

  // CUSTOM
  flexGrow: 1,
  p: '$2',
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
  '&:focus, &:focus-visible': {
    boxShadow: 'inset 0 0 0 2px $colors$listItemFocusBorder',
  },

  '@hover': {
    '&:hover': {
      cursor: 'pointer',
      '&::before': {
        backgroundColor: '$listItemHoverBg',
      },
      '&::after': {
        backgroundColor: '$primary',
        opacity: 0.05,
      },
    },
  },
  '&:active': {
    '&::before': {
      backgroundColor: '$listItemActiveBg',
    },
    '&::after': {
      backgroundColor: '$primary',
      opacity: 0.05,
    },
  },
});

const StyledLi = styled('li', {
  m: '$2',
  outline: 'none',
  position: 'relative',
  '&:focus-within': {
    boxShadow: 'none',
  },
  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: '0',
  },
});

const StyledUl = styled('ul', {
  m: '0 0 0 8px',
  p: 0,
  color: '$textDefault',

  '&:has(li > span > input)': {
    m: 0,
    listStyle: 'none',
    li: {
      marginLeft: 0,
      span: {
        input: {
          margin: '0 3px 0 0',
        },
      },
    },
  },
});

const StyledOl = styled('ol', {
  m: '0 0 0 8px',
  p: 0,
  color: '$textDefault',

  '> li::marker': {
    fontSize: '$3',
    fontFamily: '$rubik',
  },
});

const ListContext = createContext({
  interactive: false,
});

export interface ListProps extends ComponentProps<typeof StyledUl>, VariantProps<typeof StyledUl> {
  interactive?: boolean;
}
export const Ul = React.forwardRef<React.ElementRef<typeof StyledUl>, ListProps>(
  ({ interactive, ...props }, forwardedRef) => {
    const contextValue = useMemo(() => ({ interactive: !!interactive }), [interactive]);

    return (
      <ListContext.Provider value={contextValue}>
        <StyledUl role="list" ref={forwardedRef} {...props} />
      </ListContext.Provider>
    );
  },
);

export interface OrderedListProps
  extends ComponentProps<typeof StyledOl>,
    VariantProps<typeof StyledOl> {
  interactive?: boolean;
}

export const Ol = React.forwardRef<React.ElementRef<typeof StyledOl>, OrderedListProps>(
  ({ interactive, ...props }, forwardedRef) => {
    const contextValue = useMemo(() => ({ interactive: !!interactive }), [interactive]);

    return (
      <ListContext.Provider value={contextValue}>
        <StyledOl role="list" ref={forwardedRef} {...props} />
      </ListContext.Provider>
    );
  },
);

const ControlsWrapper = styled('div', {
  position: 'absolute',
  top: 0,
  right: '$2',
  zIndex: 1,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'visible',
});

export interface ListItemProps
  extends ComponentProps<typeof StyledLi>,
    VariantProps<typeof StyledLi>,
    VariantProps<typeof Flex> {
  controls?: ReactNode;
}
export const Li = React.forwardRef<React.ElementRef<typeof StyledLi>, ListItemProps>(
  ({ children, controls, align, justify, direction, gap, wrap, ...props }, forwardedRef) => {
    const { interactive } = useContext(ListContext);
    return (
      <StyledLi {...props} ref={forwardedRef}>
        {interactive ? (
          <StyledListItemButton
            align={align}
            justify={justify}
            direction={direction}
            gap={gap}
            wrap={wrap}
          >
            {children}
          </StyledListItemButton>
        ) : (
          <StyledSpan
            align={align || 'center'}
            justify={justify}
            direction={direction}
            gap={gap}
            wrap={wrap}
            css={{ flexGrow: 1 }}
          >
            {children}
          </StyledSpan>
        )}
        {!!controls && <ControlsWrapper>{controls}</ControlsWrapper>}
      </StyledLi>
    );
  },
);
