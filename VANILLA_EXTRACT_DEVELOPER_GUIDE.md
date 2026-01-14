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
├── themes.css.ts          # Light/dark theme implementations
├── themeContext.tsx       # React context for theme switching
├── cssProps.ts            # CSS prop processor (Stitches-like API)
├── polymorphic.ts         # Reusable polymorphic component types
├── textVariants.css.ts    # Shared text variant definitions (DRY)
└── utils.css.ts           # Utility functions and recipes
```

### How It Works

1. **Theme Contract** ([`styles/tokens.css.ts`](styles/tokens.css.ts)): Defines the shape of design tokens (colors, spacing, fonts, etc.)
2. **Theme Implementations** ([`styles/themes.css.ts`](styles/themes.css.ts)): Provides actual values for light and dark themes
3. **Theme Provider** ([`styles/themeContext.tsx`](styles/themeContext.tsx)): React context that manages theme state and applies theme classes
4. **CSS Props** ([`styles/cssProps.ts`](styles/cssProps.ts)): Provides Stitches-compatible API for backward compatibility
5. **Polymorphic Types** ([`styles/polymorphic.ts`](styles/polymorphic.ts)): Reusable TypeScript utilities for components with `as` prop
6. **Build-Time Processing**: Vanilla Extract generates static CSS at build time (no runtime CSS-in-JS)

### Theming System

The theme system is integrated with Storybook at the global level in [`.storybook/preview.jsx`](.storybook/preview.jsx):

```jsx
<VanillaExtractThemeProvider forcedTheme={isDark ? 'dark' : 'light'}>
  <FaencyProvider>{/* All stories render here */}</FaencyProvider>
</VanillaExtractThemeProvider>
```

**Key Points:**

- `VanillaExtractThemeProvider` automatically applies theme classes to `document.body`
- Storybook's dark mode toggle controls the theme globally
- Individual stories don't need to wrap components in theme providers
- The provider exposes theme colors via context: `useVanillaExtractTheme()`

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
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
```

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

- Use `NonNullable<RecipeVariants>` for variant types
- Internal implementation uses `ComponentImpl` suffix
- Exported component name is `ComponentVanilla`
- Exported props type is `ComponentVanillaProps`
- `displayName` matches the exported component name

#### Exports in index.ts

Export pattern to avoid naming conflicts:

```typescript
export * from './Text'; // Stitches version
export type { TextVanillaProps } from './Text.vanilla';
export { TextVanilla } from './Text.vanilla';
```

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

1. Import `CSSProps`, `processCSSProp` from `styles/cssProps`
2. Import `useVanillaExtractTheme` from `styles/themeContext`
3. Import `assignInlineVars` from `@vanilla-extract/dynamic`
4. Add `CSSProps` to component interface
5. Process `css` prop with `processCSSProp(css, colors)`
6. Merge styles with `assignInlineVars(vars)`
7. Set `displayName` to match component name

**Examples:** [Box.vanilla.tsx](components/Box/Box.vanilla.tsx) (simple), [Button.vanilla.tsx](components/Button/Button.vanilla.tsx) (variants), [Badge.vanilla.tsx](components/Badge/Badge.vanilla.tsx) (polymorphic), [Text.vanilla.tsx](components/Text/Text.vanilla.tsx) (theme tokens)

#### 3. Add Comparison Story

**Required:** Every migrated component MUST have a Comparison story showing both versions side-by-side. Use vanilla-extract layout components (BoxVanilla, FlexVanilla, H3Vanilla) to avoid mixing systems.

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

#### 7. Clean Up (After Full Migration)

After successful migration and verification:

1. Remove old component files: `Button.tsx`
2. Remove theme files: `Button.themes.ts` (no longer needed)
3. Rename files to remove `.vanilla` suffix:
   - `Button.vanilla.css.ts` → `Button.css.ts`
   - `Button.vanilla.tsx` → `Button.tsx`
4. Update imports throughout the codebase
5. Run full test suite: `yarn test`
6. Run build: `yarn build`

---

## Export and Build Strategy

**Current Phase: Side-by-Side Exports (Phase 1)**

We export both versions with clear naming conventions:

- Original Stitches: `Box`, `Button`, `Text`
- Vanilla Extract: `BoxVanilla`, `ButtonVanilla`, `TextVanilla`

**Benefits:** Zero breaking changes, gradual opt-in, easy comparison, feature parity verification.

**Trade-off:** Larger bundle size (~80KB) during transition.

### Exporting a Migrated Component

1. **Update component's index.ts:**

   ```typescript
   export { Button } from './Button'; // Stitches (keep)
   export { ButtonVanilla } from './Button.vanilla'; // Vanilla Extract (add)
   ```

