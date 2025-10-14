// Custom Jest transformer for vanilla-extract .css.ts files
// This transformer prevents vanilla-extract from executing during tests
// by returning a mock module that exports a Proxy

module.exports = {
  process() {
    return {
      code: `
        module.exports = new Proxy({}, {
          get: (target, prop) => {
            if (typeof prop === 'string') {
              return prop;
            }
            return target[prop];
          }
        });
      `,
    };
  },
};
