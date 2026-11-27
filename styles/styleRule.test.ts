import { defaultThemeMap } from '@stitches/react';

import { globalStyleRules, keyframesRule, resolveTokens, styleRule } from './styleRule';
import { tokens } from './tokens.css';

jest.mock('./tokens.css', () => ({
  tokens: {
    colors: {
      primary: 'var(--primary)',
      contentBg: 'var(--content-bg)',
      '00dp': 'var(--00dp)',
      orange: { '11': 'var(--orange-11)', A8: 'var(--orange-a8)' },
      deepBlue: { '11': 'var(--deep-blue-11)' },
      whiteA: { '3': 'var(--white-a3)' },
    },
    fonts: { rubik: 'var(--rubik)' },
    space: { '2': 'var(--space-2)', '3': 'var(--space-3)' },
    sizes: { '2': 'var(--size-2)', '6': 'var(--size-6)' },
    fontSizes: { '3': 'var(--font-size-3)' },
    fontWeights: { medium: 'var(--font-weight-medium)' },
    radii: { '3': 'var(--radii-3)', pill: 'var(--radii-pill)' },
    zIndices: { max: 'var(--z-max)' },
  },
}));

jest.mock('./breakpoints.css', () => ({
  breakpoints: { bp1: '(min-width: 520px)', hover: '(any-hover: hover)' },
}));

describe('resolveTokens', () => {
  it('should resolve tokens from the property scale', () => {
    expect(resolveTokens('padding', '$2')).toBe('var(--space-2)');
    expect(resolveTokens('width', '$2')).toBe('var(--size-2)');
    expect(resolveTokens('fontSize', '$3')).toBe('var(--font-size-3)');
    expect(resolveTokens('fontWeight', '$medium')).toBe('var(--font-weight-medium)');
    expect(resolveTokens('fontFamily', '$rubik')).toBe('var(--rubik)');
    expect(resolveTokens('borderRadius', '$pill')).toBe('var(--radii-pill)');
    expect(resolveTokens('zIndex', '$max')).toBe('var(--z-max)');
  });

  it('should resolve flat color names to the nested color scales', () => {
    expect(resolveTokens('color', '$primary')).toBe('var(--primary)');
    expect(resolveTokens('color', '$00dp')).toBe('var(--00dp)');
    expect(resolveTokens('color', '$orange11')).toBe('var(--orange-11)');
    expect(resolveTokens('color', '$orangeA8')).toBe('var(--orange-a8)');
    expect(resolveTokens('color', '$deepBlue11')).toBe('var(--deep-blue-11)');
    expect(resolveTokens('color', '$whiteA3')).toBe('var(--white-a3)');
  });

  it('should resolve tokens inside compound values', () => {
    expect(resolveTokens('border', '1px solid $orange11')).toBe('1px solid var(--orange-11)');
    expect(resolveTokens('padding', '$2 $3')).toBe('var(--space-2) var(--space-3)');
    expect(resolveTokens('width', 'calc($6 + 4px)')).toBe('calc(var(--size-6) + 4px)');
  });

  it('should negate tokens prefixed with a minus sign', () => {
    expect(resolveTokens('marginTop', '-$2')).toBe('calc(var(--space-2) * -1)');
  });

  it('should honor an explicit scale', () => {
    expect(resolveTokens('boxShadow', '0 0 0 1px $colors$primary')).toBe(
      '0 0 0 1px var(--primary)',
    );
  });

  it('should take the scale of a util', () => {
    expect(resolveTokens('px', '$2')).toBe('var(--space-2)');
    expect(resolveTokens('size', '$6')).toBe('var(--size-6)');
    expect(resolveTokens('br', '$pill')).toBe('var(--radii-pill)');
  });

  it('should only search an explicit scale', () => {
    expect(resolveTokens('color', '$space$primary')).toBe('$space$primary');
    expect(resolveTokens('color', '$unknown$primary')).toBe('$unknown$primary');
  });

  it('should map properties to the same scales as Stitches', () => {
    const sampleTokens: Record<string, string> = {
      colors: 'primary',
      fonts: 'rubik',
      space: '2',
      sizes: '2',
      fontSizes: '3',
      fontWeights: 'medium',
      radii: '3',
      zIndices: 'max',
    };
    Object.entries(defaultThemeMap)
      .filter(([, scale]) => scale in sampleTokens)
      .forEach(([property, scale]) => {
        const name = sampleTokens[scale];
        const expected = (tokens as unknown as Record<string, Record<string, string>>)[scale][name];
        expect([property, resolveTokens(property, `$${name}`)]).toEqual([property, expected]);
      });
  });

  it('should leave unknown tokens and plain values untouched', () => {
    expect(resolveTokens('color', '$unknown')).toBe('$unknown');
    expect(resolveTokens('padding', '$$local')).toBe('$$local');
    expect(resolveTokens('color', 'red')).toBe('red');
  });
});

