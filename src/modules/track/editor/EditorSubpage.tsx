import React from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'react-feather';
import { Button } from '~/components/Button';
import { useTrackStore } from '~/stores/track.store';
import { api } from '~/lib/api';
import { Editor } from './Editor';
import { Canvas } from '../layout/Canvas';

export const EditorSubpage: React.FC = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const embed = useTrackStore((state) => state.embed);
  const setEmbed = useTrackStore((state) => state.setEmbed);

  const { data: track } = api.spotify.getTrack.useQuery(
    { trackId: id },
    { enabled: !!id }
  );

  return (
    <div className="mt-4">
      <div className="mx-auto mt-4 flex max-w-screen-xs items-center px-4">
        <Button
          aria-label="Go back"
          className="mr-3 px-2 py-2"
          onClick={() => setEmbed({ ...embed, currentPage: 'LYRICS' })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="text-sm text-black dark:text-primary-200">Go back</div>
      </div>

      <div className="relative my-6 mx-auto flex max-w-screen-xs flex-col place-items-start justify-center px-4 md:mb-0 md:max-w-screen-xl md:flex-row md:space-x-8">
        {track && (
          <>
            <Canvas
              name={track.name}
              artists={track.artists.map(({ name }) => name)}
              imageUrl={track.image.url}
              lines={embed.lines.map((l) => l.words)}
              primaryColor={embed.theme.primary}
              secondaryColor={embed.theme.secondary}
            />

            <Editor track={track} />
          </>
        )}
      </div>
    </div>
  );
};
