import type { GlobalStyleRule, keyframes, StyleRule } from '@vanilla-extract/css';

import { breakpoints } from './breakpoints.css';
import { tokens } from './tokens.css';

/**
 * A style object written the Stitches way: Faency utils (`px`, `bc`, `size`…), `$token` values,
 * nested `&` selectors and `@bp1`-style breakpoints.
 */
export interface FaencyStyle {
  [property: string]: string | number | FaencyStyle | null | undefined;
}

type Declarations = Record<string, string | number | Record<string, string>>;
type Keyframes = Parameters<typeof keyframes>[0];

type Scale = Exclude<keyof typeof tokens, 'colors'> | 'colors';

const shorthands: Record<string, string[]> = {
  p: ['padding'],
  pt: ['paddingTop'],
  pr: ['paddingRight'],
  pb: ['paddingBottom'],
  pl: ['paddingLeft'],
  px: ['paddingLeft', 'paddingRight'],
  py: ['paddingTop', 'paddingBottom'],
  m: ['margin'],
  mt: ['marginTop'],
  mr: ['marginRight'],
  mb: ['marginBottom'],
  ml: ['marginLeft'],
  mx: ['marginLeft', 'marginRight'],
  my: ['marginTop', 'marginBottom'],
  ta: ['textAlign'],
  fd: ['flexDirection'],
  fw: ['flexWrap'],
  ai: ['alignItems'],
  ac: ['alignContent'],
  jc: ['justifyContent'],
  as: ['alignSelf'],
  fg: ['flexGrow'],
  fs: ['flexShrink'],
  fb: ['flexBasis'],
  bc: ['backgroundColor'],
  br: ['borderRadius'],
  btrr: ['borderTopRightRadius'],
  bbrr: ['borderBottomRightRadius'],
  bblr: ['borderBottomLeftRadius'],
  btlr: ['borderTopLeftRadius'],
  bs: ['boxShadow'],
  c: ['color'],
  lh: ['lineHeight'],
  ox: ['overflowX'],
  oy: ['overflowY'],
  pe: ['pointerEvents'],
  us: ['WebkitUserSelect', 'userSelect'],
  userSelect: ['WebkitUserSelect', 'userSelect'],
  size: ['width', 'height'],
  appearance: ['WebkitAppearance', 'appearance'],
  backgroundClip: ['WebkitBackgroundClip', 'backgroundClip'],
};

const scaleProperties: Record<Exclude<Scale, 'colors'>, string[]> = {
  space: [
    'gap',
    'rowGap',
    'columnGap',
    'gridGap',
    'gridRowGap',
    'gridColumnGap',
    'inset',
    'insetBlock',
    'insetBlockStart',
    'insetBlockEnd',
    'insetInline',
    'insetInlineStart',
    'insetInlineEnd',
    'top',
    'right',
    'bottom',
    'left',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'marginBlock',
    'marginBlockStart',
    'marginBlockEnd',
    'marginInline',
    'marginInlineStart',
    'marginInlineEnd',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'paddingBlock',
    'paddingBlockStart',
    'paddingBlockEnd',
    'paddingInline',
    'paddingInlineStart',
    'paddingInlineEnd',
    ...['scrollMargin', 'scrollPadding'].flatMap((name) => [
      name,
      ...['Top', 'Right', 'Bottom', 'Left', 'X', 'Y'].map((side) => `${name}${side}`),
      ...['Block', 'Inline'].flatMap((axis) => [
        `${name}${axis}`,
        `${name}${axis}Start`,
        `${name}${axis}End`,
      ]),
    ]),
  ],
  sizes: [
    'width',
    'height',
    'minWidth',
    'maxWidth',
    'minHeight',
    'maxHeight',
    'blockSize',
    'minBlockSize',
    'maxBlockSize',
    'inlineSize',
    'minInlineSize',
    'maxInlineSize',
    'flexBasis',
    'gridTemplateColumns',
    'gridTemplateRows',
  ],
  fonts: ['fontFamily'],
  fontSizes: ['fontSize'],
  fontWeights: ['fontWeight'],
  radii: [
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
    'borderStartStartRadius',
    'borderStartEndRadius',
    'borderEndStartRadius',
    'borderEndEndRadius',
  ],
  zIndices: ['zIndex'],
};

const propertyScale: Record<string, Scale> = Object.fromEntries(
  Object.entries(scaleProperties).flatMap(([scale, properties]) =>
    properties.map((property) => [property, scale as Scale]),
  ),
);

