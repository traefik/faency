import { stateLayers } from './stateLayers';

describe('stateLayers', () => {
  it('turns a color into a solid gradient layer', () => {
    expect(stateLayers('red')).toBe('linear-gradient(red, red)');
  });

  it('keeps the first color on top', () => {
    expect(stateLayers('var(--tint)', 'rgba(0, 0, 0, 0.1)')).toBe(
      'linear-gradient(var(--tint), var(--tint)), linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))',
    );
  });
});
