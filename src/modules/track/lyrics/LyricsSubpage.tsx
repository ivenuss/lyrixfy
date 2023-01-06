import React, { useCallback, useMemo, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useMultiselect } from '~/hooks/useMultiselect';
import { useTrackStore } from '~/stores/track.store';
import { api } from '~/lib/api';
import { MAX_SELECT_LINES } from '~/lib/constants';
import TrackHeader from './TrackHeader';
import { LyricsSkeleton } from './LyricsSkeleton';
import { LyricsLine } from './LyricsLine';
import { NoLyricsFound } from './NoLyricsFound';

export const LyricsSubpage: React.FC = () => {
  const ref = useRef<SimpleBar>(null);
  const router = useRouter();
  const id = String(router.query.id);
  const embed = useTrackStore((state) => state.embed);
  const [hasReached, setHasReached] = useState({ top: true, bottom: false });
  const { data: track } = api.spotify.getTrack.useQuery(
    { trackId: id },
    { enabled: !!id }
  );

  const artists =
    track?.artists?.map(({ name }) => name).join(', ') ?? 'Uknown';

  const { data, isError, isLoading } = api.spotify.getLyrics.useQuery(
    {
      artists: track?.artists.map((a) => a.name) || [],
      title: track?.name || ''
    },
    { enabled: !!track && !!artists, retry: 1 }
  );

  const lines = useMemo(() => data?.lines ?? [], [data?.lines]);

  const { selected, available, change } = useMultiselect<{
    id: number;
    words: string;
  }>({
    initialState: lines || [],
    defaultState: embed.lines,
    maxSelected: MAX_SELECT_LINES
  });

  const handleOnScroll = useCallback(
    (
      e: React.UIEvent & {
        target: HTMLDivElement;
      }
    ) => {
      const top = e.target.scrollTop === 0;
      const bottom =
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

      const hasreachedBottomOrTop =
        bottom ||
        top ||
        (hasReached.bottom && !top) ||
        (hasReached.top && !bottom);

      if (hasreachedBottomOrTop) {
        setHasReached({ bottom, top });
      }
    },
    [hasReached.top, hasReached.bottom]
  );

  const renderLines = useCallback(() => {
    return lines?.map((line, i) => {
      const isSelected = !!selected.find((l) => l.id === line.id);
      const isAvailable = !!available.find((l) => l.id === line.id);

      return (
        <LyricsLine
          index={i}
          key={`lyrics-${track?.id}-${i}`}
          words={line.words}
          isSelected={isSelected}
          isAvailable={isAvailable}
          onSelect={() => change(line)}
        />
      );
    });
  }, [available, change, lines, selected, track?.id]);

  const renderLyricLines = useCallback(() => {
    if (isError) return <NoLyricsFound key="nolyricsfound" />;
    if (isLoading) return <LyricsSkeleton key="lyrics-skeleton" />;

    return (
      <motion.div key="lyrics-wrapper" className="relative">
        {!hasReached.top && (
          <div className="absolute top-0 z-10 h-10 w-full bg-gradient-to-b from-gray-100 dark:from-primary-900" />
        )}

        <SimpleBar
          ref={ref}
          forceVisible
          autoHide={false}
          className="max-h-[30rem]"
          scrollableNodeProps={{ onScroll: handleOnScroll }}
        >
          <ul className="flex flex-col space-y-1">{renderLines()}</ul>
        </SimpleBar>

        {!hasReached.bottom && (
          <div className="absolute bottom-0 z-10 h-10 w-full bg-gradient-to-t from-gray-100 dark:from-primary-900" />
        )}
      </motion.div>
    );
  }, [
    isError,
    isLoading,
    hasReached.bottom,
    hasReached.top,
    handleOnScroll,
    renderLines
  ]);

  return (
    <div className="mx-auto max-w-screen-xs px-4">
      <TrackHeader lines={selected} />
      <div className="mt-4">
        <AnimatePresence mode="wait">{renderLyricLines()}</AnimatePresence>
      </div>
    </div>
  );
};
