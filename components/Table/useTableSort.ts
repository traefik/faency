import { useState } from 'react';

export type TableSortDirection = 'asc' | 'desc';

export type TableSortProps = {
  /** The direction the column is sorted in, or `undefined` when it is not sorted. */
  sort?: TableSortDirection;
  /** Makes the column sortable: called when its header is clicked. */
  onSort?: () => void;
};

export type UseTableSortOptions<K extends string> = {
  key: K;
  direction?: TableSortDirection;
  /** The direction a column is sorted in when it is clicked while another one is sorted. */
  newColumnDirection?: TableSortDirection;
};

/**
 * Keeps the sorted column and direction, and gives each header its `sort` and `onSort`.
 * It does not sort: pass `key` and `direction` to `sortRows`, or to the API.
 */
export const useTableSort = <K extends string>({
  key: initialKey,
  direction: initialDirection,
  newColumnDirection = 'desc',
}: UseTableSortOptions<K>) => {
  const [state, setState] = useState({
    key: initialKey,
    direction: initialDirection ?? newColumnDirection,
  });
  const { key, direction } = state;

  const toggle = (column: K) =>
    setState((state) =>
      state.key === column
        ? { key: column, direction: state.direction === 'asc' ? 'desc' : 'asc' }
        : { key: column, direction: newColumnDirection },
    );

  const sortProps = (column: K): TableSortProps => ({
    sort: column === key ? direction : undefined,
    onSort: () => toggle(column),
  });

  return { key, direction, sortProps };
};

export type TableSortValue = string | number | null | undefined;

const isEmpty = (value: TableSortValue) =>
  value === null || value === undefined || value === '' || Number.isNaN(value);

const compareValues = (a: TableSortValue, b: TableSortValue) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  if (typeof a === 'number') {
    return -1;
  }
  if (typeof b === 'number') {
    return 1;
  }
  return String(a).localeCompare(String(b));
};

/**
 * Returns a sorted copy of `rows`: numbers by value, then strings in locale order.
 * Empty values (`null`, `undefined`, `''`, `NaN`) go last in both directions. Ties keep their order.
 */
export const sortRows = <T, K extends string>(
  rows: readonly T[],
  getValue: (row: T, key: K) => TableSortValue,
  key: K,
  direction: TableSortDirection,
): T[] => {
  const factor = direction === 'asc' ? 1 : -1;
  return [...rows].sort((rowA, rowB) => {
    const a = getValue(rowA, key);
    const b = getValue(rowB, key);
    const emptyA = isEmpty(a);
    const emptyB = isEmpty(b);
    if (emptyA || emptyB) {
      return Number(emptyA) - Number(emptyB);
    }
    return factor * compareValues(a, b);
  });
};
