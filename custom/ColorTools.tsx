import React from 'react';
import chroma from 'chroma-js';
import bezier from 'bezier-easing';
import { Box } from '../components/Box';
import { Flex } from '../components/Flex';
import { Grid } from '../components/Grid';
import { TextField } from '../components/TextField';
import { Text } from '../components/Text';
import { BezierCurveEditor } from 'react-bezier-curve-editor';
import {
  TriangleDownIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  CodeIcon,
  ResetIcon,
  CheckIcon,
  TextAlignJustifyIcon,
} from '@radix-ui/react-icons';
// import { darkTheme as darkThemeClassName, theme as lightThemeClassName } from '../stitches.config';
import { colors, getHiContrast, loContrasts } from '../pages/colors';

const steps = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

// We are editing steps 2 through 8 via the tools
const stepsToGenerate = 7;

// How much to boost the saturation towards the left end of the bezier curve
const defaultSaturationBoost = 1;

// How much to mix step 9 and 11
const defaultMixAmount = 0.3;

type Curve = [number, number, number, number];

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never;

type EditableScaleProps = {
  name: ElementType<typeof colors>;
  lightThemeConfig: {
    /** Step 2 */
    start: string;
    /** Step 8 */
    end: string;
    /** Initial Bezier curve */
    defaultCurve: Curve;
    /** Colors to override, e.g. "red1", "red6", "red11", etc */
    overrides?: Record<string, string>;
    /** How much to boost the saturation towards the left end of the bezier curve */
    saturationBoost?: number;
    // How much to mix step 9 and 11
    mixAmount?: number;
  };
  darkThemeConfig: {
    /** Step 2 */
    start: string;
    /** Step 8 */
    end: string;
    /** Initial Bezier curve */
    defaultCurve: Curve;
    /** Colors to override, e.g. "red1", "red6", "red11", etc */
    overrides?: Record<string, string>;
    /** How much to boost the saturation towards the left end of the bezier curve */
    saturationBoost?: number;
    // How much to mix step 9 and 11
    mixAmount?: number;
  };
};

