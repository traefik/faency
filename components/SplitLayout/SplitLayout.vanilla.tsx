import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import type { Gap } from '../../styles/types';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { aside, handle, handleLine, main, root } from './SplitLayout.vanilla.css';

/** Pixels, or a share of the layout such as `'25%'`. */
export type SplitLayoutWidth = number | `${number}%`;

const KEY_STEP = 16;
const DEFAULT_MIN_WIDTH: SplitLayoutWidth = '25%';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const toPx = (width: SplitLayoutWidth, layoutWidth: number) =>
  typeof width === 'number' ? width : (parseFloat(width) / 100) * layoutWidth;

const storageName = (key: string) => `split:${key}`;

const readSaved = (key: string): number | null => {
  try {
    const saved = Number(window.localStorage.getItem(storageName(key)));
    return saved > 0 ? saved : null;
  } catch {
    return null;
  }
};

const writeSaved = (key: string, width: number | null) => {
  try {
    if (width == null) window.localStorage.removeItem(storageName(key));
    else window.localStorage.setItem(storageName(key), String(width));
  } catch {
    // Storage can be unavailable (private mode, blocked); remembering is only a convenience.
  }
};

const useMaxWidth = (px: number) => {
  const query = `(max-width: ${px}px)`;
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
};

type SplitContextValue = {
  stacked: boolean;
  layoutWidth: number;
  mainMinWidth: SplitLayoutWidth;
  setMainMinWidth: (width: SplitLayoutWidth) => void;
};

const SplitContext = createContext<SplitContextValue | null>(null);

const useSplit = (component: string) => {
  const split = useContext(SplitContext);
  if (!split) throw new Error(`${component} must be used inside SplitLayoutVanilla`);
  return split;
};

const stickyCss = (stacked: boolean, stickyTop?: string | number) =>
  !stacked && stickyTop != null ? { position: 'sticky', top: stickyTop } : {};

export type SplitLayoutVanillaProps = React.HTMLAttributes<HTMLDivElement> &
  CSSProps & {
    /** The panes stack at this viewport width (px) and below. */
    breakpoint?: number;
  };

export const SplitLayoutVanilla = forwardRef<HTMLDivElement, SplitLayoutVanillaProps>(
  ({ breakpoint = 1024, className, css, style, children, ...props }, ref) => {
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const setRefs = useCallback(
      (el: HTMLDivElement | null) => {
        containerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      },
      [ref],
    );

    const stacked = useMaxWidth(breakpoint);
    const [layoutWidth, setLayoutWidth] = useState(0);
    const [mainMinWidth, setMainMinWidth] = useState<SplitLayoutWidth>(DEFAULT_MIN_WIDTH);

    useIsomorphicLayoutEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      setLayoutWidth(el.clientWidth);
      const observer = new ResizeObserver(() => setLayoutWidth(el.clientWidth));
      observer.observe(el);
      return () => observer.unobserve(el);
    }, []);

    return (
      <SplitContext.Provider value={{ stacked, layoutWidth, mainMinWidth, setMainMinWidth }}>
        <div
          ref={setRefs}
          className={`${root} ${className || ''}`.trim()}
          data-stacked={stacked ? '' : undefined}
          style={{ ...cssStyles, ...style, ...assignInlineVars(vars) }}
          {...props}
        >
          {children}
        </div>
      </SplitContext.Provider>
    );
  },
);

SplitLayoutVanilla.displayName = 'SplitLayoutVanilla';

type PaneProps = React.HTMLAttributes<HTMLDivElement> &
  CSSProps & {
    gap?: Gap;
    /** Keeps the pane in view while the page scrolls, this far from the top. Off when stacked. */
    stickyTop?: string | number;
    /** The pane never gets narrower than this while resizing. */
    minWidth?: SplitLayoutWidth;
  };

export type SplitLayoutMainVanillaProps = PaneProps;

export const SplitLayoutMainVanilla = forwardRef<HTMLDivElement, SplitLayoutMainVanillaProps>(
  ({ stickyTop, minWidth = DEFAULT_MIN_WIDTH, className, css, ...props }, ref) => {
    const { stacked, setMainMinWidth } = useSplit('SplitLayoutMainVanilla');

    useIsomorphicLayoutEffect(() => {
      setMainMinWidth(minWidth);
      return () => setMainMinWidth(DEFAULT_MIN_WIDTH);
    }, [minWidth, setMainMinWidth]);

    return (
      <FlexVanilla
        ref={ref}
        direction="column"
        className={`${main} ${className || ''}`.trim()}
        css={{ ...stickyCss(stacked, stickyTop), ...css }}
        {...props}
      />
    );
  },
);

