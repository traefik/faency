// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import React from 'react';

import { ButtonVanilla } from '../components/Button/Button.vanilla';
import { FlexVanilla } from '../components/Flex/Flex.vanilla';
import { TextVanilla } from '../components/Text/Text.vanilla';
import { useVanillaExtractTheme } from '../styles/themeContext';
import { tokens as vanillaTokens } from '../styles/tokens.css';

type Args = { light: string; dark: string };

const meta: Meta<Args> = {
  title: 'Theme System/Token Overrides',
  parameters: {
    docs: {
      description: {
        component:
          'Apps read and override vanilla extract tokens through the exported `vanillaTokens`. This story overrides `buttonRedBg` on a wrapper so it stays inside the story; in an app, set overrides on `<body>` so popups get them too. See "Using and Overriding Vanilla Extract Tokens in Your App" in the user guide.',
      },
    },
  },
  argTypes: {
    light: { control: 'color' },
    dark: { control: 'color' },
  },
  args: {
    light: '#b42318',
    dark: '#f97066',
  },
};

export default meta;

const Sample = ({ title }: { title: string }) => (
  <FlexVanilla direction="column" gap={2}>
    <TextVanilla size={3} weight="medium">
      {title}
    </TextVanilla>
    <ButtonVanilla variant="red">Delete route</ButtonVanilla>
  </FlexVanilla>
);

const snippet = ({ light, dark }: Args) => `import { globalStyle } from '@vanilla-extract/css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ButtonVanilla, vanillaThemes, vanillaTokens } from '@traefik-labs/faency';

// Global override, in your app's .css.ts. Set the variables on <body>, which holds
// the theme class, so popups get them too. One rule per mode, holding all your overrides.
// vanillaThemes.<mode>.<primaryColor>: here light mode with the blue primary color.
globalStyle(\`body.\${vanillaThemes.light.blue}\`, {
  vars: {
    [vanillaTokens.colors.buttonRedBg]: '${light}',
    [vanillaTokens.colors.cardBackground]: '#f8f9fb',
    [vanillaTokens.colors.textSubtle]: 'hsla(210, 40%, 20%, 0.62)',
  },
});
globalStyle(\`body.\${vanillaThemes.dark.blue}\`, {
  vars: {
    [vanillaTokens.colors.buttonRedBg]: '${dark}',
    [vanillaTokens.colors.cardBackground]: 'hsl(210, 55%, 12%)',
    [vanillaTokens.colors.textSubtle]: 'hsla(210, 40%, 90%, 0.62)',
  },
});

// Global override without vanilla extract in the app, at runtime
// (apply again when the theme changes):
const vars = assignInlineVars({
  [vanillaTokens.colors.buttonRedBg]: resolvedTheme === 'dark' ? '${dark}' : '${light}',
});
Object.entries(vars).forEach(([name, value]) => document.body.style.setProperty(name, value));

// Local override: only this subtree, as in the story.
<div style={assignInlineVars({ [vanillaTokens.colors.buttonRedBg]: '${light}' })}>
  <ButtonVanilla variant="red">Delete route</ButtonVanilla>
</div>

// Use a token as a value, e.g. a chart mark matching the button:
<circle fill={vanillaTokens.colors.buttonRedBg} />`;

// The hook lives in its own component: Storybook's source decorator calls the story outside the provider.
const ButtonRedDemo = ({ light, dark }: Args) => {
  const { resolvedTheme } = useVanillaExtractTheme();

  return (
    <FlexVanilla gap={6} wrap="wrap">
      <Sample title="Theme default" />
      <div
        style={assignInlineVars({
          [vanillaTokens.colors.buttonRedBg]: resolvedTheme === 'dark' ? dark : light,
        })}
      >
        <Sample title="Overridden" />
      </div>
    </FlexVanilla>
  );
};

export const ButtonRed: StoryFn<Args> = (args) => <ButtonRedDemo {...args} />;

ButtonRed.parameters = {
  docs: {
    source: {
      language: 'tsx',
      transform: (_code: string, { args }: { args: Args }) => snippet(args),
    },
  },
};
