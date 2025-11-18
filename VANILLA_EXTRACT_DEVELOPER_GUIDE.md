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

```
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

#### 3. Update Stories for Testing

Update the component's Storybook stories to test both versions side-by-side:

```tsx
// Button.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Button } from './Button';
import { ButtonVanilla } from './Button.vanilla';

const meta: Meta = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

// Original Stitches version
export const StitchesVersion: StoryFn = () => (
  <Button size="medium" variant="primary">
    Click Me (Stitches)
  </Button>
);

// New Vanilla Extract version
export const VanillaExtractVersion: StoryFn = () => (
  <ButtonVanilla size="medium" variant="primary">
    Click Me (Vanilla Extract)
  </ButtonVanilla>
);

// Side-by-side comparison
export const Comparison: StoryFn = () => (
  <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
    <div>
      <h3>Stitches Version</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="small" variant="primary">
          Small
        </Button>
        <Button size="medium" variant="primary">
          Medium
        </Button>
        <Button size="large" variant="primary">
          Large
        </Button>
      </div>
    </div>

    <div>
      <h3>Vanilla Extract Version</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <ButtonVanilla size="small" variant="primary">
          Small
        </ButtonVanilla>
        <ButtonVanilla size="medium" variant="primary">
          Medium
        </ButtonVanilla>
        <ButtonVanilla size="large" variant="primary">
          Large
        </ButtonVanilla>
      </div>
    </div>
  </div>
);

// Test theme switching
export const ThemeTest: StoryFn = () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <Button variant="primary">Stitches (toggle theme)</Button>
    <ButtonVanilla variant="primary">Vanilla Extract (toggle theme)</ButtonVanilla>
  </div>
);
```

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

---

## Code Examples

### Example 1: Simple Component (Box)

**Stitches (Before):**

```tsx
// Box.tsx
import { styled } from '../../stitches.config';

export const Box = styled('div', {
  boxSizing: 'border-box',
});

// Usage
<Box css={{ px: '$4', py: '$6', bc: '$deepBlue6' }}>Content</Box>;
```

**Vanilla Extract (After):**

```tsx
// Box.css.ts
import { style } from '@vanilla-extract/css';

export const box = style({
  boxSizing: 'border-box',
});

// Box.tsx
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ElementType, forwardRef } from 'react';
import { CSSProps, processCSSProp } from '../../styles/cssProps';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { box } from './Box.css';

export type BoxProps<C extends ElementType = 'div'> = PolymorphicComponentProps<C, CSSProps>;

type BoxComponent = PolymorphicComponent<'div', BoxProps<ElementType>>;

const BoxVanillaComponent = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, ...props }: BoxProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);

    return (
      <Component
        ref={ref}
        className={`${box} ${className || ''}`.trim()}
        style={{ ...cssStyles, ...style, ...assignInlineVars(vars) }}
        {...props}
      />
    );
  },
);

BoxVanillaComponent.displayName = 'Box';

export const Box = BoxVanillaComponent as BoxComponent;

// Usage (same as before!)
<Box css={{ px: '$4', py: '$6', bc: '$deepBlue6' }}>Content</Box>;
```

### Example 2: Component with Variants

**Stitches (Before):**

```tsx
// Badge.tsx
import { styled } from '../../stitches.config';

export const Badge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '$pill',
  padding: '$1 $2',
  fontSize: '$1',

  variants: {
    variant: {
      success: { bc: '$green4', c: '$green11' },
      error: { bc: '$red4', c: '$red11' },
      warning: { bc: '$orange4', c: '$orange11' },
    },
  },
});
```

**Vanilla Extract (After):**

```tsx
// Badge.css.ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens.css';

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: tokens.radii.pill,
  padding: `${tokens.space[1]} ${tokens.space[2]}`,
  fontSize: tokens.fontSizes[1],
});

