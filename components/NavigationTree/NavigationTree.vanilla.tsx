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
  NavigationContainerVanillaProps,
  NavigationDrawerOwnProps,
  NavigationDrawerVanilla,
  NavigationDrawerVanillaProps,
  NavigationItemOwnProps,
  NavigationItemVanilla,
  NavigationItemVanillaProps,
} from '@/components/Navigation/Navigation.vanilla';
import { TextVanilla } from '@/components/Text/Text.vanilla';

import {
  navigationTreeDepth,
  navigationTreeItemExpandable,
  navigationTreeItemFullWidth,
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

const useNavigationTreeSettings = ({
  defaultCollapseIcon,
  defaultExpandIcon,
  fullWidth,
}: NavigationTreeIconProps): NavigationTreeContextValue => {
  const context = useContext(NavigationTreeContext);
  const collapseIcon = defaultCollapseIcon ?? context.defaultCollapseIcon;
  const expandIcon = defaultExpandIcon ?? context.defaultExpandIcon;
  const isFullWidth = fullWidth ?? context.fullWidth;

  return useMemo(
    () => ({
      defaultCollapseIcon: collapseIcon,
      defaultExpandIcon: expandIcon,
      fullWidth: isFullWidth,
      depth: context.depth,
    }),
    [collapseIcon, expandIcon, isFullWidth, context.depth],
  );
};

interface NavigationTreeContainerOwnProps extends NavigationTreeIconProps, CSSProps {}

export type NavigationTreeContainerVanillaProps<C extends ElementType = 'div'> =
  PolymorphicComponentProps<C, NavigationTreeContainerOwnProps>;

type NavigationTreeContainerVanillaComponent = PolymorphicComponent<
  'div',
  NavigationTreeContainerOwnProps
>;

const NavigationTreeContainerVanillaImpl = forwardRef(
  <C extends ElementType = 'div'>(
    {
      defaultCollapseIcon,
      defaultExpandIcon,
      fullWidth,
      ...props
    }: NavigationTreeContainerVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const contextValue = useNavigationTreeSettings({
      defaultCollapseIcon,
      defaultExpandIcon,
      fullWidth,
    });

    return (
      <NavigationTreeContext.Provider value={contextValue}>
        <NavigationContainerVanilla
          ref={ref}
          {...(props as NavigationContainerVanillaProps<ElementType>)}
        />
      </NavigationTreeContext.Provider>
    );
  },
);

NavigationTreeContainerVanillaImpl.displayName = 'NavigationTreeContainerVanilla';

export const NavigationTreeContainerVanilla =
  NavigationTreeContainerVanillaImpl as NavigationTreeContainerVanillaComponent;

export type NavigationTreeDrawerVanillaProps<C extends ElementType = 'nav'> =
  NavigationDrawerVanillaProps<C>;

type NavigationTreeDrawerVanillaComponent = PolymorphicComponent<'nav', NavigationDrawerOwnProps>;

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
        <NavigationDrawerVanilla
          ref={ref}
          fullWidth={fullWidth}
          {...(props as NavigationDrawerVanillaProps<ElementType>)}
        />
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
  NavigationTreeItemOwnProps
>;

const NavigationTreeItemVanillaImpl = forwardRef(
  <C extends ElementType = 'button'>(
    {
      label,
      subtitle,
      children,
      onClick,
      defaultExpanded = false,
      defaultCollapseIcon,
      defaultExpandIcon,
      customCollapseIcon,
      customExpandIcon,
      fullWidth,
      startAdornment,
      className,
      style,
      ...props
    }: NavigationTreeItemVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const settings = useNavigationTreeSettings({
      defaultCollapseIcon,
      defaultExpandIcon,
      fullWidth,
    });
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    // eslint-disable-next-line @eslint-react/no-children-to-array
    const isExpandable = Children.toArray(children).length > 0;

    const expandIcon = isExpanded
      ? customCollapseIcon || settings.defaultCollapseIcon
      : customExpandIcon || settings.defaultExpandIcon;

    const childContext = useMemo(() => ({ ...settings, depth: settings.depth + 1 }), [settings]);

    const itemStyle = settings.fullWidth
      ? { ...assignInlineVars({ [navigationTreeDepth]: String(settings.depth) }), ...style }
      : style;

    return (
      <div>
        <NavigationItemVanilla
          ref={ref}
          className={cx(
            isExpandable && navigationTreeItemExpandable,
            settings.fullWidth && navigationTreeItemFullWidth,
            className,
          )}
          style={itemStyle}
          aria-expanded={isExpandable ? isExpanded : undefined}
          {...(props as NavigationItemVanillaProps<ElementType>)}
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
            <NavigationContainerVanilla
              className={settings.fullWidth ? undefined : navigationTreeNested}
            >
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
