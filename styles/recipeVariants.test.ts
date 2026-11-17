import { RecipeVariantProps, toVariantKey } from './recipeVariants';

type Recipe = (options?: { size?: '1' | '2'; tone?: 'neutral'; flat?: boolean }) => string;
type Props = RecipeVariantProps<Recipe>;

describe('RecipeVariantProps', () => {
  it('accepts numbers for numeric keys only', () => {
    const props: Props[] = [{ size: '1' }, { size: 2 }, { tone: 'neutral', flat: true }, {}];
    // @ts-expect-error not a key of the recipe
    const unknownSize: Props = { size: 3 };
    // @ts-expect-error non-numeric keys stay strings
    const numericTone: Props = { tone: 1 };

    expect([...props, unknownSize, numericTone]).toHaveLength(6);
  });
});

describe('toVariantKey', () => {
  it('turns numbers into their string key', () => {
    expect(toVariantKey(2)).toBe('2');
    expect(toVariantKey(0)).toBe('0');
  });

  it('returns other values as is', () => {
    expect(toVariantKey('2')).toBe('2');
    expect(toVariantKey(true)).toBe(true);
    expect(toVariantKey(undefined)).toBeUndefined();
  });
});
