describe('warnOnce', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  let warnSpy: jest.SpyInstance;

  const loadWarnOnce = async () => {
    let module: typeof import('./warnOnce') | undefined;
    await jest.isolateModulesAsync(async () => {
      module = await import('./warnOnce');
    });
    return module!.warnOnce;
  };

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    warnSpy.mockRestore();
  });

  it('should log each message once outside production', async () => {
    process.env.NODE_ENV = 'development';
    const warnOnce = await loadWarnOnce();

    warnOnce('first');
    warnOnce('first');
    warnOnce('second');

    expect(warnSpy).toHaveBeenCalledTimes(2);
    expect(warnSpy).toHaveBeenNthCalledWith(1, 'first');
    expect(warnSpy).toHaveBeenNthCalledWith(2, 'second');
  });

  it('should not log in production', async () => {
    process.env.NODE_ENV = 'production';
    const warnOnce = await loadWarnOnce();

    warnOnce('message');

    expect(warnSpy).not.toHaveBeenCalled();
  });
});