export const badgeRecipe = recipe({
  base: badge,
  variants: {
    variant: {
      success: {
        backgroundColor: '#e8f5e9',
        color: '#2e7d32',
      },
      error: {
        backgroundColor: '#ffebee',
        color: '#c62828',
      },
      warning: {
        backgroundColor: '#fff3e0',
        color: '#e65100',
      },
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

// Badge.tsx
import { RecipeVariants } from '@vanilla-extract/recipes';
import { forwardRef } from 'react';
import { badgeRecipe } from './Badge.css';

type BadgeVariants = RecipeVariants<typeof badgeRecipe>;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariants {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`${badgeRecipe({ variant })} ${className || ''}`.trim()}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';
```

### Example 3: Compound Variants

**Stitches (Before):**

```tsx
export const Button = styled('button', {
  variants: {
    size: {
      small: { height: '$5' },
      large: { height: '$9' },
    },
    variant: {
      primary: { bc: '$blue9' },
      ghost: { bc: 'transparent' },
    },
  },
  compoundVariants: [
    {
      size: 'small',
      variant: 'ghost',
      css: { padding: '$1 $2' },
    },
  ],
});
```

**Vanilla Extract (After):**

```tsx
// Button.css.ts
export const buttonRecipe = recipe({
  base: button,
  variants: {
    size: {
      small: { height: tokens.sizes[5] },
      large: { height: tokens.sizes[9] },
    },
    variant: {
      primary: { backgroundColor: '#3b82f6' },
      ghost: { backgroundColor: 'transparent' },
    },
  },
  compoundVariants: [
    {
      variants: {
        size: 'small',
        variant: 'ghost',
      },
      style: {
        padding: `${tokens.space[1]} ${tokens.space[2]}`,
      },
    },
  ],
});
```

---

## Common Patterns

### Pattern 1: Using Design Tokens

Always use tokens from the theme contract for values that need to change with the theme:

```tsx
import { tokens } from '../../styles/tokens.css';

export const component = style({
  // ✅ Good - uses theme tokens
  backgroundColor: tokens.colors.background,
  color: tokens.colors.foreground,
  padding: tokens.space[4],

  // ❌ Bad - hardcoded values won't adapt to theme
  backgroundColor: '#ffffff',
  color: '#000000',
  padding: '20px',
});
```

### Pattern 2: CSS Prop for Dynamic Styles

Use the `css` prop for one-off overrides (maintains Stitches API):

```tsx
// Both components accept the same css prop:
<Box css={{ px: '$4', bc: '$blue6' }}>Stitches</Box>
<BoxVanilla css={{ px: '$4', bc: '$blue6' }}>Vanilla Extract</BoxVanilla>
```

### Pattern 3: Reusable Polymorphic Components

For components that support the `as` prop, use the polymorphic utilities:

```tsx
// styles/polymorphic.ts - Reusable utilities (already provided)
import { ComponentPropsWithRef, ElementType } from 'react';

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProps<
  C extends ElementType,
  Props = object,
> = {
  as?: C;
} & Props &
  Omit<ComponentPropsWithRef<C>, keyof Props | 'as'>;

export type PolymorphicComponent<
  C extends ElementType = 'div',
  Props extends PolymorphicComponentProps<any, any> = PolymorphicComponentProps<C>,
> = <E extends ElementType = C>(props: Props & { as?: E }) => React.ReactElement | null;

// Simple component example - Box
import { PolymorphicComponent, PolymorphicComponentProps, PolymorphicRef } from '../../styles/polymorphic';

export type BoxProps<C extends ElementType = 'div'> = PolymorphicComponentProps<C, CSSProps>;
type BoxComponent = PolymorphicComponent<'div', BoxProps<ElementType>>;

const BoxVanillaComponent = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, ...props }: BoxProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';
    // ... implementation
    return <Component ref={ref} {...props} />;
  },
);

export const Box = BoxVanillaComponent as BoxComponent;

// Complex component example - Button with custom props
interface ButtonOwnProps extends CSSProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

export type ButtonProps<C extends ElementType = 'button'> = PolymorphicComponentProps<C, ButtonOwnProps>;
type ButtonComponent = PolymorphicComponent<'button', ButtonProps<ElementType>>;

const ButtonVanillaComponent = forwardRef(
  <C extends ElementType = 'button'>(
    { as, variant, size, loading, ...props }: ButtonProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'button';
    // ... implementation
    return <Component ref={ref} {...props} />;
  },
);

export const Button = ButtonVanillaComponent as ButtonComponent;

// Usage:
<Box as="section">Box as section</Box>
<Button as="a" href="/link">Button as link</Button>
```

### Pattern 4: Migrating from `asChild` to Polymorphic `as`

**⚠️ IMPORTANT:** When migrating components that used `asChild` (Badge, Button, AriaTable), replace it with the polymorphic `as` pattern.

**Before (Stitches with `asChild`):**

```tsx
import { Slot } from '@radix-ui/react-slot';

interface BadgeProps {
  asChild?: boolean;
  variant?: string;
}

export const Badge = ({ asChild, ...props }: BadgeProps) => {
  const Component = asChild ? Slot : 'span';
  return <Component {...props} />;
};

// Usage:
<Badge asChild variant="success">
  <a href="/profile">Link Badge</a>
</Badge>;
```

**After (Vanilla Extract with polymorphic `as`):**

```tsx
import { ElementType, forwardRef } from 'react';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';

interface BadgeOwnProps extends CSSProps {
  variant?: string;
}

export type BadgeProps<C extends ElementType = 'span'> = PolymorphicComponentProps<
  C,
  BadgeOwnProps
>;
type BadgeComponent = PolymorphicComponent<'span', BadgeProps<ElementType>>;

const BadgeImpl = forwardRef(
  <C extends ElementType = 'span'>(
    { as, variant, ...props }: BadgeProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'span';
    return <Component ref={ref} {...props} />;
  },
);

export const Badge = BadgeImpl as BadgeComponent;

// Usage:
<Badge as="a" href="/profile" variant="success">
  Link Badge
</Badge>;
```

**Key Migration Steps:**

1. Remove `@radix-ui/react-slot` import and dependency
2. Import polymorphic types: `PolymorphicComponent`, `PolymorphicComponentProps`, `PolymorphicRef`
3. Replace `asChild?: boolean` with generic type parameter `<C extends ElementType>`
4. Update props type to use `PolymorphicComponentProps<C, YourOwnProps>`
5. Replace `asChild` destructuring with `as`
6. Use `as || 'defaultElement'` instead of ternary with Slot
7. Cast implementation to `PolymorphicComponent` type

**Benefits:**

- Better TypeScript inference (element-specific props are automatically typed)
- More ergonomic API (no wrapper element needed)
- Removes external dependency on `@radix-ui/react-slot`

See [BREAKING_CHANGES.md](./BREAKING_CHANGES.md#polymorphic-components-aschild--as-prop) for complete details.

### Pattern 5: Accessing Theme in Components

Use the theme context hook when you need programmatic access to theme values:

```tsx
import { useVanillaExtractTheme } from '../../styles/themeContext';

export const MyComponent = () => {
  const { colors, resolvedTheme } = useVanillaExtractTheme();

  return <div style={{ backgroundColor: colors.blue6 }}>Current theme: {resolvedTheme}</div>;
};
```

### Pattern 6: Conditional Styles

For theme-dependent conditional styles:

```tsx
// In .css.ts file
import { style, styleVariants } from '@vanilla-extract/css';

export const baseButton = style({
  padding: '10px 20px',
});

export const themeButton = styleVariants({
  light: [
    baseButton,
    {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
  ],
  dark: [
    baseButton,
    {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
    },
  ],
});

// In component
const { resolvedTheme } = useVanillaExtractTheme();
<button className={themeButton[resolvedTheme]} />;
```

### Pattern 7: Global Styles

For global styles or resets:

```tsx
// styles/global.css.ts
import { globalStyle } from '@vanilla-extract/css';
import { tokens } from './tokens.css';

globalStyle('body', {
  margin: 0,
  padding: 0,
  fontFamily: tokens.fonts.rubik,
  backgroundColor: tokens.colors.background,
  color: tokens.colors.foreground,
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});
```

---

## Troubleshooting

### Theme Not Applied

**Problem:** Component doesn't respond to theme changes

**Solution:** Ensure you're using theme tokens, not hardcoded values:

```tsx
// ❌ Won't change with theme
backgroundColor: '#ffffff';

// ✅ Changes with theme
backgroundColor: tokens.colors.background;
```

### CSS Prop Not Working

**Problem:** `css` prop doesn't apply styles or TypeScript shows error that `css` prop doesn't exist

**Solution:** Ensure you're implementing the `css` prop correctly:

1. **Add `CSSProps` to the component interface:**

   ```tsx
   import { CSSProps } from '../../styles/cssProps';

   interface MyComponentProps extends React.HTMLAttributes<HTMLElement>, CSSProps {
     // other props
   }
   ```

2. **Process the css prop in the component:**

   ```tsx
   import { assignInlineVars } from '@vanilla-extract/dynamic';
   import { processCSSProp } from '../../styles/cssProps';
   import { useVanillaExtractTheme } from '../../styles/themeContext';

   export const MyComponent = forwardRef(({ css, style, ...props }, ref) => {
     const { colors } = useVanillaExtractTheme();
     const { style: cssStyles, vars } = processCSSProp(css, colors);

     const mergedStyles = {
       ...cssStyles,
       ...style,
       ...assignInlineVars(vars),
     };

     return <element style={mergedStyles} {...props} />;
   });
   ```

3. **Make sure to destructure both `css` AND `style` props** - forgetting to extract `css` from props is a common mistake

### TypeScript Errors

**Problem:** Type errors with recipe variants

**Solution:** Import and use `RecipeVariants` type:

```tsx
import { RecipeVariants } from '@vanilla-extract/recipes';

type MyComponentVariants = RecipeVariants<typeof myComponentRecipe>;

interface MyComponentProps extends MyComponentVariants {
  // other props
}
```

### Build Errors

**Problem:** Vanilla Extract build errors

**Solution:** Ensure Vite plugin is configured in `vite.config.ts`:

```tsx
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
});
```

### Storybook Not Showing Themes

**Problem:** Components don't change theme in Storybook

**Solution:** Ensure `.storybook/preview.jsx` has `VanillaExtractThemeProvider` properly configured:

```jsx
import { VanillaExtractThemeProvider } from '../styles/themeContext';

