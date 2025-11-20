export type Gap = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SpacingToken = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type SizeToken = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | string;
export type FlexDirection = 'row' | 'column' | 'rowReverse' | 'columnReverse';
export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type FlexJustify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type FlexAlignSimplified = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustifySimplified =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type GridAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type GridJustify = 'start' | 'center' | 'end' | 'between';
export type GridFlow = 'row' | 'column' | 'dense' | 'rowDense' | 'columnDense';
