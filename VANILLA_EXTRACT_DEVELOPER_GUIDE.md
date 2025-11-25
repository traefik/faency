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
└── utils.css.ts           # Utility functions and recipes
```

### How It Works

1. **Theme Contract** (`tokens.css.ts`): Defines the shape of design tokens (colors, spacing, fonts, etc.)
2. **Theme Implementations** (`themes.css.ts`): Provides actual values for light and dark themes
3. **Theme Provider** (`themeContext.tsx`): React context that manages theme state and applies theme classes
4. **CSS Props** (`cssProps.ts`): Provides Stitches-compatible API for backward compatibility
5. **Polymorphic Types** (`polymorphic.ts`): Reusable TypeScript utilities for components with `as` prop
6. **Build-Time Processing**: Vanilla Extract generates static CSS at build time (no runtime CSS-in-JS)

### Theming System

The theme system is integrated with Storybook at the global level:

```jsx
// .storybook/preview.jsx - Global setup
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

**Stitches:**

```tsx
import { styled } from '../../stitches.config';

export const Box = styled('div', {
  boxSizing: 'border-box',
  variants: {
    size: {
      small: { padding: '$2' },
      large: { padding: '$4' },
    },
  },
});
```

**Vanilla Extract:**

```tsx
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const box = style({
  boxSizing: 'border-box',
});

export const boxRecipe = recipe({
  base: box,
  variants: {
    size: {
      small: { padding: '8px' },
      large: { padding: '20px' },
    },
  },
});
```

### CSS Prop Support

**⚠️ REQUIRED: All Vanilla Extract components MUST support the `css` prop.**

This is a core feature that maintains backward compatibility with Stitches components and provides a consistent API across the library. The `css` prop allows users to apply custom styles using design tokens and shorthand syntax.

To implement `css` prop support in Vanilla Extract components:

1. **Import required utilities:**

   ```tsx
   import { assignInlineVars } from '@vanilla-extract/dynamic';
   import { CSSProps, processCSSProp } from '../../styles/cssProps';
   import { useVanillaExtractTheme } from '../../styles/themeContext';
   ```

2. **Add `CSSProps` to component interface:**

   ```tsx
   interface MyComponentProps extends React.HTMLAttributes<HTMLElement>, CSSProps {
     // other props
   }
   ```

3. **Process the `css` prop in the component:**

   ```tsx
   export const MyComponentVanilla = forwardRef<HTMLElement, MyComponentProps>(
     ({ css, style, className, ...props }, ref) => {
       const { colors } = useVanillaExtractTheme();
       const { style: cssStyles, vars } = processCSSProp(css, colors);

       const mergedStyles = {
         ...cssStyles,
         ...style,
         ...assignInlineVars(vars),
       };

       return <element className={className} style={mergedStyles} {...props} />;
     },
   );
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

- **Styles**: `ComponentName.vanilla.css.ts` (e.g., `Text.vanilla.css.ts`)
- **Component**: `ComponentName.vanilla.tsx` (e.g., `Text.vanilla.tsx`)
- **Theme (if needed)**: `ComponentName.theme.ts` (plain TS) + `ComponentName.theme.css.ts` (re-export)

#### Component Naming

**TypeScript Types:**

```typescript
// ❌ DON'T use the same name for type and component
type TextComponent = ...
export const TextComponent = ...  // Conflict!

// ✅ DO use different names
type TextComponent = ...                    // Internal type for typing
export type TextVanillaProps = ...          // Exported props type
export const TextVanilla = ...              // Exported component
```

**Internal Implementation Pattern:**

```typescript
// Follow this exact pattern from Badge component
type TextRecipeVariants = RecipeVariants<typeof textRecipe>;

interface TextOwnProps extends Omit<TextRecipeVariants, never>, CSSProps {}

export type TextVanillaProps<C extends ElementType = 'span'> = PolymorphicComponentProps<
  C,
  TextOwnProps
>;

type TextComponent = PolymorphicComponent<'span', TextVanillaProps<ElementType>>;

