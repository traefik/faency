import { render } from '@testing-library/react';

import { UnstyledLink } from '../Link';
import { Button } from './Button';

describe('Button', () => {
  it('should render Button as link', () => {
    const { getByRole } = render(
      <Button asChild>
        <UnstyledLink href="https://traefik.io">Link</UnstyledLink>
      </Button>
    );

    expect(getByRole('link')).toBeInTheDocument();
  });
});