export function ColorTools() {
  // No SSR please
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Flex css={{ minHeight: '100%', fd: 'column', jc: 'space-between' }}>
      <Box css={{ flex: 'none', mb: '$3' }}>
        <EditableScale
          name="gray"
          lightThemeConfig={{
            start: 'hsl(0 0% 97.3%)',
            end: 'hsl(0 0% 78%)',
            defaultCurve: [0.655, 0.455, 0.905, 0.47],
            overrides: {
              gray1: 'hsl(0 0% 99.0%)',
              gray11: 'hsl(0 0% 43.5%)',
            },
          }}
          darkThemeConfig={{
            start: 'hsl(0 0% 11%)',
            end: 'hsl(0 0% 31.2%)',
            defaultCurve: [0.38, 0.355, 0.785, 0.395],
            overrides: {
              gray1: 'hsl(0 0% 8.5%)',
              gray11: 'hsl(0 0% 62.8%)',
            },
          }}
        />
        <EditableScale
          name="slate"
          lightThemeConfig={{
            start: 'hsl(206 17% 97.6%)',
            end: 'hsl(206 10% 78%)',
            defaultCurve: [0.65, 0.47, 0.905, 0.47],
            overrides: {
              slate9: 'hsl(206 6% 56.1%)',
              slate11: 'hsl(206 6% 43.5%)',
              slate12: 'hsl(206 24% 9%)',
            },
          }}
          darkThemeConfig={{
            start: 'hsl(200 6% 11%)',
            end: 'hsl(204 6% 31.5%)',
            defaultCurve: [0.38, 0.355, 0.79, 0.385],
            overrides: {
              slate1: 'hsl(200 7% 8.8%)',
              slate11: 'hsl(206 6% 63.0%)',
            },
          }}
        />
        <EditableScale
          name="red"
          lightThemeConfig={{
            start: 'hsl(359 100% 98%)',
            end: 'hsl(347, 100%, 60%)',
            saturationBoost: 1.2,
            mixAmount: 0.38,
            defaultCurve: [0.61, 0.265, 0.72, 0.52],
            overrides: {
              red1: 'hsl(359 100% 99%)',
              red2: 'hsl(359 100% 98%)',
              red9: 'hsl(351, 100%, 42%)',
              red10: 'hsl(351, 100%, 40%)',
              red11: 'hsl(351, 100%, 36%)',
              red12: 'hsl(354 50% 16%)',
            },
          }}
          darkThemeConfig={{
            start: 'hsl(356 35% 11.8%)',
            end: 'hsl(358 65% 40.5%)',
            mixAmount: 0.48,
            defaultCurve: [0.275, 0.35, 0.61, 0.18],
            overrides: {
              red1: 'hsl(347 23% 9.8%)',
              red10: 'hsl(347, 100%, 60%)',
              red11: 'hsl(347 100% 72%)',
            },
          }}
        />
        <EditableScale
          name="blue"
          lightThemeConfig={{
            start: 'hsl(207 100% 98%)',
            end: 'hsl(205.6 82% 65.4%)',
            saturationBoost: 1.9,
            mixAmount: 0.4,
            defaultCurve: [0.48, 0.095, 0.795, 0.575],
            overrides: {
              blue5: 'hsl(209 95% 90.1%)',
              blue11: 'hsl(211 100% 43.2%)',
              blue12: 'hsl(211 100% 15%)',
            },
          }}
          darkThemeConfig={{
            start: 'hsl(216 50% 11.7%)',
            end: 'hsl(211 90% 34%)',
            mixAmount: 0.5,
            defaultCurve: [0.4, 0.425, 0.63, 0.285],
            overrides: {
              blue1: 'hsl(212 35% 9.2%)',
            },
          }}
        />
        <EditableScale
          name="green"
          lightThemeConfig={{
            start: 'hsl(136 66% 97%)',
            end: 'hsl(151 40% 54.0%)',
            saturationBoost: 1.6,
            defaultCurve: [0.505, 0.13, 0.775, 0.51],
            overrides: {
              green1: 'hsl(136 50% 98.9%)',
              green9: 'hsl(151 55% 41.5%)',
              green11: 'hsl(153 67% 28.5%)',
              green12: 'hsl(155 40% 14.0%)',
            },
          }}
          darkThemeConfig={{
            start: 'hsl(154 43% 8.4%)',
            end: 'hsl(151 52% 28.5%)',
            mixAmount: 0.42,
            defaultCurve: [0.45, 0.4, 0.66, 0.28],
            overrides: {
              green11: 'hsl(151 50% 53.2%)',
            },
          }}
        />
        <EditableScale
          name="orange"
          lightThemeConfig={{
            start: 'hsl(31, 100%, 96%)',
            end: 'hsl(35, 100%, 62%)',
            defaultCurve: [0.605, 0.235, 0.79, 0.56],
            overrides: {
              orange1: 'hsl(31 70% 99.0%)',
              orange9: 'hsl(31 100% 41%)',
              orange10: 'hsl(31, 85%, 39%)',
              orange11: 'hsl(31, 70%, 30%)',
              orange12: 'hsl(15 60% 17.0%)',
            },
          }}
          darkThemeConfig={{
            start: 'hsl(35 100% 8%)',
            end: 'hsl(35 100% 29%)',
            defaultCurve: [0.355, 0.355, 0.59, 0.265],
            overrides: {
              orange1: 'hsl(35 100% 7.2%)',
              orange10: 'hsl(35, 100%, 50%)',
              orange11: 'hsl(35 100% 62.2%)',
            },
          }}
        />
        <EditableScale
          name="neon"
          lightThemeConfig={{
            start: 'hsl(67, 76%, 92%)',
            end: 'hsl(68, 79%, 60%)',
            defaultCurve: [0.605, 0.235, 0.79, 0.56],
            overrides: {
              neon1: 'hsl(67, 76%, 99%)',
              neon8: 'hsl(68, 79%, 60%)',
              neon9: 'hsl(68, 79%, 34.5%)',
              neon11: 'hsl(67, 54%, 24%)',
              neon12: 'hsl(68, 53%, 12%)',
            },
          }}
          darkThemeConfig={{
            start: 'hsl(68, 53%, 7%)',
            end: 'hsl(68, 79%, 25%)',
            defaultCurve: [0.355, 0.355, 0.59, 0.265],
            overrides: {
              neon1: 'hsl(68, 53%, 6.2%)',
              neon10: 'hsl(68, 79%, 60%)',
              neon11: 'hsl(68, 79%, 76%)',
              neon12: 'hsl(68, 79%, 84%)',
            },
          }}
        />
        <EditableScale
          name="deepBlue"
          lightThemeConfig={{
            start: 'hsl(180, 9%, 92%)',
            end: 'hsl(209, 88%, 9%)',
            defaultCurve: [0.605, 0.235, 0.79, 0.56],
            overrides: {
              deepBlue1: 'hsl(180, 9%, 98%)',
              deepBlue7: 'hsl(208, 11%, 45%)',
              deepBlue8: 'hsl(208, 16%, 36%)',
              deepBlue9: 'hsl(208, 24%, 27%)',
              deepBlue10: 'hsl(208, 40%, 18%)',
              deepBlue11: 'hsl(209, 88%, 9%)',
              deepBlue12: 'hsl(208, 89%, 7%)',
            },
          }}
          darkThemeConfig={{
            start: 'hsl(208, 40%, 7%)',
            end: 'hsl(208, 16%, 36%)',
            defaultCurve: [0.355, 0.355, 0.59, 0.265],
            overrides: {
              deepBlue1: 'hsl(209, 88%, 6%)',
              deepBlue9: 'hsl(208, 16%, 45%)',
              deepBlue10: 'hsl(180, 9%, 60%)',
              deepBlue11: 'hsl(180, 9%, 76%)',
              deepBlue12: 'hsl(180, 9%, 84%)',
            },
          }}
        />
      </Box>

      <Text size="1" variant="gray" css={{ p: '$2', my: '$1' }}>
        Hint: Hold Alt for bulk icon actions
      </Text>
    </Flex>
  );
}

