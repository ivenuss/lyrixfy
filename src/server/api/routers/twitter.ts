import { getTweets } from '~/lib/twitter';
import { TWITTER_TWEETS } from '~/lib/constants';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const twitterRouter = createTRPCRouter({
  tweets: publicProcedure.query(() => {
    return getTweets(TWITTER_TWEETS.query);
  })
});
