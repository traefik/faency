import {
  clampToTimeRange,
  getDateBounds,
  isOutOfRange,
  isTimeOutOfRange,
  rangeHasUnavailableDay,
} from './isOutOfRange';

describe('isOutOfRange', () => {
  it('should ignore the time of the date limits, like the calendar', () => {
    const dates = { minDate: new Date(2026, 10, 19, 12), maxDate: new Date(2026, 10, 25, 12) };

    expect(isOutOfRange(new Date(2026, 10, 18, 23), dates, undefined)).toBe(true);
    expect(isOutOfRange(new Date(2026, 10, 19, 8), dates, undefined)).toBe(false);
    expect(isOutOfRange(new Date(2026, 10, 25, 23), dates, undefined)).toBe(false);
    expect(isOutOfRange(new Date(2026, 10, 26, 0), dates, undefined)).toBe(true);
  });

  it('should swap reversed date limits, like the calendar', () => {
    const dates = { minDate: new Date(2026, 10, 25), maxDate: new Date(2026, 10, 19) };

    expect(isOutOfRange(new Date(2026, 10, 22), dates, undefined)).toBe(false);
    expect(isOutOfRange(new Date(2026, 10, 18), dates, undefined)).toBe(true);
    expect(isOutOfRange(new Date(2026, 10, 26), dates, undefined)).toBe(true);
  });

  it('should honour excluded week days and dates', () => {
    const exclude = { day: [0 as const], date: [new Date(2026, 10, 25)] };

    expect(isOutOfRange(new Date(2026, 10, 22), undefined, exclude)).toBe(true);
    expect(isOutOfRange(new Date(2026, 10, 25, 9), undefined, exclude)).toBe(true);
    expect(isOutOfRange(new Date(2026, 10, 24), undefined, exclude)).toBe(false);
  });
});

describe('isTimeOutOfRange', () => {
  it('should apply inclusive limits, a single limit and reversed limits', () => {
    const at = (h: number, m = 0) => new Date(2026, 10, 19, h, m);

    expect(isTimeOutOfRange(at(9), { minTime: { h: 9, m: 0 }, maxTime: { h: 17, m: 0 } })).toBe(
      false,
    );
    expect(isTimeOutOfRange(at(17, 1), { minTime: { h: 9, m: 0 }, maxTime: { h: 17, m: 0 } })).toBe(
      true,
    );
    expect(isTimeOutOfRange(at(8), { minTime: { h: 9, m: 0 } })).toBe(true);
    expect(isTimeOutOfRange(at(18), { maxTime: { h: 17, m: 0 } })).toBe(true);
    expect(isTimeOutOfRange(at(12), { minTime: { h: 17, m: 0 }, maxTime: { h: 9, m: 0 } })).toBe(
      false,
    );
    expect(isTimeOutOfRange(at(3), undefined)).toBe(false);
  });
});

describe('getDateBounds', () => {
  it('should cover whole days from the min day to the max day', () => {
    const { min, max } = getDateBounds({
      minDate: new Date(2026, 10, 19, 12),
      maxDate: new Date(2026, 11, 31, 8),
    });

    expect(min).toEqual(new Date(2026, 10, 19));
    expect(max).toEqual(new Date(2026, 11, 31, 23, 59, 59, 999));
  });

  it('should swap reversed limits', () => {
    const { min, max } = getDateBounds({
      minDate: new Date(2026, 11, 31),
      maxDate: new Date(2026, 10, 19),
    });

    expect(min).toEqual(new Date(2026, 10, 19));
    expect(max).toEqual(new Date(2026, 11, 31, 23, 59, 59, 999));
  });
});

describe('clampToTimeRange', () => {
  it('should move times outside the limits to the nearest limit', () => {
    const time = { minTime: { h: 9, m: 0 }, maxTime: { h: 18, m: 30 } };
    const day = (h: number, m = 0) => new Date(2026, 10, 19, h, m);

    expect(clampToTimeRange(day(3), time)).toEqual(day(9));
    expect(clampToTimeRange(day(20, 45), time)).toEqual(day(18, 30));
    expect(clampToTimeRange(day(12, 15), time)).toEqual(day(12, 15));
    expect(clampToTimeRange(day(3), undefined)).toEqual(day(3));
  });
});

describe('rangeHasUnavailableDay', () => {
  it('should find excluded or out-of-range days between two dates in either order', () => {
    const exclude = { day: [0 as const, 6 as const] };
    const friday = new Date(2026, 10, 20, 10);
    const monday = new Date(2026, 10, 23, 10);
    const tuesday = new Date(2026, 10, 24, 10);

    expect(rangeHasUnavailableDay(friday, monday, undefined, exclude)).toBe(true);
    expect(rangeHasUnavailableDay(tuesday, monday, undefined, exclude)).toBe(false);
    expect(
      rangeHasUnavailableDay(friday, tuesday, { maxDate: new Date(2026, 10, 23) }, undefined),
    ).toBe(true);
  });
});
