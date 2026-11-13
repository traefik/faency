import { act, renderHook } from '@testing-library/react';

import { sortRows, useTableSort } from './useTableSort';

type Column = 'name' | 'requests';

describe('useTableSort', () => {
  it('starts with the given key and direction', () => {
    const { result } = renderHook(() => useTableSort<Column>({ key: 'name', direction: 'asc' }));

    expect(result.current.key).toBe('name');
    expect(result.current.direction).toBe('asc');
    expect(result.current.sortProps('name').sort).toBe('asc');
    expect(result.current.sortProps('requests').sort).toBeUndefined();
  });

  it('starts in newColumnDirection without a direction', () => {
    const { result } = renderHook(() =>
      useTableSort<Column>({ key: 'name', newColumnDirection: 'asc' }),
    );

    expect(result.current.direction).toBe('asc');
  });

  it('flips the direction of the sorted column', () => {
    const { result } = renderHook(() => useTableSort<Column>({ key: 'requests' }));
    expect(result.current.direction).toBe('desc');

    act(() => result.current.sortProps('requests').onSort?.());
    expect(result.current.direction).toBe('asc');

    act(() => result.current.sortProps('requests').onSort?.());
    expect(result.current.direction).toBe('desc');
  });

  it('sorts another column in newColumnDirection', () => {
    const { result } = renderHook(() =>
      useTableSort<Column>({ key: 'requests', direction: 'desc', newColumnDirection: 'asc' }),
    );

    act(() => result.current.sortProps('name').onSort?.());

    expect(result.current.key).toBe('name');
    expect(result.current.direction).toBe('asc');
    expect(result.current.sortProps('requests').sort).toBeUndefined();
  });

  it('sorts another column desc by default', () => {
    const { result } = renderHook(() => useTableSort<Column>({ key: 'name', direction: 'asc' }));

    act(() => result.current.sortProps('requests').onSort?.());

    expect(result.current.direction).toBe('desc');
  });
});

describe('sortRows', () => {
  const rows = [
    { name: 'beta', requests: 10 },
    { name: 'Alpha', requests: 2 },
    { name: 'gamma', requests: 10 },
    { name: 'delta', requests: 100 },
  ];
  const getValue = (row: (typeof rows)[number], key: Column) => row[key];

  it('sorts strings in locale order', () => {
    expect(sortRows(rows, getValue, 'name', 'asc').map((row) => row.name)).toEqual([
      'Alpha',
      'beta',
      'delta',
      'gamma',
    ]);
    expect(sortRows(rows, getValue, 'name', 'desc').map((row) => row.name)).toEqual([
      'gamma',
      'delta',
      'beta',
      'Alpha',
    ]);
  });

  it('sorts numbers by value, keeping the order of ties', () => {
    expect(sortRows(rows, getValue, 'requests', 'asc').map((row) => row.name)).toEqual([
      'Alpha',
      'beta',
      'gamma',
      'delta',
    ]);
    expect(sortRows(rows, getValue, 'requests', 'desc').map((row) => row.name)).toEqual([
      'delta',
      'beta',
      'gamma',
      'Alpha',
    ]);
  });

  it('puts empty values last in both directions, and numbers before strings', () => {
    const mixed = [
      { id: 'empty', size: '' },
      { id: 'ten', size: 10 },
      { id: 'null', size: null },
      { id: 'text', size: 'n/a' },
      { id: 'nan', size: NaN },
      { id: 'nine', size: 9 },
      { id: 'undefined', size: undefined },
    ];
    const getSize = (row: (typeof mixed)[number]) => row.size;
    const empties = ['empty', 'null', 'nan', 'undefined'];

    expect(sortRows(mixed, getSize, 'size', 'asc').map((row) => row.id)).toEqual([
      'nine',
      'ten',
      'text',
      ...empties,
    ]);
    expect(sortRows(mixed, getSize, 'size', 'desc').map((row) => row.id)).toEqual([
      'text',
      'ten',
      'nine',
      ...empties,
    ]);
  });

  it('gives the same order whatever the input order', () => {
    const values = [9, '', 10, null, 'b', 'a', 2];
    const getValue = (value: (typeof values)[number]) => value;
    const expected = sortRows(values, getValue, 'value', 'asc');

    [[...values].reverse(), [...values.slice(3), ...values.slice(0, 3)]].forEach((input) => {
      const sorted = sortRows(input, getValue, 'value', 'asc');
      expect(sorted.filter((value) => value !== '' && value !== null)).toEqual(
        expected.filter((value) => value !== '' && value !== null),
      );
    });
  });

  it('does not change the rows it is given', () => {
    const copy = [...rows];
    sortRows(rows, getValue, 'name', 'asc');

    expect(rows).toEqual(copy);
  });
});
