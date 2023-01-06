import React from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import type { Tweet as TweetType } from '~/server/api/client';

interface TweetProps {
  tweet: TweetType;
}

export const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const authorUrl = `https://twitter.com/${tweet.author.username}`;
  const postUrl = `${authorUrl}/status/${tweet.id}`;

  const formattedText = tweet.text
    .replace(/https:\/\/[\n\S]+/g, '')
    .replace('&amp;', '&');

  const createdAt = new Date(tweet.created_at);

  return (
    <div className="mb-2 inline-flex flex-1 flex-col items-start rounded-md border border-gray-200 bg-white p-4 dark:border-primary-700 dark:bg-primary-900">
      <a
        href={authorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 flex w-full flex-1 flex-grow-0 items-start"
      >
        <img
          src={tweet.author.avatar}
          alt={tweet.author.username}
          className="mr-3 h-10 w-10 rounded-full"
        />
        <div className="flex w-full flex-col overflow-hidden">
          <div className="-mb-0.5 flex items-center">
            <span className="mr-1.5 truncate text-sm font-bold text-black hover:underline dark:text-primary-100">
              {tweet.author.name}
            </span>
            {tweet.author.verified && (
              <svg
                viewBox="0 0 24 24"
                aria-label="Verified account"
                role="img"
                className="h-[18px] flex-none text-blue-500 dark:text-primary-100"
              >
                <path
                  fill="currentColor"
                  d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
                />
              </svg>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-primary-200">
            @{tweet.author.username}
          </div>
        </div>
      </a>

      <div className="mb-1.5 flex flex-1 flex-col">
        <div className="text-sm text-black dark:text-primary-100">
          {formattedText}
        </div>

        {tweet.media && tweet.media.length ? (
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx('my-3 inline-grid gap-x-2 gap-y-2', {
              'grid-cols-1': tweet.media.length === 1,
              'grid-cols-2': tweet.media.length !== 1
            })}
          >
            {tweet.media.map((media) => (
              <img
                key={media.id}
                height={media.sizes.medium.h}
                width={media.sizes.medium.w}
                src={media.url}
                alt={tweet.text}
                className="rounded-lg border border-gray-200 bg-gray-100 dark:border-slate-700 dark:bg-primary-800"
              />
            ))}
          </a>
        ) : null}
      </div>

      <footer className="mt-auto flex flex-col">
        <time
          className="mb-3 text-xs text-gray-600 dark:text-primary-300"
          title={`Time Posted: ${createdAt.toUTCString()}`}
          dateTime={createdAt.toISOString()}
        >
          {format(createdAt, 'h:mm a · MMM d, y')}
        </time>

        <div className="flex items-center space-x-3 text-gray-600 dark:text-primary-300">
          <button
            type="button"
            className="flex items-center space-x-1.5 transition-colors hover:text-[#00ba7c]"
          >
            <svg viewBox="0 0 24 24" className="h-4">
              <path
                fill="currentColor"
                d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
              />
            </svg>
            <span>
              {tweet.retweet_count.toLocaleString('en', {
                notation: 'compact'
              })}
            </span>
          </button>

          <button
            type="button"
            className="flex items-center space-x-1.5 transition-colors hover:text-[#f91880]"
          >
            <svg viewBox="0 0 24 24" className="h-4">
              <path
                fill="currentColor"
                d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
              />
            </svg>
            <span>
              {tweet.like_count.toLocaleString('en', {
                notation: 'compact'
              })}
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
};
