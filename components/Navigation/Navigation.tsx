import React, { useMemo, ReactNode } from 'react';
import { styled, css, CSS, VariantProps } from '../../stitches.config';
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
    fullWidth: {
      true: {
        px: 0,
        borderRadius: 0,

        '&::before': {
          borderRadius: 0,
          left: '-$3',
          right: '-$3',
        },

        '&::after': {
          borderRadius: 0,
          left: '-$3',
          right: '-$3',
        },
      },
    },
  },
  defaultVariants: {
    active: false,
    fullWidth: false,
  },
});

export const NavigationContainer = styled('div', {
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',
});

export type NavigationContainerVariants = VariantProps<typeof NavigationContainer>;
export type NavigationContainerProps = NavigationContainerVariants & {};

export const NavigationDrawer = styled('nav', {
  display: 'flex',
  boxSizing: 'border-box',
  padding: '$3',
  maxWidth: '240px',
  flexDirection: 'column',
  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 1,
  },
});

export type NavigationDrawerVariants = VariantProps<typeof NavigationDrawer>;
export type NavigationDrawerProps = NavigationDrawerVariants & {};

const StyledLink = styled('a', baseNavItemCss, {
  textDecoration: 'none',
});

type StyledLinkProps = VariantProps<typeof StyledLink> &
  Omit<React.ComponentProps<typeof StyledLink>, 'css'>;

const StyledButton = styled('button', baseNavItemCss);

type StyledButtonProps = VariantProps<typeof StyledButton> &
  Omit<React.ComponentProps<typeof StyledButton>, 'css'>;
interface NavigationItemBaseProps {
  css?: CSS;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

interface NavigationItemButtonProps extends NavigationItemBaseProps, StyledButtonProps {
  as?: 'button';
}
interface NavigationItemLinkProps extends NavigationItemBaseProps, StyledLinkProps {
  as: 'a';
}

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

export type NavigationLinkProps = NavigationLinkVariants & {};
