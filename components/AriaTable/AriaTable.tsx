import { ComponentProps, ElementRef, forwardRef } from 'react';
import { styled, VariantProps } from '../../stitches.config';
import { Caption as TableCaption, Tbody as TableTbody, Tfoot as TableTfoot, Tr as TableTr, Th as TableTh, Td as TableTd, Thead as TableThead, Table as TableTable } from '../Table';

export const Caption = styled('div', TableCaption, {
  display: 'table-caption',
});

const StyledTbody = styled('div', TableTbody, {
  display: 'table-row-group',
});
export const Tbody = forwardRef<ElementRef<typeof StyledTbody>, Omit<ComponentProps<typeof StyledTbody>, 'css'> & VariantProps<typeof StyledTbody>>((props, ref) => (
  <StyledTbody ref={ref} role="rowgroup" {...props} />
))

const StyledTfoot = styled('div', TableTfoot, {
  display: 'table-footer-group',
});
export const Tfoot = forwardRef<ElementRef<typeof StyledTfoot>, Omit<ComponentProps<typeof StyledTfoot>, 'css'> & VariantProps<typeof StyledTfoot>>((props, ref) => (
  <StyledTfoot ref={ref} role="rowgroup" {...props} />
))

const StyledTr = styled('div', TableTr, {
  display: 'table-row',
});
export const Tr = forwardRef<ElementRef<typeof StyledTr>, Omit<ComponentProps<typeof StyledTr>, 'css'> & VariantProps<typeof StyledTr>>((props, ref) => (
  <StyledTr ref={ref} role="row" {...props} />
))

const StyledTh = styled('span', TableTh, {
  display: 'table-cell'
});
export interface ThProps extends Omit<ComponentProps<typeof StyledTh>, 'css'>, VariantProps<typeof StyledTh> { }
export const Th = forwardRef<
  ElementRef<typeof StyledTh>,
  ThProps>((props, ref) => (
    <StyledTh ref={ref} role="columnheader" {...props} />
  ))


const StyledTd = styled('span', TableTd, {
  display: 'table-cell',
});
export const Td = forwardRef<ElementRef<typeof StyledTd>, Omit<ComponentProps<typeof StyledTd>, 'css'> & VariantProps<typeof StyledTd>>((props, ref) => (
  <StyledTd ref={ref} role="cell" {...props} />
))

const StyledThead = styled('div', {
  display: 'table-header-group',
});
export const Thead = forwardRef<ElementRef<typeof StyledThead>, Omit<ComponentProps<typeof StyledThead>, 'css'> & VariantProps<typeof StyledThead>>((props, ref) => (
  <StyledThead ref={ref} role="rowgroup" {...props} />
))

const StyledTable = styled('div', TableTable, {
  display: 'table',
});
export const Table = forwardRef<ElementRef<typeof StyledTable>, Omit<ComponentProps<typeof StyledTable>, 'css'> & VariantProps<typeof StyledTable>>((props, ref) => (
  <StyledTable ref={ref} role="table" {...props} />
))

export type TableVariants = VariantProps<typeof Table>;
export type TableProps = TableVariants & {};
