# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Faency is a React component library and design system for Traefik Labs, built with React, TypeScript, Stitches CSS-in-JS, and Radix UI Primitives. It provides accessible, themed components with light/dark mode support.

**Migration Status**: Currently migrating from Stitches to vanilla-extract (Phase 2 complete). Most components use Stitches (`.tsx`), some have vanilla-extract versions (`.vanilla.tsx`). Prefer editing Stitches versions unless explicitly migrating. See `VANILLA_EXTRACT_MIGRATION.md` for migration status and `VANILLA_EXTRACT_DEVELOPER_GUIDE.md` for comprehensive migration instructions.

## Development Commands

### Core Development

- `yarn install` - Install dependencies
- `yarn patch-package` - Apply necessary patches to Stitches after installation
- `yarn storybook` - Start Storybook development server at http://localhost:6006
- `yarn build` - Build the library for production
- `yarn lint` - Lint TypeScript/React files in components directory
- `yarn lint:fix` - Auto-fix linting issues
- `yarn test` - Run Jest tests in watch mode
- `yarn test:ci` - Run tests in CI mode (silent, non-watch)

### Release

- `yarn release` - Build and publish using semantic-release

## Architecture

### Styling System

- **Stitches CSS-in-JS**: Current primary styling system with design tokens and utilities
- **vanilla-extract**: New styling system (migration in progress - see `VANILLA_EXTRACT_DEVELOPER_GUIDE.md` for how to migrate components)
- **Build Tool**: Vite with vanilla-extract plugin
- **Design Tokens**: Defined in `stitches.config.ts` (Stitches) and `styles/tokens.css.ts` (vanilla-extract)
- **Theme Support**: Light/dark themes with customizable primary colors
- **Component Themes**: Stitches components have theme files (e.g., `Button.themes.ts`)

### Component Structure

Components follow a consistent pattern:

- `ComponentName.tsx` - Main component implementation
- `ComponentName.stories.tsx` - Storybook stories
- `ComponentName.test.tsx` - Jest tests (where applicable)
- `ComponentName.themes.ts` - Theme definitions for light/dark modes
- `index.ts` - Exports

### Key Files

- `stitches.config.ts` - Stitches configuration with design tokens, utilities, and theme setup
- `colors/` - Color palette definitions (light/dark variants)
- `index.ts` - Main library exports
- `components/FaencyProvider.tsx` - Root provider component

### Colors and Theming

- Primary colors: `neon`, `blue`, `orange`, `red`, `green`, `deepBlue`, `grayBlue`
- Dynamic theme generation based on primary color selection
- Component themes support both light and dark variants
- Colors are defined in `/colors/` with systematic naming

### Component Dependencies

- Built on Radix UI Primitives for accessibility
- Uses Stitches for styling with CSS-in-JS
- React 18+ and TypeScript 5+ required

## Development Workflow

### Code Style

- **No Unnecessary Comments**: Do not add obvious or redundant comments. Code should be self-explanatory through clear naming and structure. Only add comments when explaining complex logic, non-obvious decisions, or documenting public APIs.
- **No Unnecessary Emojis**: OK for console warnings/errors, but avoid in code comments or commit messages.

### Adding New Components

1. Create component directory in `/components/`
2. Implement main component with Stitches styling
3. Create theme file with `getLight()` and `getDark()` functions
4. Add Storybook stories with all variants
5. Write Jest tests for critical functionality
6. Export from main `index.ts`

### Working with Themes

- Theme objects must have `getLight(primaryColor)` and `getDark(primaryColor)` methods
- Register new themes in `stitches.config.ts` in both light and dark theme functions
- Use semantic color tokens for consistency

### Testing Strategy

- Jest with React Testing Library configured
- jsdom environment for DOM testing
- Focus on accessibility and component behavior
- Run tests before submitting changes
- Test coverage is currently being developed

## Important Notes

