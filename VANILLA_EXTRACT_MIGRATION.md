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
⏳ **Phase 4 Planned**: Remove Stitches

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
├── themes.css.ts (light/dark theme implementations)
├── utils.css.ts (utility recipes)
└── index.ts (main exports)
```

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

### Phase 3: Component Migration ⏳

**Priority Order:**

1. Simple components (Box, Text, Flex, Grid)
2. Components without themes (Avatar, Image, Container)
3. Components with simple themes (Button, Input)
4. Complex components (Navigation, Table, Dialog)

**For Each Component:**

1. Create `ComponentName.vanilla.css.ts` with styles
2. Create `ComponentName.vanilla.tsx` with React component
3. Update stories to test both versions
4. Ensure TypeScript compatibility
5. Replace original after validation

### Phase 4: Cleanup ⏳

- [ ] Remove Stitches configuration
- [ ] Remove `*.themes.ts` files
- [ ] Update build process
- [ ] Update documentation

## Component Migration Pattern

See [VANILLA_EXTRACT_DEVELOPER_GUIDE.md](./VANILLA_EXTRACT_DEVELOPER_GUIDE.md) for detailed migration steps and patterns.

## Key Considerations

### 1. Theme System Compatibility

- Maintain same primary color system (`neon`, `blue`, `orange`, etc.)
- Preserve light/dark theme switching
- Keep component-specific theme patterns

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

## Next Steps

1. ✅ **Complete Phase 2**: Coexistence confirmed working ✓
2. 🚧 **Phase 3 In Progress**: Migrating components
   - Follow the [Developer Guide](./VANILLA_EXTRACT_DEVELOPER_GUIDE.md) for migration steps
   - Validate migrated components work exactly like originals
3. **Continue migration**: Scale to more complex components
4. **Phase 4**: Remove Stitches after all components migrated

## Benefits After Migration

- **Better Performance**: Vanilla-extract generates optimized CSS at build time
- **Better TypeScript**: Strong typing for design tokens and utilities
- **Better Tooling**: Better IDE support and autocomplete
- **Better Maintainability**: More explicit theming system
- **Future-proof**: vanilla-extract is actively maintained and growing
