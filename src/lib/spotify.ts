/* eslint-disable @typescript-eslint/naming-convention */
/*
  Credits to: https://github.com/leerob/leerob.io
*/

import { URL } from 'url';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TRACK_ENDPOINT = `https://api.spotify.com/v1/tracks`;
const SEARCH_FOR_ITEM_ENDPOINT = `https://api.spotify.com/v1/search`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getSearchForItem = async (
  type: 'track' | 'artist',
  query: string
) => {
  const { access_token } = await getAccessToken();

  return fetch(
    `${SEARCH_FOR_ITEM_ENDPOINT}?type=${type}&limit=6&q=${encodeURIComponent(
      query
    )}`,
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
};

export const getLyrics = async () => {
  const { access_token } = await getAccessToken();

  return fetch(
    `https://spclient.wg.spotify.com/metadata/4/track/e76128d8c4714256842894640096ae9c?market=from_token`,
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
};

export const getTrack = async (id: string) => {
  const { access_token } = await getAccessToken();

  return fetch(`${TRACK_ENDPOINT}/${id}`, {
    headers: { Authorization: `Bearer ${access_token}` }
  });
};

export const getTopTracks = async (
  time_range: 'short_term' | 'medium_term' | 'long_term'
) => {
  const { access_token } = await getAccessToken();

  const url = new URL(TOP_TRACKS_ENDPOINT);
  url.searchParams.set('time_range', time_range);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getSpotifyCodeUrl = (
  format: 'png' | 'jpeg',
  backgroundHex: string,
  textColor: 'black' | 'white',
  size: number,
  spotifyUri: string
) => {
  return `https://scannables.scdn.co/uri/plain/${format}/${backgroundHex}/${textColor}/${size}/${spotifyUri}`;
};
