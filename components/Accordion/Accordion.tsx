import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { keyframes, styled, VariantProps, CSS } from '../../stitches.config';
import { elevationVariants } from '../Elevation';
import { ChevronRightIcon } from '@radix-ui/react-icons';

const open = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const close = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const StyledAccordionRoot = styled(AccordionPrimitive.Root, {
  borderRadius: 0,
  bc: 'transparent',
  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 0,
  },
});

const StyledAccordionItem = styled(AccordionPrimitive.Item, {
  mt: '$1',
  borderRadius: 'inherit',
  '&:first-child': {
    mt: 0,
  },
  boxShadow: '0 1px 0 0 $colors$divider',
});

export const StyledAccordionHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'flex',
  borderRadius: 'inherit',
});

export const StyledAccordionTrigger = styled(AccordionPrimitive.Trigger, {
  all: 'unset',
  borderRadius: 'inherit',
  fontFamily: 'inherit',
  bc: '$contentBg',
  c: '$accordionLabel',
  px: '$2',
  lineHeight: 1,
  fontSize: '$3',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'relative',
  '&::before': {
    borderRadius: 'inherit',
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },
  '&:focus': {
    boxShadow: 'inset 0 0 0 1px $colors$accordionActiveShadow',
  },
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
      '&::before': {
        backgroundColor: '$accordionHoverShadow',
      },
    },
  },
  transition: 'opacity 200ms ease-out',
  variants: {
    size: {
      small: {
        py: '$2',
      },
      medium: {
        py: '$3',
      },
      large: {
        py: '$5',
      },
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

const StyledAccordionChevron = styled(ChevronRightIcon, {
  mr: '$2',
  c: '$accordionText',
  transition: 'transform 200ms ease-out',
  '[data-state=open] > &': {
    transform: 'rotateZ(90deg)',
  },
});

const StyledAccordionContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: '$3',
  c: '$accordionText',
  '&[data-state="open"]': {
    animation: `${open} 200ms ease-out`,
  },
  '&[data-state="closed"]': {
    animation: `${close} 200ms ease-out`,
  },
});

const StyledAccordionContentWrapper = styled('div', {
  variants: {
    size: {
      small: {
        py: '$2',
      },
      medium: {
        py: '$3',
      },
      large: {
        py: '$5',
      },
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

// EXPORTS
export const AccordionRoot = StyledAccordionRoot;
export const AccordionItem = StyledAccordionItem;
export type AccordionTriggerProps = React.ComponentProps<typeof StyledAccordionTrigger> &
  VariantProps<typeof StyledAccordionTrigger> & {
    children: React.ReactNode;
  };
export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof StyledAccordionTrigger>,
  AccordionTriggerProps
>(({ children, ...props }, forwardedRef) => (
  <StyledAccordionHeader>
    <StyledAccordionTrigger ref={forwardedRef} {...props}>
      <StyledAccordionChevron aria-hidden />
      {children}
    </StyledAccordionTrigger>
  </StyledAccordionHeader>
));

export type AccordionContentProps = VariantProps<typeof StyledAccordionContent> &
  Pick<VariantProps<typeof StyledAccordionContentWrapper>, 'size'> & {
    children: React.ReactNode;
    css?: CSS;
  };
export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof StyledAccordionContent>,
  AccordionContentProps
>(({ children, size, ...props }, forwardedRef) => (
  <StyledAccordionContent {...props} ref={forwardedRef}>
    <StyledAccordionContentWrapper size={size}>{children}</StyledAccordionContentWrapper>
  </StyledAccordionContent>
));
