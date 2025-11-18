# Breaking Changes for v13.0.0

This document tracks breaking changes that will be introduced when migrating from Stitches to Vanilla Extract as the default styling system.

## Overview

These changes will occur in **v13.0.0** when we make Vanilla Extract the default export and deprecate Stitches versions. Users will need to update their code when upgrading.

**Current Version:** v12.x (Stitches-based, side-by-side with Vanilla Extract)
**Next Major Version:** v13.0.0 (Vanilla Extract only - complete migration with breaking changes)

---

## Component API Changes

### Polymorphic Components: `asChild` → `as` Prop

**Affected Components:** Badge, Button, AriaTable

**Change:** `asChild` prop replaced with polymorphic `as` prop

**Before (v12.x with Stitches):**

```tsx
import { Badge } from 'faency';

// Using asChild with a child element
<Badge asChild variant="success">
  <a href="/profile">Link Badge</a>
</Badge>;
```

**After (v13.x with Vanilla Extract):**

```tsx
import { Badge } from 'faency';

// Using as prop directly
<Badge as="a" href="/profile" variant="success">
  Link Badge
</Badge>;
```

**Migration Guide:**

1. Replace `asChild` with `as="elementType"`
2. Move the child element's props to the component itself
3. Remove the wrapper element and move children to the component's children

**Rationale:**

- More ergonomic API (no wrapper element needed)
- Better TypeScript support (element-specific props are typed correctly)
- Consistent polymorphic pattern across all components (Box, Text, Badge, etc.)
- Simpler implementation without Radix UI Slot dependency

**Impact:** Medium - Common pattern for components rendered as links or buttons

**Components to Track:**

- ✅ Badge - Migrated to polymorphic `as` pattern
- [ ] Button - Needs migration to polymorphic `as` pattern
- [ ] AriaTable - Needs migration to polymorphic `as` pattern

---

## Provider Changes

### Theme Provider Requirement

**Change:** `VanillaExtractThemeProvider` required at app root

**Before (v12.x with Stitches):**

```tsx
import { FaencyProvider } from 'faency';

<FaencyProvider>
  <App />
</FaencyProvider>;
```

**After (v13.x with Vanilla Extract):**

```tsx
import { VanillaExtractThemeProvider } from 'faency';

<VanillaExtractThemeProvider defaultTheme="light">
  <App />
</VanillaExtractThemeProvider>;
```

**Migration Guide:**

1. Replace `FaencyProvider` with `VanillaExtractThemeProvider`
2. Add `defaultTheme` prop (either "light" or "dark")
3. Optional: Add `forcedTheme` prop to override user preference

**Rationale:**

- Vanilla Extract requires theme class application at root
- More explicit theme control
- Better integration with system preferences

**Impact:** High - Required for all users

---

## Styling System Changes

### CSS Prop Processing

**Change:** Internal implementation change (no user-facing API change)

**Status:** No breaking change - CSS prop API remains identical

```tsx
// Both versions support the same API
<Badge css={{ px: '$4', py: '$6', bc: '$blue6' }} />
```

**Note:** This is maintained for backward compatibility.

---

## Future Breaking Changes (TBD)

### Components Not Yet Migrated

The following components will be migrated and may have breaking changes:

- [ ] Button - Review `as` prop implementation
- [ ] Text - Review polymorphic implementation
- [ ] Link - May consolidate with Button `as="a"` pattern
- [ ] (Add more as migration progresses)

**Action Required:** Document breaking changes as each component is migrated.

---

## Migration Timeline

### Phase 1: Side-by-Side (Current - v12.x)

- Both Stitches and Vanilla Extract versions exported
- No breaking changes
- Users can opt-in to `*Vanilla` components
- This allows users to test Vanilla Extract versions before migration

### Phase 2: Vanilla Extract Only (v13.0.0)

- **Complete switch to Vanilla Extract**
- Remove all Stitches code and dependencies
- Remove `.vanilla` suffix from filenames and exports
- All components use Vanilla Extract only
- Breaking changes documented above take effect
- ~40% bundle size reduction vs v12.x

---

## Communication Plan

### Before v13.0.0 Release

1. **Documentation:**
   - Update README with migration guide
   - Create detailed migration examples
   - Add migration codemods (if feasible)

2. **Release Notes:**
   - Comprehensive changelog
   - Migration guide in release notes
   - Video/blog post explaining changes (optional)

### After v13.0.0 Release

1. **Support Period:**
   - Maintain v12.x branch for critical bug fixes (6 months)
   - Community support in GitHub issues

2. **Feedback Collection:**
   - Monitor migration issues
   - Update guide based on common problems

---

## Questions & Considerations

### Should we provide a codemod?

For simple changes like `asChild` → `as`, a codemod could help users migrate automatically:

```bash
npx faency-migrate
```

**Decision:** TBD - Evaluate based on number of breaking changes

---

## Changelog Template for v13.0.0

```markdown
## [13.0.0] - YYYY-MM-DD

### BREAKING CHANGES

#### Polymorphic Components: `asChild` → `as` Prop

Components affected: Badge, Button, AriaTable

- **Changed:** Replaced `asChild` prop with polymorphic `as` prop for better TypeScript support and ergonomics
  - Before: `<Badge asChild><a href="#">Link</a></Badge>`
  - After: `<Badge as="a" href="#">Link</Badge>`
  - Migration: Replace `asChild` with `as="elementType"`, move child element props to component, remove wrapper element
  - See [Migration Guide](./BREAKING_CHANGES.md#polymorphic-components-aschild--as-prop)

#### Theme Provider

- **Changed:** Requires `VanillaExtractThemeProvider` instead of `FaencyProvider`
  - Before: `<FaencyProvider><App /></FaencyProvider>`
  - After: `<VanillaExtractThemeProvider defaultTheme="light"><App /></VanillaExtractThemeProvider>`
  - See [Migration Guide](./BREAKING_CHANGES.md#provider-changes)

### Added

- Polymorphic `as` prop for Badge, Button, and AriaTable components with full TypeScript support
- Better performance with build-time CSS generation via Vanilla Extract
- Improved TypeScript inference for element-specific props

### Removed

- **Complete removal of Stitches styling system**
- Removed `@stitches/react` dependency
- Removed all `*.themes.ts` files
- Removed `stitches.config.ts`
- Removed `@radix-ui/react-slot` dependency (replaced with polymorphic pattern)
- Removed `.vanilla` suffix from component exports (e.g., `BadgeVanilla` → `Badge`)
```

---

## Document Maintenance

This document should be updated as:

- New components are migrated
- Breaking changes are identified
- Migration patterns are refined
- User feedback is received

**Last Updated:** 2025-11-18
**Status:** Draft - Will be finalized before v13.0.0 release
