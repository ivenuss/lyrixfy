import React, { memo } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Button } from '~/components/Button';
import { useTrackStore } from '~/stores/track.store';
import { ButtonLink } from '~/components/ButtonLink';
import { MAX_SELECT_LINES } from '~/lib/constants';

interface TrackHeaderProps {
  lines: {
    id: number;
    words: string;
  }[];
}

const TrackHeader: React.FC<TrackHeaderProps> = ({ lines }) => {
  const embed = useTrackStore((state) => state.embed);
  const setEmbed = useTrackStore((state) => state.setEmbed);

  return (
    <div className="mt-3 flex items-center justify-between gap-2.5">
      <ButtonLink
        href="/search"
        color="secondary"
        aria-label="Go back"
        className="py- px-2"
      >
        <ArrowLeft className="h-5 w-5" />
      </ButtonLink>

      <div className="flex-1 rounded bg-white p-2 px-4 text-sm text-black shadow-md dark:bg-primary-800 dark:text-primary-200">
        Selected lines ({lines.length}/{MAX_SELECT_LINES})
      </div>

      <Button
        size="none"
        aria-label="Go next"
        disabled={!lines?.length}
        onClick={() => setEmbed({ ...embed, currentPage: 'EDITOR', lines })}
        className="grow-0 rounded-md px-2 py-2 shadow-md"
      >
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default memo(TrackHeader);
