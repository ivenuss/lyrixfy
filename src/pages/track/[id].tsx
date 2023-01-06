import React, { startTransition, useEffect } from 'react';
import superjson from 'superjson';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import type { NextPage, GetServerSidePropsContext } from 'next';
import type { DehydratedState } from '@tanstack/react-query';
import { useTrackStore } from '~/stores/track.store';
import { TrackEmbed } from '~/modules/track/TrackEmbed';
import { BounceTransition } from '~/components/BounceTransition';
import { Container } from '~/components/Container';
import { api } from '~/lib/api';
import { TRACK_PAGES } from '~/lib/constants';
import { appRouter } from '~/server/api/root';
import { createTRPCContext } from '~/server/api/trpc';

const getAlbumType = (album: string) => {
  switch (album) {
    case 'single':
      return 'Single';
    case 'album':
      return 'Album';
    case 'song':
      return 'Song';
    default:
      return '';
  }
};

interface TrackPageProps {
  id: string;
  trpcState: DehydratedState;
}

const NotFound = () => (
  <div className="py-10 text-center text-2xl font-bold text-black dark:text-primary-100">
    Not Found
  </div>
);

const TrackPage: NextPage<TrackPageProps> = (props) => {
  const { id } = props;
  const router = useRouter();

  const embed = useTrackStore((state) => state.embed);
  const resetEmbed = useTrackStore((state) => state.resetEmbed);
  const { data } = api.spotify.getTrack.useQuery({ trackId: id });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const track = data!;
  const SubpageView = TRACK_PAGES[embed.currentPage] ?? NotFound;

  const formatedDesc = `${
    track.artists?.[0]?.name ?? 'unknown'
  } • ${getAlbumType(track.album.album_type)} • ${format(
    new Date(track.album.release_date),
    'y'
  )} • ${track.album.total_tracks} songs.`;

  useEffect(() => {
    // Temporary fix - https://www.reddit.com/r/nextjs/comments/yxa87v/im_glad_im_not_the_only_one_that_thinks_this/
    setTimeout(() => {
      // Reset embed when track changes
      startTransition(() => resetEmbed());
    }, 100);
  }, [resetEmbed, router.query.id]);

  return (
    <Container
      key={router.asPath}
      maxWidth={false}
      meta={{
        title: `${track.name} - Lyrixfy`,
        image: track.image.url,
        description: formatedDesc
      }}
    >
      <div className="mx-auto max-w-screen-xs px-4">
        <TrackEmbed isCollapsed track={track} />
      </div>

      <BounceTransition key={embed.currentPage}>
        <SubpageView />
      </BounceTransition>
    </Container>
  );
};

export default TrackPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const id = context.params?.id as string;
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createTRPCContext({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      req: context.req as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res: context.res as any
    }),
    transformer: superjson
  });

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=86400'
  );

  return ssg.spotify.getTrack
    .fetch({ trackId: id })
    .then(() => ({ props: { id, trpcState: ssg.dehydrate() } }))
    .catch(() => ({ notFound: true, props: {} }));
};
