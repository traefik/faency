// Replaces .css.ts files with mocks so vanilla-extract never runs in tests.

import crypto from 'crypto';
import fs from 'fs';
import ts from 'typescript';

const transformerHash = crypto
  .createHash('sha1')
  .update(fs.readFileSync(new URL(import.meta.url)))
  .digest('hex');

const propertyName = (property) =>
  property.name && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
    ? property.name.text
    : undefined;

const unwrap = (expression) =>
  ts.isAsExpression(expression) ||
  ts.isSatisfiesExpression(expression) ||
  ts.isParenthesizedExpression(expression)
    ? unwrap(expression.expression)
    : expression;

// Reads each `recipe({ variants })` call so mocked recipes can answer `.variants()`.
const readRecipeVariants = (sourceText, sourcePath) => {
  const sourceFile = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true);
  const objectLiterals = {};
  const recipeCalls = [];

  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const initializer = unwrap(node.initializer);
      if (ts.isObjectLiteralExpression(initializer)) {
        objectLiterals[node.name.text] = initializer;
      } else if (
        ts.isCallExpression(node.initializer) &&
        node.initializer.expression.getText() === 'recipe'
      ) {
        recipeCalls.push([node.name.text, node.initializer.arguments[0]]);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  const resolve = (wrapped) => {
    const expression = unwrap(wrapped);
    const object = ts.isObjectLiteralExpression(expression)
      ? expression
      : objectLiterals[expression.getText()];
    if (!object) {
      throw new Error(
        `jest.cssTransform: cannot read variants ${expression.getText()} in ${sourcePath}`,
      );
    }
    return object;
  };

  const keysOf = (expression) =>
    resolve(expression).properties.flatMap((property) =>
      ts.isSpreadAssignment(property) ? keysOf(property.expression) : [propertyName(property)],
    );

  const recipes = {};
  for (const [name, options] of recipeCalls) {
    const variants =
      options &&
      resolve(options).properties.find((property) => propertyName(property) === 'variants');
    recipes[name] = variants ? keysOf(variants.initializer) : [];
  }
  return recipes;
};

export default {
  getCacheKey(sourceText, sourcePath) {
    return crypto
      .createHash('sha1')
      .update(transformerHash)
      .update(sourcePath)
      .update(sourceText)
      .digest('hex');
  },

  process(sourceText, sourcePath) {
    const normalizedPath = sourcePath.replace(/\\/g, '/');
    const isThemesFile = normalizedPath.includes('/styles/themes.css');

    if (isThemesFile) {
      return {
        code: `
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

    const recipeVariants = readRecipeVariants(sourceText, sourcePath);

    return {
      code: `
        // Includes the value's type so size={2} and size="2" give different classes.
        const createMockRecipe = (variants) =>
          Object.assign(
            (options) =>
              ['mock-recipe-class']
                .concat(
                  Object.entries(options || {})
                    .filter(([, value]) => value !== undefined)
                    .map(([key, value]) => key + '-' + typeof value + '-' + value),
                )
                .join(' '),
            { variants: () => variants },
          );

        const recipes = Object.fromEntries(
          Object.entries(${JSON.stringify(recipeVariants)}).map(([name, variants]) => [
            name,
            createMockRecipe(variants),
          ]),
        );
        const fallbackRecipe = createMockRecipe([]);

        // Other exports become their own name, used as a class.
        module.exports = new Proxy({}, {
          get: (target, prop) => {
            if (typeof prop !== 'string') return target[prop];
            if (prop in recipes) return recipes[prop];
            if (prop.toLowerCase().includes('recipe')) return fallbackRecipe;
            return prop;
          }
        });
      `,
    };
  },
};
