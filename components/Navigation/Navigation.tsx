import { useMemo } from 'react';
import { styled, css, VariantProps } from '../../stitches.config';
import { elevationVariant } from '../Elevation';
import { Flex } from '../Flex';

const baseNavItemCss = css({
  position: 'relative',
  display: 'flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  backgroundColor: '$navButtonBg',
  color: '$navButtonText',
  border: 'none',
  minHeight: '$7',
  padding: '$2',
  borderRadius: '$3',
  cursor: 'pointer',
  fontFamily: '$rubik',
  fontWeight: 500,
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
        backgroundColor: 'navButtonHoverBg2',
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
  backgroundColor: '$navBg',
  maxWidth: '240px',
  flexDirection: 'column',

  variants: {
    elevation: Object.keys(elevationVariant).map((_, index) => ({
      ...elevationVariant[index],
      bc: `$${index < 10 ? '0' : ''}${index}dp`,
    })) as any,
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

type StyledLinkVariants = VariantProps<typeof StyledLink>;

const StyledButton = styled('button', baseNavItemCss);

type StyledButtonVariants = VariantProps<typeof StyledButton>;

export type NavigationItemProps = {
  as?: 'button' | 'a';
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
} & StyledLinkVariants &
  StyledButtonVariants;

const NavigationItemWrapper = (props: NavigationItemProps): JSX.Element =>
  props.as === 'a' ? <StyledLink {...props} /> : <StyledButton type="button" {...props} />;

export const NavigationItem = ({
  as,
  startAdornment,
  endAdornment,
  children,
  ...restProps
}: NavigationItemProps): JSX.Element => {
  const hasStartAdornment = useMemo(() => Boolean(startAdornment), [startAdornment]);
  const hasEndAdornment = useMemo(() => Boolean(endAdornment), [endAdornment]);

  return (
    <NavigationItemWrapper as={as} {...restProps}>
      {hasStartAdornment && <Flex css={{ pr: '$2' }}>{startAdornment}</Flex>}
      <Flex css={{ flexGrow: 1 }}>{children}</Flex>
      {hasEndAdornment && <Flex css={{ pl: '$2' }}>{endAdornment}</Flex>}
    </NavigationItemWrapper>
  );
};

export type NavigationItemVariants = VariantProps<typeof NavigationItem>;

export const NavigationLink = (props: Omit<NavigationItemProps, 'as'>) => (
  <NavigationItem as="a" {...props} />
);

export type NavigationLinkVariants = VariantProps<typeof NavigationLink>;

export type NavigationLinkProps = NavigationLinkVariants & {};
