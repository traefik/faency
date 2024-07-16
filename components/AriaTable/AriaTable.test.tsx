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
      </Table>
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