const TextVanillaComponentImpl = forwardRef(/* implementation */);

TextVanillaComponentImpl.displayName = 'TextVanilla';

export const TextVanilla = TextVanillaComponentImpl as TextComponent;
```

**Key Points:**

- Use `Omit<RecipeVariants, never>` not `NonNullable<RecipeVariants>` (consistent with Badge)
- Internal implementation uses `ComponentImpl` suffix
- Exported component name is `ComponentVanilla`
- Exported props type is `ComponentVanillaProps`
- `displayName` matches the exported component name

#### Exports in index.ts

```typescript
// components/Text/index.ts
export * from './Text'; // Stitches version
export type { TextVanillaProps } from './Text.vanilla'; // Vanilla Extract props
export { TextVanilla } from './Text.vanilla'; // Vanilla Extract component
```

**Why explicit exports?**

- Avoids naming conflicts between Stitches and vanilla-extract versions
- Makes it clear which version is being used
- Prevents accidental type collisions

#### Recipe Naming

```typescript
// In ComponentName.vanilla.css.ts
export const componentRecipe = recipe({...});  // Use camelCase + "Recipe" suffix

// Example
export const textRecipe = recipe({...});
export const badgeRecipe = recipe({...});
export const buttonRecipe = recipe({...});
```

### Step-by-Step Guide

#### 1. Create the Vanilla Extract Styles File

Create a new file `ComponentName.vanilla.css.ts` alongside your component:

```typescript
// Button.vanilla.css.ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens.css';

export const button = style({
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  fontFamily: tokens.fonts.rubik,

  // Use tokens for themeable values
  backgroundColor: tokens.colors.accent,
  color: tokens.colors.accentForeground,

  // Hover states
  ':hover': {
    opacity: 0.9,
  },
});

