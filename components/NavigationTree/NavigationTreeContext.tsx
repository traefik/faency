import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React from 'react';

interface NavigationTreeContextValue {
  defaultExpandIcon: React.ReactNode;
  defaultCollapseIcon: React.ReactNode;
  fullWidth: boolean;
}

export const NavigationTreeContext = React.createContext<NavigationTreeContextValue>({
  defaultExpandIcon: <ChevronRightIcon />,
  defaultCollapseIcon: <ChevronDownIcon />,
  fullWidth: false,
});

export const useNavigationTree = () => React.useContext(NavigationTreeContext);
