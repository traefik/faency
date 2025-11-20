import { FlexAlign, FlexJustify, SizeToken, SpacingToken } from './types';

export interface CSSProps {
  css?: {
    p?: SpacingToken;
    pt?: SpacingToken;
    pr?: SpacingToken;
    pb?: SpacingToken;
    pl?: SpacingToken;
    px?: SpacingToken;
    py?: SpacingToken;

    m?: SpacingToken;
    mt?: SpacingToken;
    mr?: SpacingToken;
    mb?: SpacingToken;
    ml?: SpacingToken;
    mx?: SpacingToken;
    my?: SpacingToken;

    ta?: 'left' | 'center' | 'right' | 'justify';
    fd?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    fw?: 'wrap' | 'nowrap' | 'wrap-reverse';
    ai?: FlexAlign;
    ac?: FlexAlign | 'space-between' | 'space-around' | 'space-evenly';
    jc?: FlexJustify;
    as?: 'auto' | FlexAlign;
    fg?: 0 | 1;
    fs?: 0 | 1;
    fb?: SizeToken;

    bc?: string;
    br?: string;
    btrr?: string;
    bbrr?: string;
    bblr?: string;
    btlr?: string;
    bs?: string;
    c?: string;

    width?: SizeToken;
    height?: SizeToken;
    size?: SizeToken;

    ox?: 'visible' | 'hidden' | 'scroll' | 'auto';
    oy?: 'visible' | 'hidden' | 'scroll' | 'auto';

    pe?: 'auto' | 'none' | 'all';
    us?: 'none' | 'auto' | 'text' | 'contain' | 'all';

    fontSize?: string;
    fontWeight?: string;
    lh?: string | number;

    [key: string]: any;
  };
}

// HELPERS
function processToken(value: string): string {
  return value.startsWith('$') ? value.slice(1) : value;
}

function getSpaceValue(key: string): string {
  const spaceMap: Record<string, string> = {
    '1': '4px',
    '2': '8px',
    '3': '16px',
    '4': '20px',
    '5': '24px',
    '6': '32px',
    '7': '48px',
    '8': '64px',
    '9': '80px',
  };
  return spaceMap[key] || '0px';
}

function getSizeValue(key: string): string {
  const sizeMap: Record<string, string> = {
    '1': '4px',
    '2': '8px',
    '3': '16px',
    '4': '20px',
    '5': '24px',
    '6': '32px',
    '7': '40px',
    '8': '48px',
    '9': '64px',
    '10': '80px',
  };
  return sizeMap[key] || key;
}

function getRadiiValue(key: string): string {
  const radiiMap: Record<string, string> = {
    '1': '4px',
    '2': '6px',
    '3': '8px',
    '4': '12px',
    round: '50%',
    pill: '9999px',
  };
  return radiiMap[key] || '0px';
}

function getFontSizeValue(key: string): string {
  const fontSizeMap: Record<string, string> = {
    '0': '11px',
    '1': '12px',
    '2': '13px',
    '3': '14px',
    '4': '16px',
    '5': '18px',
    '6': '20px',
    '7': '22px',
    '8': '24px',
    '9': '26px',
    '10': '28px',
    '11': '32px',
    '12': '38px',
  };
  return fontSizeMap[key] || '16px';
}

function getFontWeightValue(key: string): string {
  const fontWeightMap: Record<string, string> = {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  };
  return fontWeightMap[key] || '400';
}

function applySpacing(
  style: React.CSSProperties,
  property: keyof React.CSSProperties,
  value: string,
): void {
  if (typeof value === 'string' && value.startsWith('$')) {
    const tokenValue = processToken(value);
    const spaceValue = getSpaceValue(tokenValue);
    if (spaceValue !== '0px') {
      (style as any)[property] = spaceValue;
    }
  } else {
    (style as any)[property] = value;
  }
}

function applyRadii(
  style: React.CSSProperties,
  property: keyof React.CSSProperties,
  value: string,
): void {
  if (typeof value === 'string' && value.startsWith('$')) {
    const tokenValue = processToken(value);
    const radiiValue = getRadiiValue(tokenValue);
    if (radiiValue !== '0px') {
      (style as any)[property] = radiiValue;
    }
  } else {
    (style as any)[property] = value;
  }
}

function applyColor(
  style: React.CSSProperties,
  property: keyof React.CSSProperties,
  value: string,
  colors?: Record<string, any>,
): void {
  if (typeof value === 'string' && value.startsWith('$')) {
    const colorToken = value.slice(1);
    if (colors && colorToken in colors) {
      (style as any)[property] = colors[colorToken];
    } else {
      (style as any)[property] = value;
    }
  } else {
    (style as any)[property] = value;
  }
}

function applySize(
  style: React.CSSProperties,
  property: keyof React.CSSProperties,
  value: string,
): void {
  if (typeof value === 'string' && value.startsWith('$')) {
    const tokenValue = processToken(value);
    const sizeValue = getSizeValue(tokenValue);
    (style as any)[property] = sizeValue;
  } else {
    (style as any)[property] = value;
  }
}

