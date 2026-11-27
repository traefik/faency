# Breaking Changes for v14.0.0

This document tracks breaking changes that will be introduced when Vanilla Extract replaces Stitches as the styling system.

## Overview

These changes will occur in the next major release (**v14.0.0** at the time of writing), when the Vanilla Extract versions take over the plain component names and Stitches is removed. Users will need to update their code when upgrading.

**Current Version:** v13.x (Stitches components, with `*Vanilla` versions exported side by side)
**Next Major Version:** v14.0.0 (Vanilla Extract only)
**Current Status:** In development - migrating components to Vanilla Extract (see [VANILLA_EXTRACT_MIGRATION.md](./VANILLA_EXTRACT_MIGRATION.md))

Most items below can already be tested today by switching to the `*Vanilla` export of a component.

---

## Component API Changes

### Polymorphic Components: `asChild` → `as` Prop

**Change:** `asChild` prop replaced with polymorphic `as` prop across all applicable components

**Before (v13.x with Stitches):**

```tsx
import { Badge } from '@traefik-labs/faency';

<Badge asChild variant="success">
  <a href="/profile">Link Badge</a>
</Badge>;
```

**After (v14.x with Vanilla Extract):**

```tsx
import { Badge } from '@traefik-labs/faency';

<Badge as="a" href="/profile" variant="success">
  Link Badge
</Badge>;
```

The same applies to the Radix-based parts that render an element. `as` also takes a component, and the Radix behavior is applied to it:

```tsx
// Before
<PopoverTrigger asChild>
  <Button variant="primary">Open</Button>
</PopoverTrigger>

// After
<PopoverTrigger as={Button} variant="primary">
  Open
</PopoverTrigger>
```

**Migration Guide:**

1. Replace `asChild` with `as="elementType"` (or `as={Component}`)
2. Move the child element's props to the component itself
3. Remove the wrapper element and move children to the component's children

**Affected:** Badge, Button, Label (no longer built on Radix `Label.Root`), DialogTrigger, DialogClosePrimitive, DialogTitle, DialogDescription, DialogOverlay, DropdownMenuTrigger, DropdownMenuItem, PopoverTrigger, PopoverClose, PopoverAnchor, TabsTrigger, VisuallyHidden. `DialogContent`, `SidePanel` and the other DropdownMenu, Popover and Tabs parts no longer accept `asChild` at all. `RowLink` keeps `asChild`.

**Rationale:**

- More ergonomic API (no wrapper element needed)
- Better TypeScript support (element-specific props are typed correctly)
- Consistent polymorphic pattern across all components

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

**Before (v13.x with Stitches):**

```tsx
<Select value={type} onChange={(event) => setType(event.target.value)}>
  <option value="">Pick a type</option>
  <optgroup label="Layer 7">
    <option value="http">HTTP</option>
  </optgroup>
  <option value="tcp">TCP</option>
</Select>
```

**After (v14.x with Vanilla Extract):**

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

### Switch: Spacing and Focus Ring

**Change:** `SwitchVanilla` drops the outer margin of the Stitches `Switch` and fixes two styling inconsistencies.

|                   | Stitches `Switch`                     | Vanilla Extract `SwitchVanilla` |
| ----------------- | ------------------------------------- | ------------------------------- |
| Outer margin      | `8px` (`$2`) at size `1`, none at `2` | none at any size                |
| Large thumb inset | `2px`                                 | `3px`, scaled like the size     |
| Focus ring        | on any focus, including mouse clicks  | on keyboard focus only          |

**Before (v13.x with Stitches):**

```tsx
<Switch />
```

**After (v14.x with Vanilla Extract):**

```tsx
<Switch css={{ m: '$2' }} />
```

**Migration Guide:**

1. Where a size `1` switch relied on its built-in margin, add `css={{ m: '$2' }}` or space it from its parent layout, e.g. a `Flex` with `gap`

**Rationale:**

- Components should not add space outside their own box, and the margin applied to one size only

**Impact:** Low - Layouts with a default-size switch get 8px tighter around it

### AriaTr: `asChild` Removed

**Change:** `AriaTr` no longer accepts `asChild`. Use `href` (with `linkAs` for a router link component) to make a row a link.