describe('styleRule', () => {
  it('should expand Faency utils', () => {
    expect(
      styleRule({ px: '$2', mb: '$3', bc: '$primary', br: '$3', size: '$6', us: 'none' }),
    ).toEqual({
      paddingLeft: 'var(--space-2)',
      paddingRight: 'var(--space-2)',
      marginBottom: 'var(--space-3)',
      backgroundColor: 'var(--primary)',
      borderRadius: 'var(--radii-3)',
      width: 'var(--size-6)',
      height: 'var(--size-6)',
      WebkitUserSelect: 'none',
      userSelect: 'none',
    });
  });

  it('should keep numbers and plain CSS values', () => {
    expect(styleRule({ zIndex: 11, position: 'absolute', letterSpacing: '0.44px' })).toEqual({
      zIndex: 11,
      position: 'absolute',
      letterSpacing: '0.44px',
    });
  });

  it('should move nested selectors to `selectors`', () => {
    expect(
      styleRule({
        c: '$primary',
        '&:hover': { bc: '$contentBg', '&:focus-visible': { outline: 'none' } },
        ':active': { opacity: 0.5 },
        '.dark &': { c: '$orange11' },
      }),
    ).toEqual({
      color: 'var(--primary)',
      selectors: {
        '&:hover': { backgroundColor: 'var(--content-bg)' },
        '&:hover:focus-visible': { outline: 'none' },
        '&:active': { opacity: 0.5 },
        '.dark &': { color: 'var(--orange-11)' },
      },
    });
  });

  it('should turn breakpoints and media queries into `@media`', () => {
    expect(
      styleRule({
        p: '$2',
        '@bp1': { p: '$3', '@hover': { c: '$primary' } },
        '@media (min-width: 900px)': { display: 'none' },
        '&:hover': { '@bp1': { opacity: 1 } },
      }),
    ).toEqual({
      padding: 'var(--space-2)',
      '@media': {
        '(min-width: 520px)': { padding: 'var(--space-3)' },
        '(min-width: 520px) and (any-hover: hover)': { color: 'var(--primary)' },
        '(min-width: 900px)': { display: 'none' },
      },
      selectors: {
        '&:hover': { '@media': { '(min-width: 520px)': { opacity: 1 } } },
      },
    });
  });

  it('should scope each item of a nested selector list', () => {
    expect(
      styleRule({
        '&:hover, &:focus': { c: '$primary', ':active': { opacity: 0.5 } },
        ':disabled, [aria-disabled]': { opacity: 0.3 },
      }),
    ).toEqual({
      selectors: {
        '&:hover, &:focus': { color: 'var(--primary)' },
        '&:hover:active, &:focus:active': { opacity: 0.5 },
        '&:disabled, & [aria-disabled]': { opacity: 0.3 },
      },
    });
  });

  it('should keep `vars` as CSS variables, resolving tokens', () => {
    expect(
      styleRule({
        vars: { '--accent': '$orange11', '--gap': '4px' },
        '&:hover': { vars: { '--accent': '$primary' } },
      }),
    ).toEqual({
      vars: { '--accent': 'var(--orange-11)', '--gap': '4px' },
      selectors: { '&:hover': { vars: { '--accent': 'var(--primary)' } } },
    });
  });

  it('should reject tokens in `vars` that need a scale', () => {
    expect(() => styleRule({ vars: { '--gap': '$2' } })).toThrow(
      '"$2" in vars "--gap" is ambiguous',
    );
    expect(styleRule({ vars: { '--gap': '$space$2' } })).toEqual({
      vars: { '--gap': 'var(--space-2)' },
    });
  });

  it('should keep literal `$` text in `vars`', () => {
    expect(styleRule({ vars: { '--label': '"$2 off"', '--id': '$custom' } })).toEqual({
      vars: { '--label': '"$2 off"', '--id': '$custom' },
    });
  });

  it('should skip null values', () => {
    expect(styleRule({ c: '$primary', '&:hover': null, vars: { '--a': null }, p: null })).toEqual({
      color: 'var(--primary)',
    });
  });

  it('should let breakpoints override plain declarations, whatever the order', () => {
    const expected = {
      color: 'blue',
      '@media': { '(min-width: 520px)': { color: 'red' } },
    };
    expect(styleRule({ '@bp1': { color: 'red' }, color: 'blue' })).toEqual(expected);
    expect(styleRule({ '@bp1': { color: 'red' }, '&': { color: 'blue' } })).toEqual(expected);
  });

  it('should move a property set again to the end', () => {
    const rule = styleRule({ p: '$2', pl: '$3', padding: 0 });
    expect(rule).toEqual({ paddingLeft: 'var(--space-3)', padding: 0 });
    expect(Object.keys(rule)).toEqual(['paddingLeft', 'padding']);
  });

  it('should reject a nested negated media query', () => {
    expect(() => styleRule({ '@media not print': { '@bp1': { display: 'none' } } })).toThrow(
      'cannot nest the negated media query',
    );
    expect(styleRule({ '@media not print': { display: 'none' } })).toEqual({
      '@media': { 'not print': { display: 'none' } },
    });
  });

  it('should distribute nested media queries over comma lists', () => {
    expect(
      styleRule({ '@media (max-width: 400px), print': { '@bp1': { display: 'none' } } }),
    ).toEqual({
      '@media': {
        '(max-width: 400px) and (min-width: 520px), print and (min-width: 520px)': {
          display: 'none',
        },
      },
    });
  });

  it('should skip undefined values', () => {
    expect(styleRule({ color: undefined, p: '$2' })).toEqual({ padding: 'var(--space-2)' });
  });

  it('should reject unknown at-rules', () => {
    expect(() => styleRule({ '@bp9': { p: '$2' } })).toThrow('unsupported at-rule "@bp9"');
  });
});

