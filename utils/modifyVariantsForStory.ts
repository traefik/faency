/*
 * This utility is meant to solve this issue: https://github.com/modulz/stitches/issues/239. Namely,
 * storybook uses type annotations to auto-generate control options. This is extremely convenient
 * for maintaining the storybook; however, it doesn't work well with stitches. This utility should be
 * used to modify a stitches component for storybook when that component uses a stitches component's
 * variants as props.
 *
 * In the below example, use `Button` in the app and `ButtonForStory` in storybook.
 *
 * Example:
 *
 * import type { StitchesVariants } from "@stitches/react";
 * import { styled } from "./stitches.config";
 *
 * const BaseButton = styled("button", {...});
 *
 * type ButtonVariants = StitchesVariants<typeof BaseButton>;
 * interface ButtonProps extends ButtonVariants {...};
 *
 * export const Button = ({...}: ButtonProps): JSX.Element => {...};
 * export const ButtonForStory = modifyVariantsForStory<ButtonVariants, ButtonProps>(Button);
 */

interface StitchesMedia {
  [x: string]: any;
  initial?: any;
}

// We exclude these type properties from the `ComponentVariants` type so that storybook can more
// easily understand the type arguments. We exclude `"true"` and `"false"` strings as well since
// stitches also adds these, and they aren't necessary for storybook controls.
type StitchesPropsToExclude = 'true' | 'false' | StitchesMedia;

export function modifyVariantsForStory<ComponentVariants, ComponentProps>(
  component: (props: ComponentProps) => JSX.Element
) {
  type ComponentStoryVariants = {
    [Property in keyof ComponentVariants]: Exclude<
      ComponentVariants[Property],
      StitchesPropsToExclude
    >;
  };

  type ComponentStoryProps = Omit<ComponentProps, keyof ComponentVariants> & ComponentStoryVariants;

  return (component as unknown) as (props: ComponentStoryProps) => JSX.Element;
}