```tsx
// Before
<AriaTr asChild>
  <a href="/item/1">…</a>
</AriaTr>

// After
<AriaTr href="/item/1">…</AriaTr>
<AriaTr href="/item/1" linkAs={RouterLink}>…</AriaTr>
```

`AriaTr` also throws in more cases: a row with a `fullColSpan` cell can no longer use `emptyFirstColumn` or `collapsedContent`, since those add cells next to it.

**Impact:** Low

### Dialog: `StyledContent` Removed

**Change:** `StyledContent` (the dialog content without the close button) is no longer exported. `DialogContent` takes `noCloseIcon` instead.

```tsx
// Before
<StyledContent>…</StyledContent>

// After
<DialogContent noCloseIcon>…</DialogContent>
```

**Impact:** Low

### Components That Lost the `as` Prop

Stitches `styled` components accepted `as`. These vanilla versions render fixed elements:

- **Ul, Ol, Li** - always `ul`, `ol`, `li`
- **Table parts** (`Table`, `Thead`, `Tbody`, `Tfoot`, `Tr`, `Th`, `Td`, `Caption`) - always the matching table element

**Migration:** Use the semantic element the component renders, or wrap it.

### Changed Default Elements

- **Blockquote** - renders `<blockquote>` instead of `<span>`. Pass `as="span"` to keep the old element.

### Paragraph: Text Variants Removed

**Change:** Paragraph only accepts `size`. The Text variants it used to forward (`weight`, `variant`, `gradient`, `transform`, `noWrap`) are gone.

**Migration:** Use `css`/`className`, or wrap the content in `Text`.

### Flex: `align` Values Removed

The `align` values `space-evenly`, `space-between` and `space-around` are removed. They were never valid for `align-items`, so only TypeScript is affected: delete them.

The same applies to `Li`, which takes the Flex layout props.

### Input and TextField: `className` and `style` Target the Wrapper

**Change:** In Stitches, `className` and `style` landed on the inner `<input>`; now they land on the wrapper `<div>` (as `css` already did).

**Migration:** Update selectors to target the wrapper, or use `& > input` in your stylesheet.

### Avatar: Wrapper `<div>` Removed

**Change:** Avatar no longer renders a wrapper `<div>` around the avatar. `css`, `style`, `className` and `ref` all target the avatar element, and `width`, `height` and `position` passed through `css` are no longer overridden.

**Migration:** Update selectors or tests that expected the wrapper, and drop any `width`/`height` from `css` that relied on being ignored.

### Removed Style Exports

- `panelStyles` → use `<Panel>`
- `elevationVariants` → use `<Elevation>` or `<Card elevation>`
- `overlayStyles` → use `<Overlay>`

### Visual Changes

- **Panel** no longer has a box shadow (Dropdown and Popover set their own elevation, so they are unaffected)
- **Badge** `alphaBg` uses the `A3` color step instead of `A6`
- **Alert** `gray` variant ring uses `gray9` (the neutral tone) instead of `slate9`

---

### Checkbox: Indeterminate State, Focus Ring and Disabled Icon

**Change:** `CheckboxVanilla` styles the indeterminate state and changes when its focus ring shows and how a disabled checked box looks.

|                                 | Stitches `Checkbox`                    | Vanilla Extract `CheckboxVanilla`         |
| ------------------------------- | -------------------------------------- | ----------------------------------------- |
| `checked="indeterminate"`       | no box, shows a check mark             | filled like checked, shows a dash         |
| Focus ring                      | on any focus, including mouse clicks   | on keyboard focus only, also when checked |
| Invalid border on a focused box | hidden by the focus ring after a click | stays visible after a click               |
| Disabled checked icon (light)   | white, nearly invisible                | grey                                      |

**Migration Guide:**

1. No code change is needed
2. Where an app styled the indeterminate state itself, for example with a dash icon or a `css` prop on `[data-state=indeterminate]`, remove that styling

**Rationale:**

- The indeterminate state is part of the Radix Checkbox API, but the Stitches version rendered it as a checked box with no border
- Matches the keyboard-only focus ring of `Switch` and `Radio`
- A disabled checked box should still show that it is checked

**Impact:** Low - Visual only, the API is unchanged

---

### DateTimePicker and DateTimePickerInput: Inline CSS

