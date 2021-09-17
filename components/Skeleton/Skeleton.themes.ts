import { Property } from '@stitches/react/types/css';

export namespace Theme {
  type Colors = {
    skeletonBackground: Property.Color;
    skeletonAnimation: Property.Color;
  };

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    skeletonBackground: '$slate4',
    skeletonAnimation: '$slate6',
  });

  export const getDark: Factory = (primaryColor) => ({
    skeletonBackground: '$deepBlue3',
    skeletonAnimation: '$deepBlue4',
  });
}
