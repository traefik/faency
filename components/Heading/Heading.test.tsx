import { render } from '@testing-library/react';

import { H1, H2, H3, H4, H5, H6 } from './Heading';

const HEADINGS = [H1, H2, H3, H4, H5, H6];

describe('Heading', () => {
  it.each(HEADINGS)('should render heading with proper role', (HeadingComponent) => {
    const { getByRole } = render(<HeadingComponent>Heading</HeadingComponent>);

    expect(getByRole('heading')).toBeInTheDocument();
  });
});
