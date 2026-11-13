import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import {
  CaptionVanilla,
  TableVanilla,
  TbodyVanilla,
  TdVanilla,
  TfootVanilla,
  TheadVanilla,
  ThVanilla,
  TrVanilla,
  TrVanillaProps,
} from './Table.vanilla';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

const BasicTable = (props: React.ComponentProps<typeof TableVanilla>) => (
  <TableVanilla {...props}>
    <CaptionVanilla>Users</CaptionVanilla>
    <TheadVanilla>
      <TrVanilla>
        <ThVanilla>First name</ThVanilla>
        <ThVanilla>Role</ThVanilla>
      </TrVanilla>
    </TheadVanilla>
    <TbodyVanilla>
      <TrVanilla>
        <TdVanilla>John</TdVanilla>
        <TdVanilla subtle>Developer</TdVanilla>
      </TrVanilla>
    </TbodyVanilla>
    <TfootVanilla>
      <TrVanilla>
        <TdVanilla colSpan={2}>1 user</TdVanilla>
      </TrVanilla>
    </TfootVanilla>
  </TableVanilla>
);

const inTbody = (row: React.ReactElement) =>
  renderWithTheme(
    <TableVanilla>
      <TbodyVanilla>{row}</TbodyVanilla>
    </TableVanilla>,
  );

