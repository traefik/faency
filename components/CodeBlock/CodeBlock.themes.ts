import { Property } from '@stitches/react/types/css';

export namespace Theme {
  type Colors = {
    codeBlockCopyButtonBg: Property.Color;
  };

  export function getLight(): Colors {
    return {
      codeBlockCopyButtonBg: 'transparent',
    };
  }

  export function getDark(): Colors {
    return {
      codeBlockCopyButtonBg: 'transparent',
    };
  }
}
