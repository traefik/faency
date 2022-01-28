import React, { ComponentProps } from "react";
import { styled, VariantProps } from "../../stitches.config";
import { StyledAccordionTrigger, StyledAccordionHeader, AccordionRoot, AccordionContent, AccordionItem, AccordionTriggerProps } from "../Accordion";
import { INDICATOR_BASE_STYLES, RADIO_BASE_STYLES } from "../Radio";
import type { AccordionSingleProps } from '@radix-ui/react-accordion'

export interface RadioAccordionRootProps extends Omit<AccordionSingleProps, 'type' | 'collapsible' | 'css'>, Omit<VariantProps<typeof AccordionRoot>, 'type' | 'collapsible'> { }

export const RadioAccordionRoot: (props: RadioAccordionRootProps) => JSX.Element = (props) => (
  <AccordionRoot {...props} type="single" collapsible={false} />
)
export const RadioAccordionItem = React.forwardRef<React.ElementRef<typeof AccordionItem>, ComponentProps<typeof AccordionItem>>(({ value, children, ...props }, forwardedRef) => {

  return (
    <AccordionItem value={value} ref={forwardedRef} css={{ display: 'inherit', flexDirection: 'column' } as any} {...props}>
      {children}
    </AccordionItem>
  );
});

const StyledRadio = styled('div', RADIO_BASE_STYLES, {
  width: 18,
  height: 18,
  mr: '$2',
})

const StyledIndicator = styled('div', INDICATOR_BASE_STYLES, {
  '&::after': {
    '[data-state=open] &': {
      backgroundColor: '$radioIndicator'
    },
    '[data-state=closed] &': {
      backgroundColor: 'transparent',
    }
  },
});

const StyledRadioAccordionTrigger = styled(StyledAccordionTrigger, {
  '@hover': {
    '&:hover': {
      [`& ${StyledRadio}`]: {
        boxShadow: 'inset 0 0 0 1px $colors$radioHoverBorder',
        backgroundColor: '$radioHoverBg',
      }
    }
  }
})

export const RadioAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof StyledRadioAccordionTrigger>, AccordionTriggerProps>(({ children, ...props }, ref) => {

    return (
      <StyledAccordionHeader>
        <StyledRadioAccordionTrigger ref={ref} {...props}>
          <StyledRadio >
            <StyledIndicator />
          </StyledRadio>
          {children}
        </StyledRadioAccordionTrigger>
      </StyledAccordionHeader>
    )
  })

export const RadioAccordionContent = AccordionContent