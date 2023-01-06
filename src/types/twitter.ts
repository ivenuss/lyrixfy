export type TweetType = {
  id: string;
  text: string;
  like_count: number;
  retweet_count: number;
  created_at: Date;
  author: Author;
  media: Media[];
};

export interface Author {
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface Media {
  id: string;
  type: string;
  url: string;
  sizes: Sizes;
}

export interface Sizes {
  small: Size;
  thumb: Size;
  large: Size;
  medium: Size;
}

export interface Size {
  w: number;
  h: number;
  resize: string;
}
