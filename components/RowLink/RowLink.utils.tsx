import React, { Children, cloneElement, ElementType, isValidElement, ReactNode } from 'react';

import { warnOnce } from '../../utils/warnOnce';
import { ROW_LINK_ATTRIBUTE } from './RowLink.constants';

const STITCHES_INTERNAL = Symbol.for('sxs.internal');

export type RowLinkShortcutProps = {
  href?: string;
  /**
   * The link component, for example a router link. It must pass its props and ref to its `<a>`,
   * and it must be defined outside render, or the link mounts again on each render.
   */
  linkAs?: ElementType;
  /** Other props for the link component, for example `{ returnTo }`. */
  linkProps?: Record<string, unknown>;
  /** The index of the cell that holds the link, among the direct children of the row. */
  linkCell?: number;
  /** With `false`, the link does not cover the row: see `overlay` on `RowLink`. */
  linkOverlay?: boolean;
};

type StitchesType = { className?: string; [STITCHES_INTERNAL]?: { type?: unknown } };

// A Stitches `styled(Td)` keeps the class name of a Stitches Td, or renders a component Td.
// This reads Stitches 1.x internals; the styled Td tests catch a change in them.
const isCellType = (type: unknown, cellType: ElementType) => {
  if (type === cellType) {
    return true;
  }
  if (!type || (typeof type !== 'object' && typeof type !== 'function')) {
    return false;
  }
  const { className, [STITCHES_INTERNAL]: internal } = type as StitchesType;
  const cellClassName = (cellType as StitchesType).className;
  return internal?.type === cellType || (!!cellClassName && className === cellClassName);
};

/** The component names in the warning. Without them, it names the Stitches `Tr` and `Td`, and suggests `RowLink`. */
type RowLinkNames = { row: string; cell: string };

/** Puts the content of the `cellType` cell at `linkCell` in a `RowLinkComponent` to `href`. */
export const mapRowLink = (
  children: ReactNode,
  { href, linkAs: LinkComponent = 'a', linkCell = 0, linkProps, linkOverlay }: RowLinkShortcutProps,
  cellType: ElementType,
  RowLinkComponent: ElementType,
  names?: RowLinkNames,
) => {
  if (href === undefined) {
    return children;
  }

  let cellIndex = -1;
  let linked = false;
  // eslint-disable-next-line @eslint-react/no-children-map
  const mapped = Children.map(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) {
      return child;
    }
    cellIndex += 1;
    if (cellIndex !== linkCell || !isCellType(child.type, cellType)) {
      return child;
    }
    linked = true;
    // eslint-disable-next-line @eslint-react/no-clone-element
    return cloneElement(
      child,
      undefined,
      <RowLinkComponent asChild overlay={linkOverlay}>
        <LinkComponent {...linkProps} href={href}>
          {child.props.children}
        </LinkComponent>
      </RowLinkComponent>,
    );
  });

  if (!linked) {
    const { row, cell } = names ?? { row: 'Tr', cell: 'Td' };
    const aCell = `${/^[aeiou]/i.test(cell) ? 'an' : 'a'} ${cell}`;
    const fix = names
      ? `Use ${aCell} for that cell.`
      : `Use ${aCell} for that cell, or put a RowLink in it.`;
    warnOnce(
      `${row}: the child at linkCell ${linkCell} is not ${aCell}, so the row has no link. ${fix}`,
    );
  }

  return mapped;
};

// Only a web page opens in a new tab, never a script URL such as javascript: or data:.
// Other links, such as tel: or mailto:, open as on a plain click.
const NEW_TAB_PROTOCOLS = ['http:', 'https:'];

const ROW_CLICK_CONTROLS =
  'a, button, input, select, textarea, label, summary, [role="button"], [role="link"], [role="checkbox"], [role="switch"], [role="menuitem"], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

let replayedLink: HTMLAnchorElement | null = null;

/** Opens the `RowLink` without overlay of the row on a click or a middle click outside its controls. */
export const openRowLink = <T extends HTMLElement>(event: React.MouseEvent<T>) => {
  const isAuxClick = event.type === 'auxclick';
  if (event.defaultPrevented || (isAuxClick && event.button !== 1)) {
    return;
  }
  const row = event.currentTarget;
  const target = event.target;
  // A portal, such as a row menu, sends its clicks to the row through React, but it is not in the row.
  if (!(target instanceof Element) || !row.contains(target)) {
    return;
  }
  const control = target.closest(ROW_CLICK_CONTROLS);
  if (control && row.contains(control)) {
    return;
  }
  const link = row.querySelector<HTMLAnchorElement>(`[${ROW_LINK_ATTRIBUTE}="click"]`);
  if (!link) {
    return;
  }
  // A drag that selects text in the row is not a click on the row.
  const selection = window.getSelection();
  if (selection && !selection.isCollapsed && row.contains(selection.anchorNode)) {
    return;
  }
  const newTab = isAuxClick || event.metaKey || event.ctrlKey || event.shiftKey;
  if (newTab && NEW_TAB_PROTOCOLS.includes(new URL(link.href, window.location.href).protocol)) {
    window.open(link.href, '_blank', 'noopener,noreferrer');
    return;
  }
  // The click bubbles back to the row, which skips it in `handleRowClick`.
  replayedLink = link;
  try {
    link.click();
  } finally {
    replayedLink = null;
  }
};

/**
 * Calls the row's `onClick`, then opens its `RowLink` without overlay. It skips the click that
 * `openRowLink` sends to the link, so `onClick` runs once per click on the row.
 */
export const handleRowClick = <T extends HTMLElement>(
  event: React.MouseEvent<T>,
  onClick?: React.MouseEventHandler<T>,
) => {
  if (replayedLink && event.target === replayedLink) {
    return;
  }
  onClick?.(event);
  openRowLink(event);
};
