import { clampToTimeRange, getDateBounds, isOutOfRange, isTimeOutOfRange } from './isOutOfRange';

describe('isOutOfRange', () => {
  it('should compare whole days against the date limits', () => {
    const dates = { minDate: new Date(2026, 10, 19, 12), maxDate: new Date(2026, 10, 25, 12) };

    expect(isOutOfRange(new Date(2026, 10, 19, 15), dates, undefined)).toBe(true);
    expect(isOutOfRange(new Date(2026, 10, 20, 0), dates, undefined)).toBe(false);
    expect(isOutOfRange(new Date(2026, 10, 25, 23), dates, undefined)).toBe(false);
    expect(isOutOfRange(new Date(2026, 10, 26, 0), dates, undefined)).toBe(true);
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
  it('should round the limits to the days the picker allows', () => {
    const { min, max } = getDateBounds({
      minDate: new Date(2026, 10, 19, 12),
      maxDate: new Date(2026, 11, 31),
    });

    expect(min).toEqual(new Date(2026, 10, 20));
    expect(max).toEqual(new Date(2026, 11, 31, 23, 59, 59, 999));
    expect(getDateBounds({ minDate: new Date(2026, 10, 19) }).min).toEqual(new Date(2026, 10, 19));
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