function EditableScale({ name, lightThemeConfig, darkThemeConfig }: EditableScaleProps) {
  // Whether dark theme is currently active
  const isDarkTheme = document.body.classList.contains('dark');

  // Current curves
  const [lightThemeCurve, setLightThemeCurve] = React.useState(lightThemeConfig.defaultCurve);
  const [darkThemeCurve, setDarkThemeCurve] = React.useState(darkThemeConfig.defaultCurve);

  // Colors that we generated
  const [lightColors, setLightColors] = React.useState<Color[]>([]);
  const [darkColors, setDarkColors] = React.useState<Color[]>([]);

  // Contrast ratios for a couple of colors
  const [contrasts, setContrasts] = React.useState<number[]>([]);
  const [failsContrast, setFailsContrast] = React.useState(false);

  // Whether the panel UI is collapsed
  const [collapsed, setCollapsed] = React.useState(true);

  // Whether color modifications are active
  const [active, setActive] = React.useState(true);

  // Whether to show the CSS color codes
  const [showCode, setShowCode] = React.useState(false);

  const showAlphaValues =
    (document.querySelector('[data-alpha-scales]') as HTMLInputElement | null)?.checked ?? false;

  // Refs to current values
  const curveRef = React.useRef<Curve>(isDarkTheme ? darkThemeCurve : lightThemeCurve);
  const generatedColorsRef = React.useRef<Color[]>([]);
  React.useEffect(() => {
    curveRef.current = isDarkTheme ? darkThemeCurve : lightThemeCurve;
    generatedColorsRef.current = isDarkTheme ? darkColors : lightColors;
  });

  // Whether to show the curve reset button
  const showResetButton =
    curveRef.current.join() !==
    (isDarkTheme ? darkThemeConfig : lightThemeConfig).defaultCurve.join();

  // Create a callback for when the curve changes
  const onCurveChange = React.useCallback(
    (newCurve: Curve) => {
      const config = isDarkTheme ? darkThemeConfig : lightThemeConfig;

      // Saturation speed adjustment for the left end of the bezier curve
      const boost1 = config.saturationBoost ?? defaultSaturationBoost;
      // Smaller speed adjustment for the right end of the bezier curve to reduce the left end pull
      const boost2 = boost1 / 10 + 0.9;

      const [x1, y1, x2, y2] = newCurve;
      const hueCurve = newCurve;
      // Boost saturation speed on the left end of the curve, reduce slightly on the right end of the curve
      const chromaCurve: Curve = [x1, y1 * boost1, Math.min(1, x2 * boost2), y2];
      const lumCurve: Curve = [1 - x2, 1 - y2, 1 - x1, 1 - y1];

      const newColors = generateColors({
        name,
        start: config.start,
        end: config.end,
        steps: stepsToGenerate,
        hueCurve,
        chromaCurve,
        lumCurve,
      });

      // Set overrides
      if (config.overrides) {
        for (const key in config.overrides) {
          // Make sure that color name matches the desired override
          if (key.includes(name)) {
            newColors.push({ name: key, value: config.overrides[key] });
          }
        }
      }

      // Add 10 as a mix of 9 and 11, unless they have been added manually before
      if (!newColors.find((color) => color.name === `${name}10`)) {
        const computedStyles = getComputedStyle(document.body);
        const isLoContrast = loContrasts.includes(name);
        const baseStep = '9';
        const mixStep = isDarkTheme && isLoContrast ? '12' : '11';

        const baseColor =
          newColors.find((color) => color.name === `${name}${baseStep}`)?.value ??
          computedStyles.getPropertyValue(`--colors-${name}${baseStep}`);

        const mixColor =
          newColors.find((color) => color.name === `${name}${mixStep}`)?.value ??
          computedStyles.getPropertyValue(`--colors-${name}${mixStep}`);

        const step10 = chroma.interpolate(
          prepareColorStringForChroma(baseColor),
          prepareColorStringForChroma(mixColor),
          config.mixAmount ?? defaultMixAmount,
          'hcl'
        );

        newColors.push({ name: `${name}10`, value: getCssHsl(step10) });
      }

      // Set alpha scales
      Array.from(Array(12)).forEach((_, index) => {
        const targetColor =
          newColors.find((color) => color.name === `${name}${index + 1}`)?.value ??
          computedStyles.getPropertyValue(`--colors-${name}${index + 1}`);

        const backdropColor = isDarkTheme
          ? newColors.find((color) => color.name === `${name}1`)?.value ??
            computedStyles.getPropertyValue(`--colors-${name}1`)
          : '#ffffff';

        const alphaValue =
          isDarkTheme && index === 0
            ? 'hsl(0 0% 0% / 0)'
            : getAlphaColor(targetColor, backdropColor);
        newColors.push({ name: `${name}A${index + 1}`, value: alphaValue });
      });

      // Set CSS variables
      newColors.forEach((color) => {
        document.body.style.setProperty(`--colors-${color.name}`, color.value);
      });

      setActive(true);
      if (isDarkTheme) {
        setDarkThemeCurve(newCurve);
        setDarkColors(newColors);
      } else {
        setLightThemeCurve(newCurve);
        setLightColors(newColors);
      }
    },
    [isDarkTheme, darkThemeConfig, lightThemeConfig]
  );

  // Set new CSS variables when active or theme is changed
  React.useEffect(() => {
    // Deactivate and/or clear potentially stale stuff
    Array.from(Array(12)).forEach((_, index) => {
      document.body.style.removeProperty(`--colors-${name}${index + 1}`);
      document.body.style.removeProperty(`--colors-${name}A${index + 1}`);
    });

    // Set relevant values if active
    if (active) {
      generatedColorsRef.current.forEach((color) => {
        document.body.style.setProperty(`--colors-${color.name}`, color.value);
      });
    }
  }, [active, isDarkTheme]);

  // Set initial values and catch dark theme changes
  React.useEffect(() => {
    onCurveChange(curveRef.current);
  }, [onCurveChange]);

  // Keep contrast ratios up to date
  const computedStyles = getComputedStyle(document.body);
  React.useEffect(() => {
    const getValue = (step: string) => {
      const cssVariableValue = computedStyles.getPropertyValue(`--colors-${name}${step}`);
      return prepareColorStringForChroma(cssVariableValue);
    };

    const step1 = getValue('1');
    const step2 = getValue('2');
    const step3 = getValue('3');
    const step9 = getValue('9');
    const step11 = getValue('11');
    const bgContrastColor = getHiContrast(name);

    const newContrasts = [
      chroma.contrast(step1, step11),
      chroma.contrast(step2, step11),
      chroma.contrast(step3, step11),
      chroma.contrast(step9, bgContrastColor),
    ];

    setContrasts(newContrasts);
    setFailsContrast(newContrasts.slice(0, -1).some((ratio) => ratio < 4.5) || newContrasts[3] < 3);
  }, [active, isDarkTheme, darkColors, lightColors]);

  return (
    <Box data-editable-scale={name} css={{ mb: '-$2', color: '$hiContrast' }}>
      <Flex css={{ ai: 'center', mr: '$1' }}>
        <Text
          data-panel-toggle
          data-panel-collapsed={collapsed}
          size="2"
          css={{
            display: 'flex',
            ai: 'center',
            flex: '1 1 auto',
            fontWeight: 500,
            textTransform: 'capitalize',
            px: '$2',
            pb: '$2',
            mt: '$2',
            mr: '$2',
            lineHeight: '25px',
            cursor: 'default',
            userSelect: 'none',
          }}
          onClick={(event) => {
            if (event.altKey) {
              document
                .querySelectorAll(`[data-panel-toggle][data-panel-collapsed="${collapsed}"]`)
                .forEach((element) => (element as HTMLElement).click());
              return;
            }

            setCollapsed(!collapsed);
          }}
        >
          <TriangleDownIcon
            style={{
              verticalAlign: 'middle',
              opacity: 0.3,
              marginTop: -2,
              marginLeft: -3,
              marginRight: 1,
              transform: collapsed ? 'rotate(-90deg)' : 'none',
            }}
          />
          <Box css={{ bc: `$${name}9`, width: 13, height: 13, mr: '$1' }} />
          {name} {failsContrast && '⛔️'}
        </Text>

        {showResetButton && (
          <Box
            data-reset-button
            onClick={(event) => {
              if (event.altKey) {
                document
                  .querySelectorAll(`[data-reset-button]`)
                  .forEach((element) => (element as HTMLElement).click());
                return;
              }

              onCurveChange((isDarkTheme ? darkThemeConfig : lightThemeConfig).defaultCurve);
            }}
            css={{ p: '$1', flex: 'none' }}
          >
            <ResetIcon />
          </Box>
        )}

        <Box
          data-code-button
          data-show-code={showCode}
          onClick={(event) => {
            // Toggle all on Alt key
            if (event.altKey) {
              document
                .querySelectorAll(`[data-code-button][data-show-code="${showCode}"]`)
                .forEach((element) => (element as HTMLElement).click());
              return;
            }

            // Toggle all and copy color codes for all scales on the Command key
            if (event.metaKey) {
              let clipboard = '';

              document.querySelectorAll(`[data-color-code]`).forEach((element) => {
                const parent = element.closest('[data-editable-scale]')!;
                const scaleName =
                  parent.getAttribute('data-editable-scale')! + (showAlphaValues ? 'A' : '');
                const colorCodes = Array.from((element as HTMLElement).childNodes)
                  .map((child) => '  ' + child.textContent + '\n')
                  .join('');
                const codeToCopy = `export const ${scaleName} = {\n` + colorCodes + `};\n\n`;

                clipboard = clipboard + codeToCopy;

                // Show check icon for a moment after copying
                parent
                  .querySelector('[data-code-button]')!
                  .setAttribute('data-show-check-icon', 'true');

                setTimeout(() => {
                  parent!
                    .querySelector('[data-code-button]')!
                    .removeAttribute('data-show-check-icon');
                }, 1000);
              });

              // Remove redundant newline
              clipboard = clipboard.replace(/\n\n$/m, '\n');

              navigator.clipboard.writeText(clipboard);
              return;
            }

            if (collapsed) {
              setCollapsed(false);
            }

            setShowCode(!showCode);
          }}
          css={{
            p: '$1',
            flex: 'none',
            '& [data-check-icon]': {
              display: 'none',
            },
            '&[data-show-check-icon]': {
              '& [data-main-icon]': {
                display: 'none',
              },
              '& [data-check-icon]': {
                display: 'block',
              },
            },
          }}
        >
          {showCode ? <CodeIcon data-main-icon /> : <TextAlignJustifyIcon data-main-icon />}
          <CheckIcon data-check-icon />
        </Box>

        <Box
          data-active-toggle
          data-active={active}
          onClick={(event) => {
            if (event.altKey) {
              document
                .querySelectorAll(`[data-active-toggle][data-active="${active}"]`)
                .forEach((element) => (element as HTMLElement).click());
              return;
            }

            setActive(!active);
          }}
          css={{ p: '$1', flex: 'none' }}
        >
          {active ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </Box>
      </Flex>

      {!collapsed && (
        <Box>
          <Grid
            data-color-code
            css={{
              mx: '$2',
              gridAutoRows: '25px',
              opacity: showCode ? 1 : 0,
              position: showCode ? 'static' : 'absolute',
              pointerEvents: showCode ? 'auto' : 'none',
            }}
          >
            {steps.map((step) => {
              const variableName = showAlphaValues
                ? `--colors-${name}A${step}`
                : `--colors-${name}${step}`;
              const valueToShow = computedStyles.getPropertyValue(variableName);
              const nameToShow = showAlphaValues ? `${name}A` : name;

              return (
                <Text
                  key={step}
                  css={{
                    fontSize: '10px',
                    fontFamily: '$mono',
                    width: '100%',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    lineHeight: '25px',
                  }}
                >
                  {nameToShow}
                  {step}: '{formatHsl(valueToShow)}',
                </Text>
              );
            })}
          </Grid>

          {!showCode && (
            <Grid css={{ mx: '$2', gridAutoRows: '25px' }}>
              <RatioBox css={{ bc: `$${name}1`, color: `$${name}11` }} ratio={contrasts[0]} />
              <RatioBox css={{ bc: `$${name}2`, color: `$${name}11` }} ratio={contrasts[1]} />
              <RatioBox css={{ bc: `$${name}3`, color: `$${name}11` }} ratio={contrasts[2]} />
              <RatioBox css={{ bc: `$${name}4` }} />
              <RatioBox css={{ bc: `$${name}5` }} />
              <RatioBox css={{ bc: `$${name}6` }} />
              <RatioBox css={{ bc: `$${name}7` }} />
              <RatioBox css={{ bc: `$${name}8` }} />
              <RatioBox
                css={{ bc: `$${name}9`, color: getHiContrast(name) }}
                ratio={contrasts[3]}
                type="AA Large Text"
              />
              <RatioBox css={{ bc: `$${name}10` }} />
              <RatioBox css={{ bc: `$${name}11` }} />
              <RatioBox css={{ bc: `$${name}12` }} />
            </Grid>
          )}

          <Editor
            curve={isDarkTheme ? darkThemeCurve : lightThemeCurve}
            onCurveChange={onCurveChange}
          />
        </Box>
      )}
    </Box>
  );
}

type RatioBoxProps = {
  ratio?: number;
  type?: 'AA' | 'AA Large Text';
  css?: any;
};

function RatioBox({ css, ratio, type = 'AA' }: RatioBoxProps) {
  return (
    <Text
      css={{
        fontSize: 10,
        width: '100%',
        fontFamily: '$mono',
        lineHeight: '25px',
        ta: 'right',
        pr: 5,
        ...css,
      }}
    >
      {ratio !== undefined &&
        (type === 'AA'
          ? `${type} ${ratio >= 4.5 ? 'Pass' : 'Fail'} ${ratio.toFixed(2)}`
          : `${type} ${ratio >= 3 ? 'Pass' : 'Fail'} ${ratio.toFixed(2)}`)}
    </Text>
  );
}

type EditorProps = {
  curve: Curve;
  onCurveChange?: (curve: Curve) => void;
};

function Editor({ curve, onCurveChange }: EditorProps) {
  const curveToString = (c: Curve) => c.map((n) => n.toFixed(3)).join(', ');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState(curveToString(curve));
  const inputValueCurve = inputValue.split(', ').map(parseFloat);
  const inputValueIsValid =
    inputValueCurve.length === 4 && inputValueCurve.every((number) => !isNaN(number));

  // Update input when value changes externally
  React.useEffect(() => {
    // Update input when curve editor updates
    const [x1, y1, x2, y2] = curve;
    const [X1, Y1, X2, Y2] = inputRef.current!.value.split(', ').map(parseFloat);
    if (x1 !== X1 || y1 !== Y1 || x2 !== X2 || y2 !== Y2) {
      setInputValue(curveToString(curve));
    }
  }, [curve]);

  return (
    <Box>
      <Box
        css={{
          bc: '$gray3',
          m: '$2',
          borderRadius: '$3',
          'svg + span': { display: 'none' },
          'svg + span + span': { display: 'none' },
          'div:nth-child(2)': { display: 'none' },
          'button[class]': {
            width: 10,
            height: 10,
            bc: '$gray8',
            boxShadow: 'none',
            cursor: 'default',
          },
        }}
      >
        <BezierCurveEditor
          strokeWidth={1}
          outerAreaSize={70}
          curveLineColor="var(--colors-gray11)"
          handleLineColor="var(--colors-gray8)"
          fixedHandleColor="transparent"
          rowColor="transparent"
          outerAreaColor="transparent"
          innerAreaColor="transparent"
          value={curve}
          onChange={(newCurve) => {
            onCurveChange?.(newCurve);
          }}
        />
      </Box>
      <Box css={{ px: '$2', mb: '$3' }}>
        <TextField
          variant="ghost"
          ref={inputRef}
          state={inputValueIsValid ? undefined : 'invalid'}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            const newCurve = event.target.value.split(', ').map(parseFloat);
            if (newCurve.length === 4 && newCurve.every((number) => !isNaN(number))) {
              onCurveChange?.(newCurve as Curve);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              if (!inputValueIsValid) {
                setInputValue(curveToString(curve));
              }

              event.currentTarget.blur();
            }
          }}
        />
      </Box>
    </Box>
  );
}

