import { processCSSProp } from './cssProps';
import { resolveColor } from './resolveColor';

jest.mock('./tokens.css', () => ({
  tokens: { colors: { primary: 'var(--primary)', toneDangerText: 'var(--tone-danger-text)' } },
}));

const colors = { primary: '#0090ff', blue9: '#0090ff' };

describe('resolveColor', () => {
  it('prefers the vanilla token, so overrides apply', () => {
    expect(resolveColor('$primary', colors)).toBe('var(--primary)');
  });

  it('falls back to the theme color', () => {
    expect(resolveColor('$blue9', colors)).toBe('#0090ff');
  });

  it('returns plain values and unknown names as is', () => {
    expect(resolveColor('red', colors)).toBe('red');
    expect(resolveColor('$unknown', colors)).toBe('$unknown');
    expect(resolveColor('$blue9')).toBe('$blue9');
  });
});

describe('processCSSProp colors', () => {
  it('resolves color properties and other properties the same way', () => {
    expect(
      processCSSProp(
        { c: '$primary', bc: '$toneDangerText', borderColor: '$blue9', outlineColor: '$unknown' },
        colors,
      ).style,
    ).toEqual({
      color: 'var(--primary)',
      backgroundColor: 'var(--tone-danger-text)',
      borderColor: '#0090ff',
      outlineColor: '$unknown',
    });
  });
});

describe('processCSSProp fonts', () => {
  it.each([
    ['$3', '14px'],
    ['$4', '16px'],
    ['3', '14px'],
    ['14px', '14px'],
    ['1.5rem', '1.5rem'],
    [15, 15],
  ])('maps fontSize %p to %p', (value, expected) => {
    expect(processCSSProp({ fontSize: value }).style).toEqual({ fontSize: expected });
  });

  it.each([
    ['$medium', '500'],
    ['medium', '500'],
    ['$regular', '400'],
    [600, 600],
    ['600', '600'],
    ['normal', 'normal'],
  ])('maps fontWeight %p to %p', (value, expected) => {
    expect(processCSSProp({ fontWeight: value }).style).toEqual({ fontWeight: expected });
  });
});
