import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';
import { ColorInfo } from '../../stitches.config';
export namespace Theme {
  type Colors = {
    linkSubtle: Property.Color;
    linkBlueTextDecoration: Property.Color;
    linkBlueHoverTextDecoration: Property.Color;
    linkBlueFocusOutline: Property.Color;
    linkContrast: Property.Color;
    linkContrastTextDecoration: Property.Color;
    linkContrastHoverTextDecoration: Property.Color;
    linkContrastFocusOutline: Property.Color;
    linkSubtleTextDecoration: Property.Color;
    linkSubtleHoverTextDecoration: Property.Color;
    linkSubtleFocusOutline: Property.Color;
    linkPrimary: Property.Color;
    linkPrimaryTextDecoration: Property.Color;
    linkPrimaryHoverTextDecoration: Property.Color;
    linkPrimaryFocusOutline: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    linkBlue: '$blue11',
    linkBlueTextDecoration: '$blue7',
    linkBlueHoverTextDecoration: '$blue11',
    linkBlueFocusOutline: '$blue8',
    linkContrast: '$hiContrast',
    linkContrastTextDecoration: '$slate8',
    linkContrastHoverTextDecoration: '$hiContrast',
    linkContrastFocusOutline: '$slate8',
    linkSubtle: '$deepBlue7',
    linkSubtleTextDecoration: '$deepBlue5',
    linkSubtleHoverTextDecoration: '$deepBlue7',
    linkSubtleFocusOutline: '$deepBlue4',
    linkPrimary: tinycolor(primaryColor.value).darken(26).toString(),
    linkPrimaryTextDecoration: tinycolor(primaryColor.value).darken(16).toString(),
    linkPrimaryHoverTextDecoration: tinycolor(primaryColor.value).darken(26).toString(),
    linkPrimaryFocusOutline: tinycolor(primaryColor.value).darken(16).toString(),
  });

  export const getDark: Factory = (primaryColor) => ({
    linkBlue: '$blue11',
    linkBlueTextDecoration: '$blue8',
    linkBlueHoverTextDecoration: '$blue11',
    linkBlueFocusOutline: '$blue8',
    linkContrast: '$hiContrast',
    linkContrastTextDecoration: '$slate8',
    linkContrastHoverTextDecoration: '$hiContrast',
    linkContrastFocusOutline: '$slate8',
    linkSubtle: '$deepBlue6',
    linkSubtleTextDecoration: '$deepBlue4',
    linkSubtleHoverTextDecoration: '$deepBlue5',
    linkSubtleFocusOutline: '$deepBlue3',
    linkPrimary: '$primary',
    linkPrimaryTextDecoration: tinycolor(primaryColor.value).lighten(16).toString(),
    linkPrimaryHoverTextDecoration: tinycolor(primaryColor.value).darken(20).toString(),
    linkPrimaryFocusOutline: tinycolor(primaryColor.value).lighten(16).toString(),
  });
}
