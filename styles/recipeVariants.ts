type RecipeFn = (options?: any) => string;

type NumericKey<T> = T extends `${infer N extends number}` ? N : never;

export type RecipeVariantProps<R extends RecipeFn> = {
  [K in keyof NonNullable<Parameters<R>[0]>]:
    NonNullable<Parameters<R>[0]>[K] | NumericKey<NonNullable<Parameters<R>[0]>[K]>;
};

type VariantKey<R extends RecipeFn> = keyof NonNullable<Parameters<R>[0]>;

// Distributes over unions so discriminated props (e.g. Accordion's `type`) survive.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export const splitVariants = <
  R extends RecipeFn & { variants: () => PropertyKey[] },
  P extends Record<string, unknown>,
>(
  recipe: R,
  props: P,
): [RecipeVariantProps<R>, DistributiveOmit<P, VariantKey<R>>] => {
  const keys = recipe.variants();
  const variants: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};

  for (const key in props) {
    (keys.includes(key) ? variants : rest)[key] = props[key];
  }

  return [variants as RecipeVariantProps<R>, rest as DistributiveOmit<P, VariantKey<R>>];
};

// Compound variants match with ===, so 2 must become '2'.
export const withVariantKeys =
  <R extends RecipeFn>(recipe: R) =>
  (options?: RecipeVariantProps<R>): string => {
    let normalized: Record<string, unknown> | undefined;

    for (const key in options) {
      const value = options[key];
      if (typeof value === 'number') {
        if (!normalized) normalized = { ...options };
        normalized[key] = String(value);
      }
    }

    return recipe(normalized ?? options);
  };
