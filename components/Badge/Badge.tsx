import {styled} from '../../stitches.config';
import {VariantProps} from "@stitches/react";
import {modifyVariantsForStory} from "../../utils/modifyVariantsForStory";

export const Badge = styled('span', {
  // Reset
  alignItems: 'center',
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: '$rubik',
  justifyContent: 'center',
  lineHeight: '1',
  verticalAlign: 'middle',
  outline: 'none',
  padding: '0',
  textDecoration: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  borderRadius: '5px',
  whiteSpace: 'nowrap',
  fontVariantNumeric: 'tabular-nums',
  position: "relative",

  '&:disabled': {
    backgroundColor: '$slate3',
    pointerEvents: 'none',
    color: '$slate8',
  },

  variants: {
    interactive: {
      true: {
        '&:focus': {
          '&::after': {
            boxSizing: 'border-box',
            content: '""',
            position: 'absolute',
            zIndex: 1,
            top: '-1px',
            right: '-1px',
            bottom: '-1px',
            left: '-1px',
            display: 'block',
            pointerEvents: 'none',
            boxShadow: '0 0 0 1px $colors$focusOutline',
            transition: 'box-shadow .1s ease-in-out',
            borderRadius: '4px',
          },
        },
        "&:hover": {
          "&::before": {
            backgroundColor: '$badgeInteractiveBackground',
            boxSizing: 'border-box',
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderRadius: '5px',
            cursor: 'pointer',
          }
        }
      }
    },
    size: {
      small: {
        fontSize: '$2',
        fontWeight: '300',
        px: '$2',
        py: '$1',
      },
      large: {
        fontSize: '$3',
        fontWeight: '300',
        px: '$3',
        py: '$2',
      }
    },
    color: {
      gray: {
        backgroundColor: '$badgeDefaultBackground',
        color: '$badgeDefaultText',
      },
      red: {
        backgroundColor: '$red6',
        color: '$red10',
      },
      blue: {
        backgroundColor: '$blue5',
        color: '$blue9',
      },
      green: {
        backgroundColor: '$grass6',
        color: '$grass10',
      },
      neon: {
        backgroundColor: '$badgeNeonBackground',
        color: '$badgeNeonText',
      },
      orange: {
        backgroundColor: '$amber6',
        color: '$amber10'
      }
    },
  },
  compoundVariants: [
    {
      interactive: true,
      color: 'gray',
      css: {'&:focus': {'&::after': {boxShadow: '0 0 0 1px $colors$badgeDefaultText'}}}
    },
    {interactive: true, color: 'red', css: {'&:focus': {'&::after': {boxShadow: '0 0 0 1px $colors$red10'}}}},
    {interactive: true, color: 'blue', css: {'&:focus': {'&::after': {boxShadow: '0 0 0 1px $colors$blue9'}}}},
    {interactive: true, color: 'green', css: {'&:focus': {'&::after': {boxShadow: '0 0 0 1px $colors$grass10'}}}},
    {interactive: true, color: 'neon', css: {'&:focus': {'&::after': {boxShadow: '0 0 0 1px $colors$badgeNeonText'}}}},
    {interactive: true, color: 'orange', css: {'&:focus': {'&::after': {boxShadow: '0 0 0 1px $colors$amber10'}}}}
  ],
  defaultVariants: {
    size: 'small',
    interactive: false,
    color: 'gray',
  }
});

type BadgeVariants = VariantProps<typeof Badge>;

export interface BadgeProps extends BadgeVariants {
}

const BaseBadge = (props: BadgeProps): JSX.Element => <Badge {...props} />;
export const BadgeForStory = modifyVariantsForStory<BadgeVariants, BadgeProps>(BaseBadge);
