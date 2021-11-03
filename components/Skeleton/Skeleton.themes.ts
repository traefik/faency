import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../stitches.config';

export namespace Theme {
  type Colors = {
    skeletonBackground: Property.Color;
    skeletonAnimation: Property.Color;
  };

  type Factory = (primaryColor?: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    skeletonBackground: '$slate4',
    skeletonAnimation: '$slate6',
  });

  export const getDark: Factory = () => ({
    skeletonBackground: '$deepBlue3',
    skeletonAnimation: '$deepBlue4',
  });
}