export const buttonRecipe = recipe({
  base: button,

  variants: {
    size: {
      small: {
        height: tokens.sizes[5],
        padding: `0 ${tokens.space[3]}`,
        fontSize: tokens.fontSizes[2],
      },
      medium: {
        height: tokens.sizes[7],
        padding: `0 ${tokens.space[4]}`,
        fontSize: tokens.fontSizes[3],
      },
      large: {
        height: tokens.sizes[9],
        padding: `0 ${tokens.space[5]}`,
        fontSize: tokens.fontSizes[4],
      },
    },
    variant: {
      primary: {
        backgroundColor: tokens.colors.accent,
      },
      secondary: {
        backgroundColor: tokens.colors.muted,
        color: tokens.colors.mutedForeground,
      },
    },
  },

  defaultVariants: {
    size: 'medium',
    variant: 'primary',
  },
});
```

#### 2. Create the React Component

Create `ComponentName.vanilla.tsx`:

```tsx
// Button.vanilla.tsx
import { RecipeVariants } from '@vanilla-extract/recipes';
import { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { buttonRecipe } from './Button.vanilla.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

type ButtonVariants = RecipeVariants<typeof buttonRecipe>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants,
    CSSProps {
  as?: 'button' | 'a';
}

export const ButtonVanilla = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ as: Component = 'button', className, css, style, size, variant, ...props }, ref) => {
    // Get theme colors from context
    const { colors } = useVanillaExtractTheme();

    // Process CSS prop for backward compatibility
    const { style: cssStyles, vars } = processCSSProp(css, colors);

    // Merge all styles
    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    // Apply recipe with variants
    const recipeClass = buttonRecipe({ size, variant });

    return (
      <Component
        ref={ref}
        className={`${recipeClass} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

ButtonVanilla.displayName = 'ButtonVanilla';
```

#### 3. Add Comparison Story

**Required:** Every migrated component MUST have a Comparison story that shows both versions side-by-side.

Add imports for vanilla-extract layout components and the migrated component:

```tsx
// ComponentName.stories.tsx - Add these imports
import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
import { ComponentNameVanilla } from './ComponentName.vanilla';
```

Add a Comparison story at the end of the stories file:

```tsx
// ComponentName.stories.tsx - Add at the end, before `export default Component`
export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Stitches Version</H3>
      <FlexVanilla direction="column" gap={3}>
        {/* Show all major variants grouped by type */}
        <FlexVanilla gap={2} wrap="wrap">
          <ComponentName variant="option1">Option 1</ComponentName>
          <ComponentName variant="option2">Option 2</ComponentName>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3>
      <FlexVanilla direction="column" gap={3}>
        {/* Mirror the exact same variants */}
        <FlexVanilla gap={2} wrap="wrap">
          <ComponentNameVanilla variant="option1">Option 1</ComponentNameVanilla>
          <ComponentNameVanilla variant="option2">Option 2</ComponentNameVanilla>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);
```

**Real Example from Text component:**

```tsx
export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Stitches Version</H3>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap">
          <Text size="1">Size 1</Text>
          <Text size="3">Size 3 (default)</Text>
          <Text size="5">Size 5</Text>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <Text variant="default">Default</Text>
          <Text variant="subtle">Subtle</Text>
          <Text variant="red">Red</Text>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <Text weight="light">Light</Text>
          <Text weight="bold">Bold</Text>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap">
          <TextVanilla size="1">Size 1</TextVanilla>
          <TextVanilla size="3">Size 3 (default)</TextVanilla>
          <TextVanilla size="5">Size 5</TextVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <TextVanilla variant="default">Default</TextVanilla>
          <TextVanilla variant="subtle">Subtle</TextVanilla>
          <TextVanilla variant="red">Red</TextVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <TextVanilla weight="light">Light</TextVanilla>
          <TextVanilla weight="bold">Bold</TextVanilla>
        </FlexVanilla>
      </FlexVanilla>
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

---

### Troubleshooting Theme Flash on Initial Load

If vanilla-extract components show wrong colors on first load in dark mode:

**Root Cause:** Theme state initialized to `'light'` instead of reading actual preference.

**Solution Applied:**

```tsx
// styles/themeContext.tsx
const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
  // Initialize with actual system preference to avoid flash
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
});
```

```jsx
// .storybook/preview.jsx
const [isDark, setDark] = React.useState(() => {
  // Check if storybook-dark-mode has a stored preference
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('sb-addon-themes-3');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.current === 'dark') return true;
      } catch (e) {
        // Fall through
      }
    }
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
});
```

---

#### 4. Verify Visual Parity

1. Run Storybook: `yarn storybook`
2. Compare both versions visually
3. Test all variants and sizes
4. Toggle dark/light theme and verify both match
5. Test responsive behavior
6. Check accessibility (keyboard navigation, focus states)

#### 5. Update Tests (if applicable)

Update Jest tests to work with the new component:

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { ButtonVanilla } from './Button.vanilla';

// Wrap with theme provider for tests
const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <VanillaExtractThemeProvider defaultTheme="light">{ui}</VanillaExtractThemeProvider>,
  );
};

describe('ButtonVanilla', () => {
  it('renders with correct text', () => {
    renderWithTheme(<ButtonVanilla>Click Me</ButtonVanilla>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies size variants correctly', () => {
    const { container } = renderWithTheme(<ButtonVanilla size="large">Large Button</ButtonVanilla>);
    // Add assertions based on your needs
  });
});
```

#### 6. Export the Component

Update the component's exports following the [Export Strategy](#export-and-build-strategy):

```tsx
// In components/Button/index.ts:
export { Button } from './Button'; // Stitches (existing)
export { ButtonVanilla } from './Button.vanilla'; // Vanilla Extract (new)

// In main index.ts:
export { Button, ButtonVanilla } from './components/Button';
```

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

```typescript
// components/Button/index.ts
export { Button } from './Button'; // Stitches (keep existing)
export { ButtonVanilla } from './Button.vanilla'; // Vanilla Extract (add new)
```

#### 2. Update Main Library Index

```typescript
// index.ts (root)
export { Button, ButtonVanilla } from './components/Button';
```