**Change:** The `css`-style props of both components apply inline styles only, and the input's `inputProps` are typed.

|                                | Stitches                                 | Vanilla Extract                                                    |
| ------------------------------ | ---------------------------------------- | ------------------------------------------------------------------ |
| `css`, `inputCSS`, `pickerCSS` | Stitches CSS, including nested selectors | inline styles only, no nested selectors such as `& input`          |
| `inputProps` type              | not checked                              | `InputVanillaProps`, without `css`, `onChange`, `type` and `value` |
| HTML attributes on the root    | not passed through                       | passed to the root `div`                                           |

**Before (v12.x with Stitches):**

```tsx
<DateTimePickerInput inputCSS={{ '& input': { fontFamily: '$mono' } }} />
```

**After (v13.x with Vanilla Extract):**

```ts
// DateTimePickerInput.css.ts
import { globalStyle, style } from '@vanilla-extract/css';

export const monoInput = style({});

// inputProps.className lands on the input's wrapper, so target the <input> inside it.
globalStyle(`${monoInput} input`, { fontFamily: 'monospace' });
```

```tsx
<DateTimePickerInput inputProps={{ className: monoInput }} />
```

**Migration Guide:**

1. Move nested selectors from `css`, `inputCSS` and `pickerCSS` into a class name passed through `className` or `inputProps.className`

**Rationale:**

- Vanilla Extract styles are generated at build time, so runtime `css` props cannot hold selectors

**Impact:** Low - Only code using nested selectors in the `css` props needs changes

---

## Components Supporting Polymorphic `as` Prop

### Layout Components

- ✅ **Box** - default: `div`
- ✅ **Container** - default: `div`
- ✅ **Flex** - default: `div`
- ✅ **Grid** - default: `div`
- ✅ **Panel** - default: `div`
- ✅ **Elevation** - default: `div`
- ✅ **Overlay** - default: `div`
- ✅ **Card** - default: `button` when `interactive`, otherwise `div`
- ✅ **Alert** - same defaults as Card
- ✅ **Skeleton** - default: `div`
- ✅ **Image** - default: `img`

### Typography Components

- ✅ **Text** - default: `span`
- ✅ **H1–H6** - default: the matching heading element
- ✅ **Paragraph** - default: `p`
- ✅ **Blockquote** - default: `blockquote`
- ✅ **Label** - default: `label`
- ✅ **VisuallyHidden** - default: `span`, keeps the hiding styles on the `as` element

### Interactive Components

- ✅ **Badge** - default: `button` when `interactive`, otherwise `span`
- ✅ **Button** - default: `button`
- ✅ **IconButton** - default: `button`
- ✅ **Bubble** - default: `div`
- ✅ **ButtonSwitch** (Container & Item) - conditional rendering, see below
- ✅ **DropdownMenuTrigger** - default: `button`, keeps the Radix trigger behavior on the `as` element
- ✅ **DropdownMenuItem** - default: `div`, keeps the Radix menu item behavior on the `as` element
  - The other DropdownMenu parts take neither `as` nor `asChild`
- ✅ **PopoverTrigger** / **PopoverClose** - default: `button`, keeps the Radix behavior on the `as` element
- ✅ **PopoverAnchor** - default: `div`
  - `PopoverContent` takes neither `as` nor `asChild`
- ✅ **TooltipTrigger** - default: `button`, keeps the Radix trigger behavior on the `as` element
  - `TooltipContent` takes neither `as` nor `asChild`, and its arrow is no longer wrapped in a `<div>`
- ✅ **DialogTrigger** / **DialogClosePrimitive** - default: `button`, keeps the Radix behavior on the `as` element
- ✅ **DialogTitle** - default: `h2`; **DialogDescription** - default: `p`; **DialogOverlay** - default: `div`
  - `DialogContent` and `DialogCloseIconButton` take neither `as` nor `asChild`
- ✅ **TabsTrigger** - default: `button`, keeps the Radix tab behavior on the `as` element
  - `TabsContainer`, `TabsList` and `TabsContent` take neither `as` nor `asChild`

---

## Components NOT Supporting Polymorphic `as` Prop

### Form Components

These components do not support the `as` prop because the actual form elements must remain fixed for proper functionality and browser compatibility:

- ❌ **Input** - Wrapper is fixed `div`, input element cannot be changed
- ❌ **TextField** - Built on `Field` and `Input`, input element cannot be changed
- ❌ **Textarea** - Wrapper is fixed `div`, textarea element cannot be changed
- ❌ **DateTimePicker** - Fixed widget, root is a `div`
- ❌ **DateTimePickerInput** - Wrapper is fixed `div`, input element cannot be changed

### Fixed-Element Components

- ❌ **Ul, Ol, Li** and **Table parts** - see [Components That Lost the `as` Prop](#components-that-lost-the-as-prop)
- ❌ **AriaTable parts**, **Avatar**, **CodeBlock**, **Field**, **AccessibleIcon**

### Components Not Yet Migrated

See the "Not migrated yet" list in [VANILLA_EXTRACT_MIGRATION.md](./VANILLA_EXTRACT_MIGRATION.md#phase-3-component-migration-). Entries are added here as they are migrated.

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

**Change:** `VanillaExtractThemeProvider` is required at the app root. Vanilla components throw outside it.

This already applies today to any `*Vanilla` component. It also mounts the Radix Tooltip provider, so vanilla tooltips don't need `FaencyProvider`. `FaencyProvider` is still needed next to it for the color scheme context used by Stitches components:

```tsx
import { FaencyProvider, VanillaExtractThemeProvider } from '@traefik-labs/faency';

<VanillaExtractThemeProvider defaultTheme="system" primaryColor="blue">
  <FaencyProvider>
    <App />
  </FaencyProvider>
</VanillaExtractThemeProvider>;
```

**Props:**

- `defaultTheme`: `"light"`, `"dark"` or `"system"` (default `"system"`)
- `forcedTheme`: `"light"` or `"dark"`, overrides the user preference
- `primaryColor`: `neon`, `blue`, `orange`, `red`, `green`, `deepBlue` or `grayBlue` (default `blue`)

The provider applies the theme class to `document.body`, so the Stitches `darkTheme`/`lightTheme` classes are no longer needed. What happens to `FaencyProvider` in v14.0.0 is still open (see [Questions & Considerations](#questions--considerations)).

**Rationale:**

- Vanilla Extract requires theme class application at root
- More explicit theme control
- Better integration with system preferences
- Support for dynamic primary color theming

**Impact:** High - Required for all users

---

## Styling System Changes

### CSS Prop Processing

**Change:** The `css` prop is now converted to inline styles at runtime instead of a generated class. Plain properties and whole-value tokens keep working:

```tsx
<Badge css={{ px: '$4', py: '$6', bc: '$blue6' }} />
<Badge css={{ padding: '$4', backgroundColor: '$blue6' }} />
```

**No longer supported in `css`** (TypeScript does not flag these, they are silently ignored or left as-is):

- Nested selectors and pseudo-classes/elements (`'&:hover'`, `'& > *'`, `'&::before'`)
- Media keys (`@bp1`–`@bp4`, `@hover`, `@motion`, `@dark`, `@light`)
- Tokens inside a longer value (`'1px solid $gray6'`, `'$2 $3'`, `'calc($2 + 4px)'`, `'-$2'`)
- Scale-prefixed tokens (`'$colors$primary'`) and locals (`$$var`)
- Vendor prefixes added by Stitches utils (`userSelect`, `appearance`, `backgroundClip`)

**Specificity:** `css` values are inline styles, so a stylesheet class can't override them without `!important`.

**Migration:** Move selectors, media queries and compound values into a `className` backed by your own stylesheet (or vanilla-extract `style()`).

### Responsive Variants

**Change:** Variant props no longer accept responsive objects such as `size={{ '@initial': '1', '@bp2': '2' }}`. Pass a single value and switch it in your own code or stylesheet.

### Components as Selectors

**Change:** Components no longer expose a Stitches selector (`` `& ${Button}` ``, `.className`, `.selector`, `toString()`). Target your own class or a data attribute instead.

### Stitches Exports Removed

`styled`, `css`, `keyframes`, `createTheme`, `globalCss`, `getCssText`, `darkTheme`, `lightTheme`, `config`, and the `CSS` and `VariantProps` types are removed.

Their replacements are the vanilla-extract functions, used in your app's `.css.ts` files with the values and helpers from `@traefik-labs/faency/vanilla`, available today. Your app needs the vanilla-extract bundler plugin. See [Writing Your Own Styles with Vanilla Extract](./USER_GUIDE.md#writing-your-own-styles-with-vanilla-extract).

| Stitches export                              | Replacement                                                                                                                                                                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `styled(Component, styles)`                  | `style(styleRule(styles))` in a `.css.ts` file, passed as `className`; `variants` become a `recipe()`                                                                                                                                             |
| `css(styles)`                                | `style(styleRule(styles))`                                                                                                                                                                                                                        |
| `globalCss(rules)`                           | `globalStyleRules(rules).forEach(([selector, rule]) => globalStyle(selector, rule))`                                                                                                                                                              |
| `keyframes(frames)`                          | `keyframes(keyframesRule(frames))`                                                                                                                                                                                                                |
| `createTheme(…)`                             | `globalStyle` with `vars` on the theme class, see [Using and Overriding Vanilla Extract Tokens](./USER_GUIDE.md#using-and-overriding-vanilla-extract-tokens-in-your-app) (vanilla-extract `createTheme(tokens, …)` needs a value for every token) |
| `lightTheme(primary)` / `darkTheme(primary)` | `VanillaExtractThemeProvider`, or the classes in `themes.light[primary]` / `themes.dark[primary]`                                                                                                                                                 |
| `getCssText()`                               | Nothing: import `@traefik-labs/faency/style.css` and your own static CSS; no `<style>` tag for SSR                                                                                                                                                |
| `config.theme.colors.orange11`               | `tokens.colors.orange[11]` (CSS variable) or `lightColors.orange11` / `darkColors.orange11` (raw value)                                                                                                                                           |
| `config.theme.<scale>`                       | `tokens.<scale>`, such as `tokens.space[2]`                                                                                                                                                                                                       |
| `config.media`                               | `breakpoints`                                                                                                                                                                                                                                     |
| `config.utils`                               | Applied by `styleRule()`, `globalStyleRules()` and `keyframesRule()`                                                                                                                                                                              |
| `CSS` type                                   | `FaencyStyle` for `styleRule()` input; `CSSProps['css']` for the `css` prop                                                                                                                                                                       |
| `VariantProps<typeof Component>`             | `RecipeVariants<typeof recipe>` from `@vanilla-extract/recipes`, or `ComponentProps<typeof Component>`                                                                                                                                            |

```tsx
// Before
import { Flex, styled } from '@traefik-labs/faency';

const Container = styled(Flex, {
  px: '$2',
  bc: '$contentBg',
  '&:hover': { c: '$primary' },
});

// After: Container.css.ts
import { style } from '@vanilla-extract/css';
import { styleRule } from '@traefik-labs/faency/vanilla';

export const container = style(
  styleRule({ px: '$2', bc: '$contentBg', '&:hover': { c: '$primary' } }),
);

// After: Container.tsx
import { Flex } from '@traefik-labs/faency';

import { container } from './Container.css';

const Container = (props) => <Flex className={container} {...props} />;
```

`styleRule()` cannot style children (`'& > div'`, `'&:hover span'`): vanilla-extract requires a `style()` selector to target the element itself. Give those their own `globalStyle()`, as in the user guide example.

Breakpoints now always override the plain declarations of the same selector, as vanilla-extract writes `@media` rules last. With Stitches, a plain declaration written after a breakpoint won and made the breakpoint dead: `{ '@bp1': { color: 'red' }, color: 'blue' }` was blue everywhere, and is now red at bp1. Remove such dead breakpoints when migrating.

---

## Migration Timeline

### Side-by-Side (Current - v13.x)

- Both Stitches and Vanilla Extract versions exported
- No breaking changes
- Users can opt-in to `*Vanilla` components
- New components are vanilla-only and already use the `Vanilla` suffix
- Components have `.vanilla.tsx` suffix in source
- **Currently in this phase** - actively migrating components

### Vanilla Extract Only (v14.0.0 - Future)

- Remove all Stitches code and dependencies
- Remove `.vanilla` suffix from filenames and `Vanilla` suffix from exports
- Breaking changes documented above take effect
- Expected bundle size reduction

**Migration Steps (when upgrading to v14.0.0):**

1. Update imports: `import { Badge } from '@traefik-labs/faency'` (remove `Vanilla` suffix)
2. Add `VanillaExtractThemeProvider` at the app root
3. Update `asChild` usage to `as` prop pattern
4. Rewrite `Select` options and change handlers for the Radix-based `Select`
5. Move `css` selectors, media queries and compound token values to classes
6. Apply the component-specific changes listed above
7. Update TypeScript types if using component type references
8. Test all components in your application

---

## Changelog Template for v14.0.0

Release notes are generated by semantic-release; use this as the body of the breaking commit or to edit the GitHub release.

```markdown
## [14.0.0] - YYYY-MM-DD

### BREAKING CHANGES

#### Polymorphic Components: `asChild` → `as` Prop

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

#### Switch

- **Changed:** `Switch` has no outer margin; size `1` had `8px`
  - Migration: add `css={{ m: '$2' }}` or space it from the parent layout
  - See [Migration Guide](./BREAKING_CHANGES.md#switch-spacing-and-focus-ring)

#### Checkbox

- **Changed:** `checked="indeterminate"` shows a dash on a filled box; it used to show a check mark with no box
- **Changed:** The focus ring shows on keyboard focus only, and a disabled checked box draws a grey check
  - No code change needed; remove any custom styling of the indeterminate state
  - See [Migration Guide](./BREAKING_CHANGES.md#checkbox-indeterminate-state-focus-ring-and-disabled-icon)

#### Dialog

- **Removed:** `StyledContent`
  - Migration: use `<DialogContent noCloseIcon>`
  - See [Migration Guide](./BREAKING_CHANGES.md#dialog-styledcontent-removed)

#### Theme Provider

- **Changed:** Requires `VanillaExtractThemeProvider` at the app root
  - See [Migration Guide](./BREAKING_CHANGES.md#provider-changes)

#### CSS Prop

- **Changed:** `css` is applied as inline styles; selectors, media keys and tokens inside compound values are no longer supported
  - See [Migration Guide](./BREAKING_CHANGES.md#css-prop-processing)

#### Component Exports

- **Changed:** Removed `Vanilla` suffix from all component exports
  - Before: `import { BadgeVanilla } from '@traefik-labs/faency'`
  - After: `import { Badge } from '@traefik-labs/faency'`
- **Removed:** Stitches exports (`styled`, `css`, `keyframes`, `globalCss`, …), `panelStyles`, `elevationVariants`, `overlayStyles`
  - Use vanilla-extract with `@traefik-labs/faency/vanilla`, see [Migration Guide](./BREAKING_CHANGES.md#stitches-exports-removed)

#### Component APIs

- See [Component API Changes](./BREAKING_CHANGES.md#component-api-changes) for per-component changes

### Removed

- Stitches styling system, `@stitches/react` dependency, `stitches.config.ts` and all `*.themes.ts` files
```

---

## Communication Plan

### Before v14.0.0 Release

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

### After v14.0.0 Release

1. **Support Period:**
   - Maintain v13.x branch for critical bug fixes
   - Community support in GitHub issues
   - Dedicated migration support channel

2. **Feedback Collection:**
   - Monitor migration issues and pain points
   - Update guide based on common problems
   - Create FAQ for frequently asked questions

---

## Questions & Considerations

### Should we provide a codemod?

For changes like `asChild` → `as` and the `Vanilla` suffix, a codemod could automate migration:

**Potential transformations:**

1. Replace `asChild` pattern with `as` prop
2. Add the theme provider
3. Remove `Vanilla` suffix from component imports
4. Update component type references

**Decision:** TBD - To be evaluated based on migration complexity

### What happens to `FaencyProvider`?

It currently provides the Radix Tooltip provider and the color scheme context. `VanillaExtractThemeProvider` now mounts the Tooltip provider too, so only the color scheme context is left. Options: keep it, fold the color scheme context into `VanillaExtractThemeProvider`, or remove it once the Stitches components are gone.

**Decision:** TBD

### Should we maintain a compatibility layer?

A temporary compatibility shim could ease migration:

```tsx
// Compatibility mode (deprecated, to be removed in v15.0.0)
import { Badge } from '@traefik-labs/faency/compat';

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

**Last Updated:** 2026-11-18
**Status:** Work in Progress - Component migration ongoing
