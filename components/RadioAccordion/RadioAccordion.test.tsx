import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import {
  RadioAccordionContent,
  RadioAccordionItem,
  RadioAccordionRoot,
  RadioAccordionTrigger,
} from './RadioAccordion';

describe('RadioAccordionTrigger', () => {
  const renderAccordion = (
    headingLevel?: React.ComponentProps<typeof RadioAccordionTrigger>['headingLevel'],
  ) =>
    render(
      <RadioAccordionRoot type="single">
        <RadioAccordionItem value="one">
          <RadioAccordionTrigger headingLevel={headingLevel}>One</RadioAccordionTrigger>
          <RadioAccordionContent>Content</RadioAccordionContent>
        </RadioAccordionItem>
      </RadioAccordionRoot>,
    );

  it('should render the trigger in an h3 by default', () => {
    renderAccordion();
    expect(screen.getByRole('heading', { level: 3, name: 'One' })).toContainElement(
      screen.getByRole('button', { name: 'One' }),
    );
  });

  it('should render the trigger in a heading of the given level', () => {
    renderAccordion(2);
    expect(screen.getByRole('heading', { level: 2, name: 'One' })).toBeInTheDocument();
  });

  it('should render the trigger without a heading', () => {
    renderAccordion('none');
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument();
  });

  it('should not pass headingLevel to the button', () => {
    renderAccordion(2);
    expect(screen.getByRole('button', { name: 'One' })).not.toHaveAttribute('headingLevel');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderAccordion(2);
    expect(await axe(container)).toHaveNoViolations();
  });
});
