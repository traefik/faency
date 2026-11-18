import { RecipeVariantProps, withVariantKeys } from './recipeVariants';

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

type RecipeOptions = { size?: '1' | '2'; flat?: boolean };

describe('withVariantKeys', () => {
  it('passes numeric variants to the recipe as string keys', () => {
    const recipe = jest.fn<string, [RecipeOptions?]>(() => 'class');
    const wrapped = withVariantKeys(recipe);

    expect(wrapped({ size: 2, flat: true })).toBe('class');
    expect(recipe).toHaveBeenLastCalledWith({ size: '2', flat: true });
  });

  it('passes options through untouched when no value is a number', () => {
    const recipe = jest.fn<string, [RecipeOptions?]>(() => 'class');
    const wrapped = withVariantKeys(recipe);
    const options = { size: '1' as const, flat: false };

    wrapped(options);
    expect(recipe.mock.lastCall?.[0]).toBe(options);

    wrapped();
    expect(recipe).toHaveBeenLastCalledWith(undefined);
  });
});
