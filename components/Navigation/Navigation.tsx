import { useMemo } from 'react';
import { styled, css, VariantProps } from '../../stitches.config';
import { elevationVariant } from '../Elevation';
import { Flex } from '../Flex';

const baseNavItemCss = css({
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

  '&:first-child': {
    mt: 0,
  },

  '&:hover': {
    backgroundColor: '$navButtonHoverBg',
    color: '$navButtonHoverText',
  },
  '&:focus': {
    backgroundColor: '$navButtonFocusBg',
    color: '$navButtonFocusText',
    padding: 'calc($2 - 2px)',
    border: '2px solid $navButtonFocusBorder',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$navButtonActiveBg',
        color: '$navButtonActiveText',

        '&:hover': {
          color: '$navButtonActiveText',
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
    elevation: elevationVariant,
  },
  defaultVariants: {
    elevation: 1,
  },
});

export type NavigationDrawerVariants = VariantProps<typeof NavigationDrawer>;
export type NavigationDrawerProps = NavigationDrawerVariants & {};

export const NavigationLink = styled('a', baseNavItemCss, {
  textDecoration: 'none',
});

export type NavigationLinkVariants = VariantProps<typeof NavigationLink>;
export type NavigationLinkProps = NavigationLinkVariants & {};

export const NavigationButton = styled('button', baseNavItemCss);

export type NavigationButtonVariants = VariantProps<typeof NavigationButton>;
export type NavigationButtonProps = NavigationButtonVariants & {};

export type NavigationItemProps = {
  as?: 'button' | 'a';
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
} & NavigationButtonProps &
  NavigationLinkProps;

const NavigationItemWrapper = (props: NavigationItemProps): JSX.Element =>
  props.as === 'a' ? <NavigationLink {...props} /> : <NavigationButton type="button" {...props} />;

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