// Chroma JS doesn't know that "hsl(0 0% 50%)" format without commas is legit and breaks otherwise
function prepareColorStringForChroma(color: string) {
  return /hsl/.test(color) && !/,/.test(color) ? color.replace(/\s+/g, ', ') : color;
}

function distribute(value: number, rangeA: number[], rangeB: number[]) {
  const [fromLow, fromHigh] = Array.from(rangeA);
  const [toLow, toHigh] = Array.from(rangeB);

  const result = toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);

  if (toLow < toHigh) {
    if (result < toLow) {
      return toLow;
    }
    if (result > toHigh) {
      return toHigh;
    }
  } else {
    if (result > toLow) {
      return toLow;
    }
    if (result < toHigh) {
      return toHigh;
    }
  }

  return result;
}

function distributeHue(value: number, rangeA: number[], rangeB: number[]) {
  let [toLow, toHigh] = Array.from(rangeB);

  const hueDistanceA = toLow - toHigh;
  const hueDistanceB = 360 - Math.max(toLow, toHigh) + Math.min(toLow, toHigh);
  const shouldRotateDirection = Math.abs(hueDistanceA) > Math.abs(hueDistanceB);

  if (shouldRotateDirection) {
    toLow = toLow > toHigh ? toLow : toHigh + hueDistanceB;
    toHigh = toLow > toHigh ? toLow + hueDistanceB : toHigh;
  }

  return distribute(value, rangeA, [toLow, toHigh]);
}

