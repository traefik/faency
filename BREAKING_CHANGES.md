# Breaking Changes for v13.0.0

This document tracks breaking changes that will be introduced when migrating from Stitches to Vanilla Extract as the default styling system.

## Overview

These changes will occur in **v13.0.0** when we make Vanilla Extract the default export and deprecate Stitches versions. Users will need to update their code when upgrading.

**Current Version:** v12.x (Stitches-based, side-by-side with Vanilla Extract)
**Next Major Version:** v13.0.0 (Vanilla Extract only - complete migration with breaking changes)
**Current Status:** In development - migrating components to Vanilla Extract

---

## Component API Changes

### Polymorphic Components: `asChild` → `as` Prop

**Change:** `asChild` prop replaced with polymorphic `as` prop across all applicable components

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
- Consistent polymorphic pattern across all components
- Simpler implementation without Radix UI Slot dependency

**Impact:** Medium - Common pattern for components rendered as links or buttons

### Select: Native `<select>` → Radix Select

**Change:** `Select` wraps the native `<select>`. `SelectVanilla` is a custom select built on [Radix Select](https://www.radix-ui.com/primitives/docs/components/select), with its own API.

|                | Stitches `Select`                            | Vanilla Extract `SelectVanilla`                                                               |
| -------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Options        | `<option>` children                          | `SelectItemVanilla` children                                                                  |
| Option groups  | `<optgroup label="…">`                       | `SelectGroupVanilla` with a `SelectLabelVanilla`, and `SelectSeparatorVanilla` between groups |
| Change handler | `onChange(event)`, read `event.target.value` | `onValueChange(value)`                                                                        |
| Placeholder    | an `<option value="">`                       | the `placeholder` prop                                                                        |
| Ref            | the `<select>` element                       | the trigger `<button>`                                                                        |
| Several values | `multiple`                                   | not supported                                                                                 |
| On mobile      | the native picker of the device              | the Faency list                                                                               |
| `cursor` prop  | accepted, but has no visible effect          | removed                                                                                       |

`name`, `required`, `disabled`, `value` and `defaultValue` work the same, and the select still submits its value with a form.

**Before (v12.x with Stitches):**

```tsx
<Select value={type} onChange={(event) => setType(event.target.value)}>
  <option value="">Pick a type</option>
  <optgroup label="Layer 7">
    <option value="http">HTTP</option>
  </optgroup>
  <option value="tcp">TCP</option>
</Select>
```

**After (v13.x with Vanilla Extract):**

```tsx
<Select value={type} onValueChange={setType} placeholder="Pick a type">
  <SelectGroup>
    <SelectLabel>Layer 7</SelectLabel>
    <SelectItem value="http" description="Routes by host, path and headers">
      HTTP
    </SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectItem value="tcp">TCP</SelectItem>
</Select>
```

**Migration Guide:**

1. Replace each `<option>` with a `SelectItem`, and each `<optgroup>` with a `SelectGroup` holding a `SelectLabel`
2. Replace `onChange` with `onValueChange`, which receives the value instead of an event
3. Replace the empty `<option value="">` with the `placeholder` prop. An item's value can't be an empty string; set the value to `''` to show the placeholder again
4. Keep using the native select where you need `multiple`
5. With react-hook-form, `register` relies on the native change event and the `<select>` ref, so use a `Controller` instead:

```tsx
<Controller
  name="type"
  control={control}
  render={({ field }) => (
    <Select
      ref={field.ref}
      name={field.name}
      value={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
    >
      …
    </Select>
  )}
/>
```

**Rationale:**

- The open list matches the Faency styles in every browser
- Items can hold rich content, such as badges and descriptions
- Consistent with the other Radix-based components

**Impact:** Medium - Every `Select` needs its options and change handler rewritten

---

## Components Supporting Polymorphic `as` Prop

### Layout Components

- ✅ **Box** - Full polymorphic support (default: `div`)
- ✅ **Container** - Full polymorphic support (default: `div`)
- ✅ **Flex** - Full polymorphic support (default: `div`)
- ✅ **Grid** - Full polymorphic support (default: `div`)
- ✅ **Panel** - Full polymorphic support (default: `div`)
- ✅ **Elevation** - Full polymorphic support (default: `div`)
- ✅ **Card** - Full polymorphic support with smart defaults (default: `button` when `interactive`, otherwise `div`)

### Typography Components

- ✅ **Text** - Full polymorphic support (default: `span`)
- ✅ **Heading** - Full polymorphic support (default: `h1`)
- ✅ **Paragraph** - Full polymorphic support (default: `p`)
- ✅ **Blockquote** - Full polymorphic support (default: `blockquote`)
- ✅ **Label** - Full polymorphic support (default: `label`)

### Interactive Components

- ✅ **Badge** - Full polymorphic support (default: `span`)
- ✅ **Button** - Full polymorphic support (default: `button`)
- ✅ **IconButton** - Full polymorphic support (default: `button`)
- ✅ **Bubble** - Full polymorphic support (default: `div`)
- ✅ **ButtonSwitch** (Container & Item) - Full polymorphic support with conditional rendering
  - Container default: uses Radix `ToggleGroup.Root` when no `as` prop, otherwise renders as custom element with `role="group"`
  - Item default: uses Radix `ToggleGroup.Item` when no `as` prop, otherwise renders as custom element with `role="radio"`

---

## Components NOT Supporting Polymorphic `as` Prop

### Form Components

These components do not support the `as` prop because the actual form elements must remain fixed for proper functionality and browser compatibility:

- ❌ **Input** - Wrapper is fixed `div`, input element cannot be changed
- ❌ **TextField** - Uses `BoxVanilla` wrapper, input element cannot be changed
- ❌ **Textarea** - Wrapper is fixed `div`, textarea element cannot be changed

### Components Not Yet Migrated

- ⏳ **AriaTable** - Not yet migrated to Vanilla Extract
- Additional components may be added as migration continues

---

## Special Implementation Notes

### ButtonSwitch Conditional Rendering

ButtonSwitch uses a special conditional rendering pattern:

- **Without `as` prop:** Uses Radix UI primitives (`ToggleGroup.Root` and `ToggleGroup.Item`) for full Radix functionality
- **With `as` prop:** Renders as custom elements with appropriate ARIA roles
  - Container: `role="group"`
  - Item: `role="radio"`

**Important:** When using `as` prop on ButtonSwitch container, you must also use `as` prop on items to avoid Radix context errors.

```tsx
// ✅ Correct - both use `as` prop
<ButtonSwitchContainerVanilla as="nav">
  <ButtonSwitchItemVanilla as="a" value="1" href="/home">Home</ButtonSwitchItemVanilla>
  <ButtonSwitchItemVanilla as="a" value="2" href="/about">About</ButtonSwitchItemVanilla>
</ButtonSwitchContainerVanilla>

// ❌ Wrong - mixing will cause Radix context errors
<ButtonSwitchContainerVanilla as="nav">
  <ButtonSwitchItemVanilla value="1">Home</ButtonSwitchItemVanilla> {/* Missing `as` */}
</ButtonSwitchContainerVanilla>
```

### Card Smart Defaults

Card component has intelligent default element selection:

- `interactive={true}` → defaults to `<button>`
- `interactive={false}` or not set → defaults to `<div>`
- `as` prop always overrides the default

```tsx
// Renders as <button>
<CardVanilla interactive>Click me</CardVanilla>

// Renders as <div>
<CardVanilla>Static content</CardVanilla>

// Renders as <section> (overrides interactive default)
<CardVanilla as="section" interactive>Custom element</CardVanilla>
```

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
2. Add `defaultTheme` prop (either `"light"` or `"dark"`)
3. Optional: Add `forcedTheme` prop to override user preference
4. Optional: Add `primaryColor` prop to set the primary color theme

**Rationale:**

- Vanilla Extract requires theme class application at root
- More explicit theme control
- Better integration with system preferences
- Support for dynamic primary color theming

**Impact:** High - Required for all users

---

## Styling System Changes

### CSS Prop Processing

**Change:** Internal implementation change (no user-facing API change)

**Status:** No breaking change - CSS prop API remains identical

```tsx
// Both versions support the same API
<Badge css={{ px: '$4', py: '$6', bc: '$blue6' }} />

// Also supports full property names
<Badge css={{ padding: '$4', backgroundColor: '$blue6' }} />
```

**Note:** This is maintained for backward compatibility. The `css` prop continues to support token-based styling with both abbreviated and full property names.

---

## Migration Timeline

### Phase 1: Side-by-Side (Current - v12.x)

- Both Stitches and Vanilla Extract versions exported
- No breaking changes
- Users can opt-in to `*Vanilla` components
- This allows users to test Vanilla Extract versions before migration
- Components have `.vanilla.tsx` suffix in source
- **Currently in this phase** - actively migrating components

### Phase 2: Vanilla Extract Only (v13.0.0 - Future)

- **Complete switch to Vanilla Extract**
- Remove all Stitches code and dependencies
- Remove `.vanilla` suffix from filenames and exports
- All components use Vanilla Extract only
- Breaking changes documented above take effect
- Expected bundle size reduction

**Migration Steps (when upgrading to v13.0.0):**

1. Update imports: `import { Badge } from 'faency'` (remove `Vanilla` suffix)
2. Replace `FaencyProvider` with `VanillaExtractThemeProvider`
3. Update `asChild` usage to `as` prop pattern
4. Rewrite `Select` options and change handlers for the Radix-based `Select`
5. Test all components in your application
6. Update TypeScript types if using component type references

---

## Changelog Template for v13.0.0

```markdown
## [13.0.0] - YYYY-MM-DD

### BREAKING CHANGES

#### Polymorphic Components: `asChild` → `as` Prop

Layout, typography, and interactive components now use polymorphic `as` prop

- **Changed:** Replaced `asChild` prop with polymorphic `as` prop for better TypeScript support and ergonomics
  - Before: `<Badge asChild><a href="#">Link</a></Badge>`
  - After: `<Badge as="a" href="#">Link</Badge>`
  - Migration: Replace `asChild` with `as="elementType"`, move child element props to component, remove wrapper element
  - See [Migration Guide](./BREAKING_CHANGES.md#polymorphic-components-aschild--as-prop)

#### Select

- **Changed:** `Select` is built on Radix Select instead of the native `<select>`
  - Before: `<Select onChange={(event) => …}><option value="http">HTTP</option></Select>`
  - After: `<Select onValueChange={(value) => …}><SelectItem value="http">HTTP</SelectItem></Select>`
  - `multiple` is no longer supported
  - See [Migration Guide](./BREAKING_CHANGES.md#select-native-select--radix-select)

#### Theme Provider

- **Changed:** Requires `VanillaExtractThemeProvider` instead of `FaencyProvider`
  - Before: `<FaencyProvider><App /></FaencyProvider>`
  - After: `<VanillaExtractThemeProvider defaultTheme="light"><App /></VanillaExtractThemeProvider>`
  - See [Migration Guide](./BREAKING_CHANGES.md#provider-changes)

#### Component Exports

- **Changed:** Removed `.vanilla` suffix from all component exports
  - Before: `import { BadgeVanilla } from 'faency'`
  - After: `import { Badge } from 'faency'`
  - All components now use Vanilla Extract by default

### Added

- Polymorphic `as` prop for layout, typography, and interactive components with full TypeScript support
- Better performance with build-time CSS generation via Vanilla Extract
- Improved TypeScript inference for element-specific props
- Smart default element selection (e.g., Card defaults to button when interactive)
- Conditional rendering pattern for Radix-based components (ButtonSwitch)

### Removed

- **Complete removal of Stitches styling system**
- Removed `@stitches/react` dependency
- Removed all `*.themes.ts` files
- Removed `stitches.config.ts`
- Removed `@radix-ui/react-slot` dependency (replaced with polymorphic pattern)
- Removed `.vanilla` suffix from component exports
- Removed `FaencyProvider` (replaced with `VanillaExtractThemeProvider`)

### Performance

- Build-time CSS generation for faster runtime performance
- Reduced JavaScript payload with static CSS extraction
```

---

## Communication Plan

### Before v13.0.0 Release

1. **Documentation:**
   - Update README with migration guide
   - Create detailed migration examples for common patterns
   - Document all breaking changes with before/after code samples
   - Add migration codemods (if feasible)
   - Create visual guide showing polymorphic component usage

2. **Release Notes:**
   - Comprehensive changelog with all breaking changes
   - Step-by-step migration guide
   - Common pitfalls and solutions

3. **Testing:**
   - Comprehensive test coverage for all polymorphic components
   - Integration tests for migration paths
   - Performance benchmarks

### After v13.0.0 Release

1. **Support Period:**
   - Maintain v12.x branch for critical bug fixes
   - Community support in GitHub issues
   - Dedicated migration support channel

2. **Feedback Collection:**
   - Monitor migration issues and pain points
   - Update guide based on common problems
   - Create FAQ for frequently asked questions

---

## Questions & Considerations

### Should we provide a codemod?

For changes like `asChild` → `as` and `FaencyProvider` → `VanillaExtractThemeProvider`, a codemod could automate migration:

```bash
npx @faency/migrate
```

**Potential transformations:**

1. Replace `asChild` pattern with `as` prop
2. Update provider imports and usage
3. Remove `Vanilla` suffix from component imports
4. Update component type references

**Decision:** TBD - To be evaluated based on migration complexity

### Should we maintain a compatibility layer?

A temporary compatibility shim could ease migration:

```tsx
// Compatibility mode (deprecated, to be removed in v14.0.0)
import { Badge } from 'faency/compat';

<Badge asChild>
  <a href="#">Link</a>
</Badge>;
```

**Decision:** TBD - Evaluate based on community feedback

---

## Document Maintenance

This document should be updated as:

- New components are migrated
- Breaking changes are identified
- Migration patterns are refined
- User feedback is received
- Edge cases are discovered

**Last Updated:** 2026-01-02
**Status:** Work in Progress - Component migration ongoing
