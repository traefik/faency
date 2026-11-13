import { ChevronRightIcon } from '@radix-ui/react-icons';
import React from 'react';

import { chevron, expandButton, toggle } from './Table.vanilla.css';

export const stopEvent = (e: React.MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
};

type ExpandToggleVanillaProps = {
  label: string;
  isOpen: boolean;
  controls: string;
  onToggle: () => void;
};

export const ExpandToggleVanilla = ({
  label,
  isOpen,
  controls,
  onToggle,
}: ExpandToggleVanillaProps) => (
  <div className={toggle}>
    <button
      type="button"
      className={expandButton}
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls={controls}
      onClick={onToggle}
    >
      <ChevronRightIcon aria-hidden className={chevron} />
    </button>
  </div>
);
