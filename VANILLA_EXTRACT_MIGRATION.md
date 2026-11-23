# Vanilla Extract Migration Guide

This document outlines the progressive migration strategy from Stitches to vanilla-extract.

## Current Status

✅ **Phase 1 Complete**: Foundation Setup

- ✅ Vanilla-extract design tokens system (`styles/tokens.css.ts`)
- ✅ Light/dark theme infrastructure (`styles/themes.css.ts`)
- ✅ Utility recipes system (`styles/utils.css.ts`)
- ✅ Proof of concept Box component (`components/Box/Box.vanilla.tsx`)

✅ **Phase 2 Complete**: Coexistence Strategy

- ✅ Setup both systems to work together
- ✅ Migration tooling and patterns
- ✅ Storybook theme integration
- ✅ Developer migration guide

🚧 **Phase 3 In Progress**: Component-by-Component Migration
⏳ **Phase 4 Planned**: Remove Stitches (next major release, see [BREAKING_CHANGES.md](./BREAKING_CHANGES.md))

## Architecture Overview

### Current Stitches System

```
stitches.config.ts
├── Design tokens (colors, space, fonts, etc.)
├── Component themes (*.themes.ts files)
├── Utility functions (px, py, bc, etc.)
└── Dynamic theming (light/dark + primary colors)
```

### New Vanilla-Extract System

```
styles/
├── tokens.css.ts (theme contract)
├── themes.css.ts (light/dark × primary color theme classes)
├── themeContext.tsx (VanillaExtractThemeProvider)
├── cssProps.ts + useInlineStyle.ts (Stitches-like `css` prop)
├── polymorphic.ts (`as` prop types)
├── utils.css.ts (utility recipes)
└── index.ts (main exports)
components/X/X.theme.ts (component tokens, merged into themes.css.ts)
```

See the [Developer Guide](./VANILLA_EXTRACT_DEVELOPER_GUIDE.md#architecture-overview) for the full file list.

## Migration Strategy

### Phase 1: Foundation ✅

- [x] Install vanilla-extract dependencies
- [x] Configure Vite plugin
- [x] Create design tokens system
- [x] Create theming infrastructure
- [x] Create utility recipes
- [x] Proof of concept component

### Phase 2: Coexistence ✅

- [x] Ensure both systems can work together
- [x] Create migration patterns
- [x] Build configuration verified (Vite plugin)
- [x] Theme provider Storybook integration
- [x] Developer migration guide created

### Phase 3: Component Migration 🚧

**Migrated (Stitches and `*Vanilla` versions exported side by side):**

AccessibleIcon, AriaTable, Avatar, Badge, Blockquote, Box, Bubble, Button, ButtonSwitch, Card, CodeBlock, Container, DropdownMenu, Elevation, Field, Flex, Grid, Heading (H1–H6), IconButton, Image, Input, Label, List (Ul, Ol, Li), Panel, Paragraph, Popover, RowLink (vanilla version not exported), Skeleton, Table, Text, TextField, Textarea

**Vanilla-only (new components, no Stitches version):**

Combobox, Meter, SegmentedControl, Spinner, SplitLayout, Toast

**Not migrated yet:**

Accordion, Alert, Checkbox, DateTimePicker, DateTimePickerInput, Dialog, Link, Navigation, NavigationMenu, NavigationTree, Overlay, Radio, RadioAccordion, Select, SidePanel, Switch, Tabs, Tooltip, VisuallyHidden

**For Each Component:**

1. Create `ComponentName.vanilla.css.ts` with styles
2. Create `ComponentName.vanilla.tsx` with React component
3. Add a Comparison story showing both versions
4. Add `ComponentName.vanilla.test.tsx`
5. Export the `*Vanilla` version next to the Stitches one; the Stitches version stays until Phase 4
6. Record any consumer-facing API difference in [BREAKING_CHANGES.md](./BREAKING_CHANGES.md)

New components skip the Stitches version and the Comparison story.

### Phase 4: Cleanup ⏳

- [ ] Remove Stitches configuration
- [ ] Remove `*.themes.ts` files
- [ ] Remove the `.vanilla` file suffix and `Vanilla` export suffix
- [ ] Update build process
- [ ] Update documentation

## Component Migration Pattern

See [VANILLA_EXTRACT_DEVELOPER_GUIDE.md](./VANILLA_EXTRACT_DEVELOPER_GUIDE.md) for detailed migration steps and patterns.

## Key Considerations

### 1. Theme System Compatibility

- Maintain same primary color system (`neon`, `blue`, `orange`, `red`, `green`, `deepBlue`, `grayBlue`)
- Preserve light/dark theme switching
- Keep component-specific theme token names

### 2. Developer Experience

- Maintain similar API where possible
- Provide clear migration path for each component
- Preserve TypeScript support and autocomplete

### 3. Build Process

- Both systems work with Vite
- No runtime performance impact during migration
- Bundle size should improve after migration complete

### 4. Testing Strategy

- Run both versions in Storybook during migration
- Maintain existing tests
- Visual regression testing

## Developer Resources

📘 **[Vanilla Extract Developer Guide](./VANILLA_EXTRACT_DEVELOPER_GUIDE.md)** - Comprehensive guide for developers on how to migrate components step-by-step

📕 **[Breaking Changes](./BREAKING_CHANGES.md)** - What consumers will need to change when Stitches is removed

## Next Steps

1. 🚧 **Phase 3**: Migrate the remaining components listed above
   - Follow the [Developer Guide](./VANILLA_EXTRACT_DEVELOPER_GUIDE.md) for migration steps
   - Validate migrated components work exactly like originals
2. **Phase 4**: Remove Stitches after all components are migrated

## Benefits After Migration

- **Better Performance**: Vanilla-extract generates optimized CSS at build time
- **Better TypeScript**: Strong typing for design tokens and utilities
- **Better Tooling**: Better IDE support and autocomplete
- **Better Maintainability**: More explicit theming system
- **Future-proof**: vanilla-extract is actively maintained and growing
