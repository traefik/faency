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

- [Code Examples](#code-examples)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)
- [Migration Checklist](#migration-checklist)
- [Best Practices](#best-practices)
- [Future Migration Phases](#reference-future-migration-phases) - Phase 2 & 3 (not yet actionable)

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

- **Styles**: `ComponentName.vanilla.css.ts` (e.g., [`Text.vanilla.css.ts`](components/Text/Text.vanilla.css.ts))
- **Component**: `ComponentName.vanilla.tsx` (e.g., [`Text.vanilla.tsx`](components/Text/Text.vanilla.tsx))
- **Tests**: `ComponentName.vanilla.test.tsx` (e.g., [`Text.vanilla.test.tsx`](components/Text/Text.vanilla.test.tsx))
- **Theme (if needed)**: `ComponentName.theme.ts` + `ComponentName.theme.css.ts` (see Badge example)

#### Component Naming

**Reference Implementation:**

See [`components/Text/Text.vanilla.tsx`](components/Text/Text.vanilla.tsx) for the complete naming pattern:

- Internal type: `TextComponent` (for typing the implementation)
- Exported props type: `TextVanillaProps` (for consumers)
- Exported component: `TextVanilla` (the actual component)
- Display name: `'TextVanilla'` (matches exported name)

**Key Points:**

- Use `Omit<RecipeVariants, never>` not `NonNullable<RecipeVariants>` (see Badge component)
- Internal implementation uses `ComponentImpl` suffix
- Exported component name is `ComponentVanilla`
- Exported props type is `ComponentVanillaProps`
- `displayName` matches the exported component name

#### Exports in index.ts

**Reference:**

See [`components/Text/index.ts`](components/Text/index.ts) for the export pattern:

```typescript
export * from './Text'; // Stitches version
export type { TextVanillaProps } from './Text.vanilla';
export { TextVanilla } from './Text.vanilla';
```

**Why explicit exports?**

- Avoids naming conflicts between Stitches and vanilla-extract versions
- Makes it clear which version is being used
- Prevents accidental type collisions

#### Recipe Naming

Use camelCase + "Recipe" suffix in `.vanilla.css.ts` files:

```typescript
export const textRecipe = recipe({...});
export const badgeRecipe = recipe({...});
export const buttonRecipe = recipe({...});
```

See [`components/Button/Button.vanilla.css.ts`](components/Button/Button.vanilla.css.ts) for examples.

### Step-by-Step Guide

#### 1. Create the Vanilla Extract Styles File

Create a new file `ComponentName.vanilla.css.ts` alongside your component.

**Reference Implementation:**

- Simple component: [`components/Box/Box.vanilla.css.ts`](components/Box/Box.vanilla.css.ts)
- Component with variants: [`components/Button/Button.vanilla.css.ts`](components/Button/Button.vanilla.css.ts)
- Component with recipes: [`components/Badge/Badge.vanilla.css.ts`](components/Badge/Badge.vanilla.css.ts)

**Key patterns:**

- Import tokens from `../../styles/tokens.css`
- Use `style()` for base styles
- Use `recipe()` for variant-based styles
- Reference theme tokens for themeable values

#### 2. Create the React Component

Create `ComponentName.vanilla.tsx`.

**Reference Implementations:**

- **Simple component**: [`components/Box/Box.vanilla.tsx`](components/Box/Box.vanilla.tsx)
- **Button with variants**: [`components/Button/Button.vanilla.tsx`](components/Button/Button.vanilla.tsx)
- **Polymorphic component**: [`components/Badge/Badge.vanilla.tsx`](components/Badge/Badge.vanilla.tsx)
- **Component with theme tokens**: [`components/Text/Text.vanilla.tsx`](components/Text/Text.vanilla.tsx)

**Required steps:**

1. Import `CSSProps`, `processCSSProp` from `styles/cssProps`
2. Import `useVanillaExtractTheme` from `styles/themeContext`
3. Import `assignInlineVars` from `@vanilla-extract/dynamic`
4. Add `CSSProps` to component interface
5. Process `css` prop with `processCSSProp(css, colors)`
6. Merge styles with `assignInlineVars(vars)`
7. Set `displayName` to match component name

#### 3. Add Comparison Story

**Required:** Every migrated component MUST have a Comparison story that shows both versions side-by-side.

**Reference Implementation:**

See [`components/Text/Text.stories.tsx`](components/Text/Text.stories.tsx) - Look for the `Comparison` export which shows Stitches vs Vanilla Extract side-by-side.

**Pattern:**

```tsx
// Import vanilla layout components
import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
import { ComponentNameVanilla } from './ComponentName.vanilla';

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Stitches Version</H3>
      {/* Show all major variants */}
    </BoxVanilla>
    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3>
      {/* Mirror the exact same variants */}
    </BoxVanilla>
  </FlexVanilla>
);
```

**Why this matters:**

- Visual verification that both versions render identically
- Easy to spot visual regressions
- Tests light/dark theme switching for both versions
- Documents all key variants in one place

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

**REQUIRED:** Every migrated component MUST have a corresponding `.vanilla.test.tsx` file with comprehensive tests.

**Reference Implementation:**

See [`components/Input/Input.vanilla.test.tsx`](components/Input/Input.vanilla.test.tsx) for the gold standard testing pattern.

Other examples:

- [`components/Button/Button.vanilla.test.tsx`](components/Button/Button.vanilla.test.tsx)
- [`components/Text/Text.vanilla.test.tsx`](components/Text/Text.vanilla.test.tsx)
- [`components/Label/Label.vanilla.test.tsx`](components/Label/Label.vanilla.test.tsx)

**Required test coverage:**

- Basic rendering and element types
- Custom className support
- All variant props (size, weight, variant, etc.)
- Custom styling (CSS prop and style prop)
- Style merging behavior
- Polymorphic rendering (if applicable)
- Ref forwarding
- HTML attribute pass-through
- Accessibility testing with jest-axe
- Theme support (light/dark and different primary colors)

**Important notes:**

- Use `unmount()` in loops to prevent "multiple elements found" errors
- Always wrap components in `VanillaExtractThemeProvider`
- For Radix-based components, use the correct role (e.g., `role="radio"` for ButtonSwitch items)
- Test files should be named `ComponentName.vanilla.test.tsx`

#### 6. Export the Component

Update the component's exports following the [Export Strategy](#export-and-build-strategy).

**Reference:**

See [`components/Button/index.ts`](components/Button/index.ts) for the export pattern.

```tsx
export { Button } from './Button'; // Stitches (existing)
export { ButtonVanilla } from './Button.vanilla'; // Vanilla Extract (new)
```

Also update the main [`index.ts`](index.ts).

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

### Overview

We're migrating from Stitches to Vanilla Extract in three phases, maintaining backward compatibility throughout. The build system is already configured to handle both systems simultaneously.

### What Developers Need to Know

**Current Phase: Side-by-Side Exports (Phase 1)**

We export both versions of migrated components with clear naming conventions:

- Original Stitches components keep their current names (e.g., `Box`)
- New Vanilla Extract versions use a `*Vanilla` suffix (e.g., `BoxVanilla`)
- Both are exported and available to consumers

This approach allows:

- Zero breaking changes for existing users
- Gradual opt-in for early adopters
- Easy visual comparison and testing in Storybook
- Time to verify feature parity before switching

Trade-off: Larger bundle size (~80KB total) during the transition period.

---

### Developer Workflow: Exporting a Migrated Component

When you migrate a component, follow this export pattern:

#### 1. Update Component's Local Index

See [`components/Button/index.ts`](components/Button/index.ts) for example:

```typescript
export { Button } from './Button'; // Stitches (keep existing)
export { ButtonVanilla } from './Button.vanilla'; // Vanilla Extract (add new)
```

#### 2. Update Main Library Index

Update [`index.ts`](index.ts) to export both versions.

#### 3. Add Comparison Stories

See Step 3 in the migration process above.

#### 4. Document the Addition

Add an entry to `CHANGELOG.md` under "Added":

```markdown
### Added

- `ButtonVanilla`: Vanilla Extract version of Button component
```

**Important**: No version bump needed during Phase 1 - this is backward compatible.

---

## Migrating Component-Specific Theme Tokens

Some components have their own theme tokens (e.g., `Badge.themes.ts`). Here's how to migrate them.

### The New Approach

In Vanilla Extract, component theme tokens are **co-located** with the component and merged into the global theme system while **preserving the original token names** to avoid breaking changes.

**⚠️ IMPORTANT: Preserve Token Names**

When migrating component-specific theme tokens, you **MUST preserve the exact same token names** from the Stitches version to avoid breaking changes.

### Reference Implementations

**Simple theme tokens:**

See [`components/Badge/Badge.theme.css.ts`](components/Badge/Badge.theme.css.ts) - Tokens without runtime color references.

**Complex theme tokens with runtime colors:**

See [`components/Text/Text.theme.ts`](components/Text/Text.theme.ts) and [`components/Text/Text.theme.css.ts`](components/Text/Text.theme.css.ts) - Pattern for tokens that reference other theme colors.

### Step-by-Step Process

#### 1. Create Component Theme File

**For simple tokens** (no runtime color references):

Create `ComponentName.theme.css.ts` - see [`components/Badge/Badge.theme.css.ts`](components/Badge/Badge.theme.css.ts)

**For complex tokens** (with runtime color references):

Create two files to avoid circular dependencies:

- `ComponentName.theme.ts` (plain TypeScript) - see [`components/Text/Text.theme.ts`](components/Text/Text.theme.ts)
- `ComponentName.theme.css.ts` (re-export wrapper) - see [`components/Text/Text.theme.css.ts`](components/Text/Text.theme.css.ts)

#### 2. Add to Global Theme Contract

Add the tokens to [`styles/tokens.css.ts`](styles/tokens.css.ts) in the `colors` object (not nested).

#### 3. Merge into Global Theme Implementations

See [`styles/themes.css.ts`](styles/themes.css.ts) for how component themes are merged:

```typescript
import { badgeLightTheme, badgeDarkTheme } from '../components/Badge/Badge.theme.css';

const lightSemanticColors = {
  // ... other colors ...
  ...badgeLightTheme, // Merge component theme
};
```

For runtime color overrides, see the Text component section in [`styles/themes.css.ts`](styles/themes.css.ts).

#### 4. Use in Component Styles

Reference tokens from `tokens.colors` in your component's `.vanilla.css.ts` file.

See [`components/Badge/Badge.vanilla.css.ts`](components/Badge/Badge.vanilla.css.ts) for usage examples.

#### 5. Clean Up

After migration, delete the old `ComponentName.themes.ts` file.

---

## Code Examples

See the step-by-step migration guide above for file references. Key reference implementations:

- **Simple component**: [`components/Box/Box.vanilla.tsx`](components/Box/Box.vanilla.tsx)
- **Component with variants**: [`components/Badge/Badge.vanilla.tsx`](components/Badge/Badge.vanilla.tsx)
- **Component with theme tokens**: [`components/Text/Text.vanilla.tsx`](components/Text/Text.vanilla.tsx)
- **Polymorphic component**: [`components/Badge/Badge.vanilla.tsx`](components/Badge/Badge.vanilla.tsx)
- **Component with tests**: [`components/Input/Input.vanilla.test.tsx`](components/Input/Input.vanilla.test.tsx)

---

## Common Patterns

### Using Design Tokens

Always use tokens from the theme contract for themeable values. See [`styles/tokens.css.ts`](styles/tokens.css.ts) for available tokens.

```tsx
// ✅ Good - uses theme tokens
backgroundColor: tokens.colors.background,

// ❌ Bad - hardcoded values won't adapt to theme
backgroundColor: '#ffffff',
```

### Migrating from `asChild` to Polymorphic `as`

Replace `asChild` pattern with polymorphic `as` prop.

**Reference Implementation:**

See [`components/Badge/Badge.vanilla.tsx`](components/Badge/Badge.vanilla.tsx) for the complete polymorphic pattern.

**Migration steps:**

1. Remove `@radix-ui/react-slot` dependency
2. Import polymorphic types from [`styles/polymorphic.ts`](styles/polymorphic.ts)
3. Replace `asChild?: boolean` with `as` prop using generic type parameter
4. Use `PolymorphicComponentProps<C, YourOwnProps>` for props type
5. Cast implementation to `PolymorphicComponent` type

### Accessing Theme in Components

```tsx
import { useVanillaExtractTheme } from '../../styles/themeContext';

const { colors, resolvedTheme } = useVanillaExtractTheme();
```

See any vanilla component for usage examples.

### Using Shared Text Variants (DRY Pattern)

For Text-based components needing identical variant behavior, import from [`styles/textVariants.css.ts`](styles/textVariants.css.ts).

**Reference Implementations:**

- [`components/Text/Text.vanilla.css.ts`](components/Text/Text.vanilla.css.ts)
- [`components/Label/Label.vanilla.css.ts`](components/Label/Label.vanilla.css.ts)
- [`components/Blockquote/Blockquote.vanilla.css.ts`](components/Blockquote/Blockquote.vanilla.css.ts)

**Benefits:** Single source of truth, ~70% code reduction, consistency

**Don't use** if component needs custom variant behavior.

---

## Troubleshooting

### Theme Not Applied

Use theme tokens instead of hardcoded values. See [`styles/tokens.css.ts`](styles/tokens.css.ts) for available tokens.

### CSS Prop Not Working

Ensure you follow the pattern in any vanilla component (e.g., [`components/Button/Button.vanilla.tsx`](components/Button/Button.vanilla.tsx)):

1. Add `CSSProps` to component interface
2. Import and use `processCSSProp(css, colors)` from `useVanillaExtractTheme()`
3. Destructure both `css` AND `style` props
4. Merge styles with `assignInlineVars(vars)`

### TypeScript Errors

#### Problem: RecipeVariants returns undefined

Always wrap `RecipeVariants` with `NonNullable`. See any vanilla component for the pattern.

#### Problem: Stitches components in vanilla components cause type errors

**CRITICAL RULE:** Never mix Stitches and vanilla-extract components. Always use vanilla-extract versions inside vanilla components.

See [`components/TextField/TextField.vanilla.tsx`](components/TextField/TextField.vanilla.tsx) for an example of using vanilla components.

#### Problem: Props typed as `CSSProps` require `as any` in tests

**Root cause:** The prop is typed as `CSSProps` but should be `CSSProps['css']`.

**Reference:** See [`components/Textarea/Textarea.vanilla.tsx`](components/Textarea/Textarea.vanilla.tsx) for correct typing of additional CSS props.

**Understanding CSSProps property names:**

The [`styles/cssProps.ts`](styles/cssProps.ts) interface accepts both abbreviated and full property names.

```tsx
// Both work identically:
<Component css={{ p: '$4', m: '$2' }} />              // Abbreviated
<Component css={{ padding: '$4', margin: '$2' }} />   // Full names
```

### Build or Storybook Issues

- **Build errors**: Check [`vite.config.ts`](vite.config.ts) has `vanillaExtractPlugin()`
- **Theme not switching**: Verify [`.storybook/preview.jsx`](.storybook/preview.jsx) has `VanillaExtractThemeProvider`
- **Color mismatch**: Compare tokens used in both versions, check Comparison story

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

### Critical Pattern: Include All Base Styles in Recipes

**⚠️ IMPORTANT:** When recipes have variants, include ALL base styles (font sizes, dimensions, etc.) in the recipe's base array, not in separate style constants.

**Why:** If styles are split and components conditionally apply recipe classes, base styles will be missing when variants are used.

**Reference:**

See [`components/Heading/Heading.vanilla.css.ts`](components/Heading/Heading.vanilla.css.ts) for the correct pattern - all styles are included in the recipe base.

**Rule:** Put ALL styling in recipe base if component has variants. Test variant combinations to verify.

---

## Reference: Future Migration Phases

**Note**: These phases are not currently actionable. Continue using Phase 1 (side-by-side exports).

### Phase 2: Make Vanilla Extract Default (v2.0.0)

Swap exports, deprecate Stitches versions. Breaking change for consumers.

### Phase 3: Remove Stitches (v3.0.0)

Delete Stitches files, remove `.vanilla` suffix from filenames. ~40% smaller bundle.

---

## Reference: Build Configuration

The build system is already configured in [`vite.config.ts`](vite.config.ts) to support both Stitches and Vanilla Extract simultaneously. No action needed.

**Key Settings:**

- `preserveModules: true` - Maintains module structure for tree-shaking
- Both `.tsx` and `.css.ts` files are processed
- Outputs ES modules (ESM) and CommonJS (CJS) builds
- Static CSS files generated at build time (not runtime)

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
