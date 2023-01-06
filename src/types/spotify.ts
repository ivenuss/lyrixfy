export interface ExternalUrl {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: [Image, Image, Image];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ExternalId {
  isrc: string;
}

export interface SpotifyTrack {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalId;
  external_urls: ExternalUrl;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface TrackSearchQuery {
  href: string;
  items: SpotifyTrack[];
  limit: number;
  next: string;
  offset: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previous?: any;
  total: number;
}

export interface SpotifySearchForItemRes {
  tracks: TrackSearchQuery;
}

export type SearchItemResponse = {
  id: string;
  title: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  authors: { name: string }[];
}[];

export type TrackDetails = {
  id: string;
  name: string;
  duration: number;
  album: {
    name: string;
    album_type: string;
    release_date: string;
    total_tracks: number;
  };
  url: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  codeUrl: string;
  artists: {
    id: string;
    name: string;
    url: string;
  }[];
};

export type TrackColors = {
  alternative: string;
  primaryBright: string;
  primary: string;
  secondary: string;
};