function formatHsl(color: string) {
  if (/^hsl/.test(color)) {
    // Add trailing zeros to percentage values
    color = color.replace(/(\s|,)(\d+)(%)/g, '$1$2.0$3');
    // Add trailing zeros to alpha values
    color = color.replace(/(\.)(\d\d)(\))/g, '$1$20$3');
    color = color.replace(/(\.)(\d)(\))/g, '$1$200$3');
    // But clean up the trailing zero on 0.0% and 100.0%
    color = color.replace(/(\s|,)(10)?(0)(.0%)/g, '$1$2$3%');
  }

  return color;
}

function getCssHsl(color: chroma.Color, alpha?: number) {
  const hsl = color.hsl().map((value) => (isNaN(value) ? 0 : value));
  // Set hue to 0° if saturation is a ridiculously small number like 9.609723609371595e-7
  hsl[0] = hsl[1] < 0.001 ? 0 : hsl[0];
  let [h, s, l]: (number | string)[] = hsl;

  h = Math.round(h);
  s = s === 0 || s === 1 ? Math.round(s * 100) : Math.round(s * 1000) / 10;
  l = l === 0 || l === 1 ? Math.round(l * 100) : Math.round(l * 1000) / 10;

  return alpha === undefined ? `hsl(${h} ${s}% ${l}%)` : `hsl(${h} ${s}% ${l}% / ${alpha})`;
}

