import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from './AriaTable';

describe('AriaTable', () => {
  it('should render table with no a11y issue', async () => {
    const { container, getByRole, getAllByRole } = render(
      <Table>
        <Thead>
          <Tr>
            <Th>Col1</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Cell1</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Td>FooterCell1</Td>
          </Tr>
        </Tfoot>
      </Table>,
    );

    expect(getByRole('table')).toBeInTheDocument();
    expect(getByRole('columnheader')).toBeInTheDocument();
    expect(getAllByRole('rowgroup')).toHaveLength(3);
    expect(getAllByRole('row')).toHaveLength(3);
    expect(getAllByRole('cell')).toHaveLength(2);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});

describe('AriaTable Td', () => {
  it('should render a regular Td as a single cell', () => {
    const { getAllByRole } = render(
      <Table>
        <Tbody>
          <Tr>
            <Td>Cell</Td>
          </Tr>
        </Tbody>
      </Table>,
    );
    expect(getAllByRole('cell')).toHaveLength(1);
  });

  it('should render a fullColSpan Td as a filler span + a positioned cell', () => {
    // fullColSpan renders a hidden FillerTd (no role) and a positioned StyledTd (role="cell").
    // This exercises the merge(fullColSpanCss, css) path with no user css.
    const { getAllByRole, container } = render(
      <Table>
        <Tbody>
          <Tr>
            <Td fullColSpan>Full-width cell</Td>
          </Tr>
        </Tbody>
      </Table>,
    );
    // FillerTd has no role; StyledTd has role="cell"
    expect(getAllByRole('cell')).toHaveLength(1);
    // Both spans (FillerTd + StyledTd) must be present in the DOM
    expect(container.querySelectorAll('span')).toHaveLength(2);
  });

  it('should merge fullColSpan positioning with a flat css prop without crashing', () => {
    // Exercises merge(fullColSpanCss, css) where css is a flat object.
    // fullColSpanCss = { position: 'absolute', left: 0, width: '100%', height: '100%' }
    const { getAllByRole, container } = render(
      <Table>
        <Tbody>
          <Tr>
            <Td fullColSpan css={{ color: 'red' }}>
              Full-width with css
            </Td>
          </Tr>
        </Tbody>
      </Table>,
    );
    expect(getAllByRole('cell')).toHaveLength(1);
    expect(container.querySelectorAll('span')).toHaveLength(2);
  });

  it('should merge fullColSpan positioning with a nested css prop without crashing', () => {
    // Exercises merge(fullColSpanCss, css) where css contains nested objects.
    // A shallow spread would silently drop nested keys; deep merge must preserve both.
    const { getAllByRole, container } = render(
      <Table>
        <Tbody>
          <Tr>
            <Td fullColSpan css={{ '&:hover': { color: 'blue' } }}>
              Full-width with nested css
            </Td>
          </Tr>
        </Tbody>
      </Table>,
    );
    expect(getAllByRole('cell')).toHaveLength(1);
    expect(container.querySelectorAll('span')).toHaveLength(2);
  });
});
