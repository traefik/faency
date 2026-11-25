// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom');

const { toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

// Server-rendering tests run in the node environment, without a window.
if (typeof window !== 'undefined') {
  // A no-op: calling back inside observe() makes floating-ui observe again, without end.
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // nwsapi 2.2.27 recurses without end on these pseudo-classes, which floating-ui queries.
  const { matches } = Element.prototype;
  Element.prototype.matches = function (selector) {
    return /:(modal|popover-open|fullscreen)\b/.test(selector)
      ? false
      : matches.call(this, selector);
  };

  window.DOMRect = {
    fromRect: () => ({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
    }),
  };

  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () {},
      };
    };
}