2. **Update main [index.ts](index.ts)** to export both versions

3. **Add Comparison story** (see [Step 3](#3-add-comparison-story))

4. **Document in CHANGELOG.md:**

   ```markdown
   ### Added

   - `ButtonVanilla`: Vanilla Extract version of Button component
   ```

**Note:** No version bump needed during Phase 1 - this is backward compatible.

---

## Migrating Component-Specific Theme Tokens

**⚠️ IMPORTANT:** Preserve the exact same token names from the Stitches version to avoid breaking changes.

### Approach

Component theme tokens are co-located with the component and merged into the global theme system.

**Simple tokens** (no runtime color references): Create `ComponentName.theme.css.ts` - see [Badge.theme.css.ts](components/Badge/Badge.theme.css.ts)

**Complex tokens** (with runtime color references): Create two files to avoid circular dependencies:

- `ComponentName.theme.ts` (plain TypeScript) - see [Text.theme.ts](components/Text/Text.theme.ts)
- `ComponentName.theme.css.ts` (re-export wrapper) - see [Text.theme.css.ts](components/Text/Text.theme.css.ts)

### Steps

1. **Create component theme file(s)** (see examples above)

2. **Add to [styles/tokens.css.ts](styles/tokens.css.ts)** in the `colors` object (not nested)

3. **Merge into [styles/themes.css.ts](styles/themes.css.ts):**

   ```typescript
   import { badgeLightTheme, badgeDarkTheme } from '../components/Badge/Badge.theme.css';

   const lightSemanticColors = {
     // ... other colors ...
     ...badgeLightTheme, // Merge component theme
   };
   ```

4. **Use in component styles:** Reference tokens from `tokens.colors` in your `.vanilla.css.ts` file

5. **Clean up:** Delete old `ComponentName.themes.ts` file

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
import { useVanillaExtractTheme } from '../../styles/themeContext';

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
2. Import and use `processCSSProp(css, colors)` from `useVanillaExtractTheme()`
3. Destructure both `css` AND `style` props
4. Merge styles with `assignInlineVars(vars)`

### TypeScript Errors

#### RecipeVariants returns undefined

Always wrap `RecipeVariants` with `NonNullable`:

```tsx
// ❌ Bad - may return undefined
type MyComponentVariants = RecipeVariants<typeof myComponentRecipe>;

// ✅ Good - guaranteed to have variant properties
type MyComponentVariants = NonNullable<RecipeVariants<typeof myComponentRecipe>>;
```

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

**CRITICAL:** Never mix systems. Always use vanilla-extract versions inside vanilla components (see [TextField.vanilla.tsx](components/TextField/TextField.vanilla.tsx)).

#### Props typed as `CSSProps` require `as any` in tests

**Root cause:** Should be `CSSProps['css']` not `CSSProps`. See [Textarea.vanilla.tsx](components/Textarea/Textarea.vanilla.tsx) for correct typing.

**Note:** `CSSProps` accepts both abbreviated (`p`, `m`) and full names (`padding`, `margin`).

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
- [ ] **REQUIRED:** Import `useVanillaExtractTheme()` hook and use it to get colors
- [ ] **REQUIRED:** Process `css` prop with `processCSSProp(css, colors)`
- [ ] **REQUIRED:** Merge styles using `assignInlineVars(vars)` and pass to `style` prop
- [ ] Apply recipes with variants correctly
- [ ] Extract `css` and `style` props in the component destructuring

### 2. Exports

(See [Export Strategy](#export-and-build-strategy))

- [ ] Update component's `index.ts` to export both versions (see [`components/Button/index.ts`](components/Button/index.ts))
- [ ] Update main [`index.ts`](index.ts) to export both versions
- [ ] Document in CHANGELOG under "Added"

### 3. Testing & Verification

- [ ] Add comparison stories in Storybook (see [`Text.stories.tsx`](components/Text/Text.stories.tsx))
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

- [ ] Commit changes (no version bump needed in Phase 1)

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

**Note**: Not currently actionable. Continue using Phase 1 (side-by-side exports).

- **Phase 2 (v2.0.0):** Make Vanilla Extract default, deprecate Stitches (breaking change)
- **Phase 3 (v3.0.0):** Remove Stitches files, remove `.vanilla` suffix (~40% smaller bundle)

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
- [Project Guidelines](./CLAUDE.md)

---

## Questions or Issues?

If you encounter issues during migration:

1. Check this guide for common patterns and solutions
2. Review reference implementations linked throughout this guide
3. Consult the Vanilla Extract documentation
4. Ask the team for help in your PR

Happy migrating! 🚀
