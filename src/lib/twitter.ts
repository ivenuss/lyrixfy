import type { TweetType } from '~/types/twitter';

// API: https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets
export const getTweets = async (query: string) => {
  const queryParams = new URLSearchParams({
    q: query,
    locale: 'en',
    result_type: 'popular',
    count: '99'
  });

  const data = await fetch(
    `https://api.twitter.com/1.1/search/tweets.json?${queryParams}`,
    { headers: { Authorization: `Bearer ${process.env.TWITTER_API_KEY}` } }
  ).then((res) => res.json());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tweets: any[] = data.statuses;

  return tweets.map((tweet): TweetType => {
    return {
      id: tweet.id_str,
      text: tweet.text,
      like_count: tweet.favorite_count,
      retweet_count: tweet.retweet_count,
      created_at: tweet.created_at,
      author: {
        name: tweet.user.name,
        username: tweet.user.screen_name,
        avatar: tweet.user.profile_image_url_https,
        verified: tweet.user.verified
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      media: tweet.entities.media?.map((media: any) => {
        return {
          id: media.id_str,
          type: media.type,
          url: media.media_url_https,
          sizes: media.sizes
        };
      })
    };
  });
};
