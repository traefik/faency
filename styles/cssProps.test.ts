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
