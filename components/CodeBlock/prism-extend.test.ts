describe('prism-extend', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should not auto-highlight code elements outside CodeBlock', async () => {
    document.body.innerHTML = '<code class="language-js">const a = 1;</code>';
    const code = document.querySelector('code') as HTMLElement;

    await jest.isolateModulesAsync(async () => {
      await import('./prism-extend');
    });

    // prismjs schedules highlightAll() via requestAnimationFrame (16ms setTimeout fallback)
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(code.innerHTML).toBe('const a = 1;');
    expect(code.querySelector('span')).toBeNull();
  });
});
