import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import {
  SplitLayoutAsideVanilla,
  SplitLayoutAsideVanillaProps,
  SplitLayoutMainVanilla,
  SplitLayoutMainVanillaProps,
  SplitLayoutVanilla,
  SplitLayoutVanillaProps,
} from './SplitLayout.vanilla';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

const renderSplit = ({
  root,
  main,
  aside,
}: {
  root?: Partial<SplitLayoutVanillaProps>;
  main?: Partial<SplitLayoutMainVanillaProps>;
  aside?: Partial<SplitLayoutAsideVanillaProps>;
} = {}) =>
  renderWithTheme(
    <SplitLayoutVanilla {...root}>
      <SplitLayoutMainVanilla data-testid="main" {...main}>
        Main
      </SplitLayoutMainVanilla>
      <SplitLayoutAsideVanilla data-testid="aside" {...aside}>
        Aside
      </SplitLayoutAsideVanilla>
    </SplitLayoutVanilla>,
  );

const separator = () => screen.getByRole('separator', { name: 'Resize' });
const mainPane = () => screen.getByTestId('main');
const asidePane = () => screen.getByTestId('aside');
const asideWidth = () => asidePane().style.width;

const pointer = (target: EventTarget, type: string, clientX: number) =>
  act(() => {
    target.dispatchEvent(new MouseEvent(type, { bubbles: true, clientX, button: 0 }));
  });

const mockLayoutWidth = (width: number) =>
  jest.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(width);

const mockStacked = (matches: boolean) =>
  jest.spyOn(window, 'matchMedia').mockImplementation(
    (query) =>
      ({
        matches,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }) as unknown as MediaQueryList,
  );

