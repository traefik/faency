import * as ToastPrimitive from '@radix-ui/react-toast';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ToastActionVanilla,
  ToastDescriptionVanilla,
  ToastTitleVanilla,
  ToastVanilla,
  ToastVanillaProps,
} from './Toast.vanilla';
import { ToastPosition, toastViewportRecipe } from './Toast.vanilla.css';

export type { ToastPosition };

// Leaves time for the close animation before the toast leaves the list.
const REMOVE_DELAY = 1000;

const SWIPE_DIRECTIONS: Record<
  ToastPosition,
  NonNullable<ToastPrimitive.ToastProviderProps['swipeDirection']>
> = {
  'top-left': 'left',
  'top-center': 'up',
  'top-right': 'right',
  'bottom-left': 'left',
  'bottom-center': 'down',
  'bottom-right': 'right',
};

export interface ToastOptions extends Pick<
  ToastVanillaProps,
  'variant' | 'icon' | 'duration' | 'type'
> {
  title?: ReactNode;
  description?: ReactNode;
  action?: {
    label: ReactNode;
    altText: string;
    onClick: () => void;
  };
}

interface ToastEntry extends ToastOptions {
  id: string;
  open: boolean;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export interface ToastProviderVanillaProps {
  children?: ReactNode;
  position?: ToastPosition;
  duration?: number;
  label?: string;
  closeLabel?: string;
}

export const ToastProviderVanilla = ({
  children,
  position = 'bottom-right',
  duration = 5000,
  label = 'Notification',
  closeLabel,
}: ToastProviderVanillaProps) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const nextIdRef = useRef(0);
  const removeTimersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const timers = removeTimersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const scheduleRemove = useCallback((id: string) => {
    if (removeTimersRef.current.has(id)) return;
    removeTimersRef.current.set(
      id,
      setTimeout(() => {
        removeTimersRef.current.delete(id);
        setToasts((current) => current.filter((entry) => entry.id !== id));
      }, REMOVE_DELAY),
    );
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    nextIdRef.current += 1;
    const id = `toast-${nextIdRef.current}`;
    setToasts((current) => [...current, { ...options, id, open: true }]);
    return id;
  }, []);

  useEffect(() => {
    toasts.forEach((entry) => {
      if (!entry.open) scheduleRemove(entry.id);
    });
  }, [toasts, scheduleRemove]);

  const dismiss = useCallback((id?: string) => {
    setToasts((current) =>
      current.map((entry) =>
        entry.open && (id === undefined || entry.id === id) ? { ...entry, open: false } : entry,
      ),
    );
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastPrimitive.Provider
      duration={duration}
      label={label}
      swipeDirection={SWIPE_DIRECTIONS[position]}
    >
      <ToastContext.Provider value={value}>
        {children}
        {toasts.map(({ id, open, title, description, action, ...options }) => (
          <ToastVanilla
            key={id}
            open={open}
            onOpenChange={(isOpen) => {
              if (!isOpen) dismiss(id);
            }}
            closeLabel={closeLabel}
            {...options}
          >
            {title ? <ToastTitleVanilla>{title}</ToastTitleVanilla> : null}
            {description ? <ToastDescriptionVanilla>{description}</ToastDescriptionVanilla> : null}
            {action ? (
              <ToastActionVanilla altText={action.altText} onClick={action.onClick}>
                {action.label}
              </ToastActionVanilla>
            ) : null}
          </ToastVanilla>
        ))}
        <ToastPrimitive.Viewport className={toastViewportRecipe({ position })} />
      </ToastContext.Provider>
    </ToastPrimitive.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProviderVanilla');
  }
  return context;
};
