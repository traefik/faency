import { processCSSProp } from './cssProps';

jest.mock('./tokens.css', () => ({
  tokens: { colors: { toneDangerText: 'var(--tone-danger-text)', blue9: 'var(--blue9)' } },
}));

describe('processCSSProp', () => {
  const colors = { blue9: '#0090ff' };

  it('resolves palette colors before vanilla tokens', () => {
    expect(processCSSProp({ c: '$blue9', borderColor: '$blue9' }, colors).style).toEqual({
      color: '#0090ff',
      borderColor: '#0090ff',
    });
  });

  it('falls back to vanilla-only color tokens', () => {
    expect(
      processCSSProp({ c: '$toneDangerText', borderColor: '$toneDangerText' }, colors).style,
    ).toEqual({
      color: 'var(--tone-danger-text)',
      borderColor: 'var(--tone-danger-text)',
    });
  });

  it('passes unknown tokens through', () => {
    expect(processCSSProp({ c: '$unknown' }, colors).style).toEqual({ color: '$unknown' });
  });
});
