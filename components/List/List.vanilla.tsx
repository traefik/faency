import React, {
  Children,
  createContext,
  forwardRef,
  Fragment,
  isValidElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { RecipeVariantProps, withVariantKeys } from '@/styles/recipeVariants';
import type {
  FlexAlignSimplified,
  FlexDirection,
  FlexJustifySimplified,
  Gap,
} from '@/styles/types';
import { useInlineStyle } from '@/styles/useInlineStyle';
import { warnOnce } from '@/utils/warnOnce';

import { flexRecipe } from '@/components/Flex/Flex.vanilla.css';

import { controlsWrapper, itemButton, itemText, liRecipe, ol, ul } from './List.vanilla.css';

const flexClass = withVariantKeys(flexRecipe);
const liClass = withVariantKeys(liRecipe);

const ListVanillaContext = createContext({ interactive: false });

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

type LiRecipeVariants = RecipeVariantProps<typeof liRecipe>;

export type LiVanillaProps = React.LiHTMLAttributes<HTMLLIElement> &
  CSSProps &
  LiRecipeVariants & {
    /** Shown on the right of the item, outside its button. */
    controls?: ReactNode;
    /** Disables the item's button. Only applies in an interactive list. */
    disabled?: boolean;
    align?: FlexAlignSimplified;
    justify?: FlexJustifySimplified;
    direction?: FlexDirection;
    gap?: Gap;
    wrap?: 'wrap' | 'noWrap' | 'wrapReverse';
  };

const NESTED_LIST_WARNING =
  'LiVanilla: a nested list is rendered inside the item content, so it ends up in its button or span. ' +
  'Make UlVanilla or OlVanilla a direct child of LiVanilla, and wrap only its items in your component.';

// Looks into fragments, but not into components: what they render is unknown at this point.
const splitNestedLists = (children: ReactNode) => {
  const content: ReactNode[] = [];
  const nestedLists: ReactNode[] = [];

  // eslint-disable-next-line @eslint-react/no-children-to-array
  Children.toArray(children).forEach((child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) {
      content.push(child);
    } else if (child.type === UlVanilla || child.type === OlVanilla) {
      nestedLists.push(child);
    } else if (child.type === Fragment) {
      const inner = splitNestedLists(child.props.children);
      content.push(<Fragment key={child.key}>{inner.content}</Fragment>);
      if (inner.nestedLists.length) {
        nestedLists.push(<Fragment key={child.key}>{inner.nestedLists}</Fragment>);
      }
    } else {
      content.push(child);
    }
  });

  return { content, nestedLists };
};

export const LiVanilla = forwardRef<HTMLLIElement, LiVanillaProps>(
  (
    {
      controls,
      disabled,
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
    const { content, nestedLists } = splitNestedLists(children);

    const contentRef = useRef<HTMLElement | null>(null);
    const setContentRef = useCallback((node: HTMLElement | null) => {
      contentRef.current = node;
    }, []);

    // A list rendered by a wrapper component can't be detected before render.
    useEffect(() => {
      if (contentRef.current?.querySelector('ul, ol')) {
        warnOnce(NESTED_LIST_WARNING);
      }
    });

    return (
      <li
        ref={ref}
        className={cx(liClass({ elevation }), className)}
        style={inlineStyle}
        {...props}
      >
        {interactive ? (
          <button
            ref={setContentRef}
            type="button"
            disabled={disabled}
            className={cx(flexClass({ align, justify, direction, gap, wrap }), itemButton)}
          >
            {content}
          </button>
        ) : (
          <span
            ref={setContentRef}
            className={cx(
              flexClass({ align: align ?? 'center', justify, direction, gap: gap ?? 1, wrap }),
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
