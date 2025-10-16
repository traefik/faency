// Custom Jest transformer for vanilla-extract .css.ts files
// This transformer prevents vanilla-extract from executing during tests
// by returning a mock module that exports a Proxy

module.exports = {
  process(_sourceText, sourcePath) {
    // Normalize path separators for cross-platform compatibility
    const normalizedPath = sourcePath.replace(/\\/g, '/');
    const isThemesFile = normalizedPath.includes('/styles/themes.css');

    if (isThemesFile) {
      // Special handling for themes.css.ts to provide the correct structure
      return {
        code: `
          // Mock theme classes
          const mockThemeClass = 'mock-theme-class';
          const mockThemes = {
            light: {
              neon: mockThemeClass,
              blue: mockThemeClass,
              orange: mockThemeClass,
              red: mockThemeClass,
              green: mockThemeClass,
              deepBlue: mockThemeClass,
              grayBlue: mockThemeClass,
            },
            dark: {
              neon: mockThemeClass,
              blue: mockThemeClass,
              orange: mockThemeClass,
              red: mockThemeClass,
              green: mockThemeClass,
              deepBlue: mockThemeClass,
              grayBlue: mockThemeClass,
            },
          };

          module.exports = {
            themes: mockThemes,
            lightTheme: mockThemeClass,
            darkTheme: mockThemeClass,
            lightThemeNeon: mockThemeClass,
            lightThemeBlue: mockThemeClass,
            lightThemeOrange: mockThemeClass,
            lightThemeRed: mockThemeClass,
            lightThemeGreen: mockThemeClass,
            lightThemeDeepBlue: mockThemeClass,
            lightThemeGrayBlue: mockThemeClass,
            darkThemeNeon: mockThemeClass,
            darkThemeBlue: mockThemeClass,
            darkThemeOrange: mockThemeClass,
            darkThemeRed: mockThemeClass,
            darkThemeGreen: mockThemeClass,
            darkThemeDeepBlue: mockThemeClass,
            darkThemeGrayBlue: mockThemeClass,
          };
        `,
      };
    }

    // Default handling for all other .css.ts files
    return {
      code: `
        // Mock vanilla-extract styles and recipes
        const mockRecipe = (options) => {
          // Return a mock class name for recipes
          return 'mock-recipe-class';
        };

        module.exports = new Proxy({}, {
          get: (target, prop) => {
            if (typeof prop === 'string') {
              // If it looks like a recipe (ends with 'Recipe'), return a function
              if (prop.toLowerCase().includes('recipe')) {
                return mockRecipe;
              }
              // Otherwise return the property name as a mock class
              return prop;
            }
            return target[prop];
          }
        });
      `,
    };
  },
};
