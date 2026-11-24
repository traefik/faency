import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, {
  Children,
  createContext,
  ElementType,
  forwardRef,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';

import { FlexVanilla } from '@/components/Flex/Flex.vanilla';
import {
  NavigationContainerVanilla,
  NavigationDrawerVanilla,
  NavigationDrawerVanillaProps,
  NavigationItemOwnProps,
  NavigationItemVanilla,
} from '@/components/Navigation/Navigation.vanilla';
import { TextVanilla } from '@/components/Text/Text.vanilla';

import {
  navigationTreeDepth,
  navigationTreeFullWidthIndent,
  navigationTreeItemExpandable,
  navigationTreeLabel,
  navigationTreeLabelIndented,
  navigationTreeNested,
} from './NavigationTree.vanilla.css';

interface NavigationTreeContextValue {
  defaultExpandIcon: ReactNode;
  defaultCollapseIcon: ReactNode;
  fullWidth: boolean;
  depth: number;
}

const NavigationTreeContext = createContext<NavigationTreeContextValue>({
  defaultExpandIcon: <ChevronRightIcon />,
  defaultCollapseIcon: <ChevronDownIcon />,
  fullWidth: false,
  depth: 0,
});

interface NavigationTreeIconProps {
  defaultExpandIcon?: ReactNode;
  defaultCollapseIcon?: ReactNode;
  fullWidth?: boolean;
}

interface NavigationTreeContainerOwnProps extends NavigationTreeIconProps, CSSProps {}

export type NavigationTreeContainerVanillaProps<C extends ElementType = 'div'> =
  PolymorphicComponentProps<C, NavigationTreeContainerOwnProps>;

type NavigationTreeContainerVanillaComponent = PolymorphicComponent<
  'div',
  NavigationTreeContainerVanillaProps<ElementType>
>;

const NavigationTreeContainerVanillaImpl = forwardRef(
  <C extends ElementType = 'div'>(
    {
      defaultCollapseIcon: defaultCollapseIconProp,
      defaultExpandIcon: defaultExpandIconProp,
      fullWidth: fullWidthProp,
      ...props
    }: NavigationTreeContainerVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const parentContext = useContext(NavigationTreeContext);
    const defaultCollapseIcon = defaultCollapseIconProp ?? parentContext.defaultCollapseIcon;
    const defaultExpandIcon = defaultExpandIconProp ?? parentContext.defaultExpandIcon;
    const fullWidth = fullWidthProp ?? parentContext.fullWidth;
    const { depth } = parentContext;
    const contextValue = useMemo(
      () => ({ defaultCollapseIcon, defaultExpandIcon, fullWidth, depth }),
      [defaultCollapseIcon, defaultExpandIcon, fullWidth, depth],
    );

    return (
      <NavigationTreeContext.Provider value={contextValue}>
        <NavigationContainerVanilla ref={ref} {...props} />
      </NavigationTreeContext.Provider>
    );
  },
);

NavigationTreeContainerVanillaImpl.displayName = 'NavigationTreeContainerVanilla';

export const NavigationTreeContainerVanilla =
  NavigationTreeContainerVanillaImpl as NavigationTreeContainerVanillaComponent;

export type NavigationTreeDrawerVanillaProps<C extends ElementType = 'nav'> =
  NavigationDrawerVanillaProps<C>;

type NavigationTreeDrawerVanillaComponent = PolymorphicComponent<
  'nav',
  NavigationTreeDrawerVanillaProps<ElementType>
>;

const NavigationTreeDrawerVanillaImpl = forwardRef(
  <C extends ElementType = 'nav'>(
    { fullWidth = false, ...props }: NavigationTreeDrawerVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const parentContext = useContext(NavigationTreeContext);
    const contextValue = useMemo(
      () => ({ ...parentContext, fullWidth }),
      [parentContext, fullWidth],
    );

    return (
      <NavigationTreeContext.Provider value={contextValue}>
        <NavigationDrawerVanilla ref={ref} fullWidth={fullWidth} {...props} />
      </NavigationTreeContext.Provider>
    );
  },
);

NavigationTreeDrawerVanillaImpl.displayName = 'NavigationTreeDrawerVanilla';

export const NavigationTreeDrawerVanilla =
  NavigationTreeDrawerVanillaImpl as NavigationTreeDrawerVanillaComponent;

interface NavigationTreeItemOwnProps extends NavigationItemOwnProps, NavigationTreeIconProps {
  label: ReactNode;
  subtitle?: ReactNode;
  defaultExpanded?: boolean;
  customExpandIcon?: ReactNode;
  customCollapseIcon?: ReactNode;
  children?: ReactNode;
}

export type NavigationTreeItemVanillaProps<C extends ElementType = 'button'> =
  PolymorphicComponentProps<C, NavigationTreeItemOwnProps>;

type NavigationTreeItemVanillaComponent = PolymorphicComponent<
  'button',
  NavigationTreeItemVanillaProps<ElementType>
>;

const NavigationTreeItemVanillaImpl = forwardRef(
  <C extends ElementType = 'button'>(
    {
      label,
      subtitle,
      children,
      onClick,
      defaultExpanded = false,
      defaultCollapseIcon: defaultCollapseIconProp,
      defaultExpandIcon: defaultExpandIconProp,
      customCollapseIcon,
      customExpandIcon,
      fullWidth: fullWidthProp,
      startAdornment,
      className,
      css,
      style,
      ...props
    }: NavigationTreeItemVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const context = useContext(NavigationTreeContext);
    const defaultCollapseIcon = defaultCollapseIconProp ?? context.defaultCollapseIcon;
    const defaultExpandIcon = defaultExpandIconProp ?? context.defaultExpandIcon;
    const fullWidth = fullWidthProp ?? context.fullWidth;
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    // eslint-disable-next-line @eslint-react/no-children-to-array
    const isExpandable = Children.toArray(children).length > 0;

    const expandIcon = isExpanded
      ? customCollapseIcon || defaultCollapseIcon
      : customExpandIcon || defaultExpandIcon;

    const childContext = useMemo(
      () => ({ defaultCollapseIcon, defaultExpandIcon, fullWidth, depth: context.depth + 1 }),
      [defaultCollapseIcon, defaultExpandIcon, fullWidth, context.depth],
    );

    // In full width, the item spans the whole row and indents its own content by depth.
    const indentCss = fullWidth ? { paddingLeft: navigationTreeFullWidthIndent } : undefined;
    const indentStyle = fullWidth
      ? { ...assignInlineVars({ [navigationTreeDepth]: String(context.depth) }), ...style }
      : style;

    return (
      <div>
        <NavigationItemVanilla
          ref={ref}
          className={cx(isExpandable && navigationTreeItemExpandable, className)}
          css={{ ...indentCss, ...css }}
          style={indentStyle}
          aria-expanded={isExpandable ? isExpanded : undefined}
          {...props}
          startAdornment={startAdornment || (isExpandable ? expandIcon : null)}
          onClick={isExpandable ? () => setIsExpanded((expanded) => !expanded) : onClick}
        >
          <FlexVanilla
            as="span"
            direction="column"
            align="start"
            gap={1}
            className={cx(
              navigationTreeLabel,
              !isExpandable && !startAdornment && navigationTreeLabelIndented,
            )}
          >
            {typeof label === 'string' ? (
              <TextVanilla css={{ color: 'inherit' }}>{label}</TextVanilla>
            ) : (
              label
            )}
            {subtitle && (
              <TextVanilla variant="subtle" css={{ fontSize: '$3', opacity: 0.8 }}>
                {subtitle}
              </TextVanilla>
            )}
          </FlexVanilla>
        </NavigationItemVanilla>
        {isExpanded && (
          <NavigationTreeContext.Provider value={childContext}>
            <NavigationContainerVanilla className={fullWidth ? undefined : navigationTreeNested}>
              {children}
            </NavigationContainerVanilla>
          </NavigationTreeContext.Provider>
        )}
      </div>
    );
  },
);

NavigationTreeItemVanillaImpl.displayName = 'NavigationTreeItemVanilla';

export const NavigationTreeItemVanilla =
  NavigationTreeItemVanillaImpl as NavigationTreeItemVanillaComponent;
