import { type NextPage } from 'next';
import { Twitter } from 'react-feather';
import { ButtonLink } from '~/components/ButtonLink';
import { Container } from '~/components/Container';
import { TWITTER_TWEETS } from '~/lib/constants';
import { Tweets } from '~/modules/home/Tweets';

const TweetsPage: NextPage = () => (
  <Container maxWidth={false} meta={{ title: 'Tweets - Lyrixfy' }}>
    <div className="mx-auto mb-12 flex max-w-screen-xs flex-col px-4 text-center">
      <div className="mx-auto mb-2 flex items-center space-x-3 text-xl font-bold text-black dark:text-primary-100 md:text-2xl">
        <span>Wall of Tweets</span>
        <Twitter className="h-6 w-6" />
      </div>
      <p className="text-gray-600 dark:text-primary-200">
        This is a collection of tweets that are tagged under hashtag&nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/hashtag/${TWITTER_TWEETS.searchQery}`}
          className="text-accent-dark hover:underline dark:text-accent"
        >
          {TWITTER_TWEETS.query}
        </a>
      </p>
    </div>

    <div className="mx-auto flex max-w-screen-md flex-col px-4">
      <Tweets className="columns-1 gap-x-2 md:columns-2" />

      <ButtonLink
        href={`https://twitter.com/hashtag/${TWITTER_TWEETS.searchQery}`}
        className="mx-auto mt-5"
      >
        <Twitter className="mr-2 h-5 w-5" />
        <span>View all Tweets</span>
      </ButtonLink>
    </div>
  </Container>
);

export default TweetsPage;
