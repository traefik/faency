import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { keyframes, styled } from '../../stitches.config';
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
  borderRadius: '$3',
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
  borderRadius: '$3',
  '&:first-child': {
    mt: 0,
  },
})

const StyledAccordionHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'flex',
  borderRadius: 'inherit'
});

const StyledAccordionTrigger = styled(AccordionPrimitive.Trigger, {
  all: 'unset',
  borderRadius: 'inherit',
  fontFamily: 'inherit',
  bc: '$accordionBackground',
  c: '$textDefault',
  p: '$2',
  lineHeight: 1,
  fontSize: '$3',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
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
      }
    },
  },
});

const StyledAccordionChevron = styled(ChevronRightIcon, {
  transition: 'transform 200ms ease-out',
  '[data-state=open] &': { transform: 'rotateZ(90deg)' },
});

const StyledAccordionContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: '$3',
  c: '$textDefault',
  '&[data-state="open"]': {
    animation: `${open} 200ms ease-out`,
  },
  '&[data-state="closed"]': {
    animation: `${close} 200ms ease-out`
  },
});

const StyledAccordionContentWrapper = styled('div', {
  p: '$2',
});

// EXPORTS
export const AccordionRoot = StyledAccordionRoot;
export const AccordionItem = StyledAccordionItem;
export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof StyledAccordionTrigger>, any>(({ children, ...props }, forwardedRef) => (
    <StyledAccordionHeader>
      <StyledAccordionTrigger ref={forwardedRef} {...props}>
        <StyledAccordionChevron aria-hidden />
        {children}
      </StyledAccordionTrigger>
    </StyledAccordionHeader>
  ));
export const AccordionContent = React.forwardRef<React.ElementRef<typeof StyledAccordionContent>, any>(({ children, ...props }, forwardedRef) => (
  <StyledAccordionContent {...props} ref={forwardedRef}>
    <StyledAccordionContentWrapper>{children}</StyledAccordionContentWrapper>
  </StyledAccordionContent>
));;

