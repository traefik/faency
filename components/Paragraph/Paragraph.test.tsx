import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { Paragraph } from './Paragraph';

describe('Paragraph', () => {
  it('should render as a p element', () => {
    const { container } = render(<Paragraph>Paragraph text</Paragraph>);
    const el = container.querySelector('p');
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent('Paragraph text');
  });

  it('should render size 1 variant', () => {
    const { container } = render(<Paragraph size="1">Size 1</Paragraph>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should render size 2 variant', () => {
    const { container } = render(<Paragraph size="2">Size 2</Paragraph>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should merge flat css prop with default size 1 styles without crashing', () => {
    // Exercises merge(textCss['1'], props.css) where props.css is flat
    const { container } = render(<Paragraph css={{ color: 'red' }}>Custom CSS</Paragraph>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should merge nested responsive css prop with default size 1 styles without crashing', () => {
    // Exercises merge(textCss['1'], props.css) where both sides have nested @bp2 objects.
    // With a shallow spread, the user's @bp2 would overwrite the default @bp2 lineHeight.
    // Deep merge must preserve both.
    const { container } = render(
      <Paragraph css={{ '@bp2': { color: 'blue' } }}>Responsive CSS</Paragraph>,
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should merge nested responsive css prop with size 2 styles without crashing', () => {
    // size 2 default has: { color: '$slate11', lineHeight: '27px', '@bp2': { lineHeight: '30px' } }
    const { container } = render(
      <Paragraph size="2" css={{ '@bp2': { fontSize: '18px' } }}>
        Size 2 Responsive CSS
      </Paragraph>,
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<Paragraph ref={ref}>Paragraph</Paragraph>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.nodeName).toBe('P');
  });

  it('should pass through HTML attributes', () => {
    const { container } = render(
      <Paragraph data-testid="test-para" aria-label="Test paragraph">
        Paragraph
      </Paragraph>,
    );
    const el = container.querySelector('p') as HTMLElement;
    expect(el.getAttribute('data-testid')).toBe('test-para');
    expect(el.getAttribute('aria-label')).toBe('Test paragraph');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Paragraph>Accessible paragraph</Paragraph>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
