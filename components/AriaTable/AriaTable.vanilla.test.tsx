import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import {
  AriaCaptionVanilla,
  AriaTableVanilla,
  AriaTbodyVanilla,
  AriaTdVanilla,
  AriaTfootVanilla,
  AriaTheadVanilla,
  AriaThVanilla,
  AriaTrVanilla,
  AriaTrVanillaProps,
} from './AriaTable.vanilla';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

const BasicTable = (props: React.ComponentProps<typeof AriaTableVanilla>) => (
  <AriaTableVanilla aria-labelledby="users-caption" {...props}>
    <AriaCaptionVanilla id="users-caption">Users</AriaCaptionVanilla>
    <AriaTheadVanilla>
      <AriaTrVanilla>
        <AriaThVanilla>First name</AriaThVanilla>
        <AriaThVanilla>Role</AriaThVanilla>
      </AriaTrVanilla>
    </AriaTheadVanilla>
    <AriaTbodyVanilla>
      <AriaTrVanilla>
        <AriaTdVanilla>John</AriaTdVanilla>
        <AriaTdVanilla subtle>Developer</AriaTdVanilla>
      </AriaTrVanilla>
    </AriaTbodyVanilla>
    <AriaTfootVanilla>
      <AriaTrVanilla>
        <AriaTdVanilla fullColSpan aria-colspan={2}>
          1 user
        </AriaTdVanilla>
      </AriaTrVanilla>
    </AriaTfootVanilla>
  </AriaTableVanilla>
);

const inTbody = (row: React.ReactElement) =>
  renderWithTheme(
    <AriaTableVanilla aria-label="Users">
      <AriaTbodyVanilla>{row}</AriaTbodyVanilla>
    </AriaTableVanilla>,
  );

