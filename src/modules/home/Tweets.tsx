import React from 'react';
import { Tweet } from '~/components/Tweet';
import { Spinner } from '~/components/Spinner';
import { api } from '~/lib/api';

interface TweetsProps {
  className?: string;
}

export const Tweets: React.FC<TweetsProps> = ({ className = '' }) => {
  const { data, isLoading, isError } = api.twitter.tweets.useQuery();

  if (isLoading) {
    return (
      <div className="my-12 grid place-items-center">
        <Spinner size="medium" />
      </div>
    );
  }

  const tweets = data?.sort((a, b) => b.like_count - a.like_count);

  if (isError || !tweets?.length)
    return <div className="mb-8 text-center">Could not find any tweets.</div>;

  return (
    <div className={className}>
      {tweets?.slice(0, 4).map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};
