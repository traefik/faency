import React, { ReactNode, useMemo } from 'react';

import { CSS, css, styled, VariantProps } from '../../stitches.config';
import { elevationVariants } from '../Elevation';
import { Flex } from '../Flex';

const FlexWithOpacity = styled(Flex, {
  opacity: 0.74,

  variants: {
    active: {
      true: {
        opacity: 1,
      },
    },
  },
});

const baseNavItemCss = css({
  position: 'relative',
  display: 'flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  backgroundColor: '$navButtonBg',
  color: '$navButtonText',
  border: 'none',
  minHeight: '$7',
  width: '100%',
  px: '$3',
  py: '$2',
  borderRadius: '$3',
  cursor: 'pointer',
  fontFamily: '$rubik',
  fontWeight: '$medium',
  outline: 'none',
  fontSize: '$3',
  mt: '$2',

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: '$3',
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: '$3',
  },

  [`&:focus > ${FlexWithOpacity}, &:hover > ${FlexWithOpacity}`]: {
    opacity: 1,
  },

  '&:focus': {
    color: '$navButtonFocusText',
    boxShadow: 'inset 0 0 0 2px $colors$navButtonFocusBorder',

    '&::before': {
      backgroundColor: '$navButtonFocusBg',
    },
    '&::after': {
      backgroundColor: '$navButtonFocusBg2',
      opacity: 0.05,
    },
  },

  '@hover': {
    '&:hover': {
      color: '$navButtonHoverText',

      '&::before': {
        backgroundColor: '$navButtonHoverBg',
      },
      '&::after': {
        backgroundColor: '$navButtonHoverBg2',
        opacity: 0.05,
      },
    },
  },

  '&:first-child': {
    mt: 0,
  },

  variants: {
    active: {
      true: {
        color: '$navButtonActiveText',

        '&::before': {
          backgroundColor: '$navButtonActiveBg',
        },
        '&::after': {
          backgroundColor: '$navButtonActiveBg2',
          opacity: 0.05,
        },

        '@hover': {
          '&:hover': {
            color: '$navButtonActiveText',
          },
        },

        '&:focus': {
          color: '$navButtonActiveText',
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const NavigationContainer = styled('div', {
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',
});

export type NavigationContainerVariants = VariantProps<typeof NavigationContainer>;
export type NavigationContainerProps = NavigationContainerVariants & NonNullable<unknown>;

export const NavigationDrawer = styled('nav', {
  display: 'flex',
  boxSizing: 'border-box',
  padding: '$3',
  maxWidth: '240px',
  flexDirection: 'column',
  variants: {
    elevation: elevationVariants,
    fullWidth: {
      true: {
        px: 0,
        '> *, > div > *,': {
          borderRadius: 0,

          '&::before': {
            borderRadius: 0,
          },

          '&::after': {
            borderRadius: 0,
          },

          '&:focus': {
            border: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
  defaultVariants: {
    elevation: 1,
    fullWidth: false,
  },
});

export type NavigationDrawerVariants = VariantProps<typeof NavigationDrawer>;
export type NavigationDrawerProps = NavigationDrawerVariants & NonNullable<unknown>;

const StyledLink = styled('a', baseNavItemCss, {
  textDecoration: 'none',
});

type StyledLinkProps = VariantProps<typeof StyledLink> & React.ComponentProps<typeof StyledLink>;

const StyledButton = styled('button', baseNavItemCss);

type StyledButtonProps = VariantProps<typeof StyledButton> &
  React.ComponentProps<typeof StyledButton>;
interface NavigationItemBaseProps {
  css?: CSS;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  children?: ReactNode;
  active?: boolean;
}

type NavigationItemButtonProps = NavigationItemBaseProps &
  StyledButtonProps & {
    as?: 'button';
  };
type NavigationItemLinkProps = NavigationItemBaseProps &
  StyledLinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
  };

export type NavigationItemProps = NavigationItemButtonProps | NavigationItemLinkProps;

const NavigationItemWrapper = (props: NavigationItemProps): JSX.Element =>
  props.as === 'a' ? <StyledLink {...props} /> : <StyledButton type="button" {...props} />;

export const NavigationItem = ({
  startAdornment,
  endAdornment,
  children,
  ...restProps
}: NavigationItemProps): JSX.Element => {
  const hasStartAdornment = useMemo(() => Boolean(startAdornment), [startAdornment]);
  const hasEndAdornment = useMemo(() => Boolean(endAdornment), [endAdornment]);

  return (
    <NavigationItemWrapper {...restProps}>
      {hasStartAdornment && (
        <FlexWithOpacity css={{ pr: '$2', ml: '-$1' }} active={restProps.active}>
          {startAdornment}
        </FlexWithOpacity>
      )}
      <FlexWithOpacity css={{ flexGrow: 1 }} active={restProps.active}>
        {children}
      </FlexWithOpacity>
      {hasEndAdornment && <Flex css={{ pl: '$2', mr: '-$1' }}>{endAdornment}</Flex>}
    </NavigationItemWrapper>
  );
};

export type NavigationItemVariants = VariantProps<typeof NavigationItem>;

export const NavigationLink = (props: Omit<NavigationItemLinkProps, 'as'>) => (
  <NavigationItem as="a" {...props} />
);

export type NavigationLinkVariants = VariantProps<typeof NavigationLink>;

export type NavigationLinkProps = NavigationLinkVariants & NonNullable<unknown>;
