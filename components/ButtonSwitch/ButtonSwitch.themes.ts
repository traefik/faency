import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    buttonSwitchContainerBg: Property.Color;
    buttonSwitchActiveBg: Property.Color;
    buttonSwitchOffBg: Property.Color;
    buttonSwitchOffColor: Property.Color;
    buttonSwitchActiveColor: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    buttonSwitchContainerBg: '$deepBlue1',
    buttonSwitchActiveBg: '$primary',
    buttonSwitchOffBg: '$primary',
    buttonSwitchOffColor: '$hiContrast',
    buttonSwitchActiveColor: 'white',
  });

  export const getDark: Factory = () => ({
    buttonSwitchContainerBg: '$02dp',
    buttonSwitchActiveBg: '$primary',
    buttonSwitchOffBg: 'transparent',
    buttonSwitchOffColor: '$hiContrast',
    buttonSwitchActiveColor: '$deepBlue2',
  });
}