SplitLayoutMainVanilla.displayName = 'SplitLayoutMainVanilla';

export type SplitLayoutAsideVanillaProps = PaneProps & {
  /** Starting width in px. */
  defaultWidth?: number;
  /** Starting width as a share of the layout, e.g. 0.3. Overrides `defaultWidth`. */
  defaultFraction?: number;
  /** Remembers the width in localStorage under `split:<storageKey>`. */
  storageKey?: string;
  /** Accessible name of the divider. */
  resizeLabel?: string;
};

export const SplitLayoutAsideVanilla = forwardRef<HTMLDivElement, SplitLayoutAsideVanillaProps>(
  (
    {
      defaultWidth = 360,
      defaultFraction,
      minWidth = DEFAULT_MIN_WIDTH,
      storageKey,
      resizeLabel = 'Resize',
      stickyTop,
      className,
      css,
      id,
      ...props
    },
    ref,
  ) => {
    const { stacked, layoutWidth, mainMinWidth } = useSplit('SplitLayoutAsideVanilla');
    const generatedId = useId();
    const paneId = id ?? generatedId;

    // null means "use the default", which may depend on the measured layout width.
    const [wanted, setWanted] = useState<number | null>(() =>
      storageKey ? readSaved(storageKey) : null,
    );

    const measured = layoutWidth > 0;
    const min = Math.round(toPx(minWidth, layoutWidth));
    // The aside's own minimum wins when both minimums don't fit.
    const max = measured
      ? Math.round(Math.max(layoutWidth - toPx(mainMinWidth, layoutWidth), min))
      : null;
    const clamp = (w: number) => Math.round(Math.min(Math.max(w, min), max ?? Infinity));

    const startWidth =
      defaultFraction != null && measured ? layoutWidth * defaultFraction : defaultWidth;
    const width = clamp(wanted ?? startWidth);

    // Handlers read the latest render through this ref so they stay stable during a drag.
    const latestRef = useRef({ width, min, max, clamp, storageKey });
    latestRef.current = { width, min, max, clamp, storageKey };

    const resize = useCallback((next: number) => {
      const w = latestRef.current.clamp(next);
      setWanted(w);
      return w;
    }, []);

    const persist = useCallback((w: number | null) => {
      const key = latestRef.current.storageKey;
      if (key) writeSaved(key, w);
    }, []);

    const onPointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (e.button !== 0) return;
        e.preventDefault();
        const startX = e.clientX;
        const from = latestRef.current.width;
        let last = from;

        const onMove = (ev: PointerEvent) => {
          last = resize(from - (ev.clientX - startX));
        };
        const onUp = () => {
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
          window.removeEventListener('pointercancel', onUp);
          document.body.style.userSelect = '';
          document.body.style.cursor = '';
          persist(last);
        };

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
      },
      [resize, persist],
    );

    const onDoubleClick = useCallback(() => {
      setWanted(null);
      persist(null);
    }, [persist]);

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const { width: current, min: lo, max: hi } = latestRef.current;
        let next: number;
        if (e.key === 'ArrowLeft') next = current + KEY_STEP;
        else if (e.key === 'ArrowRight') next = current - KEY_STEP;
        else if (e.key === 'Home') next = lo;
        else if (e.key === 'End' && hi != null) next = hi;
        else return;
        e.preventDefault();
        persist(resize(next));
      },
      [resize, persist],
    );

    return (
      <>
        {!stacked && (
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label={resizeLabel}
            aria-controls={paneId}
            aria-valuenow={width}
            aria-valuemin={min}
            aria-valuemax={max ?? undefined}
            tabIndex={0}
            title="Drag to resize, double-click to reset"
            className={handle}
            onPointerDown={onPointerDown}
            onDoubleClick={onDoubleClick}
            onKeyDown={onKeyDown}
          >
            <span className={handleLine} />
          </div>
        )}
        <FlexVanilla
          ref={ref}
          id={paneId}
          direction="column"
          className={`${aside} ${className || ''}`.trim()}
          css={{ ...(stacked ? {} : { width }), ...stickyCss(stacked, stickyTop), ...css }}
          {...props}
        />
      </>
    );
  },
);

SplitLayoutAsideVanilla.displayName = 'SplitLayoutAsideVanilla';
