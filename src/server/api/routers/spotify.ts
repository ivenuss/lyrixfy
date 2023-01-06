// @ts-expect-error
// eslint-disable-next-line import/no-extraneous-dependencies
import { getPalette } from 'colorthief';
import chroma, { type Color } from 'chroma-js';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { getLyrics } from 'lyrics-dumper';
import { getSearchForItem, getSpotifyCodeUrl, getTrack } from '~/lib/spotify';
import { getColorPalette, type TailwindPalette } from '~/lib/colors';
import type { SpotifySearchForItemRes, SpotifyTrack } from '~/types/spotify';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const spotifyRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const res = await getSearchForItem('track', input.query);

      if (res.status === 204 || res.status >= 400) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Missing or invalid query parameter.'
        });
      }

      const data: SpotifySearchForItemRes = await res.json();

      const result = data.tracks.items.map((track) => ({
        id: track.id,
        title: track.name,
        image: {
          url: track.album.images[2].url,
          width: track.album.images[2].width,
          height: track.album.images[2].height
        },
        authors: track.artists.map((artist) => ({ name: artist.name }))
      }));

      /*  ctx?.res?.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=30'
      ); */

      return result;
    }),
  getTrack: publicProcedure
    .input(z.object({ trackId: z.string() }))
    .query(async ({ input }) => {
      const res = await getTrack(input.trackId);

      if (res.status === 204 || res.status >= 400) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid track id was provided.'
        });
      }

      const track: SpotifyTrack = await res.json();

      return {
        id: track.id,
        name: track.name,
        duration: track.duration_ms,
        album: {
          name: track.album.name,
          album_type: track.album.album_type,
          release_date: track.album.release_date,
          total_tracks: track.album.total_tracks
        },
        url: track.album.external_urls.spotify,
        image: {
          url: track.album.images[0].url,
          width: track.album.images[0].width,
          height: track.album.images[0].height
        },
        codeUrl: getSpotifyCodeUrl(
          'png',
          'f1f5f9',
          'black',
          580,
          track.album.uri
        ),
        artists: track.artists.map((artist) => ({
          id: artist.id,
          name: artist.name,
          url: artist.external_urls.spotify
        }))
      };
    }),
  getLyrics: publicProcedure
    .input(z.object({ title: z.string(), artists: z.string().array() }))
    .query(async ({ input }) => {
      const result = await getLyrics(
        `${input.artists?.map((n) => n).join(', ')} - ${input.title}`
      );

      const lines = result.lyrics
        ?.split(/\n+/)
        .map((words, i) => ({ id: i, words }));

      return { lines };
    }),
  getColorPalette: publicProcedure
    .input(z.object({ imageUrl: z.string() }))
    .query(async ({ input }) => {
      const imageColors = await getPalette(input.imageUrl);
      const palette: Color[] = imageColors.map((color: number[]) =>
        chroma(color)
      );
      const colors = getColorPalette(palette);

      const formatedHex = chroma(colors.primary).hex().replace('#', '');
      const data: TailwindPalette = await fetch(
        `https://tailwind.simeongriggs.dev/api/palette/${formatedHex}`
      ).then((res) => res.json());

      const defaultColor = '#fff';
      const twPalette = data?.palette;

      return {
        primary: twPalette?.['600'] ?? defaultColor,
        primaryBright: twPalette?.['400'] ?? defaultColor,
        secondary: twPalette?.['50'] ?? defaultColor,
        alternative: twPalette?.['800'] ?? defaultColor
      };
    })
});