export const decorators = [
  (renderStory) => {
    const [isDark, setDark] = React.useState(false);

    React.useEffect(() => {
      channel.on(DARK_MODE_EVENT_NAME, setDark);
      return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
    }, []);

    return (
      <VanillaExtractThemeProvider forcedTheme={isDark ? 'dark' : 'light'}>
        {renderStory()}
      </VanillaExtractThemeProvider>
    );
  },
];
```

### Color Values Not Matching

**Problem:** Colors look different between Stitches and Vanilla Extract versions

**Solution:**

1. Check that you're using the correct color tokens
2. Verify color definitions in `colors/` directory match
3. Use browser DevTools to compare computed styles
4. Ensure both versions reference the same semantic color (e.g., `$blue6` vs `tokens.colors.blue6`)

---

## Migration Checklist

Use this checklist for each component migration:

**1. Code Implementation**

- [ ] Create `ComponentName.vanilla.css.ts` with styles and recipes
- [ ] Create `ComponentName.vanilla.tsx` with React component
- [ ] **REQUIRED:** Import and add `CSSProps` to component interface
- [ ] **REQUIRED:** Import `useVanillaExtractTheme()` hook and use it to get colors
- [ ] **REQUIRED:** Process `css` prop with `processCSSProp(css, colors)`
- [ ] **REQUIRED:** Merge styles using `assignInlineVars(vars)` and pass to `style` prop
- [ ] Apply recipes with variants correctly
- [ ] Extract `css` and `style` props in the component destructuring

**2. Exports** (See [Export Strategy](#export-and-build-strategy))

- [ ] Update component's `index.ts` to export both versions
- [ ] Update main `index.ts` to export both versions
- [ ] Document in CHANGELOG under "Added"

**3. Testing & Verification**

- [ ] Add comparison stories in Storybook
- [ ] Test all variants in Storybook
- [ ] Test light/dark theme switching
- [ ] Verify visual parity with original component
- [ ] Update or create Jest tests
- [ ] Run tests: `yarn test`
- [ ] Run build: `yarn build`

**4. Finalize**

- [ ] Commit changes (no version bump needed in Phase 1)

---

## Best Practices

1. **Migrate Simple Components First**: Start with Box, Text, Flex before tackling complex components
2. **Test Thoroughly**: Always compare both versions side-by-side in Storybook
3. **Use Theme Tokens**: Never hardcode values that should change with theme
4. **Maintain API Compatibility**: Keep the same props API when possible
5. **Document Differences**: If the API must change, document it clearly
6. **Keep Both Versions**: During migration, keep both versions until fully verified
7. **Incremental Migration**: Migrate one component at a time, don't rush
8. **Test Dark Mode**: Always verify both light and dark themes work correctly
9. **Follow Export Strategy**: Use the phased approach outlined in this guide

---

## Reference: Future Migration Phases

This section provides context about the long-term migration plan. **These phases are not currently actionable** - continue using Phase 1 (side-by-side exports) for now.

### Phase 2: Make Vanilla Extract Default (v2.0.0)

**When**: Once ALL components are migrated and verified

**What happens**:

1. Swap exports in main `index.ts`:
   ```typescript
   export { ButtonVanilla as Button } from './components/Button';
   /** @deprecated Use Button instead. Removed in v3.0.0 */
   export { Button as ButtonLegacy } from './components/Button';
   ```
2. Update README with migration instructions for consumers
3. Create detailed migration guide for library users
4. Publish v2.0.0 with breaking change release notes

**Impact**: Breaking change for consumers who need to wrap apps with `VanillaExtractThemeProvider`

### Phase 3: Remove Stitches (v3.0.0)

**When**: 6-12 months after Phase 2

**What happens**:

1. Delete all Stitches component files (`Button.tsx`, etc.)
2. Remove `stitches.config.ts` and all `*.themes.ts` files
3. Remove `.vanilla` suffix from filenames:
   - `Button.vanilla.tsx` → `Button.tsx`
   - `Button.vanilla.css.ts` → `Button.css.ts`
4. Remove `@stitches/react` from `package.json`
5. Update all documentation
6. Publish v3.0.0

**Result**: ~40% smaller bundle size (~30KB vs ~80KB)

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