describe('TableVanilla', () => {
  it('renders native table elements', () => {
    const { container } = renderWithTheme(<BasicTable />);

    expect(screen.getByRole('table', { name: 'Users' })).toBeInTheDocument();
    expect(container.querySelector('caption')).toHaveTextContent('Users');
    expect(container.querySelectorAll('thead, tbody, tfoot')).toHaveLength(3);
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getAllByRole('cell')).toHaveLength(3);
  });

  it('accepts every elevation and variant prop', () => {
    ([0, 1, 2, 3, 4, 5] as const).forEach((elevation) => {
      const { unmount } = renderWithTheme(<BasicTable elevation={elevation} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      unmount();
    });

    (['start', 'center', 'end'] as const).forEach((align) => {
      const { unmount } = renderWithTheme(
        <TableVanilla>
          <TbodyVanilla>
            <TrVanilla interactive active>
              <ThVanilla align={align} size="2" weight="bold" variant="contrast" noWrap>
                Header
              </ThVanilla>
              <TdVanilla align={align} subtle>
                Cell
              </TdVanilla>
            </TrVanilla>
          </TbodyVanilla>
        </TableVanilla>,
      );
      expect(screen.getByText('Header').tagName).toBe('TH');
      unmount();
    });
  });

  it('accepts the transform variants on Th, including none', () => {
    (['capitalize', 'capitalizeWords', 'uppercase', undefined] as const).forEach((transform) => {
      const { unmount } = renderWithTheme(
        <TableVanilla>
          <TheadVanilla>
            <TrVanilla>
              <ThVanilla transform={transform}>first name</ThVanilla>
            </TrVanilla>
          </TheadVanilla>
        </TableVanilla>,
      );
      expect(screen.getByRole('columnheader')).toHaveTextContent('first name');
      unmount();
    });
  });

  it('merges className, css and style on every part', () => {
    renderWithTheme(
      <TableVanilla className="t" css={{ mt: '$2' }} style={{ marginLeft: '4px' }}>
        <TheadVanilla className="h" css={{ p: '$1' }}>
          <TrVanilla className="r" css={{ p: '$1' }}>
            <ThVanilla className="th" css={{ p: '$3' }} style={{ width: '50%' }}>
              Name
            </ThVanilla>
          </TrVanilla>
        </TheadVanilla>
        <TbodyVanilla className="b">
          <TrVanilla>
            <TdVanilla className="td" css={{ p: '$2' }}>
              John
            </TdVanilla>
          </TrVanilla>
        </TbodyVanilla>
      </TableVanilla>,
    );
    const table = screen.getByRole('table');
    const th = screen.getByRole('columnheader');
    const td = screen.getByRole('cell');

    expect(table.className).toContain('t');
    expect(table.style.marginTop).toBe('8px');
    expect(table.style.marginLeft).toBe('4px');
    expect(table.querySelector('thead')?.className).toContain('h');
    expect(table.querySelector('tbody')?.className).toContain('b');
    expect(th.className).toContain('th');
    expect(th.style.padding).toBe('16px');
    expect(th.style.width).toBe('50%');
    expect(td.className).toContain('td');
    expect(td.style.padding).toBe('8px');
  });

  it('forwards refs to the native elements', () => {
    const refs = {
      table: React.createRef<HTMLTableElement>(),
      caption: React.createRef<HTMLTableCaptionElement>(),
      thead: React.createRef<HTMLTableSectionElement>(),
      tbody: React.createRef<HTMLTableSectionElement>(),
      tfoot: React.createRef<HTMLTableSectionElement>(),
      tr: React.createRef<HTMLTableRowElement>(),
      th: React.createRef<HTMLTableCellElement>(),
      td: React.createRef<HTMLTableCellElement>(),
    };
    renderWithTheme(
      <TableVanilla ref={refs.table}>
        <CaptionVanilla ref={refs.caption}>Caption</CaptionVanilla>
        <TheadVanilla ref={refs.thead}>
          <TrVanilla ref={refs.tr}>
            <ThVanilla ref={refs.th}>Name</ThVanilla>
          </TrVanilla>
        </TheadVanilla>
        <TbodyVanilla ref={refs.tbody}>
          <TrVanilla>
            <TdVanilla ref={refs.td}>John</TdVanilla>
          </TrVanilla>
        </TbodyVanilla>
        <TfootVanilla ref={refs.tfoot} />
      </TableVanilla>,
    );

    expect(refs.table.current).toBeInstanceOf(HTMLTableElement);
    expect(refs.caption.current).toBeInstanceOf(HTMLTableCaptionElement);
    expect(refs.thead.current?.tagName).toBe('THEAD');
    expect(refs.tbody.current?.tagName).toBe('TBODY');
    expect(refs.tfoot.current?.tagName).toBe('TFOOT');
    expect(refs.tr.current).toBeInstanceOf(HTMLTableRowElement);
    expect(refs.th.current?.tagName).toBe('TH');
    expect(refs.td.current?.tagName).toBe('TD');
  });

  it('passes HTML attributes through', () => {
    const onClick = jest.fn();
    inTbody(
      <TrVanilla data-testid="row" onClick={onClick}>
        <TdVanilla colSpan={2} aria-label="Cell">
          John
        </TdVanilla>
      </TrVanilla>,
    );

    fireEvent.click(screen.getByTestId('row'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('cell')).toHaveAttribute('colspan', '2');
    expect(screen.getByRole('cell')).toHaveAttribute('aria-label', 'Cell');
  });

  describe('TrVanilla', () => {
    it('adds an empty first cell', () => {
      inTbody(
        <TrVanilla emptyFirstColumn>
          <TdVanilla>John</TdVanilla>
        </TrVanilla>,
      );
      expect(screen.getAllByRole('cell')).toHaveLength(2);
      expect(screen.getAllByRole('cell')[0]).toBeEmptyDOMElement();
    });

    it('keeps the empty first cell of a header row a data cell, as that column has no header', () => {
      renderWithTheme(
        <TableVanilla>
          <TheadVanilla>
            <TrVanilla emptyFirstColumn tableHead>
              <ThVanilla>Name</ThVanilla>
            </TrVanilla>
          </TheadVanilla>
        </TableVanilla>,
      );
      const [emptyCell] = screen.getAllByRole('cell');

      expect(screen.getAllByRole('columnheader')).toHaveLength(1);
      expect(emptyCell.tagName).toBe('TD');
      expect(emptyCell).toBeEmptyDOMElement();
    });

    it('has no accessibility violations with collapsible rows and an empty header cell', async () => {
      const { container } = renderWithTheme(
        <TableVanilla>
          <CaptionVanilla>Users</CaptionVanilla>
          <TheadVanilla>
            <TrVanilla emptyFirstColumn tableHead>
              <ThVanilla>Name</ThVanilla>
              <ThVanilla>Role</ThVanilla>
              <ThVanilla>Status</ThVanilla>
            </TrVanilla>
          </TheadVanilla>
          <TbodyVanilla>
            {['John', 'Jane', 'Jim'].map((name) => (
              <TrVanilla key={name} collapsedContent={`About ${name}`} collapsedContentColSpan={4}>
                <TdVanilla>{name}</TdVanilla>
                <TdVanilla>Developer</TdVanilla>
                <TdVanilla>Active</TdVanilla>
              </TrVanilla>
            ))}
          </TbodyVanilla>
        </TableVanilla>,
      );

      expect(await axe(container)).toHaveNoViolations();
    });

    it('renders collapsible content closed, in a row spanning collapsedContentColSpan', () => {
      inTbody(
        <TrVanilla collapsedContent="Details" collapsedContentColSpan={3} data-testid="row">
          <TdVanilla>John</TdVanilla>
          <TdVanilla>Doe</TdVanilla>
        </TrVanilla>,
      );
      const [row, contentRow] = screen.getAllByRole('row');
      const contentCell = within(contentRow).getByRole('cell');

      expect(within(row).getAllByRole('cell')).toHaveLength(3);
      expect(row).toHaveAttribute('data-collapsed');
      expect(contentCell).toHaveAttribute('colspan', '3');
      expect(contentCell).toHaveAttribute('data-closed');
      expect(contentCell).toHaveTextContent('Details');
    });

    it('opens and closes the content from the expand button without clicking the row', () => {
      const onRowClick = jest.fn();
      inTbody(
        <TrVanilla collapsedContent="Details" onClick={onRowClick}>
          <TdVanilla>John</TdVanilla>
        </TrVanilla>,
      );
      const [row, contentRow] = screen.getAllByRole('row');
      const button = screen.getByRole('button', { name: 'Expand row' });
      const contentCell = within(contentRow).getByRole('cell');

      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', contentCell.id);

      fireEvent.click(button);
      expect(row).not.toHaveAttribute('data-collapsed');
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
        <TrVanilla collapsedContent="Details">
          <TdVanilla>John</TdVanilla>
        </TrVanilla>,
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
        <TrVanilla collapsedContent="Details" expandLabel="Show details of John">
          <TdVanilla>John</TdVanilla>
        </TrVanilla>,
      );

      expect(screen.getByRole('button', { name: 'Show details of John' })).toBeInTheDocument();
    });

    it('renders both the empty cell and the expand button when asked for both', () => {
      inTbody(
        <TrVanilla emptyFirstColumn collapsedContent="Details">
          <TdVanilla>John</TdVanilla>
        </TrVanilla>,
      );
      const [row] = screen.getAllByRole('row');

      expect(within(row).getAllByRole('cell')).toHaveLength(3);
      expect(within(row).getByRole('button', { name: 'Expand row' })).toBeInTheDocument();
    });

    it('keeps css and style when collapsible', () => {
      inTbody(
        <TrVanilla collapsedContent="Details" css={{ p: '$2' }} style={{ color: 'red' }}>
          <TdVanilla>John</TdVanilla>
        </TrVanilla>,
      );
      const [row] = screen.getAllByRole('row');

      expect(row.style.padding).toBe('8px');
      expect(row.style.color).toBe('red');
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

      const renderRow = (props: Partial<TrVanillaProps>) =>
        inTbody(
          <TrVanilla {...props}>
            <TdVanilla>api-1</TdVanilla>
            <TdVanilla>Published</TdVanilla>
          </TrVanilla>,
        );

      it('puts the first cell in a row link and makes the row interactive', () => {
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
          <TrVanilla href="#api-1" linkOverlay={false} onClick={onRowClick}>
            <TdVanilla>api-1</TdVanilla>
            <TdVanilla>Published</TdVanilla>
          </TrVanilla>,
        );
        const link = screen.getByRole('link', { name: 'api-1' });
        const onLinkClick = jest.fn((event: MouseEvent) => event.preventDefault());
        link.addEventListener('click', onLinkClick);

        expect(link).toHaveAttribute('data-row-link', 'click');
        expect(screen.getByRole('row')).not.toHaveAttribute('linkOverlay');

        await userEvent.click(screen.getByText('Published'));

        expect(onRowClick).toHaveBeenCalled();
        expect(onLinkClick).toHaveBeenCalledTimes(1);
      });

      it('renders no link without href', () => {
        renderRow({});

        expect(screen.queryByRole('link')).not.toBeInTheDocument();
      });

      it('does not follow the row link when the row is expanded', async () => {
        inTbody(
          <TrVanilla href="#api-1" collapsedContent="More about api-1">
            <TdVanilla>api-1</TdVanilla>
          </TrVanilla>,
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

  describe('ThVanilla sorting', () => {
    const renderHeader = (props: React.ComponentProps<typeof ThVanilla>) =>
      renderWithTheme(
        <TableVanilla>
          <TheadVanilla>
            <TrVanilla>
              <ThVanilla {...props}>Name</ThVanilla>
            </TrVanilla>
          </TheadVanilla>
        </TableVanilla>,
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

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<BasicTable />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