#### 3. Add Comparison Stories

```tsx
// Button.stories.tsx
export const Comparison: StoryFn = () => (
  <div>
    <h3>Stitches</h3>
    <Button variant="primary">Stitches Button</Button>

    <h3>Vanilla Extract</h3>
    <ButtonVanilla variant="primary">Vanilla Extract Button</ButtonVanilla>
  </div>
);
```

#### 4. Document the Addition

```markdown
## CHANGELOG.md

### Added

- `ButtonVanilla`: Vanilla Extract version of Button component
```

**Important**: No version bump needed during Phase 1 - this is backward compatible.

---

## Migrating Component-Specific Theme Tokens

Some components have their own theme tokens (e.g., `Badge.themes.ts` with tokens like `$badgeInteractiveBackgroundHover`). Here's how to migrate them.

### The New Approach

In Vanilla Extract, component theme tokens are **co-located** with the component and merged into the global theme system while **preserving the original token names** to avoid breaking changes.

**Benefits:**

- Component tokens stay in the component folder (organized)
- Preserves existing token names (no breaking changes)
- Easy to add/remove components (scalable)
- TypeScript validation for all tokens (type-safe)

**⚠️ IMPORTANT: Preserve Token Names**

When migrating component-specific theme tokens, you **MUST preserve the exact same token names** from the Stitches version. Users may reference these token names directly (e.g., `$badgeInteractiveBackgroundHover`), so changing them would be a breaking change. The tokens should remain at the top level of the `colors` object, not nested under a component namespace.

### Step-by-Step Process

#### 1. Create Component Theme File

Create `ComponentName.theme.css.ts` in the component folder with the **exact same token names** as the Stitches version:

```typescript
// components/Badge/Badge.theme.css.ts

// ⚠️ IMPORTANT: Use the EXACT same property names as in Stitches
// Original Stitches tokens: $badgeInteractiveBackgroundHover, $badgeInteractiveBackgroundActive
// These become: badgeInteractiveBackgroundHover, badgeInteractiveBackgroundActive (same name, no $ prefix)

// Light theme values
export const badgeLightTheme = {
  badgeInteractiveBackgroundHover: 'hsla(0, 0%, 0%, 0.05)',
  badgeInteractiveBackgroundActive: 'hsla(0, 0%, 0%, 0.1)',
};

// Dark theme values
export const badgeDarkTheme = {
  badgeInteractiveBackgroundHover: 'hsla(0, 0%, 0%, 0.1)',
  badgeInteractiveBackgroundActive: 'hsla(0, 0%, 0%, 0.2)',
};
```

#### 2. Add to Global Theme Contract

Add the tokens directly to the `colors` object in `tokens.css.ts` (not nested):

```typescript
// styles/tokens.css.ts

export const tokens = createThemeContract({
  colors: {
    // ... existing tokens ...

    // Component-specific tokens - Badge
    // ⚠️ These preserve the original Stitches token names
    badgeInteractiveBackgroundHover: null,
    badgeInteractiveBackgroundActive: null,
  },
});
```

#### 3. Merge into Global Theme Implementations

```typescript
// styles/themes.css.ts
import { badgeLightTheme, badgeDarkTheme } from '../components/Badge/Badge.theme.css';

const lightSemanticColors = {
  // ... other colors ...
  ...badgeLightTheme, // Merge component theme
};

const darkSemanticColors = {
  // ... other colors ...
  ...badgeDarkTheme, // Merge component theme
};

// These are automatically applied to all 14 theme variants (lightThemeBlue, darkThemeBlue, etc.)
```

#### 4. Use in Component Styles

Use the tokens at the top level of `tokens.colors`:

```typescript
// components/Badge/Badge.vanilla.css.ts
import { tokens } from '../../styles/tokens.css';

export const badgeButton = style({
  selectors: {
    '&:hover::before': {
      // ⚠️ Use the preserved token name at the top level
      backgroundColor: tokens.colors.badgeInteractiveBackgroundHover,
    },
  },
});
```