// CSS PROCESSOR
export function processCSSProp(
  css: CSSProps['css'] = {},
  colors?: Record<string, any>,
): {
  style: React.CSSProperties;
  vars: Record<string, string>;
} {
  const style: React.CSSProperties = {};
  const vars: Record<string, string> = {};

  Object.entries(css).forEach(([key, value]) => {
    switch (key) {
      case 'p':
      case 'padding':
        applySpacing(style, 'padding', value);
        break;
      case 'pt':
      case 'paddingTop':
        applySpacing(style, 'paddingTop', value);
        break;
      case 'pr':
      case 'paddingRight':
        applySpacing(style, 'paddingRight', value);
        break;
      case 'pb':
      case 'paddingBottom':
        applySpacing(style, 'paddingBottom', value);
        break;
      case 'pl':
      case 'paddingLeft':
        applySpacing(style, 'paddingLeft', value);
        break;
      case 'px':
        applySpacing(style, 'paddingLeft', value);
        applySpacing(style, 'paddingRight', value);
        break;
      case 'py':
        applySpacing(style, 'paddingTop', value);
        applySpacing(style, 'paddingBottom', value);
        break;

      case 'm':
      case 'margin':
        applySpacing(style, 'margin', value);
        break;
      case 'mt':
      case 'marginTop':
        applySpacing(style, 'marginTop', value);
        break;
      case 'mr':
      case 'marginRight':
        applySpacing(style, 'marginRight', value);
        break;
      case 'mb':
      case 'marginBottom':
        applySpacing(style, 'marginBottom', value);
        break;
      case 'ml':
      case 'marginLeft':
        applySpacing(style, 'marginLeft', value);
        break;
      case 'mx':
        applySpacing(style, 'marginLeft', value);
        applySpacing(style, 'marginRight', value);
        break;
      case 'my':
        applySpacing(style, 'marginTop', value);
        applySpacing(style, 'marginBottom', value);
        break;

      case 'ta':
        style.textAlign = value as React.CSSProperties['textAlign'];
        break;
      case 'fd':
        style.flexDirection = value as React.CSSProperties['flexDirection'];
        break;
      case 'fw':
        style.flexWrap = value as React.CSSProperties['flexWrap'];
        break;
      case 'ai':
        style.alignItems = value as React.CSSProperties['alignItems'];
        break;
      case 'ac':
        style.alignContent = value as React.CSSProperties['alignContent'];
        break;
      case 'jc':
        style.justifyContent = value as React.CSSProperties['justifyContent'];
        break;
      case 'as':
        style.alignSelf = value as React.CSSProperties['alignSelf'];
        break;
      case 'fg':
        style.flexGrow = value;
        break;
      case 'fs':
        style.flexShrink = value;
        break;
      case 'fb':
        applySize(style, 'flexBasis', value);
        break;

      case 'bc':
      case 'backgroundColor':
        applyColor(style, 'backgroundColor', value, colors);
        break;
      case 'br':
      case 'borderRadius':
        applyRadii(style, 'borderRadius', value);
        break;
      case 'btrr':
      case 'borderTopRightRadius':
        applyRadii(style, 'borderTopRightRadius', value);
        break;
      case 'bbrr':
      case 'borderBottomRightRadius':
        applyRadii(style, 'borderBottomRightRadius', value);
        break;
      case 'bblr':
      case 'borderBottomLeftRadius':
        applyRadii(style, 'borderBottomLeftRadius', value);
        break;
      case 'btlr':
      case 'borderTopLeftRadius':
        applyRadii(style, 'borderTopLeftRadius', value);
        break;
      case 'bs':
      case 'boxShadow':
        style.boxShadow = value;
        break;
      case 'c':
      case 'color':
        applyColor(style, 'color', value, colors);
        break;

      case 'fontSize':
        if (typeof value === 'string') {
          const fontSizeValue = getFontSizeValue(value);
          if (fontSizeValue !== '16px') {
            style.fontSize = fontSizeValue;
          }
        }
        break;
      case 'fontWeight':
        if (typeof value === 'string') {
          const fontWeightValue = getFontWeightValue(value);
          if (fontWeightValue !== '400') {
            style.fontWeight = fontWeightValue;
          }
        }
        break;
      case 'lh':
        style.lineHeight = value;
        break;

      case 'width':
      case 'w':
        applySize(style, 'width', value);
        break;
      case 'height':
      case 'h':
        applySize(style, 'height', value);
        break;

      case 'size':
        applySize(style, 'width', value);
        applySize(style, 'height', value);
        break;

      case 'ox':
        style.overflowX = value as React.CSSProperties['overflowX'];
        break;
      case 'oy':
        style.overflowY = value as React.CSSProperties['overflowY'];
        break;

      case 'pe':
        style.pointerEvents = value as React.CSSProperties['pointerEvents'];
        break;
      case 'us':
        style.userSelect = value as React.CSSProperties['userSelect'];
        break;

      default:
        // Handle token syntax for any property that falls through to default
        if (typeof value === 'string' && value.startsWith('$')) {
          const tokenValue = processToken(value);

          // Try spacing tokens first (most common for gap, etc)
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            (style as any)[key] = spaceValue;
            break;
          }

          // Try size tokens
          const sizeValue = getSizeValue(tokenValue);
          if (sizeValue !== tokenValue) {
            (style as any)[key] = sizeValue;
            break;
          }

          // Try radii tokens
          const radiiValue = getRadiiValue(tokenValue);
          if (radiiValue !== '0px') {
            (style as any)[key] = radiiValue;
            break;
          }

          // Try color tokens
          if (colors && tokenValue in colors) {
            (style as any)[key] = colors[tokenValue];
            break;
          }

          // If no token matches, pass through as-is
          (style as any)[key] = value;
        } else {
          (style as any)[key] = value;
        }
        break;
    }
  });

  return { style, vars };
}
