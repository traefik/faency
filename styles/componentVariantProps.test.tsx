import React from 'react';

import {
  AccordionContentVanilla,
  AccordionRootVanilla,
  AccordionTriggerVanilla,
} from '@/components/Accordion/Accordion.vanilla';
import { AlertVanilla } from '@/components/Alert/Alert.vanilla';
import { AriaCaptionVanilla, AriaThVanilla } from '@/components/AriaTable/AriaTable.vanilla';
import { AvatarVanilla } from '@/components/Avatar/Avatar.vanilla';
import { BadgeVanilla } from '@/components/Badge/Badge.vanilla';
import { BlockquoteVanilla } from '@/components/Blockquote/Blockquote.vanilla';
import { BubbleVanilla } from '@/components/Bubble/Bubble.vanilla';
import { ButtonVanilla } from '@/components/Button/Button.vanilla';
import { CardVanilla } from '@/components/Card/Card.vanilla';
import { CheckboxVanilla } from '@/components/Checkbox/Checkbox.vanilla';
import { ContainerVanilla } from '@/components/Container/Container.vanilla';
import { DialogContentVanilla } from '@/components/Dialog/Dialog.vanilla';
import { DropdownMenuContentVanilla } from '@/components/DropdownMenu/DropdownMenu.vanilla';
import { ElevationVanilla } from '@/components/Elevation/Elevation.vanilla';
import { H1Vanilla } from '@/components/Heading/Heading.vanilla';
import { IconButtonVanilla } from '@/components/IconButton/IconButton.vanilla';
import { InputVanilla } from '@/components/Input/Input.vanilla';
import { LabelVanilla } from '@/components/Label/Label.vanilla';
import { LiVanilla } from '@/components/List/List.vanilla';
import { ParagraphVanilla } from '@/components/Paragraph/Paragraph.vanilla';
import { PopoverContentVanilla } from '@/components/Popover/Popover.vanilla';
import { RadioVanilla } from '@/components/Radio/Radio.vanilla';
import {
  RadioAccordionRootVanilla,
  RadioAccordionTriggerVanilla,
} from '@/components/RadioAccordion/RadioAccordion.vanilla';
import { SelectVanilla } from '@/components/Select/Select.vanilla';
import { SkeletonVanilla } from '@/components/Skeleton/Skeleton.vanilla';
import { SwitchVanilla } from '@/components/Switch/Switch.vanilla';
import { CaptionVanilla, ThVanilla } from '@/components/Table/Table.vanilla';
import { TextVanilla } from '@/components/Text/Text.vanilla';
import { TextareaVanilla } from '@/components/Textarea/Textarea.vanilla';
import { TooltipContentVanilla } from '@/components/Tooltip/Tooltip.vanilla';