const lookup = (scale: Scale, name: string): string | undefined => {
  const values = tokens[scale] as Record<string, unknown>;
  const direct = values[name];
  if (typeof direct === 'string') return direct;
  if (scale !== 'colors') return undefined;

  // `orange11` → colors.orange[11], `orangeA8` → colors.orange.A8, `whiteA3` → colors.whiteA[3]
  const match = /^(.+?)(A?)(\d+)$/.exec(name);
  if (!match) return undefined;
  const [, base, alpha, step] = match;
  const candidates: [string, string][] = [
    [base + alpha, step],
    [base, alpha + step],
  ];
  for (const [colorName, colorStep] of candidates) {
    const colorScale = values[colorName];
    if (colorScale && typeof colorScale === 'object') {
      const value = (colorScale as Record<string, unknown>)[colorStep];
      if (typeof value === 'string') return value;
    }
  }
  return undefined;
};

const TOKEN = /(-?)\$(?:([a-zA-Z]+)\$)?([a-zA-Z0-9]+)/g;

/**
 * Replaces `$token` (or `$scale$token`) references with their CSS variable. The scale comes from the
 * property (or util, such as `px`), then colors; an explicit scale is the only one searched. Unknown
 * tokens are left as written.
 */
export const resolveTokens = (property: string, value: string): string =>
  value.replace(TOKEN, (match, negative: string, explicitScale: string | undefined, name) => {
    const cssProperty = shorthands[property]?.[0] ?? property;
    const resolved = explicitScale
      ? Object.prototype.hasOwnProperty.call(tokens, explicitScale)
        ? lookup(explicitScale as Scale, name)
        : undefined
      : ((propertyScale[cssProperty] && lookup(propertyScale[cssProperty], name)) ??
        lookup('colors', name));
    if (!resolved) return match;
    return negative ? `calc(${resolved} * -1)` : resolved;
  });

const expandDeclaration = (property: string, value: string | number): Declarations => {
  const properties = shorthands[property] ?? [property];
  const resolved = typeof value === 'string' ? resolveTokens(property, value) : value;
  return Object.fromEntries(properties.map((name) => [name, resolved]));
};

// A key set again moves to the end, so `{ pl: '$3', padding: 0 }` keeps `padding` last and it wins.
const mergeDeclarations = (into: Record<string, any>, declarations: Declarations) => {
  const { vars, ...rest } = declarations;
  Object.entries(rest).forEach(([property, value]) => {
    delete into[property];
    into[property] = value;
  });
  if (vars && Object.keys(vars).length > 0) {
    into.vars = { ...into.vars, ...(vars as Record<string, string>) };
  }
};

