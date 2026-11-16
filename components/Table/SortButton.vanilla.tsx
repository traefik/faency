import React, { ReactNode } from 'react';

import { sortButton, sortIcon, sortIconActive } from './Table.vanilla.css';
import { TableSortDirection } from './useTableSort';

export const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;

type SortButtonVanillaProps = {
  sort?: TableSortDirection;
  onSort: () => void;
  children?: ReactNode;
};

export const SortButtonVanilla = ({ sort, onSort, children }: SortButtonVanillaProps) => (
  <button type="button" className={sortButton} onClick={onSort}>
    {children}
    <svg
      aria-hidden
      className={sortIcon}
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 5 4 2l3 3" className={sort === 'asc' ? sortIconActive : undefined} />
      <path d="m1 9 3 3 3-3" className={sort === 'desc' ? sortIconActive : undefined} />
    </svg>
  </button>
);
