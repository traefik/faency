# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Faency is a React component library and design system for Traefik Labs, built with React, TypeScript, Stitches CSS-in-JS, and Radix UI Primitives. It provides accessible, themed components with light/dark mode support.

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

- **Stitches CSS-in-JS**: Core styling system with design tokens and utilities
- **Design Tokens**: Defined in `stitches.config.ts` with semantic color system
- **Theme Support**: Light/dark themes with customizable primary colors
- **Component Themes**: Each component has its own theme file (e.g., `Button.themes.ts`)

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

- Jest with React Testing Library setup
- jsdom environment for DOM testing
- Focus on accessibility and component behavior
- Run tests before submitting changes

## Important Notes

- **Patch Required**: Run `yarn patch-package` after installing dependencies to fix Stitches TypeScript 5 compatibility
- **Node Version**: Requires Node.js 20+
- **Conventional Commits**: Follow conventional commit format for semantic releases
- **Accessibility**: All components must be accessible and support keyboard navigation
- **Storybook**: Every component requires comprehensive stories showing all variants