const QUOTED = /(["'])(?:\\.|(?!\1).)*\1/g;

const isTokenName = (name: string) =>
  (Object.keys(tokens) as Scale[]).some((scale) => lookup(scale, name) !== undefined);

const toVars = (vars: FaencyStyle): Record<string, string> =>
  Object.fromEntries(
    Object.entries(vars).flatMap(([name, value]) => {
      if (value == null || typeof value === 'object') return [];
      const resolved = resolveTokens('', String(value));
      const unresolved = Array.from(resolved.replace(QUOTED, '').matchAll(TOKEN)).find(
        ([, , explicitScale, tokenName]) => !explicitScale && isTokenName(tokenName),
      );
      if (unresolved) {
        throw new Error(
          `Faency: "${unresolved[0]}" in vars "${name}" is ambiguous. Name the scale, such as "$space$2".`,
        );
      }
      return [[name, resolved]];
    }),
  );

const addDeclarations = (
  declarations: Declarations,
  property: string,
  value: string | number | FaencyStyle,
) => {
  if (property === 'vars' && typeof value === 'object') {
    mergeDeclarations(declarations, { vars: toVars(value) });
    return;
  }
  mergeDeclarations(declarations, expandDeclaration(property, value as string | number));
};

const toMediaQuery = (key: string): string | undefined => {
  if (key.startsWith('@media')) return key.slice('@media'.length).trim();
  const name = key.slice(1);
  return name in breakpoints ? breakpoints[name as keyof typeof breakpoints] : undefined;
};

const splitList = (selector: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of selector) {
    if (char === '(' || char === '[') depth += 1;
    if (char === ')' || char === ']') depth -= 1;
    if (char === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current.trim());
  return parts;
};

const nestSelector = (parent: string, child: string): string =>
  splitList(parent)
    .flatMap((parentPart) =>
      splitList(child).map((childPart) => {
        const selector = childPart.startsWith(':') ? `&${childPart}` : childPart;
        return selector.includes('&')
          ? selector.replace(/&/g, parentPart)
          : `${parentPart} ${selector}`;
      }),
    )
    .join(', ');

interface Block {
  selector: string;
  media: string[];
  declarations: Declarations;
}

const flatten = (input: FaencyStyle, selector: string, media: string[], blocks: Block[]) => {
  const own: Block = { selector, media, declarations: {} };
  blocks.push(own);

  Object.entries(input).forEach(([key, value]) => {
    if (value == null) return;

    if (typeof value === 'object' && key !== 'vars') {
      if (key.startsWith('@')) {
        const query = toMediaQuery(key);
        if (!query) {
          throw new Error(`Faency: unsupported at-rule "${key}". Use "@media …" or a breakpoint.`);
        }
        flatten(value, selector, [...media, query], blocks);
      } else {
        flatten(value, nestSelector(selector, key), media, blocks);
      }
      return;
    }

    addDeclarations(own.declarations, key, value);
  });
};

const toBlocks = (input: FaencyStyle, root: string): Block[] => {
  const blocks: Block[] = [];
  flatten(input, root, [], blocks);
  return blocks.filter((block) => Object.keys(block.declarations).length > 0);
};

type QueryTarget = Record<string, any> & { '@media'?: Record<string, Record<string, any>> };

const target = (rule: QueryTarget, media: string[]): Record<string, any> => {
  if (media.length === 0) return rule;
  const queries = media.map(splitList);
  if (queries.length > 1 && queries.flat().some((query) => /^not\s/i.test(query))) {
    throw new Error(
      `Faency: cannot nest the negated media query in "${media.join('" and "')}". Write the combined query in one "@media" key.`,
    );
  }
  const query = queries
    .reduce((combined, queries) =>
      combined.flatMap((left) => queries.map((right) => `${left} and ${right}`)),
    )
    .join(', ');
  rule['@media'] ??= {};
  rule['@media'][query] ??= {};
  return rule['@media'][query];
};

/**
 * Converts a Stitches-style object to a vanilla-extract `StyleRule`, for `style()` and `recipe()`.
 *
 * As in vanilla-extract, a breakpoint overrides the plain declarations of the same selector, whatever
 * order they are written in.
 *
 * Nested selectors must target the styled element itself (`&:hover`, `.parent &`), as vanilla-extract
 * requires; style children with `globalStyle(`${className} > div`, …)` instead.
 */
export const styleRule = (input: FaencyStyle): StyleRule => {
  const rule: QueryTarget = {};

  toBlocks(input, '&').forEach(({ selector, media, declarations }) => {
    if (selector === '&') {
      mergeDeclarations(target(rule, media), declarations);
      return;
    }
    rule.selectors ??= {};
    rule.selectors[selector] ??= {};
    mergeDeclarations(target(rule.selectors[selector], media), declarations);
  });

  return rule as StyleRule;
};

/**
 * Converts a Stitches `globalCss()` object to `[selector, rule]` pairs for vanilla-extract `globalStyle()`,
 * in source order so the cascade is unchanged:
 *
 * ```ts
 * globalStyleRules({ body: { bc: '$contentBg' } }).forEach(([selector, rule]) => globalStyle(selector, rule));
 * ```
 */
export const globalStyleRules = (
  input: Record<string, FaencyStyle | null | undefined>,
): [selector: string, rule: GlobalStyleRule][] => {
  const rules: [string, QueryTarget][] = [];

  Object.entries(input).forEach(([selector, style]) => {
    if (style == null) return;
    if (selector.startsWith('@')) {
      throw new Error(
        `Faency: "${selector}" is not supported at the top level of globalStyleRules(); nest it in a selector.`,
      );
    }
    toBlocks(style, splitList(selector).join(', ')).forEach((block) => {
      const previous = rules[rules.length - 1];
      const rule: QueryTarget = previous?.[0] === block.selector ? previous[1] : {};
      if (rule !== previous?.[1]) rules.push([block.selector, rule]);
      mergeDeclarations(target(rule, block.media), block.declarations);
    });
  });

  return rules as [string, GlobalStyleRule][];
};

/** Converts Stitches `keyframes()` frames for vanilla-extract `keyframes()`. */
export const keyframesRule = (frames: Record<string, FaencyStyle | null | undefined>): Keyframes =>
  Object.fromEntries(
    Object.entries(frames).flatMap(([time, style]) => {
      if (style == null) return [];
      const declarations: Declarations = {};
      Object.entries(style).forEach(([property, value]) => {
        if (value == null) return;
        if (typeof value === 'object' && property !== 'vars') {
          throw new Error(`Faency: keyframe "${time}" cannot nest "${property}".`);
        }
        addDeclarations(declarations, property, value);
      });
      return [[time, declarations]];
    }),
  ) as Keyframes;