type ScaleSpec = {
  name: string;
  start: string;
  end: string;
  steps: number;
  hueCurve: Curve;
  chromaCurve: Curve;
  lumCurve: Curve;
};

type Color = {
  name: string;
  value: string;
};

function generateColors({
  name,
  start,
  end,
  steps,
  hueCurve,
  chromaCurve,
  lumCurve,
}: ScaleSpec): Color[] {
  function generateNumberOfSteps(curve: Curve) {
    const array: number[] = [];
    for (const key in Array.from(Array(steps).keys())) {
      const step = parseInt(key);
      const easingFunction = bezier(...curve);
      const value = easingFunction(step / (steps - 1));
      array.push(value);
    }
    array.reverse();
    return array;
  }

  const indexOffset = 2;

  start = prepareColorStringForChroma(start);
  end = prepareColorStringForChroma(end);

  const startColor = chroma(start);
  const endColor = chroma(end);

  const hueStart = startColor.hcl()[0];
  const chrStart = startColor.hcl()[1] * 100;
  const lumStart = startColor.hcl()[2] * 100;
  const hueEnd = endColor.hcl()[0];
  const chrEnd = endColor.hcl()[1] * 100;
  const lumEnd = endColor.hcl()[2] * 100;

  let lumArray = generateNumberOfSteps(lumCurve);
  let chrArray = generateNumberOfSteps(chromaCurve);
  let hueArray = generateNumberOfSteps(hueCurve);
  let lumArrayAdjusted: number[] = [];
  let chrArrayAdjusted: number[] = [];
  let hueArrayAdjusted: number[] = [];

  for (const index in lumArray) {
    const step = lumArray[index];
    lumArrayAdjusted.push(distribute(step, [0, 1], [lumEnd * 0.01, lumStart * 0.01]));
  }

  for (const index in chrArray) {
    const step = chrArray[index];
    const chrStep = distribute(step, [0, 1], [chrStart * 0.01, chrEnd * 0.01]);
    chrArrayAdjusted.push(chrStep);
  }

  for (const index in hueArray) {
    const step = hueArray[index];
    hueArrayAdjusted.push(distributeHue(step, [0, 1], [hueStart, hueEnd]));
  }

  chrArrayAdjusted.reverse();
  hueArrayAdjusted.reverse();

  lumArray = lumArrayAdjusted;
  chrArray = chrArrayAdjusted;
  hueArray = hueArrayAdjusted;

  const colorMap: Color[] = [];

  for (const key in lumArray) {
    const index = parseInt(key);

    const params = {
      hue: hueArray[index],
      chroma: chrArray[index],
      luminosity: lumArray[index],
    };

    const color = chroma(chroma.lch(params.luminosity, params.chroma, params.hue));
    const hsl = getCssHsl(color);
    const colorObj: Color = {
      name: `${name}${index + indexOffset}`,
      value: hsl,
    };

    colorMap.push(colorObj);
  }

  return colorMap;
}

