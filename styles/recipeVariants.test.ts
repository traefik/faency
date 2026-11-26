import { RecipeVariantProps, splitVariants } from './recipeVariants';

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

describe('splitVariants', () => {
  const recipe = Object.assign(
    jest.fn<string, [RecipeOptions?]>(() => 'class'),
    {
      variants: () => ['size', 'flat'],
    },
  );

  it('separates recipe variants from the other props', () => {
    const onClick = () => {};
    const [variants, props] = splitVariants(recipe, { size: '1', type: 'submit', onClick });

    expect(variants).toEqual({ size: '1' });
    expect(props).toEqual({ type: 'submit', onClick });
  });

  it('passes numeric variants as string keys', () => {
    const [variants] = splitVariants(recipe, { size: 2, flat: false });

    expect(variants).toEqual({ size: '2', flat: false });
  });

  it('keeps variants out of the rest type', () => {
    const [, props] = splitVariants(recipe, { flat: true, id: 'a' });
    // @ts-expect-error flat went to the recipe
    expect(props.flat).toBeUndefined();
    expect(props.id).toBe('a');
  });
});