// Checked by `yarn typecheck`: each @ts-expect-error fails the build if its line stops erroring.
describe('component variant props', () => {
  it('accept valid variants, including numbers for numeric keys', () => {
    const elements = [
      <TextVanilla key="text" size={2} variant="subtle" />,
      <ParagraphVanilla key="paragraph" size={2} />,
      <AvatarVanilla key="avatar" size={2} />,
      <ContainerVanilla key="container" size={2} />,
      <IconButtonVanilla key="icon-button" size={2} aria-label="Icon" />,
      <ButtonVanilla key="button" size="small" variant="primary" />,
      <H1Vanilla key="h1" transform="uppercase" />,
      <CaptionVanilla key="caption" size={2} />,
      <ThVanilla key="th" size={2} />,
      <AriaCaptionVanilla key="aria-caption" size={2} />,
      <AriaThVanilla key="aria-th" size={2} />,
      <CardVanilla key="card" elevation={2} variant="inner" />,
      <ElevationVanilla key="elevation" variant={2} />,
      <BubbleVanilla key="bubble" size="small" variant="red" />,
      <SkeletonVanilla key="skeleton" variant="circle" />,
      <InputVanilla key="input" size="small" variant="ghost" />,
      <TextareaVanilla key="textarea" variant="ghost" resize="vertical" />,
      <LiVanilla key="li" elevation={2} />,
      <SelectVanilla key="select" size="small" variant="ghost" state="invalid" />,
      <SwitchVanilla key="switch" size={2} />,
      <CheckboxVanilla key="checkbox" size="large" />,
      <RadioVanilla key="radio" value="a" size={2} />,
      <AccordionRootVanilla key="accordion" type="single" elevation={2} />,
      <AccordionTriggerVanilla key="accordion-trigger" size="large" />,
      <AccordionContentVanilla key="accordion-content" size="medium" />,
      <RadioAccordionRootVanilla key="radio-accordion" elevation={2} />,
      <RadioAccordionTriggerVanilla key="radio-accordion-trigger" size="large" />,
      <DropdownMenuContentVanilla key="dropdown-menu-content" elevation={2} />,
      <PopoverContentVanilla key="popover-content" elevation={2} />,
      <AlertVanilla key="alert" variant="info" elevation={2} />,
      <TooltipContentVanilla key="tooltip-content" multiline />,
      <DialogContentVanilla key="dialog-content" elevation={3} />,
    ];

    expect(elements).toHaveLength(32);
  });

  it('reject invalid variants', () => {
    const elements = [
      // @ts-expect-error unknown variant
      <TextVanilla key="text-variant" variant="nope" />,
      // @ts-expect-error size outside the recipe keys
      <TextVanilla key="text-size" size={42} />,
      // @ts-expect-error size outside the recipe keys
      <LabelVanilla key="label" size={42} />,
      // @ts-expect-error size outside the recipe keys
      <BlockquoteVanilla key="blockquote" size={42} />,
      // @ts-expect-error size outside the recipe keys
      <ParagraphVanilla key="paragraph" size={3} />,
      // @ts-expect-error size outside the recipe keys
      <AvatarVanilla key="avatar" size={9} />,
      // @ts-expect-error size outside the recipe keys
      <ContainerVanilla key="container" size={9} />,
      // @ts-expect-error size outside the recipe keys
      <IconButtonVanilla key="icon-button" size={9} aria-label="Icon" />,
      // @ts-expect-error non-numeric keys do not accept numbers
      <ButtonVanilla key="button-size" size={1} />,
      // @ts-expect-error unknown variant
      <ButtonVanilla key="button-variant" variant="nope" />,
      // @ts-expect-error unknown variant
      <BadgeVanilla key="badge" variant="nope" />,
      // @ts-expect-error unknown transform
      <H1Vanilla key="h1" transform="nope" />,
      // @ts-expect-error size outside the recipe keys
      <CaptionVanilla key="caption" size={42} />,
      // @ts-expect-error size outside the recipe keys
      <ThVanilla key="th" size={42} />,
      // @ts-expect-error size outside the recipe keys
      <AriaCaptionVanilla key="aria-caption" size={42} />,
      // @ts-expect-error size outside the recipe keys
      <AriaThVanilla key="aria-th" size={42} />,
      // @ts-expect-error elevation outside the recipe keys
      <CardVanilla key="card" elevation={9} />,
      // @ts-expect-error elevation outside the recipe keys
      <ElevationVanilla key="elevation" variant={9} />,
      // @ts-expect-error unknown variant
      <BubbleVanilla key="bubble" variant="nope" />,
      // @ts-expect-error unknown variant
      <SkeletonVanilla key="skeleton" variant="nope" />,
      // @ts-expect-error unknown size
      <InputVanilla key="input" size="huge" />,
      // @ts-expect-error unknown resize
      <TextareaVanilla key="textarea" resize="diagonal" />,
      // @ts-expect-error elevation outside the recipe keys
      <LiVanilla key="li" elevation={9} />,
      // @ts-expect-error unknown size
      <SelectVanilla key="select" size="huge" />,
      // @ts-expect-error size outside the recipe keys
      <SwitchVanilla key="switch" size={9} />,
      // @ts-expect-error unknown size
      <CheckboxVanilla key="checkbox" size="huge" />,
      // @ts-expect-error size outside the recipe keys
      <RadioVanilla key="radio" value="a" size={9} />,
      // @ts-expect-error elevation outside the recipe keys
      <AccordionRootVanilla key="accordion" type="single" elevation={9} />,
      // @ts-expect-error unknown size
      <AccordionTriggerVanilla key="accordion-trigger" size="huge" />,
      // @ts-expect-error unknown size
      <RadioAccordionTriggerVanilla key="radio-accordion-trigger" size="huge" />,
      // @ts-expect-error elevation outside the recipe keys
      <DropdownMenuContentVanilla key="dropdown-menu-content" elevation={9} />,
      // @ts-expect-error elevation outside the recipe keys
      <PopoverContentVanilla key="popover-content" elevation={9} />,
      // @ts-expect-error unknown variant
      <AlertVanilla key="alert" variant="nope" />,
      // @ts-expect-error Card's own variant is not exposed
      <AlertVanilla key="alert-card-variant" variant="inner" />,
      // @ts-expect-error unknown multiline value
      <TooltipContentVanilla key="tooltip-content" multiline="yes" />,
      // @ts-expect-error elevation outside the recipe keys
      <DialogContentVanilla key="dialog-content" elevation={9} />,
    ];

    expect(elements).toHaveLength(36);
  });
});
