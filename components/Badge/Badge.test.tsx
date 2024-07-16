import { render } from '@testing-library/react';

import { UnstyledLink } from '../Link';
import { Badge } from './Badge';

describe('Badge', () => {
  it('should render Badge as link', () => {
    const { getByRole } = render(
      <Badge asChild interactive>
        <UnstyledLink href="https://traefik.io">Link</UnstyledLink>
      </Badge>
    );

    expect(getByRole('link')).toBeInTheDocument();
  });
});
