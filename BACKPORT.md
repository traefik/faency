# Backport from the traefik-hub admin UI

Bring generic pieces built in the traefik-hub admin UI upstream into Faency. The admin UI is the reference only: rebuild each piece the Faency way, never copy it as is.

Reference repo: `C:\Users\ginad\OneDrive\Documents\Traefik\traefik-hub\dashboard\ui\src` (paths below are relative to it). Start the session with `claude --add-dir <that path>` so it can be read.

The audit was made against Faency 12.3.9, the version the admin UI pins. The component set on this branch looks the same, but check each item still applies before starting it.

## What qualifies

Faency is used by other products, so every change must be non-breaking. Upstream only what:

- is additive: a new component, hook, token, prop or variant value. Existing defaults, token values, DOM structure and ARIA semantics stay as they are, and a visual change to a default counts as breaking.
- cannot be done with existing props and `css`. If the app gets there with `elevation`, `variant` or a few `css` lines, it stays in the app.
- needs real behavior or accessibility work, or adds semantic tokens.

Compositions with fixed content or layout stay in the app: SearchField, the CopyButton UI, PageHeader, SectionHeading, ErrorCard, EmptyPlaceholder, StatTile, ChartCard, and thin Button wrappers.

## Shortlist, in order

One item per branch or PR. Propose the API before implementing each one.

### 1. Type fixes

| Fix | Reference |
|---|---|
| Card: `as` in its types (done) | `components/Card.tsx` |

### 2. Tokens (done)

- Tone tokens (done): `tone<Success|Warning|Danger|Info|Neutral><Solid|Text|Surface|Border>`, vanilla extract only. ToastVanilla and BadgeVanilla use them; Badge's look changed on purpose (breaking), and neon/purple moved to the same steps. Alert has a TODO to use them when migrated.
- Chart tokens (done): `chartSeries1–3`, `chartStatusGood|Warning|Serious|Critical`, `chartGrid`, `chartAxis`, with the hub's values. The status colors keep the hub's chart-tuned values rather than the tone colors.
- Focus ring token: not needed, the existing `focusOutline` token covers it and SegmentedControlVanilla already uses it.

Token names must not collide with existing tokens or with app overrides such as the hub's `theme/overrides.ts`.

### 3. Missing primitives

All new, so none of them changes existing behavior.

