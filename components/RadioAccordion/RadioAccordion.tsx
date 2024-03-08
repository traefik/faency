import React, { ComponentProps } from 'react';
import { styled, VariantProps, CSS } from '../../stitches.config';
import {
  StyledAccordionTrigger,
  StyledAccordionHeader,
  AccordionRoot,
  AccordionContent,
  AccordionItem,
  AccordionTriggerProps,
} from '../Accordion';
import { INDICATOR_BASE_STYLES, RADIO_BASE_STYLES } from '../Radio';
import type { AccordionSingleProps } from '@radix-ui/react-accordion';

export interface RadioAccordionRootProps
  extends Omit<AccordionSingleProps, 'type' | 'collapsible'>,
    Omit<VariantProps<typeof AccordionRoot>, 'type' | 'collapsible'> {
  css?: CSS; // could not skipped
}

export const RadioAccordionRoot: (props: RadioAccordionRootProps) => JSX.Element = (props) => (
  <AccordionRoot {...props} type="single" collapsible={false} />
);

export interface RadioAccordionItemProps
  extends ComponentProps<typeof AccordionItem>,
    VariantProps<typeof AccordionItem> {}
export const RadioAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionItem>,
  RadioAccordionItemProps
>(({ value, children, ...props }, forwardedRef) => {
  return (
    <AccordionItem
      value={value}
      ref={forwardedRef}
      css={{ display: 'inherit', flexDirection: 'column' }}
      {...props}
    >
      {children}
    </AccordionItem>
  );
});

const StyledRadio = styled('div', RADIO_BASE_STYLES, {
  width: 18,
  height: 18,
  mr: '$2',
  '[data-state=open] > &': {
    backgroundColor: '$radioIndicator',
  },
});

const StyledIndicator = styled('div', INDICATOR_BASE_STYLES);

const StyledRadioAccordionTrigger = styled(StyledAccordionTrigger, {
  '@hover': {
    '&:hover': {
      [`& ${StyledRadio}`]: {
        boxShadow: 'inset 0 0 0 1px $colors$radioHoverBorder',
      },
    },
  },
});

export interface RadioAccordionTriggerProps extends AccordionTriggerProps {}
export const RadioAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof StyledRadioAccordionTrigger>,
  RadioAccordionTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <StyledAccordionHeader>
      <StyledRadioAccordionTrigger ref={ref} {...props}>
        <StyledRadio>
          <StyledIndicator />
        </StyledRadio>
        {children}
      </StyledRadioAccordionTrigger>
    </StyledAccordionHeader>
  );
});

export const RadioAccordionContent = AccordionContent;
