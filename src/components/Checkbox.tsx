import React from "react";
import { theme } from "../theme";
import { Checkbox as CheckboxPrimitive, CheckboxProps } from "mdlz-prmtz";

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, forwardedRef) => (
    <CheckboxPrimitive
      {...props}
      ref={forwardedRef}
      styleConfig={{
        base: {
          icon: {
            normal: {
              color: theme.colors.white
            }
          },
          checkbox: {
            normal: {
              width: theme.sizes[3],
              height: theme.sizes[3],
              borderRadius: theme.radii[2],
              transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
              borderColor: theme.colors.grays[3]
            },
            hover: {
              borderColor: `${theme.colors.grays[5]} !important`
            },
            checked: {
              backgroundColor: theme.colors.blue,
              borderColor: theme.colors.blue
            }
          }
        }
      }}
    />
  )
);