// target = backdrop * (1 - alpha) + foreground * alpha
// alpha = (target - backdrop) / (foreground - backdrop)
function getAlphaColor(targetColor: string, backdropColor: string) {
  targetColor = prepareColorStringForChroma(targetColor);
  backdropColor = prepareColorStringForChroma(backdropColor);

  const [targetR, targetG, targetB] = chroma(targetColor).rgb();
  const [backdropR, backdropG, backdropB] = chroma(backdropColor).rgb();
  const ceil = (n: number) => Math.ceil(n * 1000) / 1000;

  // Is the backdrop color lighter, RGB-wise, than target color?
  // Decide whether we want to add as little color or as much color as possible,
  // darkening or lightening the backdrop respectively.
  const desiredRGB = targetR + targetG + targetB < backdropR + backdropG + backdropB ? 0 : 255;

  // Light theme example:
  // Consider a 200 120 150 target color with 255 255 255 backdrop
  // What is the alpha value that will nudge backdrop's 255 green to 120?
  //
  // Dark theme example:
  // Consider a 200 120 150 target color with 12 24 28 backdrop
  // What is the alpha value that will nudge backdrop's 12 red to 200?
  const alphaR = (targetR - backdropR) / (desiredRGB - backdropR);
  const alphaG = (targetG - backdropG) / (desiredRGB - backdropG);
  const alphaB = (targetB - backdropB) / (desiredRGB - backdropB);
  // const A = Math.min(0.02, Math.max(alphaR, alphaG, alphaB));

  // If this is gray, we go slightly simpler route using pure white/black only and normal rounding rather than ceil
  if ([alphaR, alphaG].every((n) => n === alphaB)) {
    return getCssHsl(chroma.rgb(desiredRGB, desiredRGB, desiredRGB), +alphaR.toFixed(3));
  }

  const A = ceil(Math.max(alphaR, alphaG, alphaB));

  // Clamp alpha between 0.02 and `maxAlpha`
  const safeA = Math.min(0.98, A);

  const R = ((backdropR * (1 - safeA) - targetR) / safeA) * -1;
  const G = ((backdropG * (1 - safeA) - targetG) / safeA) * -1;
  const B = ((backdropB * (1 - safeA) - targetB) / safeA) * -1;

  // const normaliseRGB = (n: number) => Math.min(255, Math.max(0, Math.ceil(n)));
  // const safeR = normaliseRGB(R);
  // const safeG = normaliseRGB(G);
  // const safeB = normaliseRGB(B);

  return getCssHsl(chroma.rgb(R, G, B), safeA);
}
