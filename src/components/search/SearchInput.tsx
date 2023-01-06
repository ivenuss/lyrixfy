import React, { useEffect, useState, forwardRef } from 'react';
import clsx from 'clsx';
import { Search } from 'react-feather';
import { useDebounce } from 'use-debounce';

export interface SearchInputProps
  extends React.ComponentPropsWithoutRef<'input'> {
  inputCn?: string;
  isFocused?: boolean;
  onValueChange: (searchValue: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ inputCn = '', isFocused, onValueChange, ...props }, ref) => {
    const [text, setText] = useState('');
    const [value] = useDebounce(text, 300);

    useEffect(() => onValueChange(value), [onValueChange, value]);

    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-md bg-white p-3 px-4 shadow-sm dark:bg-primary-700',
          inputCn
        )}
      >
        <div className="overflow-hidden">
          <div
            className={clsx(
              'flex items-center transition-transform ease-in-out',
              { '-translate-x-8': isFocused }
            )}
          >
            <Search className="mr-3 h-6 w-6 text-black dark:text-primary-200" />
            <input
              type="search"
              value={text}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              enterKeyHint="go"
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-white bg-none font-bold text-black outline-none placeholder:font-normal placeholder:text-gray-400 dark:bg-primary-700 dark:text-primary-100 dark:placeholder:text-primary-300"
              {...props}
            />
          </div>
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