describe('AriaTableVanilla', () => {
  it('renders divs and spans with table roles', () => {
    renderWithTheme(<BasicTable />);

    const table = screen.getByRole('table', { name: 'Users' });
    expect(table.tagName).toBe('DIV');
    expect(screen.getAllByRole('rowgroup')).toHaveLength(3);
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getAllByRole('columnheader')[0].tagName).toBe('SPAN');
    expect(screen.getAllByRole('cell')[0].tagName).toBe('SPAN');
    expect(screen.getAllByRole('cell')).toHaveLength(3);
  });

  it('accepts every elevation and variant prop', () => {
    ([0, 1, 2, 3, 4, 5] as const).forEach((elevation) => {
      const { unmount } = renderWithTheme(<BasicTable elevation={elevation} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      unmount();
    });

    (['start', 'center', 'end'] as const).forEach((align) => {
      const { unmount } = inTbody(
        <AriaTrVanilla interactive active>
          <AriaThVanilla align={align} size="2" weight="bold" variant="contrast" noWrap>
            Header
          </AriaThVanilla>
          <AriaTdVanilla align={align} subtle>
            Cell
          </AriaTdVanilla>
        </AriaTrVanilla>,
      );
      expect(screen.getByRole('columnheader')).toHaveTextContent('Header');
      unmount();
    });
  });

  it('accepts hasCollapsibleChildren', () => {
    renderWithTheme(<BasicTable hasCollapsibleChildren />);

    expect(screen.getByRole('table')).not.toHaveAttribute('hasCollapsibleChildren');
  });

  it('merges className, css and style on every part', () => {
    renderWithTheme(
      <AriaTableVanilla
        aria-label="Users"
        className="t"
        css={{ mt: '$2' }}
        style={{ marginLeft: '4px' }}
      >
        <AriaTheadVanilla className="h">
          <AriaTrVanilla className="r" css={{ p: '$1' }}>
            <AriaThVanilla className="th" css={{ p: '$3' }} style={{ width: '50%' }}>
              Name
            </AriaThVanilla>
          </AriaTrVanilla>
        </AriaTheadVanilla>
        <AriaTbodyVanilla>
          <AriaTrVanilla>
            <AriaTdVanilla className="td" css={{ p: '$2' }}>
              John
            </AriaTdVanilla>
          </AriaTrVanilla>
        </AriaTbodyVanilla>
      </AriaTableVanilla>,
    );
    const table = screen.getByRole('table');
    const th = screen.getByRole('columnheader');
    const td = screen.getByRole('cell');

    expect(table.className).toContain('t');
    expect(table.style.marginTop).toBe('8px');
    expect(table.style.marginLeft).toBe('4px');
    expect(screen.getAllByRole('rowgroup')[0].className).toContain('h');
    expect(screen.getAllByRole('row')[0].className).toContain('r');
    expect(th.className).toContain('th');
    expect(th.style.padding).toBe('16px');
    expect(th.style.width).toBe('50%');
    expect(td.className).toContain('td');
    expect(td.style.padding).toBe('8px');
  });

  it('forwards refs', () => {
    const refs = {
      table: React.createRef<HTMLDivElement>(),
      caption: React.createRef<HTMLDivElement>(),
      thead: React.createRef<HTMLDivElement>(),
      tbody: React.createRef<HTMLDivElement>(),
      tfoot: React.createRef<HTMLDivElement>(),
      tr: React.createRef<HTMLDivElement>(),
      th: React.createRef<HTMLSpanElement>(),
      td: React.createRef<HTMLSpanElement>(),
      fullTd: React.createRef<HTMLSpanElement>(),
    };
    renderWithTheme(
      <AriaTableVanilla ref={refs.table} aria-label="Users">
        <AriaCaptionVanilla ref={refs.caption}>Caption</AriaCaptionVanilla>
        <AriaTheadVanilla ref={refs.thead}>
          <AriaTrVanilla ref={refs.tr}>
            <AriaThVanilla ref={refs.th}>Name</AriaThVanilla>
          </AriaTrVanilla>
        </AriaTheadVanilla>
        <AriaTbodyVanilla ref={refs.tbody}>
          <AriaTrVanilla>
            <AriaTdVanilla ref={refs.td}>John</AriaTdVanilla>
          </AriaTrVanilla>
        </AriaTbodyVanilla>
        <AriaTfootVanilla ref={refs.tfoot}>
          <AriaTrVanilla>
            <AriaTdVanilla ref={refs.fullTd} fullColSpan>
              Total
            </AriaTdVanilla>
          </AriaTrVanilla>
        </AriaTfootVanilla>
      </AriaTableVanilla>,
    );

    expect(refs.table.current).toHaveAttribute('role', 'table');
    expect(refs.caption.current?.tagName).toBe('DIV');
    expect(refs.thead.current).toHaveAttribute('role', 'rowgroup');
    expect(refs.tbody.current).toHaveAttribute('role', 'rowgroup');
    expect(refs.tfoot.current).toHaveAttribute('role', 'rowgroup');
    expect(refs.tr.current).toHaveAttribute('role', 'row');
    expect(refs.th.current).toHaveAttribute('role', 'columnheader');
    expect(refs.td.current).toHaveAttribute('role', 'cell');
    expect(refs.fullTd.current).toHaveAttribute('role', 'cell');
  });

  it('passes HTML attributes through', () => {
    const onClick = jest.fn();
    inTbody(
      <AriaTrVanilla data-testid="row" onClick={onClick}>
        <AriaTdVanilla aria-label="Cell">John</AriaTdVanilla>
      </AriaTrVanilla>,
    );

    fireEvent.click(screen.getByTestId('row'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('cell')).toHaveAttribute('aria-label', 'Cell');
  });

  describe('AriaTdVanilla with fullColSpan', () => {
    it('renders its content once, after an empty hidden filler', () => {
      inTbody(
        <AriaTrVanilla>
          <AriaTdVanilla fullColSpan id="total" aria-colspan={2} data-testid="total">
            <input aria-label="Total" />
          </AriaTdVanilla>
        </AriaTrVanilla>,
      );
      const row = screen.getByRole('row');
      const [filler, cell] = Array.from(row.children);

      expect(screen.getAllByRole('cell')).toEqual([cell]);
      expect(screen.getByTestId('total')).toBe(cell);
      expect(screen.getAllByLabelText('Total')).toHaveLength(1);
      expect(cell).toHaveAttribute('id', 'total');
      expect(cell).toHaveAttribute('data-full-col-span');
      expect(filler).toHaveAttribute('aria-hidden', 'true');
      expect(filler).toBeEmptyDOMElement();
      expect(filler.attributes).toHaveLength(3);
    });

    it('makes the filler as tall as the cell, and follows its size', () => {
      let resize: () => void = () => {};
      const { ResizeObserver } = window;
      window.ResizeObserver = class {
        constructor(callback: () => void) {
          resize = callback;
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      } as unknown as typeof window.ResizeObserver;
      let cellHeight = 48;
      const offsetHeight = jest
        .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
        .mockImplementation(() => cellHeight);

      inTbody(
        <AriaTrVanilla>
          <AriaTdVanilla fullColSpan>Total</AriaTdVanilla>
        </AriaTrVanilla>,
      );
      const [filler] = Array.from(screen.getByRole('row').children) as HTMLElement[];
      expect(filler.style.height).toBe('48px');

      cellHeight = 96;
      act(() => resize());
      expect(filler.style.height).toBe('96px');

      offsetHeight.mockRestore();
      window.ResizeObserver = ResizeObserver;
    });

    it('throws when the row has other cells, including the ones the row adds', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});

      [
        <AriaTrVanilla key="cells">
          <AriaTdVanilla fullColSpan>Total</AriaTdVanilla>
          <AriaTdVanilla>Other</AriaTdVanilla>
        </AriaTrVanilla>,
        <AriaTrVanilla key="empty" emptyFirstColumn>
          <AriaTdVanilla fullColSpan>Total</AriaTdVanilla>
        </AriaTrVanilla>,
        <AriaTrVanilla key="toggle" collapsedContent="Details">
          <AriaTdVanilla fullColSpan>Total</AriaTdVanilla>
        </AriaTrVanilla>,
      ].forEach((row) => {
        expect(() => inTbody(row)).toThrow('must be the only cell of its row');
      });

      jest.restoreAllMocks();
    });
  });

  describe('AriaTrVanilla', () => {
    it('adds an empty first cell', () => {
      inTbody(
        <AriaTrVanilla emptyFirstColumn>
          <AriaTdVanilla>John</AriaTdVanilla>
        </AriaTrVanilla>,
      );
      expect(screen.getAllByRole('cell')).toHaveLength(2);
      expect(screen.getAllByRole('cell')[0]).toBeEmptyDOMElement();
    });

    it('keeps the empty first cell of a header row a data cell, as that column has no header', () => {
      renderWithTheme(
        <AriaTableVanilla aria-label="Users">
          <AriaTheadVanilla>
            <AriaTrVanilla emptyFirstColumn tableHead>
              <AriaThVanilla>Name</AriaThVanilla>
            </AriaTrVanilla>
          </AriaTheadVanilla>
        </AriaTableVanilla>,
      );

      expect(screen.getAllByRole('columnheader')).toHaveLength(1);
      expect(screen.getByRole('cell')).toBeEmptyDOMElement();
    });

    it('renders collapsible content closed, in a full-width cell of its own row', () => {
      inTbody(
        <AriaTrVanilla collapsedContent="Details">
          <AriaTdVanilla>John</AriaTdVanilla>
          <AriaTdVanilla>Doe</AriaTdVanilla>
        </AriaTrVanilla>,
      );
      const [row, contentRow] = screen.getAllByRole('row');
      const contentCell = within(contentRow).getByRole('cell');

      expect(within(row).getAllByRole('cell')).toHaveLength(3);
      expect(row).toHaveAttribute('data-collapsed');
      expect(contentRow).not.toHaveAttribute('data-open');
      expect(contentCell).toHaveAttribute('data-full-col-span');
      expect(contentCell).toHaveAttribute('data-closed');
      expect(contentCell).toHaveTextContent('Details');
      expect(screen.getAllByText('Details')).toHaveLength(1);
    });

    it('opens and closes the content from the expand button without clicking the row', () => {
      const onRowClick = jest.fn();
      inTbody(
        <AriaTrVanilla collapsedContent="Details" onClick={onRowClick}>
          <AriaTdVanilla>John</AriaTdVanilla>
        </AriaTrVanilla>,
      );
      const [row, contentRow] = screen.getAllByRole('row');
      const button = screen.getByRole('button', { name: 'Expand row' });
      const contentCell = within(contentRow).getByRole('cell');

      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', contentCell.id);

      fireEvent.click(button);
      expect(row).not.toHaveAttribute('data-collapsed');
      expect(contentRow).toHaveAttribute('data-open');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(contentCell).not.toHaveAttribute('data-closed');

      fireEvent.click(button);
      expect(row).toHaveAttribute('data-collapsed');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(contentCell).toHaveAttribute('data-closed');

      expect(onRowClick).not.toHaveBeenCalled();
    });

    it('expands the row with the keyboard', async () => {
      inTbody(
        <AriaTrVanilla collapsedContent="Details">
          <AriaTdVanilla>John</AriaTdVanilla>
        </AriaTrVanilla>,
      );

      await userEvent.tab();
      const button = screen.getByRole('button', { name: 'Expand row' });
      expect(button).toHaveFocus();

      await userEvent.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      await userEvent.keyboard(' ');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('names the expand button with expandLabel', () => {
      inTbody(
        <AriaTrVanilla collapsedContent="Details" expandLabel="Show details of John">
          <AriaTdVanilla>John</AriaTdVanilla>
        </AriaTrVanilla>,
      );

      expect(screen.getByRole('button', { name: 'Show details of John' })).toBeInTheDocument();
    });

    it('renders both the empty cell and the expand button when asked for both', () => {
      inTbody(
        <AriaTrVanilla emptyFirstColumn collapsedContent="Details">
          <AriaTdVanilla>John</AriaTdVanilla>
        </AriaTrVanilla>,
      );
      const [row] = screen.getAllByRole('row');

      expect(within(row).getAllByRole('cell')).toHaveLength(3);
      expect(within(row).getByRole('button', { name: 'Expand row' })).toBeInTheDocument();
    });

    it('updates the first cells when their props change', () => {
      const { rerender } = inTbody(
        <AriaTrVanilla>
          <AriaTdVanilla>John</AriaTdVanilla>
        </AriaTrVanilla>,
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();

      rerender(
        <VanillaExtractThemeProvider>
          <AriaTableVanilla aria-label="Users">
            <AriaTbodyVanilla>
              <AriaTrVanilla collapsedContent="Details" expandLabel="Show John">
                <AriaTdVanilla>John</AriaTdVanilla>
              </AriaTrVanilla>
            </AriaTbodyVanilla>
          </AriaTableVanilla>
        </VanillaExtractThemeProvider>,
      );
      expect(screen.getByRole('button', { name: 'Show John' })).toBeInTheDocument();
    });

    describe('with href', () => {
      const RouterLink = React.forwardRef<
        HTMLAnchorElement,
        { href: string; children?: React.ReactNode } & Record<string, unknown>
      >(({ href, children, ...props }, ref) => (
        <a ref={ref} href={href} data-router-link="" {...props}>
          {children}
        </a>
      ));
      RouterLink.displayName = 'RouterLink';

      const renderRow = (props: Partial<AriaTrVanillaProps>) =>
        inTbody(
          <AriaTrVanilla {...props}>
            <AriaTdVanilla>api-1</AriaTdVanilla>
            <AriaTdVanilla>Published</AriaTdVanilla>
          </AriaTrVanilla>,
        );

      it('puts the first cell in a row link', () => {
        renderRow({ href: '/apis/api-1' });

        const link = screen.getByRole('link', { name: 'api-1' });
        expect(link).toHaveAttribute('href', '/apis/api-1');
        expect(link).toHaveAttribute('data-row-link');
        expect(screen.getAllByRole('link')).toHaveLength(1);
      });

      it('puts the cell at linkCell in the row link', () => {
        renderRow({ href: '/apis/api-1', linkCell: 1 });

        expect(screen.getByRole('link', { name: 'Published' })).toHaveAttribute(
          'href',
          '/apis/api-1',
        );
      });

      it('renders the link with linkAs and linkProps', () => {
        renderRow({
          href: '/apis/api-1',
          linkAs: RouterLink,
          linkProps: { 'data-return-to': '/apis' },
        });

        const link = screen.getByRole('link', { name: 'api-1' });
        expect(link).toHaveAttribute('data-router-link');
        expect(link).toHaveAttribute('data-row-link');
        expect(link).toHaveAttribute('data-return-to', '/apis');
      });

      it('opens a link without overlay on a click on the row', async () => {
        const onRowClick = jest.fn();
        inTbody(
          <AriaTrVanilla href="#api-1" linkOverlay={false} onClick={onRowClick}>
            <AriaTdVanilla>api-1</AriaTdVanilla>
            <AriaTdVanilla>Published</AriaTdVanilla>
          </AriaTrVanilla>,
        );
        const link = screen.getByRole('link', { name: 'api-1' });
        const onLinkClick = jest.fn((event: MouseEvent) => event.preventDefault());
        link.addEventListener('click', onLinkClick);

        expect(link).toHaveAttribute('data-row-link', 'click');
        expect(screen.getByRole('row')).not.toHaveAttribute('linkOverlay');

        await userEvent.click(screen.getByText('Published'));

        expect(onRowClick).toHaveBeenCalledTimes(1);
        expect(onLinkClick).toHaveBeenCalledTimes(1);
      });

      it('renders no link without href', () => {
        renderRow({});

        expect(screen.queryByRole('link')).not.toBeInTheDocument();
      });

      it('does not follow the row link when the row is expanded', async () => {
        inTbody(
          <AriaTrVanilla href="#api-1" collapsedContent="More about api-1">
            <AriaTdVanilla>api-1</AriaTdVanilla>
          </AriaTrVanilla>,
        );
        const onLinkClick = jest.fn((event: MouseEvent) => event.preventDefault());
        screen.getByRole('link', { name: 'api-1' }).addEventListener('click', onLinkClick);

        await userEvent.click(screen.getByRole('button', { name: 'Expand row' }));

        expect(screen.getByRole('button', { name: 'Expand row' })).toHaveAttribute(
          'aria-expanded',
          'true',
        );
        expect(onLinkClick).not.toHaveBeenCalled();
      });

      it('has no accessibility violations', async () => {
        const { container } = renderRow({ href: '/apis/api-1' });

        expect(await axe(container)).toHaveNoViolations();
      });
    });
  });

  describe('AriaThVanilla sorting', () => {
    const renderHeader = (props: React.ComponentProps<typeof AriaThVanilla>) =>
      renderWithTheme(
        <AriaTableVanilla aria-label="Users">
          <AriaTheadVanilla>
            <AriaTrVanilla>
              <AriaThVanilla {...props}>Name</AriaThVanilla>
            </AriaTrVanilla>
          </AriaTheadVanilla>
        </AriaTableVanilla>,
      );

    it('renders no button without onSort', () => {
      renderHeader({});

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.getByRole('columnheader')).not.toHaveAttribute('aria-sort');
    });

    it('puts the content in a sort button with onSort', () => {
      renderHeader({ onSort: jest.fn() });

      expect(screen.getByRole('button', { name: 'Name' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader')).not.toHaveAttribute('aria-sort');
    });

    it('sets aria-sort only on the sorted column', () => {
      (
        [
          ['asc', 'ascending'],
          ['desc', 'descending'],
        ] as const
      ).forEach(([sort, ariaSort]) => {
        const { unmount } = renderHeader({ sort, onSort: jest.fn() });
        expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', ariaSort);
        unmount();
      });
    });

    it('calls onSort on click, Enter and Space', async () => {
      const onSort = jest.fn();
      renderHeader({ onSort });
      const button = screen.getByRole('button', { name: 'Name' });

      await userEvent.click(button);
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');

      expect(onSort).toHaveBeenCalledTimes(3);
    });

    it('has no accessibility violations', async () => {
      const { container } = renderHeader({ sort: 'asc', onSort: jest.fn() });

      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('works in light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider defaultTheme={theme}>
          <BasicTable />
        </VanillaExtractThemeProvider>,
      );
      expect(screen.getByRole('table')).toBeInTheDocument();
      unmount();
    });
  });

  it('works with every primary color', () => {
    (['neon', 'blue', 'orange', 'red', 'green', 'deepBlue', 'grayBlue'] as const).forEach(
      (primaryColor) => {
        const { unmount } = render(
          <VanillaExtractThemeProvider primaryColor={primaryColor}>
            <BasicTable />
          </VanillaExtractThemeProvider>,
        );
        expect(screen.getByRole('table')).toBeInTheDocument();
        unmount();
      },
    );
  });

  it('has no accessibility violations with collapsible rows and an empty header cell', async () => {
    const { container } = renderWithTheme(
      <AriaTableVanilla aria-label="Users" hasCollapsibleChildren>
        <AriaTheadVanilla>
          <AriaTrVanilla emptyFirstColumn tableHead>
            <AriaThVanilla>Name</AriaThVanilla>
            <AriaThVanilla>Role</AriaThVanilla>
            <AriaThVanilla>Status</AriaThVanilla>
          </AriaTrVanilla>
        </AriaTheadVanilla>
        <AriaTbodyVanilla>
          {['John', 'Jane', 'Jim'].map((name) => (
            <AriaTrVanilla key={name} collapsedContent={`About ${name}`}>
              <AriaTdVanilla>{name}</AriaTdVanilla>
              <AriaTdVanilla>Developer</AriaTdVanilla>
              <AriaTdVanilla>Active</AriaTdVanilla>
            </AriaTrVanilla>
          ))}
        </AriaTbodyVanilla>
      </AriaTableVanilla>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<BasicTable />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
