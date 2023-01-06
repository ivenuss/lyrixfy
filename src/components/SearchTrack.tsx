import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from '~/components/Spinner';
import { Track } from '~/modules/search/Track';
import { SearchResultsDropdown } from '~/components/search/SearchResultsDropdown';
import { api } from '~/lib/api';
import {
  SearchController,
  type SearchInputChildrenProps
} from './search/SearchController';

interface SearchTrackProps {
  autoFocus?: boolean;
  onSearch?: () => void;
}

export const SearchTrack: React.FC<SearchTrackProps> = ({
  autoFocus,
  onSearch = null
}) => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const {
    data: tracks,
    isError,
    isLoading
  } = api.spotify.search.useQuery({ query: value }, { enabled: !!value });

  const handleOnSearch = useCallback(
    (index: number) => {
      onSearch?.();
      if (tracks?.length && tracks[index]?.id)
        router.push(`/track/${tracks[index]?.id}`);
    },
    [onSearch, router, tracks]
  );

  const renderContent = useCallback(
    ({
      highlightedIndex,
      changeHighlightedIndex
    }: Omit<SearchInputChildrenProps, 'isOpen'>) => {
      if (isLoading) {
        return (
          <div className="grid place-items-center p-3">
            <Spinner />
          </div>
        );
      }

      if (isError || !tracks.length) {
        return (
          <div className="py-3 text-center text-sm text-black dark:text-primary-200">
            {isError ? 'Something went wrong.' : `No items for "${value}"`}
          </div>
        );
      }

      return tracks?.map((track, i) => (
        <Track
          key={track.id}
          onSearch={() => onSearch?.()}
          onMouseEnter={() => changeHighlightedIndex(i)}
          isActive={highlightedIndex === i}
          track={track}
        />
      ));
    },
    [isError, isLoading, onSearch, tracks, value]
  );

  return (
    <SearchController
      autoFocus={autoFocus}
      itemsCount={tracks?.length || 0}
      onChange={handleOnSearch}
      inputPlaceholder="Search for song..."
      onInputValueChange={(v) => setValue(v)}
    >
      {({ isOpen, ...props }) => (
        <SearchResultsDropdown isOpen={Boolean(isOpen && value)}>
          {renderContent({ ...props })}
        </SearchResultsDropdown>
      )}
    </SearchController>
  );
};
