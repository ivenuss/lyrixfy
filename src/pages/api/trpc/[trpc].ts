/* eslint-disable @typescript-eslint/indent */
import { createNextApiHandler } from '@trpc/server/adapters/next';

import { createTRPCContext } from '~/server/api/trpc';
import { appRouter } from '~/server/api/root';
import { env } from '~/env/server.mjs';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          // eslint-disable-next-line no-console
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined
});
