import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../components/Box/Box.vanilla';
import { Text } from '../components/Text';
import { useVanillaExtractTheme } from '../styles/themeContext';

const meta: Meta = {
  title: 'Theme System/Vanilla Extract Theme Test',
  parameters: {
    docs: {
      description: {
        component: 'Test the Vanilla Extract theme system with dynamic primary color switching.',
      },
    },
  },
};

export default meta;

export const PrimaryColorShowcase: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>All Available Color Scales</h3>
        <div
          style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          <BoxVanilla css={{ p: '$4', bc: '$neon6', ta: 'center', br: '$2' }}>
            <Text size="3" css={{ fontWeight: 'bold', c: '$neon12' }}>
              Neon
            </Text>
          </BoxVanilla>

          <BoxVanilla css={{ p: '$4', bc: '$blue6', ta: 'center', br: '$2' }}>
            <Text size="3" css={{ fontWeight: 'bold', c: '$blue12' }}>
              Blue
            </Text>
          </BoxVanilla>

          <BoxVanilla css={{ p: '$4', bc: '$orange6', ta: 'center', br: '$2' }}>
            <Text size="3" css={{ fontWeight: 'bold', c: '$orange12' }}>
              Orange
            </Text>
          </BoxVanilla>

          <BoxVanilla css={{ p: '$4', bc: '$red6', ta: 'center', br: '$2' }}>
            <Text size="3" css={{ fontWeight: 'bold', c: '$red12' }}>
              Red
            </Text>
          </BoxVanilla>

          <BoxVanilla css={{ p: '$4', bc: '$green6', ta: 'center', br: '$2' }}>
            <Text size="3" css={{ fontWeight: 'bold', c: '$green12' }}>
              Green
            </Text>
          </BoxVanilla>

          <BoxVanilla css={{ p: '$4', bc: '$deepBlue6', ta: 'center', br: '$2' }}>
            <Text size="3" css={{ fontWeight: 'bold', c: '$deepBlue12' }}>
              Deep Blue
            </Text>
          </BoxVanilla>

          <BoxVanilla css={{ p: '$4', bc: '$grayBlue6', ta: 'center', br: '$2' }}>
            <Text size="3" css={{ fontWeight: 'bold', c: '$grayBlue12' }}>
              Gray Blue
            </Text>
          </BoxVanilla>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Neon Color Scale</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((step) => (
            <BoxVanilla
              key={step}
              css={{
                p: '$3',
                bc: `$neon${step}`,
                ta: 'center',
                br: '$2',
                fg: 1,
                minWidth: '60px',
              }}
            >
              <Text size="1" css={{ fontWeight: 'bold', c: step > 6 ? '$neon1' : '$neon12' }}>
                {step}
              </Text>
            </BoxVanilla>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Blue Color Scale</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((step) => (
            <BoxVanilla
              key={step}
              css={{
                p: '$3',
                bc: `$blue${step}`,
                ta: 'center',
                br: '$2',
                fg: 1,
                minWidth: '60px',
              }}
            >
              <Text size="1" css={{ fontWeight: 'bold', c: step > 6 ? '$blue1' : '$blue12' }}>
                {step}
              </Text>
            </BoxVanilla>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Deep Blue Color Scale</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((step) => (
            <BoxVanilla
              key={step}
              css={{
                p: '$3',
                bc: `$deepBlue${step}`,
                ta: 'center',
                br: '$2',
                fg: 1,
                minWidth: '60px',
              }}
            >
              <Text
                size="1"
                css={{ fontWeight: 'bold', c: step > 6 ? '$deepBlue1' : '$deepBlue12' }}
              >
                {step}
              </Text>
            </BoxVanilla>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ThemeAPITest: StoryFn = () => {
  const ThemeInfo = () => {
    const { mode, resolvedTheme, primaryColor, setPrimaryColor } = useVanillaExtractTheme();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
        <BoxVanilla css={{ p: '$5', bc: '$deepBlue3', br: '$3' }}>
          <Text size="5" css={{ fontWeight: 'bold', mb: '$3', display: 'block' }}>
            Current Theme State
          </Text>
          <div style={{ display: 'grid', gap: '12px' }}>
            <Text size="3">
              <strong>Mode:</strong> {mode}
            </Text>
            <Text size="3">
              <strong>Resolved Theme:</strong> {resolvedTheme}
            </Text>
            <Text size="3">
              <strong>Primary Color:</strong> {primaryColor}
            </Text>
          </div>
        </BoxVanilla>

        <div>
          <Text size="4" css={{ fontWeight: 'bold', mb: '$3', display: 'block' }}>
            Change Primary Color Programmatically
          </Text>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['neon', 'blue', 'orange', 'red', 'green', 'deepBlue', 'grayBlue'].map((color) => (
              <button
                key={color}
                onClick={() => setPrimaryColor(color as any)}
                style={{
                  padding: '12px 24px',
                  border: primaryColor === color ? '3px solid #000' : '1px solid #ccc',
                  borderRadius: '8px',
                  background: primaryColor === color ? '#f0f0f0' : 'white',
                  cursor: 'pointer',
                  fontWeight: primaryColor === color ? 'bold' : 'normal',
                  fontSize: '14px',
                }}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Text size="4" css={{ fontWeight: 'bold', mb: '$3', display: 'block' }}>
            Demo Content with Current Theme
          </Text>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
            <BoxVanilla css={{ p: '$4', bc: `$${primaryColor}4`, br: '$2' }}>
              <Text css={{ c: `$${primaryColor}11` }}>Primary Color Step 4</Text>
            </BoxVanilla>
            <BoxVanilla css={{ p: '$4', bc: `$${primaryColor}6`, br: '$2' }}>
              <Text css={{ c: `$${primaryColor}12` }}>Primary Color Step 6</Text>
            </BoxVanilla>
            <BoxVanilla css={{ p: '$4', bc: `$${primaryColor}8`, br: '$2' }}>
              <Text css={{ c: '$loContrast' }}>Primary Color Step 8</Text>
            </BoxVanilla>
            <BoxVanilla css={{ p: '$4', bc: `$${primaryColor}10`, br: '$2' }}>
              <Text css={{ c: '$loContrast' }}>Primary Color Step 10</Text>
            </BoxVanilla>
          </div>
        </div>
      </div>
    );
  };

  return <ThemeInfo />;
};

PrimaryColorShowcase.storyName = 'Primary Color Showcase';
ThemeAPITest.storyName = 'Theme API Test';
