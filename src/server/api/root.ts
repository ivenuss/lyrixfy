import { createTRPCRouter } from './trpc';

import { spotifyRouter } from './routers/spotify';
import { twitterRouter } from './routers/twitter';

export const appRouter = createTRPCRouter({
  spotify: spotifyRouter,
  twitter: twitterRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
