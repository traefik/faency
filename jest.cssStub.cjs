// Mock for vanilla-extract .css.ts files
// This stub returns a Proxy that returns the key name for any property access
// This allows tests to run without processing vanilla-extract styles

module.exports = new Proxy(
  {},
  {
    get: (target, prop) => {
      // Return the property name as the class name
      // This makes debugging easier as you can see which class was used
      if (typeof prop === 'string') {
        return prop;
      }
      return target[prop];
    },
  }
);
