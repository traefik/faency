# Faency User Guide

Welcome to Faency! This guide will help you integrate Faency into your React application and make the most of its theming capabilities.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Theming](#theming)
- [Using Components](#using-components)
- [Styling Components](#styling-components)
- [TypeScript Support](#typescript-support)
- [Best Practices](#best-practices)

---

## Installation

Install Faency via npm or yarn:

```bash
# npm
npm install @traefiklabs/faency

# yarn
yarn add @traefiklabs/faency
```

### Peer Dependencies

Faency requires React 18+ as a peer dependency:

```bash
npm install react react-dom
```

---

## Getting Started

### Basic Setup

#### Using Stitches Components (Legacy)

Wrap your application with the `FaencyProvider`:

```tsx
import React from 'react';
import { FaencyProvider } from '@traefiklabs/faency';
import { Button, Box, Text } from '@traefiklabs/faency';

function App() {
  return (
    <FaencyProvider>
      <Box css={{ p: '$4' }}>
        <Text>Welcome to Faency!</Text>
        <Button>Click Me</Button>
      </Box>
    </FaencyProvider>
  );
}

export default App;
```

#### Using Vanilla Extract Components (New - Recommended)

For Vanilla Extract components, import the CSS file and use the `VanillaExtractThemeProvider`:

```tsx
import React from 'react';
import '@traefiklabs/faency/dist/style.css'; // Required for Vanilla Extract components
import { VanillaExtractThemeProvider } from '@traefiklabs/faency';
import { BoxVanilla, BadgeVanilla } from '@traefiklabs/faency';

function App() {
  return (
    <VanillaExtractThemeProvider defaultTheme="light" primaryColor="blue">
      <BoxVanilla css={{ p: '$4' }}>
        <BadgeVanilla variant="blue">Welcome to Faency!</BadgeVanilla>
      </BoxVanilla>
    </VanillaExtractThemeProvider>
  );
}

export default App;
```

### Import Styles

#### For Stitches Components (Legacy)

Stitches components use runtime CSS-in-JS, so no separate CSS imports are needed. Styles are automatically injected when you use components.

#### For Vanilla Extract Components (New - Recommended)

Vanilla Extract components require importing the static CSS file. Add this import to your application's entry point (e.g., `App.tsx` or `index.tsx`):

```tsx
import '@traefiklabs/faency/dist/style.css';
```

This CSS file contains all the styles for Vanilla Extract components (components with `Vanilla` suffix like `BadgeVanilla`, `BoxVanilla`, etc.). Without this import, these components will render as unstyled elements.

---

## Theming

Faency includes a powerful theming system with support for light/dark modes and customizable primary colors.

### Light and Dark Mode

#### Using Stitches (Current System)

///

#### Using Vanilla Extract (New System - Recommended)

For more control over theming, use the new Vanilla Extract theme provider:

```tsx
import { VanillaExtractThemeProvider } from '@traefiklabs/faency';

function App() {
  return (
    <VanillaExtractThemeProvider defaultTheme="light">{/* Your app */}</VanillaExtractThemeProvider>
  );
}
```

**Theme Mode Options:**

- `"light"` - Force light theme
- `"dark"` - Force dark theme
- `"system"` - Follow system preference (default)

### Customizing Primary Colors

Faency supports 7 primary color themes:

| Color      | Description            |
| ---------- | ---------------------- |
| `neon`     | Bright green           |
| `blue`     | Classic blue (default) |
| `orange`   | Vibrant orange         |
| `red`      | Bold red               |
| `green`    | Natural green          |
| `deepBlue` | Deep navy blue         |
| `grayBlue` | Muted blue-gray        |

#### With Vanilla Extract Provider

```tsx
import { VanillaExtractThemeProvider } from '@traefiklabs/faency';

function App() {
  return (
    <VanillaExtractThemeProvider defaultTheme="light" primaryColor="orange">
      {/* Your app */}
    </VanillaExtractThemeProvider>
  );
}
```

#### Programmatic Theme Control

Access and control the theme using the `useVanillaExtractTheme` hook:

```tsx
import { useVanillaExtractTheme } from '@traefiklabs/faency';

function ThemeToggle() {
  const { mode, resolvedTheme, primaryColor, setMode, setPrimaryColor } = useVanillaExtractTheme();

  return (
    <div>
      <p>Current theme: {resolvedTheme}</p>
      <p>Primary color: {primaryColor}</p>

      <button onClick={() => setMode('light')}>Light</button>
      <button onClick={() => setMode('dark')}>Dark</button>
      <button onClick={() => setMode('system')}>System</button>

      <button onClick={() => setPrimaryColor('blue')}>Blue</button>
      <button onClick={() => setPrimaryColor('orange')}>Orange</button>
      <button onClick={() => setPrimaryColor('neon')}>Neon</button>
    </div>
  );
}
```

### Theme API Reference

**`VanillaExtractThemeProvider` Props:**

| Prop           | Type                            | Default     | Description                           |
| -------------- | ------------------------------- | ----------- | ------------------------------------- |
| `defaultTheme` | `'light' \| 'dark' \| 'system'` | `'system'`  | Initial theme mode                    |
| `primaryColor` | `PrimaryColor`                  | `'blue'`    | Initial primary color                 |
| `forcedTheme`  | `'light' \| 'dark'`             | `undefined` | Override theme (useful for Storybook) |

**`useVanillaExtractTheme()` Return Value:**

```typescript
{
  mode: ThemeMode;                    // Current mode setting
  resolvedTheme: 'light' | 'dark';    // Actual applied theme
  primaryColor: PrimaryColor;         // Current primary color
  colors: ColorMap;                   // All color tokens
  setMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: PrimaryColor) => void;
}
```

---

## Using Components

### Importing Components

```tsx
// Import individual components
import { Button, Box, Text, Input, Badge } from '@traefiklabs/faency';

// Or import everything
import * as Faency from '@traefiklabs/faency';
```

### Basic Component Usage

#### Button

```tsx
import { Button } from '@traefiklabs/faency';

<Button variant="primary" size="medium">
  Click Me
</Button>;
```

**Props:**

- `variant`: `"primary" | "secondary" | "ghost" | "outline"`
- `size`: `"small" | "medium" | "large"`
- `disabled`: `boolean`

#### Box (Layout Container)

```tsx
import { Box } from '@traefiklabs/faency';

<Box css={{ p: '$4', bc: '$blue4', br: '$2' }}>Content goes here</Box>;
```

The Box component is a flexible container for layouts. Use it with the `css` prop for custom styling.

#### Text

```tsx
import { Text } from '@traefiklabs/faency';

<Text size="4" css={{ c: '$blue11' }}>
  Styled text content
</Text>;
```

**Props:**

- `size`: `"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"`
- `as`: HTML element (default: `"span"`)

---

## Styling Components

### The `css` Prop

Faency components accept a `css` prop for custom styling. This prop uses a shorthand syntax for common CSS properties:

```tsx
<Box
  css={{
    p: '$4', // padding
    px: '$6', // paddingLeft & paddingRight
    py: '$3', // paddingTop & paddingBottom
    m: '$2', // margin
    mx: '$4', // marginLeft & marginRight
    bc: '$blue6', // backgroundColor
    c: '$blue11', // color
    br: '$2', // borderRadius
    ta: 'center', // textAlign
    fd: 'column', // flexDirection
    ai: 'center', // alignItems
    jc: 'space-between', // justifyContent
    fg: 1, // flexGrow
    fs: 0, // flexShrink
    fontSize: '$4', // fontSize
    fontWeight: 'bold', // fontWeight
    lh: 1.5, // lineHeight
  }}
>
  Content
</Box>
```

### CSS Prop Shorthand Reference

| Shorthand    | CSS Property                     | Example               |
| ------------ | -------------------------------- | --------------------- |
| `p`          | `padding`                        | `p: '$4'`             |
| `pt`         | `padding-top`                    | `pt: '$2'`            |
| `pr`         | `padding-right`                  | `pr: '$2'`            |
| `pb`         | `padding-bottom`                 | `pb: '$2'`            |
| `pl`         | `padding-left`                   | `pl: '$2'`            |
| `px`         | `padding-left` & `padding-right` | `px: '$4'`            |
| `py`         | `padding-top` & `padding-bottom` | `py: '$3'`            |
| `m`          | `margin`                         | `m: '$4'`             |
| `mt`         | `margin-top`                     | `mt: '$2'`            |
| `mr`         | `margin-right`                   | `mr: '$2'`            |
| `mb`         | `margin-bottom`                  | `mb: '$2'`            |
| `ml`         | `margin-left`                    | `ml: '$2'`            |
| `mx`         | `margin-left` & `margin-right`   | `mx: 'auto'`          |
| `my`         | `margin-top` & `margin-bottom`   | `my: '$3'`            |
| `bc`         | `background-color`               | `bc: '$blue4'`        |
| `c`          | `color`                          | `c: '$blue11'`        |
| `br`         | `border-radius`                  | `br: '$2'`            |
| `ta`         | `text-align`                     | `ta: 'center'`        |
| `fd`         | `flex-direction`                 | `fd: 'column'`        |
| `fw`         | `flex-wrap`                      | `fw: 'wrap'`          |
| `ai`         | `align-items`                    | `ai: 'center'`        |
| `jc`         | `justify-content`                | `jc: 'space-between'` |
| `as`         | `align-self`                     | `as: 'flex-start'`    |
| `fg`         | `flex-grow`                      | `fg: 1`               |
| `fs`         | `flex-shrink`                    | `fs: 0`               |
| `lh`         | `line-height`                    | `lh: 1.5`             |
| `fontSize`   | `font-size`                      | `fontSize: '$4'`      |
| `fontWeight` | `font-weight`                    | `fontWeight: 'bold'`  |

### Design Tokens

Faency uses design tokens for consistent spacing, colors, and typography. Reference tokens with the `$` prefix:

#### Spacing Tokens

```tsx
$1; // 4px
$2; // 8px
$3; // 16px
$4; // 20px
$5; // 24px
$6; // 32px
$7; // 48px
$8; // 64px
$9; // 80px
```

#### Border Radius Tokens

```tsx
$1; // 4px
$2; // 6px
$3; // 8px
$4; // 12px
$round; // 50%
$pill; // 9999px
```

#### Font Size Tokens

```tsx
$0; // 11px
$1; // 12px
$2; // 13px
$3; // 14px
$4; // 16px
$5; // 18px
$6; // 20px
$7; // 22px
$8; // 24px
$9; // 26px
$10; // 28px
$11; // 32px
$12; // 38px
```

#### Color Tokens

Each color has 12 steps, with lower numbers being lighter:

```tsx
// Example with blue
$blue1; // Lightest
$blue6; // Medium (good for backgrounds)
$blue9; // Bright (primary color)
$blue11; // High contrast (good for text)
$blue12; // Darkest

// Available colors
($neon, $blue, $orange, $red, $green, $deepBlue, $grayBlue);
($gray, $slate, $purple);
```

#### Semantic Color Tokens

```tsx
$primary; // Primary brand color
$contentBg; // Main content background
$hiContrast; // High contrast text
$loContrast; // Low contrast text
$border; // Border color
$accent; // Accent color for highlights
$destructive; // Error/danger color
$muted; // Muted background
$mutedForeground; // Muted text color
```

### Using Color Tokens in CSS Prop

```tsx
<Box css={{ bc: '$blue6', c: '$blue11' }}>
  Blue themed box
</Box>

<Box css={{ bc: '$primary', c: 'white' }}>
  Primary colored box
</Box>

<Text css={{ c: '$hiContrast' }}>
  High contrast text
</Text>
```

---

## TypeScript Support

Faency is built with TypeScript and provides full type definitions.

### Component Props

All component props are fully typed:

```tsx
import { Button } from '@traefiklabs/faency';
import type { ComponentProps } from 'react';

// Get the prop types
type ButtonProps = ComponentProps<typeof Button>;

function MyButton(props: ButtonProps) {
  return <Button {...props} />;
}
```

### CSS Prop Types

```tsx
import type { CSSProps } from '@traefiklabs/faency';

interface MyComponentProps extends CSSProps {
  label: string;
}

function MyComponent({ label, css }: MyComponentProps) {
  return <Box css={css}>{label}</Box>;
}
```

### Theme Types

```tsx
import type { PrimaryColor, ThemeMode } from '@traefiklabs/faency';

const primaryColor: PrimaryColor = 'blue';
const themeMode: ThemeMode = 'light';
```

---

## Best Practices

### 1. Use Semantic Color Tokens

Instead of hardcoding specific colors, use semantic tokens that adapt to the theme:

```tsx
// ✅ Good - adapts to theme
<Box css={{ bc: '$contentBg', c: '$hiContrast' }}>
  Content
</Box>

// ❌ Avoid - doesn't adapt to theme
<Box css={{ bc: '#ffffff', c: '#000000' }}>
  Content
</Box>
```

### 2. Leverage Design Tokens

Use spacing and sizing tokens for consistency:

```tsx
// ✅ Good - consistent spacing
<Box css={{ p: '$4', m: '$3' }}>
  Content
</Box>

// ❌ Avoid - arbitrary values
<Box css={{ p: '23px', m: '17px' }}>
  Content
</Box>
```

### 3. Wrap Your App with Theme Provider

Always wrap your application root with the theme provider:

```tsx
// ✅ Good
function App() {
  return (
    <VanillaExtractThemeProvider>
      <YourApp />
    </VanillaExtractThemeProvider>
  );
}

// ❌ Bad - components won't have theme context
function App() {
  return <YourApp />;
}
```

### 4. Compose with Box Component

Use Box for layout composition:

```tsx
<Box css={{ fd: 'column', gap: '$4' }}>
  <Box css={{ fd: 'row', jc: 'space-between', ai: 'center' }}>
    <Text size="5">Title</Text>
    <Button>Action</Button>
  </Box>
  <Box css={{ p: '$4', bc: '$muted', br: '$2' }}>
    <Text>Content area</Text>
  </Box>
</Box>
```

### 5. Prefer Vanilla Extract Components

For new projects, use the Vanilla Extract components (when available) for better performance:

```tsx
import { BoxVanilla } from '@traefiklabs/faency';

// Better performance with static CSS
<BoxVanilla css={{ p: '$4' }}>Content</BoxVanilla>;
```

---

## Example: Complete Application

Here's a complete example showing theme integration:

```tsx
import React from 'react';
import {
  VanillaExtractThemeProvider,
  useVanillaExtractTheme,
  Box,
  Button,
  Text,
  Badge,
} from '@traefiklabs/faency';

function ThemeControls() {
  const { resolvedTheme, setMode, primaryColor, setPrimaryColor } = useVanillaExtractTheme();

  return (
    <Box css={{ p: '$4', bc: '$muted', br: '$2', mb: '$4' }}>
      <Text size="4" css={{ fontWeight: 'bold', mb: '$3' }}>
        Theme Controls
      </Text>

      <Box css={{ fd: 'row', gap: '$2', mb: '$3' }}>
        <Button onClick={() => setMode('light')}>Light</Button>
        <Button onClick={() => setMode('dark')}>Dark</Button>
        <Button onClick={() => setMode('system')}>System</Button>
      </Box>

      <Box css={{ fd: 'row', gap: '$2' }}>
        <Button onClick={() => setPrimaryColor('blue')}>Blue</Button>
        <Button onClick={() => setPrimaryColor('orange')}>Orange</Button>
        <Button onClick={() => setPrimaryColor('green')}>Green</Button>
      </Box>

      <Text css={{ mt: '$3' }}>
        Current: <Badge variant={primaryColor}>{resolvedTheme}</Badge>
      </Text>
    </Box>
  );
}

function App() {
  return (
    <VanillaExtractThemeProvider primaryColor="blue">
      <Box css={{ p: '$6', minHeight: '100vh', bc: '$contentBg' }}>
        <Text size="9" css={{ fontWeight: 'bold', mb: '$4', c: '$hiContrast' }}>
          Faency Demo
        </Text>

        <ThemeControls />

        <Box css={{ fd: 'column', gap: '$4' }}>
          <Box css={{ p: '$4', bc: '$card', br: '$3', border: '1px solid $border' }}>
            <Text size="5" css={{ fontWeight: 'bold', mb: '$2' }}>
              Welcome to Faency
            </Text>
            <Text css={{ c: '$mutedForeground' }}>
              A comprehensive design system for Traefik Labs applications
            </Text>
          </Box>

          <Box css={{ fd: 'row', gap: '$3' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </Box>
        </Box>
      </Box>
    </VanillaExtractThemeProvider>
  );
}

export default App;
```

---

## Additional Resources

- [Component Documentation](https://storybook.traefik.io/faency) - Interactive component examples
- [GitHub Repository](https://github.com/traefiklabs/faency) - Source code and issues
- [Vanilla Extract Migration Guide](./VANILLA_EXTRACT_DEVELOPER_GUIDE.md) - For contributors
- [Project Guidelines](./CLAUDE.md) - Development guidelines