| Primitive | Reference | Notes |
|---|---|---|
| Toast (done, `ToastVanilla` + `useToast`) | `components/Toast.tsx`, `ToastPool.tsx`, `toasts.tsx` | Rebuild on Radix Toast. Do not port the reference's `motion` animation, uncleared timeout or index keys. |
| AlertDialog | `components/ConfirmationModal.tsx` | `@radix-ui/react-alert-dialog` is already a dependency. Title, description, cancel/confirm, waiting state. Its title is styled; `DialogTitle` stays as it is. |
| SegmentedControl (done, `SegmentedControlVanilla`) | `components/SegmentedControl.tsx`, `components/form/fields/Segmented.tsx`, `components/analytics/SortToggle.tsx` | The app has three versions. One new component, or new opt-in props on ButtonSwitch (sizes, full width, optional count, optional tooltip) with today's defaults kept. |
| Combobox (done, `ComboboxVanilla`) | `components/form/schema/references/SuggestField.tsx` | Free text with a filtered suggestion list. Needs a full ARIA combobox pass. |
| Select (non-native, on hold) | `components/form/fields/TypeSelect.tsx` | Faency's `Select` is a native `<select>`, so options cannot hold badges or icons. Build on Radix Select under a new name (e.g. `SelectMenu`); `Select` stays as it is. Replacing `Select` in place is not possible without breaking it: `<option>` children, `onChange` events, the `HTMLSelectElement` ref (form libraries), `multiple`, `<optgroup>` and the native mobile picker all change. |
| Progress / Meter (done, `MeterVanilla`) | `components/analytics/BarTrack.tsx` | Single value or stacked segments, optional caption (`label`, `valueLabel`). Segment tooltips use native `title` until a vanilla Tooltip exists. |
| Spinner (done, `SpinnerVanilla`) | `components/SpinnerLoader.tsx` | Ring with a rotating arc instead of the hub's spokes. CSS keyframes, no `motion`; slower under reduced motion. `role="status"` with a hidden label. Button's `waiting` state stays as it is. |
| SplitLayout (done, `SplitLayoutVanilla` + `SplitLayoutMainVanilla` / `SplitLayoutAsideVanilla`) | `components/SplitLayout.tsx` | Resizable panes: pointer and keyboard resizing, saved width, stacks below a breakpoint. Sizing props moved from the root to the panes: `minWidth` (px or %, default `25%`, replaces `edgeFraction`) and `stickyTop` on both, `defaultWidth` / `defaultFraction` / `storageKey` on the aside. Stacking uses `matchMedia` (vanilla-extract can't build a runtime media query), so a server render starts side by side. Separator gets full ARIA value attributes and Home/End. |
| Sortable table header (moved to its own branch) | `components/tables/LocalSortableTh.tsx`, `components/buttons/SortButton.tsx`, `components/icons/SortIcon.tsx`, `hooks/use-sortable-rows.ts` | `Th` has no vanilla version yet, so this ships with the Table and AriaTable migration on a separate branch: first a vanilla migration matching today's tables exactly, then sorting on the vanilla `Th`. Controlled (`active`, `direction`, `onSort`), sets `aria-sort`, not tied to the URL. Optionally a `useTableSort` hook from the hub's `useSortableRows`. |

### 4. Docs only

- Tooltip on a disabled trigger: a disabled button takes no pointer events, so the tooltip never shows. Add a Tooltip story showing the pattern (wrap the trigger in a focusable `span`) instead of changing Tooltip. Reference `components/BlockedTooltip.tsx`.

### 5. Maybe

A layout-neutral form field wrapper: label, hint, help, error, required mark, invalid state wired to the control. Reference `components/form/fields/FormField.tsx` (with `FieldControl`), `StackedField.tsx`, `FieldLabel.ts`, `Required.tsx`, `SwitchField.tsx`. Leave out the app's two-column grid and its container query.

## Filtered out

Kept here so they are not proposed again.

| Item | Why |
|---|---|
| Card outlined variant | `elevation={0}` plus `css` for the border and line height covers it. |
| AriaTable: `elevation={0}` drops the background | Changing it alters tables already on `elevation={0}`. The app restores it with `css={{ bc: '$cardBackground' }}`. |
| DialogTitle styled by default | Breaks products that style it themselves. AlertDialog brings its own styled title. |
| Secondary Button resting inset border | Visual change to every secondary button, and a design decision. |
| Dark gray scale rework, `contentBg`/`sidebarBg` tokens (`theme/overrides.ts`) | Design decisions; app-level theming. |
| Alert tone (tinted surface, icon, role) | Alert already has `info`/`success`/`warning`/`error`; restyling them is breaking. A tinted callout with an icon is an app composition, and apps can set `role` themselves. |
| Badge `tone` prop | Badge already has `green`/`orange`/`red`/`blue`/`gray`, now colored by the tone tokens; mapping a tone to a variant is a one-liner in the app. |
| `useClipboard()` hook | A general utility with no UI, tokens or accessibility behavior, so it doesn't belong in a UI library. The hub fixes its own copy helper (uncleared timeout, unhandled rejection, three copies). CodeBlock keeps its own copy logic. |
| Overline, count pill, line clamp variants | Achievable with Text/Badge plus `css`. |
| Legend item, Sparkline | Chart pieces; charts are out of scope. |
| StackedBarChart, ChartFrame | Out of scope. If apps need charts, they adopt a chart library themed with the chart tokens. |

## Porting constraints

- New components are vanilla-extract only, with no Stitches version. Follow `VANILLA_EXTRACT_DEVELOPER_GUIDE.md`: `.css.ts` styles, `css` prop, theme tokens in `Component.theme.ts` merged into `styles/tokens.css.ts` and `styles/themes.css.ts`, stories, tests with jest-axe, export from `index.ts`. Use the same `Vanilla` naming as migrated components (`Toast.vanilla.tsx`, `ToastVanilla`) so every vanilla component is renamed the same way when Stitches is removed. Hooks keep plain names (`useToast`).
- Changes to existing components (type fixes, docs) stay in the version that already exists.
- Icons: the reference uses `react-icons/fi`. Use `@radix-ui/react-icons`.
- No new runtime dependency such as `motion`. Any dependency added must be pinned.
- The reference uses app tokens (`$tableRowBorder`, `$contentBg`, `$textSubtle`, `$cardBackground`) and app types (`UI.Tone`, `Analytics.*`). Map them to Faency tokens or define them in Faency.

## Afterwards

Once a Faency release ships these, a traefik-hub session bumps the version and deletes the local wrappers and duplicates.
