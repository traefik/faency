import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React, {
  Children,
  createContext,
  CSSProperties,
  forwardRef,
  isValidElement,
  ReactNode,
  useContext,
  useMemo,
} from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import type {
  FlexAlignSimplified,
  FlexDirection,
  FlexJustifySimplified,
  Gap,
} from '../../styles/types';
import { flexRecipe } from '../Flex/Flex.vanilla.css';
import { controlsWrapper, itemButton, itemText, liRecipe, ol, ul } from './List.vanilla.css';

const ListVanillaContext = createContext({ interactive: false });

const cx = (...classNames: (string | undefined)[]) => classNames.filter(Boolean).join(' ');

const useInlineStyle = (css: CSSProps['css'], style?: CSSProperties) => {
  const { colors } = useVanillaExtractTheme();
  const { style: cssStyles, vars } = processCSSProp(css, colors);
  return { ...cssStyles, ...style, ...assignInlineVars(vars) };
};

const useListContextValue = (interactive?: boolean) => {
  const parent = useContext(ListVanillaContext);
  return useMemo(
    () => ({ interactive: interactive ?? parent.interactive }),
    [interactive, parent.interactive],
  );
};

type ListOwnProps = CSSProps & {
  /** Renders the items as buttons. Nested lists inherit it. */
  interactive?: boolean;
};

export type UlVanillaProps = React.HTMLAttributes<HTMLUListElement> & ListOwnProps;

export const UlVanilla = forwardRef<HTMLUListElement, UlVanillaProps>(
  ({ interactive, className, css, style, ...props }, ref) => {
    const contextValue = useListContextValue(interactive);
    const inlineStyle = useInlineStyle(css, style);

    return (
      <ListVanillaContext.Provider value={contextValue}>
        <ul ref={ref} role="list" className={cx(ul, className)} style={inlineStyle} {...props} />
      </ListVanillaContext.Provider>
    );
  },
);

UlVanilla.displayName = 'UlVanilla';

export type OlVanillaProps = React.OlHTMLAttributes<HTMLOListElement> & ListOwnProps;

export const OlVanilla = forwardRef<HTMLOListElement, OlVanillaProps>(
  ({ interactive, className, css, style, ...props }, ref) => {
    const contextValue = useListContextValue(interactive);
    const inlineStyle = useInlineStyle(css, style);

    return (
      <ListVanillaContext.Provider value={contextValue}>
        <ol ref={ref} role="list" className={cx(ol, className)} style={inlineStyle} {...props} />
      </ListVanillaContext.Provider>
    );
  },
);

OlVanilla.displayName = 'OlVanilla';

type LiRecipeVariants = NonNullable<RecipeVariants<typeof liRecipe>>;

export type LiVanillaProps = React.LiHTMLAttributes<HTMLLIElement> &
  CSSProps &
  LiRecipeVariants & {
    /** Shown on the right of the item, outside its button. */
    controls?: ReactNode;
    align?: FlexAlignSimplified;
    justify?: FlexJustifySimplified;
    direction?: FlexDirection;
    gap?: Gap;
    wrap?: 'wrap' | 'noWrap' | 'wrapReverse';
  };

const isNestedList = (child: ReactNode) =>
  isValidElement(child) && (child.type === UlVanilla || child.type === OlVanilla);

export const LiVanilla = forwardRef<HTMLLIElement, LiVanillaProps>(
  (
    {
      controls,
      elevation,
      align,
      justify,
      direction,
      gap,
      wrap,
      className,
      css,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { interactive } = useContext(ListVanillaContext);
    const inlineStyle = useInlineStyle(css, style);

    // eslint-disable-next-line @eslint-react/no-children-to-array
    const childArray = Children.toArray(children);
    const nestedLists = childArray.filter(isNestedList);
    const content = childArray.filter((child) => !isNestedList(child));

    return (
      <li
        ref={ref}
        className={cx(liRecipe({ elevation }), className)}
        style={inlineStyle}
        {...props}
      >
        {interactive ? (
          <button
            type="button"
            className={cx(flexRecipe({ align, justify, direction, gap, wrap }), itemButton)}
          >
            {content}
          </button>
        ) : (
          <span
            className={cx(
              flexRecipe({ align: align ?? 'center', justify, direction, gap: gap ?? 1, wrap }),
              itemText,
            )}
          >
            {content}
          </span>
        )}
        {nestedLists}
        {!!controls && <div className={controlsWrapper}>{controls}</div>}
      </li>
    );
  },
);

LiVanilla.displayName = 'LiVanilla';
