import { Property } from '@stitches/react/types/css';

export namespace Theme {
  type Colors = {
    skeletonBackground: Property.Color;
    skeletonAnimation: Property.Color;
  };

  type Factory = (primaryColor?: Property.Color) => Colors;

  export const getLight: Factory = () => ({
    skeletonBackground: '$slate4',
    skeletonAnimation: '$slate6',
  });

  export const getDark: Factory = () => ({
    skeletonBackground: '$deepBlue3',
    skeletonAnimation: '$deepBlue4',
  });
}
