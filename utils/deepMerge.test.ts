import { deepMerge } from './deepMerge';

describe('deepMerge', () => {
  describe('flat objects', () => {
    it('should merge two flat objects', () => {
      expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it('should let source win on conflicting keys', () => {
      expect(deepMerge({ a: 1, b: 2 }, { b: 99 })).toEqual({ a: 1, b: 99 });
    });

    it('should return target when source is null', () => {
      expect(deepMerge({ a: 1 }, null)).toEqual({ a: 1 });
    });

    it('should return target when source is undefined', () => {
      expect(deepMerge({ a: 1 }, undefined)).toEqual({ a: 1 });
    });

    it('should not include source keys whose value is undefined', () => {
      expect(deepMerge({ a: 1 }, { a: undefined })).toEqual({ a: 1 });
    });
  });

  describe('nested objects', () => {
    it('should deep-merge nested plain objects', () => {
      expect(deepMerge({ a: { x: 1, y: 2 } }, { a: { y: 99, z: 3 } })).toEqual({
        a: { x: 1, y: 99, z: 3 },
      });
    });

    it('should preserve target nested keys not present in source', () => {
      const target = { '@bp2': { lineHeight: '27px', fontSize: '16px' } };
      const source = { '@bp2': { color: 'red' } };
      expect(deepMerge(target, source)).toEqual({
        '@bp2': { lineHeight: '27px', fontSize: '16px', color: 'red' },
      });
    });

    it('should let source nested keys win over target nested keys', () => {
      const target = { '@bp2': { lineHeight: '27px' } };
      const source = { '@bp2': { lineHeight: '30px' } };
      expect(deepMerge(target, source)).toEqual({ '@bp2': { lineHeight: '30px' } });
    });

    it('should handle multiple levels of nesting', () => {
      expect(deepMerge({ a: { b: { c: 1 } } }, { a: { b: { d: 2 } } })).toEqual({
        a: { b: { c: 1, d: 2 } },
      });
    });
  });

  describe('arrays', () => {
    it('should replace arrays rather than merging them', () => {
      expect(deepMerge({ a: [1, 2, 3] }, { a: [4, 5] })).toEqual({ a: [4, 5] });
    });

    it('should not treat an array source as a plain object', () => {
      expect(deepMerge({ a: { x: 1 } }, { a: [1, 2] })).toEqual({ a: [1, 2] });
    });
  });

  describe('prototype pollution', () => {
    it('should ignore __proto__ keys', () => {
      const payload = JSON.parse('{"__proto__": {"polluted": true}}');
      deepMerge({}, payload);
      expect(({} as any).polluted).toBeUndefined();
    });

    it('should ignore constructor keys', () => {
      const payload = JSON.parse('{"constructor": {"polluted": true}}');
      deepMerge({}, payload);
      expect(({} as any).polluted).toBeUndefined();
    });

    it('should ignore prototype keys', () => {
      const payload = JSON.parse('{"prototype": {"polluted": true}}');
      deepMerge({}, payload);
      expect(({} as any).polluted).toBeUndefined();
    });
  });

  describe('immutability', () => {
    it('should not mutate the target object', () => {
      const target = { a: 1, nested: { x: 1 } };
      deepMerge(target, { a: 99, nested: { y: 2 } });
      expect(target).toEqual({ a: 1, nested: { x: 1 } });
    });

    it('should not mutate the source object', () => {
      const source = { a: 99, nested: { y: 2 } };
      deepMerge({ a: 1, nested: { x: 1 } }, source);
      expect(source).toEqual({ a: 99, nested: { y: 2 } });
    });
  });

  describe('CSS-specific scenarios', () => {
    it('should merge Paragraph size-1 default css with user responsive css', () => {
      // Mirrors merge(textCss['1'], props.css) in Paragraph.tsx
      const defaultCss = { lineHeight: '25px', '@bp2': { lineHeight: '27px' } };
      const userCss = { color: 'red', '@bp2': { color: 'blue' } };
      expect(deepMerge(defaultCss, userCss)).toEqual({
        lineHeight: '25px',
        color: 'red',
        '@bp2': { lineHeight: '27px', color: 'blue' },
      });
    });

    it('should let user css override default lineHeight inside a breakpoint', () => {
      const defaultCss = { lineHeight: '25px', '@bp2': { lineHeight: '27px' } };
      const userCss = { '@bp2': { lineHeight: '32px' } };
      expect(deepMerge(defaultCss, userCss)).toEqual({
        lineHeight: '25px',
        '@bp2': { lineHeight: '32px' },
      });
    });

    it('should merge fullColSpan positioning css with user css', () => {
      // Mirrors merge(fullColSpanCss, css) in AriaTable.tsx Td
      const fullColSpanCss = { position: 'absolute', left: 0, width: '100%', height: '100%' };
      const userCss = { color: 'red', width: '90%' };
      expect(deepMerge(fullColSpanCss, userCss)).toEqual({
        position: 'absolute',
        left: 0,
        width: '90%',
        height: '100%',
        color: 'red',
      });
    });

    it('should merge fullColSpan css with user nested pseudo-selector css', () => {
      const fullColSpanCss = { position: 'absolute', left: 0, width: '100%', height: '100%' };
      const userCss = { '&:hover': { color: 'blue' } };
      expect(deepMerge(fullColSpanCss, userCss)).toEqual({
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
        '&:hover': { color: 'blue' },
      });
    });
  });
});
