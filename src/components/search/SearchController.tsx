import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import { SearchInput } from './SearchInput';

interface SearchInputProps {
  children: (props: SearchInputChildrenProps) => JSX.Element;
  itemsCount: number;
  inputCn?: string;
  autoFocus?: boolean;
  inputPlaceholder: string;
  onInputValueChange: (value: string) => void;
  onChange: (index: number) => void;
}

export interface SearchInputChildrenProps {
  isOpen: boolean;
  highlightedIndex: number | null;
  changeHighlightedIndex: (index: number) => void;
}

export const SearchController = ({
  children,
  itemsCount,
  inputCn = '',
  autoFocus = false,
  inputPlaceholder,
  onInputValueChange,
  onChange
}: SearchInputProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useOnClickOutside(ref, () => setIsFocused(false));

  // Reset index on search resuls change
  useEffect(() => setActiveIndex(null), [itemsCount]);

  const navigateUp = () => {
    const isFirst = activeIndex === 0 || activeIndex === null;
    setActiveIndex(isFirst ? itemsCount - 1 : activeIndex - 1);
  };

  const navigateDown = () => {
    const isLast = activeIndex === itemsCount - 1 || activeIndex === null;
    setActiveIndex(isLast ? 0 : activeIndex + 1);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        if (itemsCount) navigateUp();
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        if (itemsCount) navigateDown();
        break;
      }
      case 'Enter': {
        if (activeIndex !== null) {
          if (e.target instanceof HTMLElement) e.target.blur();
          setIsFocused(false);
          onChange(activeIndex);
        }
        break;
      }
      case 'Escape': {
        if (e.target instanceof HTMLElement) {
          e.target.blur();
          setIsFocused(false);
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div ref={ref} className="relative max-w-screen-md">
      <SearchInput
        inputCn={inputCn}
        autoFocus={autoFocus}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        placeholder={inputPlaceholder}
        onValueChange={onInputValueChange}
        onKeyDown={handleOnKeyDown}
      />

      {children({
        isOpen: isFocused,
        highlightedIndex: activeIndex,
        changeHighlightedIndex: (i) => {
          setActiveIndex(i);
        }
      })}
    </div>
  );
};
