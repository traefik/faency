export interface CSSProps {
  css?: {
    p?: string;
    pt?: string;
    pr?: string;
    pb?: string;
    pl?: string;
    px?: string;
    py?: string;

    m?: string;
    mt?: string;
    mr?: string;
    mb?: string;
    ml?: string;
    mx?: string;
    my?: string;

    ta?: 'left' | 'center' | 'right' | 'justify';
    fd?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    fw?: 'wrap' | 'nowrap' | 'wrap-reverse';
    ai?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    jc?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    as?: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    fg?: 0 | 1;
    fs?: 0 | 1;

    bc?: string;
    br?: string;
    c?: string;

    fontSize?: string;
    fontWeight?: string;
    lh?: string | number;

    [key: string]: any;
  };
}

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
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.padding = spaceValue;
          }
        }
        break;
      case 'pt':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.paddingTop = spaceValue;
          }
        }
        break;
      case 'pr':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.paddingRight = spaceValue;
          }
        }
        break;
      case 'pb':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.paddingBottom = spaceValue;
          }
        }
        break;
      case 'pl':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.paddingLeft = spaceValue;
          }
        }
        break;
      case 'px':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.paddingLeft = spaceValue;
            style.paddingRight = spaceValue;
          }
        }
        break;
      case 'py':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.paddingTop = spaceValue;
            style.paddingBottom = spaceValue;
          }
        }
        break;

      case 'm':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.margin = spaceValue;
          }
        }
        break;
      case 'mt':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.marginTop = spaceValue;
          }
        }
        break;
      case 'mr':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.marginRight = spaceValue;
          }
        }
        break;
      case 'mb':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.marginBottom = spaceValue;
          }
        }
        break;
      case 'ml':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.marginLeft = spaceValue;
          }
        }
        break;
      case 'mx':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.marginLeft = spaceValue;
            style.marginRight = spaceValue;
          }
        }
        break;
      case 'my':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const spaceValue = getSpaceValue(tokenValue);
          if (spaceValue !== '0px') {
            style.marginTop = spaceValue;
            style.marginBottom = spaceValue;
          }
        }
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

      case 'bc':
        // Handle Stitches color tokens like '$deepBlue6' or '$primary' or '$badgeInteractiveBackgroundHover'
        if (typeof value === 'string' && value.startsWith('$')) {
          const colorToken = value.slice(1); // Remove '$' prefix

          // Look up the color value from the colors object
          if (colors && colorToken in colors) {
            style.backgroundColor = colors[colorToken];
          } else {
            // Fallback: pass through the value as-is (for literal colors)
            style.backgroundColor = value;
          }
        } else {
          style.backgroundColor = value;
        }
        break;
      case 'br':
        if (typeof value === 'string') {
          const tokenValue = value.startsWith('$') ? value.slice(1) : value;
          const radiiValue = getRadiiValue(tokenValue);
          if (radiiValue !== '0px') {
            style.borderRadius = radiiValue;
          }
        }
        break;
      case 'c':
        // Handle color tokens like '$deepBlue6' or '$badgeInteractiveBackgroundHover'
        if (typeof value === 'string' && value.startsWith('$')) {
          const colorToken = value.slice(1);

          // Look up the color value from the colors object
          if (colors && colorToken in colors) {
            style.color = colors[colorToken];
          } else {
            // Fallback: pass through the value as-is
            style.color = value;
          }
        } else {
          style.color = value;
        }
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

      default:
        (style as any)[key] = value;
        break;
    }
  });

  return { style, vars };
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
