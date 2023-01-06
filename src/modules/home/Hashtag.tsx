import React from 'react';
import { ButtonLink } from '~/components/ButtonLink';
import { api } from '~/lib/api';
import { TWITTER_TWEETS } from '~/lib/constants';
import { Tweets } from './Tweets';

const Hashtag: React.FC = () => {
  const { data: tweets, isLoading } = api.twitter.tweets.useQuery();

  return (
    <section className="mx-auto max-w-screen-xs">
      <div className="mx-auto mb-6 flex max-w-screen-sm flex-col">
        <h3 className="mx-auto mb-2 inline-flex bg-accent px-1.5 py-0.5 text-center text-2xl font-bold text-black dark:bg-accent dark:text-black">
          {TWITTER_TWEETS.query}
        </h3>

        <div className="text-center text-gray-600 dark:text-primary-200">
          Share your tweets under{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/hashtag/${TWITTER_TWEETS.searchQery}`}
            className="text-accent-dark hover:underline dark:text-accent"
          >
            {TWITTER_TWEETS.query}
          </a>{' '}
          hashtag and appear here
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-md flex-col px-4">
        <div className="relative mb-10 max-h-[580px] overflow-hidden md:max-h-[760px]">
          <Tweets className="columns-1 gap-x-2 sm:columns-2" />
          <div className="absolute bottom-0 z-10 h-16 w-full bg-gradient-to-t from-gray-100 dark:from-primary-900" />
        </div>

        {Boolean(!isLoading && tweets?.length) && (
          <ButtonLink href="/tweets" className="mx-auto">
            Show more
          </ButtonLink>
        )}
      </div>
    </section>
  );
};
export default Hashtag;
