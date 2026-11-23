import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React from 'react';

import { cx } from '@/styles/cx';

import {
  AccordionContentVanilla,
  AccordionContentVanillaProps,
  AccordionItemVanilla,
  AccordionItemVanillaProps,
  AccordionRootVanilla,
  AccordionTriggerBaseVanilla,
  AccordionTriggerBaseVanillaProps,
} from '@/components/Accordion/Accordion.vanilla';
import { radioIndicator } from '@/components/Radio/Radio.vanilla.css';

import {
  radioAccordionItem,
  radioAccordionRadio,
  radioAccordionTrigger,
} from './RadioAccordion.vanilla.css';

export type RadioAccordionRootVanillaProps = Omit<
  Extract<React.ComponentProps<typeof AccordionRootVanilla>, { type: 'single' }>,
  'type' | 'collapsible' | 'ref'
>;

export const RadioAccordionRootVanilla = React.forwardRef<
  React.ElementRef<typeof AccordionRootVanilla>,
  RadioAccordionRootVanillaProps
>((props, forwardedRef) => (
  <AccordionRootVanilla {...props} type="single" collapsible={false} ref={forwardedRef} />
));

RadioAccordionRootVanilla.displayName = 'RadioAccordionRootVanilla';

export type RadioAccordionItemVanillaProps = AccordionItemVanillaProps;

export const RadioAccordionItemVanilla = React.forwardRef<
  React.ElementRef<typeof AccordionItemVanilla>,
  RadioAccordionItemVanillaProps
>(({ className, ...props }, forwardedRef) => (
  <AccordionItemVanilla
    {...props}
    className={cx(radioAccordionItem, className)}
    ref={forwardedRef}
  />
));

RadioAccordionItemVanilla.displayName = 'RadioAccordionItemVanilla';

export type RadioAccordionTriggerVanillaProps = AccordionTriggerBaseVanillaProps;

export const RadioAccordionTriggerVanilla = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  RadioAccordionTriggerVanillaProps
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionTriggerBaseVanilla
    {...props}
    className={cx(radioAccordionTrigger, className)}
    ref={forwardedRef}
  >
    <div className={radioAccordionRadio} aria-hidden>
      <div className={radioIndicator} />
    </div>
    {children}
  </AccordionTriggerBaseVanilla>
));

RadioAccordionTriggerVanilla.displayName = 'RadioAccordionTriggerVanilla';

export type RadioAccordionContentVanillaProps = AccordionContentVanillaProps;

export const RadioAccordionContentVanilla = React.forwardRef<
  React.ElementRef<typeof AccordionContentVanilla>,
  RadioAccordionContentVanillaProps
>((props, forwardedRef) => <AccordionContentVanilla {...props} ref={forwardedRef} />);

RadioAccordionContentVanilla.displayName = 'RadioAccordionContentVanilla';
