import React from 'react';

import { BadgeVanilla } from '@/components/Badge/Badge.vanilla';
import { BoxVanilla } from '@/components/Box/Box.vanilla';
import { BubbleVanilla } from '@/components/Bubble/Bubble.vanilla';
import { ButtonVanilla } from '@/components/Button/Button.vanilla';
import { H1Vanilla } from '@/components/Heading/Heading.vanilla';
import { PopoverAnchorVanilla, PopoverTriggerVanilla } from '@/components/Popover/Popover.vanilla';
import { TextVanilla } from '@/components/Text/Text.vanilla';

// Checked by `yarn typecheck`: each @ts-expect-error fails the build if its line stops erroring.
describe('polymorphic component props', () => {
  it('accept the native props of the rendered element', () => {
    const elements = [
      <ButtonVanilla key="button" type="submit" onClick={() => {}} />,
      <BubbleVanilla key="bubble-as-a" as="a" href="/docs" />,
      <TextVanilla key="text-as-label" as="label" htmlFor="id" />,
      <BoxVanilla key="box-ref" as="input" ref={(el: HTMLInputElement | null) => el} />,
      <H1Vanilla key="h1-as-span" as="span" />,
      <PopoverTriggerVanilla key="trigger-as-a" as="a" href="/docs" />,
      <PopoverAnchorVanilla key="anchor-virtual-ref" virtualRef={{ current: null }} />,
    ];

    expect(elements).toHaveLength(7);
  });

  it('reject props the rendered element does not have', () => {
    const elements = [
      // @ts-expect-error unknown prop
      <BubbleVanilla key="bubble-unknown" notAProp />,
      // @ts-expect-error href on a div
      <BubbleVanilla key="bubble-href" href="/docs" />,
      // @ts-expect-error htmlFor on a span
      <TextVanilla key="text-html-for" htmlFor="id" />,
      // @ts-expect-error handler of the wrong type
      <ButtonVanilla key="button-click" onClick={42} />,
      // @ts-expect-error unknown prop
      <BadgeVanilla key="badge-unknown" notAProp />,
      // @ts-expect-error ref of the wrong element
      <BoxVanilla key="box-ref" as="input" ref={(el: HTMLTableElement | null) => el} />,
      // @ts-expect-error unknown prop on a Radix part
      <PopoverTriggerVanilla key="trigger-unknown" notAProp />,
    ];

    expect(elements).toHaveLength(7);
  });
});