- **Patch Required**: Run `yarn patch-package` after installing dependencies to fix Stitches TypeScript 5 compatibility
- **Node Version**: Requires Node.js 20+
- **Conventional Commits**: Follow conventional commit format for semantic releases
- **Accessibility**: All components must be accessible and support keyboard navigation
- **Storybook**: Every component requires comprehensive stories showing all variants

## Vanilla Extract Migration Guidelines

When working with vanilla-extract components during the migration:

### Component Isolation Rule

**CRITICAL:** Never mix Stitches and vanilla-extract components. Always use vanilla-extract versions of components inside vanilla-extract components.

```tsx
// ❌ Wrong - mixing Stitches and vanilla-extract
import { Box } from '../Box';
import { Label } from '../Label';
<Box css={css}>...</Box>;

// ✅ Correct - use vanilla versions or plain HTML
import { BoxVanilla } from '../Box';
import { LabelVanilla } from '../Label';
<BoxVanilla css={css}>...</BoxVanilla>;
```

**Why:** Stitches components expect Stitches `CSS` type, but vanilla components use `CSSProps` type. Mixing them causes type errors and architectural inconsistency.

**When vanilla version doesn't exist:** Use plain HTML elements (`<div>`, `<span>`, etc.) with manual style processing.

### CSSProps Type System

Understanding the `CSSProps` interface is crucial for proper type safety:

**Key Pattern - `CSSProps['css']` vs `CSSProps`:**

```tsx
// For props that accept CSS properties directly
interface MyComponentProps {
  rootCss?: CSSProps['css']; // ✅ Correct - expects inner CSS object
  // NOT: rootCss?: CSSProps  // ❌ Wrong - expects wrapper with css property
}

// Usage in component
const { style: rootCssStyles, vars: rootVars } = processCSSProp(rootCss, colors);
```

**When to use each:**

- `css?: CSSProps['css']` - For props that pass directly to `processCSSProp()`
- `extends CSSProps` - For components that have a `css` prop on the interface

**Property Name Flexibility:**

The `CSSProps` interface accepts both abbreviated and full property names:

```tsx
// Both work identically
<Component css={{ p: '$4', m: '$2' }} />        // Abbreviated
<Component css={{ padding: '$4', margin: '$2' }} />  // Full names
```

This works because:

1. `CSSProps` has `[key: string]: any` index signature
2. `processCSSProp()` explicitly handles both forms in its switch statement

**When you see `as any` in tests:** This usually indicates a type mismatch. Check if the prop should be `CSSProps['css']` instead of `CSSProps`.

### Testing Vanilla Extract Components

**REQUIRED:** Every vanilla-extract component MUST have a corresponding `.vanilla.test.tsx` file with comprehensive tests.

**Test File Naming:**

- Vanilla-extract components: `ComponentName.vanilla.test.tsx`
- Stitches components: `ComponentName.test.tsx`

**Required Test Coverage:**

- Basic rendering and element types
- Custom className support
- All variant props (size, weight, variant, gradient, transform, noWrap, etc.)
- Custom styling (CSS prop and style prop)
- Style merging behavior
- Polymorphic rendering (if component supports `as` prop)
- Ref forwarding
- HTML attribute pass-through
- Accessibility testing with jest-axe
- Theme support (light/dark and different primary colors)

**Testing Pattern:**

```tsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { ComponentVanilla } from './Component.vanilla';

describe('ComponentVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render correctly', () => {
    const { container } = renderWithTheme(<ComponentVanilla>Content</ComponentVanilla>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<ComponentVanilla>Content</ComponentVanilla>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Use unmount() in loops to prevent "multiple elements found" errors
  it('should apply size variants', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    sizes.forEach((size) => {
      const { container, unmount } = renderWithTheme(
        <ComponentVanilla size={size}>Content</ComponentVanilla>,
      );
      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });
});
```

**Important Notes:**

- Always wrap components in `VanillaExtractThemeProvider` for tests
- Use `unmount()` in forEach loops to prevent DOM element accumulation
- For Radix-based components, use the correct role (e.g., `role="radio"` for ButtonSwitch items, not `role="button"`)
- Reference the `Input.vanilla.test.tsx` file as the gold standard for test patterns
