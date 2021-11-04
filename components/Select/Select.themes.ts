import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    selectBg: Property.Color;
    selectBorder: Property.Color;
    selectFocusBg: Property.Color;
    selectFocusBorder: Property.Color;
    selectHoverBg: Property.Color;
    selectText: Property.Color;
    selectPlaceholder: Property.Color;
    selectDisabledText: Property.Color;
    selectDisabledBorder: Property.Color;
    selectReadOnlyBg: Property.Color;
  };

  type Factory = (primaryColor?: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    selectBg: '$deepBlue3',
    selectBorder: '$deepBlue6',
    selectFocusBg: '$deepBlue2',
    selectFocusBorder: '$deepBlue10',
    selectHoverBg: '$deepBlue2',
    selectText: '$deepBlue9',
    selectPlaceholder: '$deepBlue6',
    selectDisabledText: '$deepBlue5',
    selectDisabledBorder: '$deepBlue5',
    selectReadOnlyBg: '$deepBlue3',
  });

  export const getDark: Factory = () => ({
    selectBg: '$deepBlue3',
    selectBorder: '$deepBlue6',
    selectFocusBg: '$deepBlue1',
    selectFocusBorder: '$deepBlue9',
    selectHoverBg: '$deepBlue1',
    selectText: '$deepBlue9',
    selectPlaceholder: '$deepBlue6',
    selectDisabledText: '$deepBlue5',
    selectDisabledBorder: '$deepBlue4',
    selectReadOnlyBg: '$deepBlue2',
  });
}