#### 5. Clean Up

After migration, delete the old `Badge.themes.ts` file.

### Special Case: Theme Tokens with Runtime Color References

Some component theme tokens reference runtime colors (like `$red9` in Stitches). These need special handling to avoid circular dependencies.

**Problem:** You can't reference `tokens.colors.red9` in a `.theme.css.ts` file because it creates a circular dependency:

```text
Badge.theme.css.ts → themes.css.ts → Badge.theme.css.ts (circular!)
```

**Solution:** Use a plain TypeScript file pattern to break the cycle:

#### 1. Create Plain TypeScript Theme File

Create `ComponentName.theme.ts` (not `.css.ts`) with placeholder values:

```typescript
// components/Text/Text.theme.ts
// Plain TypeScript color tokens (no vanilla-extract)

export const textLightTheme = {
  textSubtle: 'hsla(0, 0%, 0%, 0.51)',
  textDefault: 'hsla(0, 0%, 0%, 0.74)',
  textContrast: 'black',
  // textInvalid and textRed are set in themes.css.ts to use actual red color values
};

export const textDarkTheme = {
  textSubtle: 'hsla(0, 0%, 100%, 0.51)',
  textDefault: 'hsla(0, 0%, 100%, 0.74)',
  textContrast: 'white',
  // textInvalid and textRed are set in themes.css.ts to use actual red color values
};
```

#### 2. Create Re-Export Wrapper

Create `ComponentName.theme.css.ts` that re-exports from the plain TS file:

```typescript
// components/Text/Text.theme.css.ts
// Re-export from plain TypeScript file to avoid circular dependencies
// The source of truth is Text.theme.ts
export { textLightTheme, textDarkTheme } from './Text.theme';
```

#### 3. Override Values in themes.css.ts

In `themes.css.ts`, spread the theme and then override the runtime color references:

```typescript
// styles/themes.css.ts
import { textLightTheme, textDarkTheme } from '../components/Text/Text.theme.css';

const lightSemanticColors = {
  // ... other colors ...
  ...textLightTheme,
  textInvalid: lightColors.red9, // Override with actual color
  textRed: lightColors.red10, // Override with actual color
};

const darkSemanticColors = {
  // ... other colors ...
  ...textDarkTheme,
  textInvalid: darkColors.red9, // Override with actual color
  textRed: darkColors.red10, // Override with actual color
};
```

**Why this works:**

- Plain `.ts` file doesn't use vanilla-extract, so no circular dependency
- Re-export wrapper `.css.ts` allows themes.css.ts to import it
- Override pattern in themes.css.ts provides actual color values
- Build-time resolution happens in the correct order

**When to use this pattern:**

- Component theme tokens that reference other theme colors (e.g., `$red9`, `$blue10`)
- Any token value that can't be hardcoded because it depends on the theme system

---

## Code Examples

See the step-by-step migration guide above for complete examples. Key reference implementations:

- **Simple component**: `components/Box/Box.vanilla.tsx`
- **Component with variants**: `components/Badge/Badge.vanilla.tsx`
- **Component with theme tokens**: `components/Text/Text.vanilla.tsx`

---

## Common Patterns

### Using Design Tokens

Always use tokens from the theme contract for themeable values:

```tsx
import { tokens } from '../../styles/tokens.css';

// ✅ Good - uses theme tokens
backgroundColor: tokens.colors.background,

// ❌ Bad - hardcoded values won't adapt to theme
backgroundColor: '#ffffff',
```

### Migrating from `asChild` to Polymorphic `as`

Replace `asChild` pattern with polymorphic `as` prop:

```tsx
// Before: asChild with Slot
<Badge asChild><a href="/profile">Link</a></Badge>

// After: polymorphic as
<Badge as="a" href="/profile">Link</Badge>
```

**Migration steps:**

