# Vanilla Extract Developer Migration Guide

This guide explains how the new Vanilla Extract styling system works and provides step-by-step instructions for migrating components from Stitches to Vanilla Extract.

## Table of Contents

**Getting Started:**

- [Understanding the New System](#understanding-the-new-system)
- [Key Differences from Stitches](#key-differences-from-stitches)
- [Migration Process](#migration-process) - Step-by-step component migration
- [Export and Build Strategy](#export-and-build-strategy) - How to export migrated components
- [Migrating Component-Specific Theme Tokens](#migrating-component-specific-theme-tokens)

**Reference:**

- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)
- [Migration Checklist](#migration-checklist)
- [Best Practices](#best-practices)
- [Future Migration Phases](#reference-future-migration-phases)

---

## Understanding the New System

### Architecture Overview

The Vanilla Extract system consists of several key parts:

```text
styles/
├── tokens.css.ts          # Theme contract (design token definitions)
├── themes.css.ts          # Light/dark theme implementations (one class per theme × primary color)
├── themeContext.tsx       # VanillaExtractThemeProvider and useVanillaExtractTheme
├── cssProps.ts            # CSS prop processor (Stitches-like API)
├── useInlineStyle.ts      # Hook that turns `css` + `style` into the inline style object
├── cx.ts                  # Class name joiner
├── resolveColor.ts        # Resolves `$token` color strings to vanilla tokens
├── breakpoints.css.ts     # Media queries matching the Stitches breakpoints
├── polymorphic.ts         # Reusable polymorphic component types
├── createPolymorphicPart.tsx # Factory for Radix parts that take `as`
├── types.ts               # Shared prop types (spacing, size tokens, …)
├── textVariants.css.ts    # Shared text variant definitions (DRY)
├── utils.css.ts           # Utility recipes
└── index.ts               # Barrel for the files above
```

### How It Works

1. **Theme Contract** ([`styles/tokens.css.ts`](styles/tokens.css.ts)): Defines the shape of design tokens (colors, spacing, fonts, etc.)
2. **Theme Implementations** ([`styles/themes.css.ts`](styles/themes.css.ts)): Provides actual values for light and dark themes
3. **Theme Provider** ([`styles/themeContext.tsx`](styles/themeContext.tsx)): React context that manages theme state and applies theme classes
4. **CSS Props** ([`styles/cssProps.ts`](styles/cssProps.ts)): Provides Stitches-compatible API for backward compatibility
5. **Polymorphic Types** ([`styles/polymorphic.ts`](styles/polymorphic.ts)): Reusable TypeScript utilities for components with `as` prop
6. **Build-Time Processing**: Vanilla Extract generates static CSS at build time (no runtime CSS-in-JS)

### Theming System

The theme system is integrated with Storybook at the global level in [`.storybook/preview.jsx`](.storybook/preview.jsx), which wraps every story in both providers (simplified):

```jsx
<VanillaExtractThemeProvider forcedTheme={isDark ? 'dark' : 'light'} primaryColor="blue">
  <FaencyProvider>{/* All stories render here */}</FaencyProvider>
</VanillaExtractThemeProvider>
```

**Key Points:**

- `VanillaExtractThemeProvider` applies the theme class for the resolved theme and primary color to `document.body`
- Props: `defaultTheme` (`'light' | 'dark' | 'system'`, default `'system'`), `forcedTheme`, `primaryColor` (default `'blue'`)
- Every vanilla component needs it: `useInlineStyle` calls `useVanillaExtractTheme()`, which throws outside the provider
- It also mounts the Radix Tooltip provider, so vanilla tooltips work without `FaencyProvider`; tests only need `VanillaExtractThemeProvider`
- `FaencyProvider` is still needed alongside it for the color scheme context used by Stitches components
- Storybook's dark mode toggle controls the theme globally; individual stories don't need their own providers

---

## Key Differences from Stitches

### Runtime vs Build-Time

| Stitches                  | Vanilla Extract                    |
| ------------------------- | ---------------------------------- |
| Runtime CSS generation    | Build-time CSS generation          |
| CSS injected at runtime   | Static CSS files                   |
| Dynamic theming via JS    | CSS variables for theming          |
| Larger bundle, faster dev | Smaller bundle, better performance |

### Styling API

**Stitches Example:**

See any Stitches component (e.g., [`components/Box/Box.tsx`](components/Box/Box.tsx))

**Vanilla Extract Example:**

See [`components/Box/Box.vanilla.css.ts`](components/Box/Box.vanilla.css.ts) for how styles and recipes are defined.

### CSS Prop Support

**⚠️ REQUIRED: All Vanilla Extract components MUST support the `css` prop.**

This is a core feature that maintains backward compatibility with Stitches components and provides a consistent API across the library. The `css` prop allows users to apply custom styles using design tokens and shorthand syntax.

**Implementation Reference:**

See any vanilla-extract component for the complete implementation pattern:

- [`components/Button/Button.vanilla.tsx`](components/Button/Button.vanilla.tsx) - Shows full CSS prop implementation
- [`components/Text/Text.vanilla.tsx`](components/Text/Text.vanilla.tsx) - Another complete example

**Required imports:**

```tsx
import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { useInlineStyle } from '@/styles/useInlineStyle';

// In the component, after destructuring `className`, `css` and `style`:
const mergedStyles = useInlineStyle(css, style);

return <Component className={cx(recipeClass, className)} style={mergedStyles} {...props} />;
```

`cx` joins class names and skips empty ones. Use it rather than template strings or `.join(' ')`.

`useInlineStyle` resolves the `css` prop's tokens, merges `style` over it and assigns the inline vars. Don't repeat that merge by hand with `processCSSProp` and `assignInlineVars`.

**Result - both APIs work identically:**

```tsx
// Stitches
<Box css={{ px: '$4', py: '$6', bc: '$deepBlue6' }} />

// Vanilla Extract (same API!)
<BoxVanilla css={{ px: '$4', py: '$6', bc: '$deepBlue6' }} />
```

**Why this is important:**

- Maintains API consistency across the library
- Allows gradual migration without breaking user code
- Provides familiar developer experience
- Supports design tokens (`$4`, `$blue6`, etc.)
- Enables responsive and conditional styling

---

## Migration Process

### New Components

New components are built in vanilla-extract only, with no Stitches version (e.g. Toast, Combobox, Meter, Spinner, SegmentedControl, SplitLayout). They follow the same file naming, `Vanilla` export suffix, test and token rules below, so every component gets renamed together when Stitches is removed. They skip the Comparison story, since there is nothing to compare against.

### Naming Conventions and File Structure

When migrating a component, follow these strict naming conventions to maintain consistency:

#### File Naming

- **Styles**: `ComponentName.vanilla.css.ts`
- **Component**: `ComponentName.vanilla.tsx`
- **Tests**: `ComponentName.vanilla.test.tsx`
- **Theme (if needed)**: `ComponentName.theme.ts` + `ComponentName.theme.css.ts`

#### Component Naming

The complete naming pattern (see [Text.vanilla.tsx](components/Text/Text.vanilla.tsx)):

- Internal type: `TextComponent` (for typing the implementation)
- Exported props type: `TextVanillaProps` (for consumers)
- Exported component: `TextVanilla` (the actual component)
- Display name: `'TextVanilla'` (matches exported name)

**Key Points:**

- Use `RecipeVariantProps<typeof recipe>` for variant types and `splitVariants(recipe, rest)` to pass them to the recipe (see [Variant props missing or not type-checked](#variant-props-missing-or-not-type-checked))
- Internal implementation uses `ComponentImpl` suffix
- Exported component name is `ComponentVanilla`
- Exported props type is `ComponentVanillaProps`
- `displayName` matches the exported component name

#### Exports in index.ts

Export pattern in the component's `index.ts`, to avoid naming conflicts:

```typescript
export * from './Text'; // Stitches version
export type { TextVanillaProps } from './Text.vanilla';
export { TextVanilla } from './Text.vanilla';
```

The root [index.ts](index.ts) uses explicit named exports (no `export *`), so each new component, part and props type must also be added there.

**Re-exported Radix parts.** Parts re-exported unwrapped (e.g. `export const PopoverVanilla = PopoverPrimitive.Root`) don't get a `…VanillaProps` alias; consumers can use `React.ComponentProps<typeof PopoverVanilla>`. Add a `…VanillaProps` type once the part is wrapped (e.g. gains `css`, `className` or extra behavior).

**Radix parts that render an element** (triggers, items, anchors) take the polymorphic `as` prop instead of exposing `asChild`; internally they pass `asChild` to the Radix primitive and render the `as` element inside it, so the Radix behavior lands on that element. Build them with [`createPolymorphicPart`](styles/createPolymorphicPart.tsx) instead of writing the `forwardRef` by hand; it also handles `css`/`style` and an optional base class:

```tsx
export const DropdownMenuItemVanilla = createPolymorphicPart<'div', DropdownMenuItemOwnProps>(
  DropdownMenuPrimitive.Item,
  { displayName: 'DropdownMenuItemVanilla', className: dropdownMenuItem },
);
```

See [Popover.vanilla.tsx](components/Popover/Popover.vanilla.tsx) and [DropdownMenu.vanilla.tsx](components/DropdownMenu/DropdownMenu.vanilla.tsx). Parts that don't take `as` omit `asChild` from their props.

#### Recipe Naming

Use camelCase + "Recipe" suffix in `.vanilla.css.ts` files:

```typescript
export const textRecipe = recipe({...});
export const badgeRecipe = recipe({...});
export const buttonRecipe = recipe({...});
```

### Step-by-Step Guide

#### 1. Create the Vanilla Extract Styles File

Create `ComponentName.vanilla.css.ts` alongside your component.

**Key patterns:**

- Import tokens from `../../styles/tokens.css`
- Use `style()` for base styles
- Use `recipe()` for variant-based styles
- Reference theme tokens for themeable values

**Examples:** [Box.vanilla.css.ts](components/Box/Box.vanilla.css.ts) (simple), [Button.vanilla.css.ts](components/Button/Button.vanilla.css.ts) (variants), [Badge.vanilla.css.ts](components/Badge/Badge.vanilla.css.ts) (recipes)

#### 2. Create the React Component

Create `ComponentName.vanilla.tsx` with these required steps:

1. Import `CSSProps` from `styles/cssProps`
2. Import `useInlineStyle` from `styles/useInlineStyle` and `cx` from `styles/cx`
3. Add `CSSProps` to component interface
4. Pass `useInlineStyle(css, style)` to the `style` prop
5. Pass `cx(recipeClass, className)` to the `className` prop
6. Set `displayName` to match component name

**Examples:** [Box.vanilla.tsx](components/Box/Box.vanilla.tsx) (simple), [Button.vanilla.tsx](components/Button/Button.vanilla.tsx) (variants), [Badge.vanilla.tsx](components/Badge/Badge.vanilla.tsx) (polymorphic), [Text.vanilla.tsx](components/Text/Text.vanilla.tsx) (theme tokens)

#### 3. Add Comparison Story

**Required:** Every migrated component that has a Stitches version MUST have a Comparison story showing both versions side-by-side. Use vanilla-extract layout components (BoxVanilla, FlexVanilla, H3Vanilla) to avoid mixing systems.

**Pattern:**

```tsx
import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import { ComponentNameVanilla } from './ComponentName.vanilla';

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap">
          <ComponentName variant="option1">Option 1</ComponentName>
          <ComponentName variant="option2">Option 2</ComponentName>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap">
          <ComponentNameVanilla variant="option1">Option 1</ComponentNameVanilla>
          <ComponentNameVanilla variant="option2">Option 2</ComponentNameVanilla>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);
```

**Example:** See [Text.stories.tsx](components/Text/Text.stories.tsx) for a complete implementation with all variants.

**Benefits:** Visual verification of parity, easy regression spotting, theme switching testing, variant documentation.

#### 4. Test Theme Switching

After adding the Comparison story:

1. Run Storybook: `yarn storybook`
2. Navigate to your component's Comparison story
3. Toggle between light and dark mode using Storybook's theme switcher
4. Verify both versions render identically in both themes
5. Check that colors, spacing, and all variants match exactly

**Common issues to check:**

- Initial theme flash (should be fixed with the theme initialization pattern)
- Missing theme tokens (check tokens.css.ts has all required tokens)
- Incorrect color references (check theme override pattern for runtime colors)

#### 5. Create Tests for Vanilla Extract Component

**REQUIRED:** Every migrated component MUST have a `.vanilla.test.tsx` file with comprehensive tests.

**Required test coverage:**

- ✅ Basic rendering and element type
- ✅ All variant props
- ✅ Custom className
- ✅ Style prop
- ✅ CSS prop (with token processing)
- ✅ Style + CSS prop merging
- ✅ Polymorphic rendering (if applicable)
- ✅ Ref forwarding
- ✅ HTML attribute pass-through
- ✅ Accessibility (axe violations with jest-axe)
- ✅ Light/dark theme switching

**Important notes:**

- Use `unmount()` in loops to prevent "multiple elements found" errors
- Always wrap components in `VanillaExtractThemeProvider`
- For Radix-based components, use the correct role (e.g., `role="radio"` for ButtonSwitch items)

**Examples:** [Input.vanilla.test.tsx](components/Input/Input.vanilla.test.tsx) (gold standard), [Button.vanilla.test.tsx](components/Button/Button.vanilla.test.tsx), [Badge.vanilla.test.tsx](components/Badge/Badge.vanilla.test.tsx)

#### 6. Export the Component

Update both the component's `index.ts` and main [index.ts](index.ts):

```tsx
export { Button } from './Button'; // Stitches (existing)
export { ButtonVanilla } from './Button.vanilla'; // Vanilla Extract (new)
```

See [Export and Build Strategy](#export-and-build-strategy) for more details.

#### 7. Clean Up (Next Major Release Only)

Not part of a component migration: the Stitches files stay until Stitches is removed in the next major release (see [Future Migration Phases](#reference-future-migration-phases)). At that point:

1. Remove old component files: `Button.tsx`
2. Remove Stitches theme files: `Button.themes.ts`
3. Rename files to remove `.vanilla` suffix:
   - `Button.vanilla.css.ts` → `Button.css.ts`
   - `Button.vanilla.tsx` → `Button.tsx`
4. Update imports throughout the codebase
5. Run full test suite: `yarn test`
6. Run build: `yarn build`

---

## Export and Build Strategy

**Current Phase: Side-by-Side Exports**

We export both versions with clear naming conventions:

- Original Stitches: `Box`, `Button`, `Text`
- Vanilla Extract: `BoxVanilla`, `ButtonVanilla`, `TextVanilla`

**Benefits:** Zero breaking changes, gradual opt-in, easy comparison, feature parity verification.

**Trade-off:** Larger bundle size during the transition, since both systems ship.

### Exporting a Migrated Component

1. **Update component's index.ts:**

   ```typescript
   export { Button } from './Button'; // Stitches (keep)
   export { ButtonVanilla } from './Button.vanilla'; // Vanilla Extract (add)
   ```

2. **Update main [index.ts](index.ts)** to export both versions

3. **Add Comparison story** (see [Step 3](#3-add-comparison-story))

4. **Use a `feat:` commit** (e.g. `feat: vanilla popover`). There is no CHANGELOG.md: semantic-release builds the release notes and picks the version from conventional commits on `master`, so a new `*Vanilla` export ships as a minor release.

---

## Migrating Component-Specific Theme Tokens

**⚠️ IMPORTANT:** Preserve the exact same token names from the Stitches version to avoid breaking changes.

### Approach

Component theme tokens are co-located with the component and merged into the global theme system. Every component uses two files, to avoid circular dependencies:

- `ComponentName.theme.ts` (plain TypeScript, the source of truth) - see [Text.theme.ts](components/Text/Text.theme.ts)
- `ComponentName.theme.css.ts` (re-export wrapper imported by `themes.css.ts`) - see [Text.theme.css.ts](components/Text/Text.theme.css.ts)

Keeping the values in a plain `.ts` file also lets [colors/index.ts](colors/index.ts) import them for Stitches without pulling in vanilla-extract (e.g. Badge, Card, Input, Panel, Textarea).

Values that depend on other runtime colors (e.g. `textInvalid` using the red scale) are set directly in [styles/themes.css.ts](styles/themes.css.ts) instead.

### Steps

1. **Create the component theme files** (see examples above)

2. **Add to [styles/tokens.css.ts](styles/tokens.css.ts)** in the `colors` object (not nested)

3. **Merge into [styles/themes.css.ts](styles/themes.css.ts):**

   ```typescript
   import { badgeLightTheme, badgeDarkTheme } from '@/components/Badge/Badge.theme.css';

   const lightSemanticColors = {
     // ... other colors ...
     ...badgeLightTheme, // Merge component theme
   };
   ```

4. **Use in component styles:** Reference tokens from `tokens.colors` in your `.vanilla.css.ts` file

Keep the Stitches `ComponentName.themes.ts` file: the Stitches component still uses it until Stitches is removed.

---

## Common Patterns

### Using Design Tokens

Always use tokens from [styles/tokens.css.ts](styles/tokens.css.ts) for themeable values:

```tsx
// ✅ Good - uses theme tokens
backgroundColor: tokens.colors.background,

// ❌ Bad - hardcoded values won't adapt to theme
backgroundColor: '#ffffff',
```

### Polymorphic Components with `as` Prop

**⚠️ IMPORTANT:** All vanilla-extract components should support the polymorphic `as` prop unless they have specific element requirements (like form components such as Input, TextField, Textarea).

The `as` prop replaces the old Stitches `asChild` pattern and provides better TypeScript inference and a more ergonomic API.

**When to support `as` prop:**

- **Default:** All components should support it
- **Exceptions:** Components with fixed element requirements for functionality or accessibility (Input, TextField, Textarea)

**Reference Implementation:**

See [`components/Badge/Badge.vanilla.tsx`](components/Badge/Badge.vanilla.tsx) for the complete polymorphic pattern.

**Migration steps:**

1. Remove `@radix-ui/react-slot` dependency
2. Import polymorphic types from [styles/polymorphic.ts](styles/polymorphic.ts)
3. Replace `asChild?: boolean` with `as` prop using generic type parameter
4. Use `PolymorphicComponentProps<C, YourOwnProps>` for props type
5. Cast implementation to `PolymorphicComponent` type

**Example - Before (Stitches):**

```tsx
<Badge asChild variant="success">
  <a href="/profile">Link Badge</a>
</Badge>
```

**Example - After (Vanilla Extract):**

```tsx
<Badge as="a" href="/profile" variant="success">
  Link Badge
</Badge>
```

### Accessing Theme in Components

```tsx
import { useVanillaExtractTheme } from '@/styles/themeContext';

const { colors, resolvedTheme } = useVanillaExtractTheme();
```

### Using Shared Text Variants (DRY Pattern)

For Text-based components needing identical variant behavior, import from [styles/textVariants.css.ts](styles/textVariants.css.ts).

**Benefits:** Single source of truth, ~70% code reduction, consistency.

**Examples:** [Text.vanilla.css.ts](components/Text/Text.vanilla.css.ts), [Label.vanilla.css.ts](components/Label/Label.vanilla.css.ts), [Blockquote.vanilla.css.ts](components/Blockquote/Blockquote.vanilla.css.ts)

**Don't use** if component needs custom variant behavior.

---

## Troubleshooting

### Theme Not Applied

Use theme tokens from [styles/tokens.css.ts](styles/tokens.css.ts) instead of hardcoded values.

### CSS Prop Not Working

Follow the pattern in vanilla components (see [Button.vanilla.tsx](components/Button/Button.vanilla.tsx)):

1. Add `CSSProps` to component interface
2. Destructure both `css` AND `style` props
3. Pass `useInlineStyle(css, style)` to the element's `style` prop

### TypeScript Errors

#### Variant props missing or not type-checked

Type variant props with `RecipeVariantProps` from [styles/recipeVariants.ts](styles/recipeVariants.ts), not `RecipeVariants` from `@vanilla-extract/recipes`:

```tsx
// ❌ Bad - includes undefined; `Omit<…, never>` or `extends` then silently drops every variant prop
type MyComponentVariants = RecipeVariants<typeof myComponentRecipe>;
interface MyComponentOwnProps extends Omit<MyComponentVariants, never>, CSSProps {}

// ✅ Good - numeric keys ('1', '2', ...) also accept numbers, e.g. size={2}
type MyComponentVariants = RecipeVariantProps<typeof myComponentRecipe>;
interface MyComponentOwnProps extends MyComponentVariants, CSSProps {}
```

Take the variant props out with `splitVariants` instead of listing them by hand. It reads the variant names from the recipe, so a variant added later reaches the class and never lands on the DOM. It also turns numbers into their string keys, since recipes match compound variants with `===` and `2` would not match `'2'`:

```tsx
({ as, className, css, style, ...rest }: MyComponentVanillaProps<C>, ref) => {
  const [variants, props] = splitVariants(myComponentRecipe, rest);
  const recipeClass = myComponentRecipe(variants);
```

When you call a recipe with hand-picked or defaulted values instead, pass the string key (`size: '2'`). Passing a number there is a type error, which `yarn typecheck` reports.

A broken variant type silently drops the variant props instead of failing. Add a valid line and an invalid `@ts-expect-error` line (e.g. `variant="nope"`) for each new component to [styles/componentVariantProps.test.tsx](styles/componentVariantProps.test.tsx), which `yarn typecheck` checks in CI.

#### Invalid selector error for child elements

**Problem:** `Invalid selector: &:not(:empty) > *` - Vanilla-extract only allows `&` with pseudo-classes/elements in `style()`.

**Solution:** Use `globalStyle()` for child selectors:

```tsx
// ❌ Bad - causes error
const skeleton = style({
  selectors: { '&:not(:empty) > *': { visibility: 'hidden' } },
});

// ✅ Good - use globalStyle
const skeleton = style({
  selectors: { '&:not(:empty)': { maxWidth: 'fit-content' } },
});

globalStyle(`${skeleton}:not(:empty) > *`, { visibility: 'hidden' });
```

**Rule:** Use `globalStyle()` for: `& > div`, `& h1`, `& + &` (children/siblings). Use `style()` for: `&:hover`, `&::before` (self-targeting).

#### Mixing Stitches and vanilla-extract components

**CRITICAL:** Never mix systems. Always use vanilla-extract versions inside vanilla components (see [TextField.vanilla.tsx](components/TextField/TextField.vanilla.tsx), which builds on `FieldVanilla` and `InputVanilla`). When no vanilla version exists yet, use plain HTML elements.

#### Props typed as `CSSProps` require `as any` in tests

**Root cause:** Should be `CSSProps['css']` not `CSSProps`. See [Textarea.vanilla.tsx](components/Textarea/Textarea.vanilla.tsx) for correct typing.

**Note:** `CSSProps` accepts both abbreviated (`p`, `m`) and full names (`padding`, `margin`).

#### `act()` warning with async event handlers

`Warning: The current testing environment is not configured to support act(...)` fires in React 18 when `setState` is called after an `await` inside an event handler and that microtask resolves _outside_ an active `act()`.

**Why it's tricky:** RTL's `act` sets `IS_REACT_ACT_ENVIRONMENT = true` for its duration, then **restores** the previous value (usually `undefined`). If an async handler like `await clipboard.writeText()` → `setState()` resolves after the act exits, `IS_REACT_ACT_ENVIRONMENT` is already `false` and React warns.

**Also:** `yarn test:ci` runs with `--silent` which hides `console.error` — always use `yarn test` to see real warnings.

**For regular click-then-assert tests** — use `waitFor` after the click. RTL's `waitFor` unsets `IS_REACT_ACT_ENVIRONMENT` during polling, which suppresses the warning:

```ts
await userEvent.click(button);
await waitFor(() => expect(button).toHaveTextContent('Copied!'));
```

**For fake-timer tests** (e.g. testing a timed state revert) — use `fireEvent.click` (synchronous) instead of `userEvent.click`, then drain the microtask queue with `await Promise.resolve()` inside `act`. Because `fireEvent` is synchronous, the clipboard Promise hasn't run yet when we hit the `await`, so it resolves _inside_ the act while `IS_REACT_ACT_ENVIRONMENT` is still `true`:

```ts
jest.useFakeTimers({ legacyFakeTimers: true }); // modern timers also fake queueMicrotask, which React 18 needs

await act(async () => {
  fireEvent.click(button);
  await Promise.resolve(); // drains clipboard Promise microtask inside act
});
expect(button).toHaveTextContent('Copied!');

act(() => jest.advanceTimersByTime(1500));
expect(button).toHaveTextContent('Copy');
```

Always add `afterEach(() => jest.useRealTimers())` so fake timers don't leak — `axe` uses `setTimeout` internally and will hang if timers are still faked from a previous test.

**What does NOT work:**

- Setting `global.IS_REACT_ACT_ENVIRONMENT = true` in `jest.setup.js` — RTL restores the flag after each act regardless
- `await act(async () => { await userEvent.click(button); await Promise.resolve() })` — `userEvent`'s internal async steps already process microtasks between events, so the Promise fires during the click, outside the window where the extra `Promise.resolve()` can help

### Build or Storybook Issues

- **Build errors**: Check [vite.config.ts](vite.config.ts) has `vanillaExtractPlugin()`
- **Theme not switching**: Verify [.storybook/preview.jsx](.storybook/preview.jsx) has `VanillaExtractThemeProvider`
- **Color mismatch**: Compare tokens, check Comparison story

---

## Migration Checklist

Use this checklist for each component migration:

### 1. Code Implementation

- [ ] Create `ComponentName.vanilla.css.ts` with styles and recipes (see [`Button.vanilla.css.ts`](components/Button/Button.vanilla.css.ts))
- [ ] Create `ComponentName.vanilla.tsx` with React component (see [`Button.vanilla.tsx`](components/Button/Button.vanilla.tsx))
- [ ] **REQUIRED:** Import and add `CSSProps` to component interface
- [ ] **REQUIRED:** Merge `css` and `style` with `useInlineStyle(css, style)` and pass the result to the `style` prop
- [ ] **REQUIRED:** Combine the recipe class with the user's `className` using `cx(recipeClass, className)`
- [ ] Apply recipes with variants correctly
- [ ] Extract `css` and `style` props in the component destructuring

### 2. Exports

(See [Export Strategy](#export-and-build-strategy))

- [ ] Update component's `index.ts` to export both versions (see [`components/Button/index.ts`](components/Button/index.ts))
- [ ] Update main [`index.ts`](index.ts) to export both versions (and every props type)
- [ ] Use a `feat:` conventional commit (release notes are generated by semantic-release)

### 3. Testing & Verification

- [ ] Add comparison stories in Storybook when a Stitches version exists (see [`Text.stories.tsx`](components/Text/Text.stories.tsx))
- [ ] Test all variants in Storybook
- [ ] Test light/dark theme switching
- [ ] Verify visual parity with original component
- [ ] **REQUIRED:** Create `ComponentName.vanilla.test.tsx` (see [`Input.vanilla.test.tsx`](components/Input/Input.vanilla.test.tsx))
- [ ] Test basic rendering and element types
- [ ] Test custom className support
- [ ] Test all variant props (size, weight, variant, etc.)
- [ ] Test custom styling (CSS prop and style prop)
- [ ] Test style merging behavior
- [ ] Test polymorphic rendering (if applicable)
- [ ] Test ref forwarding
- [ ] Test HTML attribute pass-through
- [ ] Test accessibility with jest-axe
- [ ] Test theme support (light/dark and different primary colors)
- [ ] Run tests: `yarn test` (verify all tests pass)
- [ ] Run build: `yarn build`

### 4. Finalize

- [ ] Add any change a consumer will need when the vanilla version replaces the Stitches one to [BREAKING_CHANGES.md](BREAKING_CHANGES.md)

---

## Best Practices

- Migrate simple components first (Box, Text, Flex)
- Always add Comparison story to verify visual parity
- Use theme tokens, never hardcode themeable values
- Maintain API compatibility when possible
- Test both light and dark themes
- Migrate one component at a time

### Critical: Include All Base Styles in Recipes

**⚠️ IMPORTANT:** When recipes have variants, include ALL base styles (font sizes, dimensions, etc.) in the recipe's base array, not in separate style constants.

**Why:** Split styles with conditional recipe classes will miss base styles when variants are used.

**Rule:** Put ALL styling in recipe base if component has variants (see [Heading.vanilla.css.ts](components/Heading/Heading.vanilla.css.ts)).

---

## Reference: Future Migration Phases

**Note**: Not currently actionable. Continue with side-by-side exports.

- **Next major (v14.0.0 at the time of writing):** Remove Stitches files, remove the `.vanilla` file suffix and the `Vanilla` export suffix. See [BREAKING_CHANGES.md](BREAKING_CHANGES.md).
  - `Select` becomes the Radix-based `SelectVanilla`, whose API differs from the native one. See [Breaking Changes](./BREAKING_CHANGES.md#select-native-select--radix-select).

---

## Reference: Build Configuration

Build system already configured in [vite.config.ts](vite.config.ts) - no action needed.

**Key settings:** `preserveModules: true` (tree-shaking), processes `.tsx` and `.css.ts`, outputs ESM/CJS, static CSS at build time.

---

## Additional Resources

- [Vanilla Extract Documentation](https://vanilla-extract.style/)
- [Vanilla Extract Recipes](https://vanilla-extract.style/documentation/packages/recipes/)
- [Vanilla Extract Dynamic API](https://vanilla-extract.style/documentation/packages/dynamic/)
- [Migration Status](./VANILLA_EXTRACT_MIGRATION.md)
- [Breaking Changes](./BREAKING_CHANGES.md)
- [Project Guidelines](./CLAUDE.md)

---

## Questions or Issues?

If you encounter issues during migration:

1. Check this guide for common patterns and solutions
2. Review reference implementations linked throughout this guide
3. Consult the Vanilla Extract documentation
4. Ask the team for help in your PR

Happy migrating! 🚀
