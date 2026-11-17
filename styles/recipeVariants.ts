type NumericKey<T> = T extends `${infer N extends number}` ? N : never;

// Numeric-string variant keys ('1', '2', ...) also accept numbers, as Stitches variants did.
export type RecipeVariantProps<R extends (options?: any) => string> = {
  [K in keyof NonNullable<Parameters<R>[0]>]:
    NonNullable<Parameters<R>[0]>[K] | NumericKey<NonNullable<Parameters<R>[0]>[K]>;
};

// Recipes match compound variants with ===, so numbers must be passed as their string keys.
export const toVariantKey = <T>(value: T) =>
  (typeof value === 'number' ? String(value) : value) as
    Exclude<T, number> | `${Extract<T, number>}`;
