import React from 'react';

import { AriaCaptionVanilla, AriaThVanilla } from '@/components/AriaTable/AriaTable.vanilla';
import { AvatarVanilla } from '@/components/Avatar/Avatar.vanilla';
import { BadgeVanilla } from '@/components/Badge/Badge.vanilla';
import { BlockquoteVanilla } from '@/components/Blockquote/Blockquote.vanilla';
import { BubbleVanilla } from '@/components/Bubble/Bubble.vanilla';
import { ButtonVanilla } from '@/components/Button/Button.vanilla';
import { CardVanilla } from '@/components/Card/Card.vanilla';
import { ContainerVanilla } from '@/components/Container/Container.vanilla';
import { DropdownMenuContentVanilla } from '@/components/DropdownMenu/DropdownMenu.vanilla';
import { ElevationVanilla } from '@/components/Elevation/Elevation.vanilla';
import { H1Vanilla } from '@/components/Heading/Heading.vanilla';
import { IconButtonVanilla } from '@/components/IconButton/IconButton.vanilla';
import { InputVanilla } from '@/components/Input/Input.vanilla';
import { LabelVanilla } from '@/components/Label/Label.vanilla';
import { LiVanilla } from '@/components/List/List.vanilla';
import { ParagraphVanilla } from '@/components/Paragraph/Paragraph.vanilla';
import { PopoverContentVanilla } from '@/components/Popover/Popover.vanilla';
import { SelectVanilla } from '@/components/Select/Select.vanilla';
import { SkeletonVanilla } from '@/components/Skeleton/Skeleton.vanilla';
import { SwitchVanilla } from '@/components/Switch/Switch.vanilla';
import { CaptionVanilla, ThVanilla } from '@/components/Table/Table.vanilla';
import { TextVanilla } from '@/components/Text/Text.vanilla';
import { TextareaVanilla } from '@/components/Textarea/Textarea.vanilla';

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
      <DropdownMenuContentVanilla key="dropdown-menu-content" elevation={2} />,
      <PopoverContentVanilla key="popover-content" elevation={2} />,
    ];

    expect(elements).toHaveLength(22);
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
      // @ts-expect-error elevation outside the recipe keys
      <DropdownMenuContentVanilla key="dropdown-menu-content" elevation={9} />,
      // @ts-expect-error elevation outside the recipe keys
      <PopoverContentVanilla key="popover-content" elevation={9} />,
    ];

    expect(elements).toHaveLength(27);
  });
});
