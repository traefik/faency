export const ROW_LINK_ATTRIBUTE = 'data-row-link';

export const ROW_LINK_Z_INDEX = 1;
export const ROW_LINK_CONTROL_Z_INDEX = 2;
export const ROW_LINK_CONTROLS = `:where(a, button, input, select, textarea, [tabindex]):where(:not([${ROW_LINK_ATTRIBUTE}]))`;