describe('globalStyleRules', () => {
  it('should return the rules in source order, keeping selector lists', () => {
    expect(
      globalStyleRules({
        body: { bc: '$contentBg', fontFamily: '$rubik' },
        'html, body': { height: '100vh', '@bp1': { height: 'auto' } },
        a: { textDecoration: 'none', '&:hover': { c: '$primary' } },
      }),
    ).toEqual([
      ['body', { backgroundColor: 'var(--content-bg)', fontFamily: 'var(--rubik)' }],
      ['html, body', { height: '100vh', '@media': { '(min-width: 520px)': { height: 'auto' } } }],
      ['a', { textDecoration: 'none' }],
      ['a:hover', { color: 'var(--primary)' }],
    ]);
  });

  it('should keep the cascade when a selector comes back later', () => {
    expect(
      globalStyleRules({
        '.a': { color: 'red' },
        '.b': { color: 'blue' },
        '.a, .c': { color: 'green' },
      }),
    ).toEqual([
      ['.a', { color: 'red' }],
      ['.b', { color: 'blue' }],
      ['.a, .c', { color: 'green' }],
    ]);
  });

  it('should not split commas inside parentheses when nesting', () => {
    expect(globalStyleRules({ ':is(h1, h2), p': { '&:hover': { m: 0 } } })).toEqual([
      [':is(h1, h2):hover, p:hover', { margin: 0 }],
    ]);
  });

  it('should scope each item of a nested selector list', () => {
    expect(globalStyleRules({ '.list': { 'span, em': { c: 'red' } } })).toEqual([
      ['.list span, .list em', { color: 'red' }],
    ]);
  });

  it('should keep `vars`, merging the blocks of one selector', () => {
    expect(
      globalStyleRules({
        body: { vars: { '--a': '1' }, '@bp1': { vars: { '--b': '$primary' } } },
      }),
    ).toEqual([
      [
        'body',
        {
          vars: { '--a': '1' },
          '@media': { '(min-width: 520px)': { vars: { '--b': 'var(--primary)' } } },
        },
      ],
    ]);
  });

  it('should skip null selectors', () => {
    expect(globalStyleRules({ body: null, a: undefined, p: { m: 0 } })).toEqual([
      ['p', { margin: 0 }],
    ]);
  });

  it('should let breakpoints override plain declarations, whatever the order', () => {
    expect(
      globalStyleRules({ body: { '@bp1': { color: 'red' }, '&': { color: 'blue' } } }),
    ).toEqual([['body', { color: 'blue', '@media': { '(min-width: 520px)': { color: 'red' } } }]]);
  });

  it('should nest descendant selectors', () => {
    expect(globalStyleRules({ '.list': { '& > li': { mb: '$2' }, span: { c: 'red' } } })).toEqual([
      ['.list > li', { marginBottom: 'var(--space-2)' }],
      ['.list span', { color: 'red' }],
    ]);
  });

  it('should reject top-level at-rules', () => {
    expect(() => globalStyleRules({ '@bp1': { body: { p: '$2' } } })).toThrow(
      'not supported at the top level',
    );
  });
});

describe('keyframesRule', () => {
  it('should expand utils and tokens in each frame', () => {
    expect(
      keyframesRule({ '0%': { mt: '$2', c: '$primary' }, '100%': { mt: '-$2', opacity: 0 } }),
    ).toEqual({
      '0%': { marginTop: 'var(--space-2)', color: 'var(--primary)' },
      '100%': { marginTop: 'calc(var(--space-2) * -1)', opacity: 0 },
    });
  });

  it('should skip undefined and null values', () => {
    expect(keyframesRule({ from: { opacity: undefined, color: null, mt: '$2' } })).toEqual({
      from: { marginTop: 'var(--space-2)' },
    });
  });

  it('should skip null frames', () => {
    expect(keyframesRule({ from: null, to: { opacity: 1 } })).toEqual({ to: { opacity: 1 } });
  });

  it('should reject nested rules', () => {
    expect(() => keyframesRule({ from: { '&:hover': { c: 'red' } } })).toThrow('cannot nest');
  });
});
