// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { FlexVanilla } from '../components/Flex/Flex.vanilla';
import { TextVanilla } from '../components/Text/Text.vanilla';
import { tokens as vanillaTokens } from '../styles/tokens.css';

type ColorToken = keyof typeof vanillaTokens.colors;

const meta: Meta = {
  title: 'Theme System/Semantic Tokens',
  parameters: {
    docs: {
      description: {
        component:
          'Tone and chart tokens, read through `vanillaTokens.colors`. Tones color status UI (Toast, Badge); chart tokens are for theming a chart library, Faency ships no charts.',
      },
    },
  },
};

export default meta;

const Swatch = ({ name }: { name: ColorToken }) => (
  <FlexVanilla direction="column" gap={1} css={{ width: 140 }}>
    <div
      style={{
        height: 40,
        borderRadius: 6,
        background: vanillaTokens.colors[name] as string,
        boxShadow: `inset 0 0 0 1px ${vanillaTokens.colors.divider}`,
      }}
    />
    <TextVanilla size={1} variant="subtle">
      {name}
    </TextVanilla>
  </FlexVanilla>
);

const Row = ({ title, names }: { title: string; names: ColorToken[] }) => (
  <FlexVanilla direction="column" gap={2}>
    <TextVanilla size={3} weight="medium">
      {title}
    </TextVanilla>
    <FlexVanilla gap={3} wrap="wrap">
      {names.map((name) => (
        <Swatch key={name} name={name} />
      ))}
    </FlexVanilla>
  </FlexVanilla>
);

const TONES = ['Success', 'Warning', 'Danger', 'Info', 'Neutral'] as const;
const PARTS = ['Solid', 'Text', 'Surface', 'Border'] as const;

export const Tones: StoryFn = () => (
  <FlexVanilla direction="column" gap={5}>
    {TONES.map((tone) => (
      <Row
        key={tone}
        title={tone}
        names={PARTS.map((part) => `tone${tone}${part}` as ColorToken)}
      />
    ))}
  </FlexVanilla>
);

export const Charts: StoryFn = () => (
  <FlexVanilla direction="column" gap={5}>
    <Row title="Series" names={['chartSeries1', 'chartSeries2', 'chartSeries3']} />
    <Row
      title="Status"
      names={['chartStatusGood', 'chartStatusWarning', 'chartStatusSerious', 'chartStatusCritical']}
    />
    <Row title="Grid and axis" names={['chartGrid', 'chartAxis']} />
  </FlexVanilla>
);
