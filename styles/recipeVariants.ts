type RecipeFn = (options?: any) => string;

type NumericKey<T> = T extends `${infer N extends number}` ? N : never;

export type RecipeVariantProps<R extends RecipeFn> = {
  [K in keyof NonNullable<Parameters<R>[0]>]:
    NonNullable<Parameters<R>[0]>[K] | NumericKey<NonNullable<Parameters<R>[0]>[K]>;
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
