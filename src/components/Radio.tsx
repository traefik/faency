import React from "react";
import {
  Radio as RadioPrimitive,
  RadioProps
} from "mdlz-prmtz";
import { theme } from "../theme";

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (props, forwardedRef) => (
    <RadioPrimitive
      {...props}
      ref={forwardedRef}
      styleConfig={{
        base: {
          radio: {
            normal: {
              height: theme.sizes[3],
              width: theme.sizes[3],
              borderColor: theme.colors.grays[3],
              transition: "all 200ms ease-in-out"
            },
            checked: {
              borderColor: theme.colors.blue,
              "> div": {
                backgroundColor: theme.colors.blue
              }
            },
            hover: {
              borderColor: `${theme.colors.grays[5]} !important`
            }
          },
          icon: {
            normal: {
              height: theme.sizes[2],
              width: theme.sizes[2]
            }
          }
        }
      }}
    />
  )
);