describe('SplitLayoutVanilla', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    window.localStorage.clear();
  });

  it('renders both panes with a resize separator that controls the aside', () => {
    renderSplit();

    expect(mainPane()).toHaveTextContent('Main');
    expect(asidePane()).toHaveTextContent('Aside');
    expect(separator()).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator()).toHaveAttribute('aria-controls', asidePane().id);
    expect(separator()).toHaveAttribute('tabindex', '0');
  });

  it('starts the aside at 360px by default', () => {
    renderSplit();

    expect(asideWidth()).toBe('360px');
    expect(separator()).toHaveAttribute('aria-valuenow', '360');
  });

  it('starts the aside at defaultWidth or defaultFraction', () => {
    mockLayoutWidth(1000);
    const { unmount } = renderSplit({ aside: { defaultWidth: 400 } });
    expect(asideWidth()).toBe('400px');
    unmount();

    renderSplit({ aside: { defaultWidth: 400, defaultFraction: 0.3 } });
    expect(asideWidth()).toBe('300px');
  });

  it('keeps each pane at least 25% wide by default', () => {
    mockLayoutWidth(1000);
    renderSplit({ aside: { defaultWidth: 100 } });

    expect(asideWidth()).toBe('250px');
    expect(separator()).toHaveAttribute('aria-valuemin', '250');
    expect(separator()).toHaveAttribute('aria-valuemax', '717');
  });

  it('takes minWidth on each pane, in px or %', () => {
    mockLayoutWidth(1000);
    const { unmount } = renderSplit({ main: { minWidth: 600 }, aside: { minWidth: '10%' } });
    expect(separator()).toHaveAttribute('aria-valuemin', '100');
    expect(separator()).toHaveAttribute('aria-valuemax', '367');
    unmount();

    renderSplit({ main: { minWidth: '50%' }, aside: { minWidth: 340, defaultWidth: 100 } });
    expect(asideWidth()).toBe('340px');
    expect(separator()).toHaveAttribute('aria-valuemax', '467');
  });

  it("lets the aside's minWidth win when both minimums don't fit", () => {
    mockLayoutWidth(1000);
    renderSplit({ main: { minWidth: 800 }, aside: { minWidth: 300 } });

    expect(asideWidth()).toBe('300px');
    expect(separator()).toHaveAttribute('aria-valuemax', '300');
  });

  it('resizes with the keyboard', () => {
    mockLayoutWidth(1000);
    renderSplit({ aside: { defaultWidth: 400 } });

    fireEvent.keyDown(separator(), { key: 'ArrowLeft' });
    expect(asideWidth()).toBe('416px');

    fireEvent.keyDown(separator(), { key: 'ArrowRight' });
    fireEvent.keyDown(separator(), { key: 'ArrowRight' });
    expect(asideWidth()).toBe('384px');

    fireEvent.keyDown(separator(), { key: 'Home' });
    expect(asideWidth()).toBe('250px');

    fireEvent.keyDown(separator(), { key: 'End' });
    expect(asideWidth()).toBe('717px');
  });

  it('resizes by dragging, then restores the page cursor', () => {
    mockLayoutWidth(1000);
    renderSplit({ aside: { defaultWidth: 400 } });

    pointer(separator(), 'pointerdown', 500);
    expect(document.body.style.cursor).toBe('col-resize');

    pointer(window, 'pointermove', 400);
    expect(asideWidth()).toBe('500px');

    pointer(window, 'pointermove', 1000);
    expect(asideWidth()).toBe('250px');

    pointer(window, 'pointerup', 1000);
    expect(document.body.style.cursor).toBe('');

    pointer(window, 'pointermove', 0);
    expect(asideWidth()).toBe('250px');
  });

  it('remembers the width under storageKey', () => {
    mockLayoutWidth(1000);
    const { unmount } = renderSplit({ aside: { storageKey: 'files' } });

    pointer(separator(), 'pointerdown', 500);
    pointer(window, 'pointermove', 450);
    pointer(window, 'pointerup', 450);
    expect(window.localStorage.getItem('split:files')).toBe('410');

    fireEvent.keyDown(separator(), { key: 'ArrowLeft' });
    expect(window.localStorage.getItem('split:files')).toBe('426');
    unmount();

    renderSplit({ aside: { storageKey: 'files' } });
    expect(asideWidth()).toBe('426px');
  });

  it('does not save the width on a click without a drag', () => {
    mockLayoutWidth(1000);
    renderSplit({ aside: { storageKey: 'files', defaultFraction: 0.3 } });

    pointer(separator(), 'pointerdown', 500);
    pointer(window, 'pointerup', 500);

    expect(window.localStorage.getItem('split:files')).toBeNull();
  });

  it('leaves room for the handle when computing the max width', () => {
    mockLayoutWidth(1000);
    renderSplit({ main: { minWidth: 400 } });

    fireEvent.keyDown(separator(), { key: 'End' });
    expect(asideWidth()).toBe('567px');
  });

  it('does not touch storage without a storageKey', () => {
    renderSplit();
    fireEvent.keyDown(separator(), { key: 'ArrowLeft' });

    expect(window.localStorage.length).toBe(0);
  });

  it('resets to the default width on double-click and forgets the saved one', () => {
    mockLayoutWidth(1000);
    renderSplit({ aside: { storageKey: 'files', defaultFraction: 0.3 } });

    fireEvent.keyDown(separator(), { key: 'End' });
    expect(asideWidth()).toBe('717px');

    fireEvent.doubleClick(separator());
    expect(asideWidth()).toBe('300px');
    expect(window.localStorage.getItem('split:files')).toBeNull();
  });

  it('makes either pane sticky with stickyTop', () => {
    const { unmount } = renderSplit();
    expect(mainPane().style.position).toBe('');
    expect(asidePane().style.position).toBe('');
    unmount();

    renderSplit({ main: { stickyTop: 16 }, aside: { stickyTop: '$6' } });
    expect(mainPane().style.position).toBe('sticky');
    expect(mainPane().style.top).toBe('16px');
    expect(asidePane().style.position).toBe('sticky');
    expect(asidePane().style.top).toBe('32px');
  });

  it('stacks below the breakpoint: no separator, no fixed width, no sticky', () => {
    const matchMedia = mockStacked(true);
    renderSplit({ root: { breakpoint: 800 }, main: { stickyTop: 0 }, aside: { stickyTop: '$6' } });

    expect(matchMedia).toHaveBeenCalledWith('(max-width: 800px)');
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(asideWidth()).toBe('');
    expect(mainPane().style.position).toBe('');
    expect(asidePane().style.position).toBe('');
  });

  it('uses a custom resizeLabel', () => {
    renderSplit({ aside: { resizeLabel: 'Resize preview' } });

    expect(screen.getByRole('separator', { name: 'Resize preview' })).toBeInTheDocument();
  });

  it('keeps a custom aside id for aria-controls', () => {
    renderSplit({ aside: { id: 'preview' } });

    expect(separator()).toHaveAttribute('aria-controls', 'preview');
  });

  it('throws when a pane is used outside a layout', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderWithTheme(<SplitLayoutMainVanilla />)).toThrow(/inside SplitLayoutVanilla/);
    expect(() => renderWithTheme(<SplitLayoutAsideVanilla />)).toThrow(/inside SplitLayoutVanilla/);
  });

  it('forwards refs', () => {
    const rootRef = React.createRef<HTMLDivElement>();
    const mainRef = React.createRef<HTMLDivElement>();
    const asideRef = React.createRef<HTMLDivElement>();
    renderWithTheme(
      <SplitLayoutVanilla ref={rootRef}>
        <SplitLayoutMainVanilla ref={mainRef} />
        <SplitLayoutAsideVanilla ref={asideRef} />
      </SplitLayoutVanilla>,
    );

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(mainRef.current).toBeInstanceOf(HTMLDivElement);
    expect(asideRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges className, css and style, and passes HTML attributes through', () => {
    renderWithTheme(
      <SplitLayoutVanilla
        className="custom-root"
        css={{ mt: '$2' }}
        style={{ marginLeft: '4px' }}
        data-testid="root"
      >
        <SplitLayoutMainVanilla className="custom-main" css={{ p: '$3' }} data-testid="main" />
        <SplitLayoutAsideVanilla
          className="custom-aside"
          css={{ width: '200px' }}
          aria-label="Preview"
          data-testid="aside"
        />
      </SplitLayoutVanilla>,
    );
    const rootEl = screen.getByTestId('root');

    expect(rootEl.className).toContain('custom-root');
    expect(rootEl.style.marginTop).toBe('8px');
    expect(rootEl.style.marginLeft).toBe('4px');
    expect(mainPane().className).toContain('custom-main');
    expect(mainPane().style.padding).toBe('16px');
    expect(asidePane().className).toContain('custom-aside');
    expect(asideWidth()).toBe('200px');
    expect(asidePane()).toHaveAttribute('aria-label', 'Preview');
  });

  it('works in light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider defaultTheme={theme}>
          <SplitLayoutVanilla>
            <SplitLayoutMainVanilla />
            <SplitLayoutAsideVanilla />
          </SplitLayoutVanilla>
        </VanillaExtractThemeProvider>,
      );
      expect(separator()).toBeInTheDocument();
      unmount();
    });
  });

  it('has no accessibility violations', async () => {
    mockLayoutWidth(1000);
    const { container } = renderSplit({ aside: { stickyTop: '$6' } });

    expect(await axe(container)).toHaveNoViolations();
  });
});
