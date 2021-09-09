import {keyframes, styled} from "../../stitches.config";
import {VariantProps} from "@stitches/react";
import {modifyVariantsForStory} from "../../utils/modifyVariantsForStory";

const bip = keyframes({
  '0%': {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 1,
  },
  '100%': {
    top: -8,
    right: -8,
    bottom: -8,
    left: -8,
    opacity: 0,
  },
});

export const Bubble = styled("div", {
  display: 'inline-block',
  size: "$4",
  bc: "$red8",
  borderRadius: '50%',
  position: 'relative',

  '&::before': {
    animation: `${bip} 1s ease infinite`,
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.5)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: -1,
  },

  '&::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
    bc: "rgba(255,255,255,.1)",
    borderRadius: '50%',
    pointerEvents: 'none',
  },

  variants: {
    variant: {
      red: {bc: "$red8", "&::before": {bc: "$red8"}},
      green: {bc: "$green8", "&::before": {bc: "$green8"}},
      orange: {bc: "$orange8", "&::before": {bc: "$orange8"}},
      blue: {bc: "$blue8", "&::before": {bc: "$blue8"}},
      yellow: {bc: "$neon8", "&::before": {bc: "$neon8"}},
      purple: {bc: "$purple8", "&::before": {bc: "$purple8"}},
      gray: {bc: "$slate8", "&::before": {bc: "$slate8"}},
    },
    size: {
      "x-small": {size: "$1"},
      small: {size: "$2"},
      medium: {size: "$3"},
      large: {size: "$4"}
    },
    noAnimation: {
      true: {
        '&::before': {content: "none"}
      }
    }
  },

  defaultVariants: {
    size: "small",
    noAnimation: false,
  }
});

type BubbleVariants = VariantProps<typeof Bubble>;

export interface BubbleProps extends BubbleVariants {
}

const BaseBubble = (props: BubbleProps): JSX.Element => <Bubble {...props} />;
export const BubbleForStory = modifyVariantsForStory<BubbleVariants, BubbleProps>(BaseBubble);
