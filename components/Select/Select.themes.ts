import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';
import { Theme as InputTheme } from '../Input/Input.themes';

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
    selectInvalidBorder: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;
  type FactoryMapper = (colors: InputTheme.Colors) => Colors;

  const remapInputTheme: FactoryMapper = (inputLightOrDark) => ({
    selectBg: inputLightOrDark.inputBg,
    selectBorder: inputLightOrDark.inputBorder,
    selectFocusBg: inputLightOrDark.inputFocusBg,
    selectFocusBorder: inputLightOrDark.inputFocusBorder,
    selectHoverBg: inputLightOrDark.inputHoverBg,
    selectText: inputLightOrDark.inputText,
    selectPlaceholder: inputLightOrDark.inputPlaceholder,
    selectDisabledText: inputLightOrDark.inputDisabledText,
    selectInvalidBorder: inputLightOrDark.inputInvalidBorder,
  });

  export const getLight: Factory = (primaryColor) => ({
    ...remapInputTheme(InputTheme.getLight(primaryColor)),
  });

  export const getDark: Factory = (primaryColor) => ({
    ...remapInputTheme(InputTheme.getDark(primaryColor)),
  });
}