1. Remove `@radix-ui/react-slot` dependency
2. Import polymorphic types from `../../styles/polymorphic`
3. Replace `asChild?: boolean` with `as` prop using generic type parameter
4. Use `PolymorphicComponentProps<C, YourOwnProps>` for props type
5. Cast implementation to `PolymorphicComponent` type

See `components/Badge/Badge.vanilla.tsx` for reference implementation.

### Accessing Theme in Components

```tsx
import { useVanillaExtractTheme } from '../../styles/themeContext';

const { colors, resolvedTheme } = useVanillaExtractTheme();
```

---

## Troubleshooting

### Theme Not Applied

Use theme tokens instead of hardcoded values:

```tsx
// ❌ Won't change with theme
backgroundColor: '#ffffff';

// ✅ Changes with theme
backgroundColor: tokens.colors.background;
```

### CSS Prop Not Working

Ensure you:

1. Add `CSSProps` to component interface
2. Import and use `processCSSProp(css, colors)` from `useVanillaExtractTheme()`
3. Destructure both `css` AND `style` props
4. Merge styles with `assignInlineVars(vars)`

See step-by-step guide for complete implementation.

### TypeScript Errors

Use `RecipeVariants` type for recipe-based components:

```tsx
import { RecipeVariants } from '@vanilla-extract/recipes';
type MyComponentVariants = RecipeVariants<typeof myComponentRecipe>;
```

### Build or Storybook Issues

- **Build errors**: Check `vite.config.ts` has `vanillaExtractPlugin()`
- **Theme not switching**: Verify `.storybook/preview.jsx` has `VanillaExtractThemeProvider`
- **Color mismatch**: Compare tokens used in both versions, check Comparison story

---

## Migration Checklist

Use this checklist for each component migration:

### 1. Code Implementation

- [ ] Create `ComponentName.vanilla.css.ts` with styles and recipes
- [ ] Create `ComponentName.vanilla.tsx` with React component
- [ ] **REQUIRED:** Import and add `CSSProps` to component interface
- [ ] **REQUIRED:** Import `useVanillaExtractTheme()` hook and use it to get colors
- [ ] **REQUIRED:** Process `css` prop with `processCSSProp(css, colors)`
- [ ] **REQUIRED:** Merge styles using `assignInlineVars(vars)` and pass to `style` prop
- [ ] Apply recipes with variants correctly
- [ ] Extract `css` and `style` props in the component destructuring

### 2. Exports

(See [Export Strategy](#export-and-build-strategy))

- [ ] Update component's `index.ts` to export both versions
- [ ] Update main `index.ts` to export both versions
- [ ] Document in CHANGELOG under "Added"

### 3. Testing & Verification

- [ ] Add comparison stories in Storybook
- [ ] Test all variants in Storybook
- [ ] Test light/dark theme switching
- [ ] Verify visual parity with original component
- [ ] Update or create Jest tests
- [ ] Run tests: `yarn test`
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

**❌ Wrong:**

```typescript
export const h1Recipe = recipe({
  base: headingBase, // Missing fontSize!
  variants: { transform: { uppercase: { textTransform: 'uppercase' } } },
});

export const h1Style = style([headingBase, { fontSize: tokens.fontSizes['12'] }]);

// Component: fontSize missing when transform is used!
const className = transform ? h1Recipe({ transform }) : h1Style;
```

**✅ Correct:**

```typescript
export const h1Recipe = recipe({
  base: [headingBase, { fontSize: tokens.fontSizes['12'] }], // All styles in recipe
  variants: { transform: { uppercase: { textTransform: 'uppercase' } } },
});

// Component: always includes fontSize
const className = h1Recipe({ transform });
```

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

The build system is already configured to support both Stitches and Vanilla Extract simultaneously. No action needed.

```typescript
// vite.config.ts
plugins: [
  react(),
  vanillaExtractPlugin(), // ✅ Processes .css.ts files at build time
  dts(), // ✅ Generates TypeScript declaration files
];
```

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
2. Review the `Box` component as a reference implementation
3. Consult the Vanilla Extract documentation
4. Ask the team for help in your PR

Happy migrating! 🚀
