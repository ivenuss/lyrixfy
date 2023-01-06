import type { NextPage } from 'next';
import { ButtonLink } from '~/components/ButtonLink';
import { Container } from '../components/Container';

const NotFound: NextPage = () => (
  <Container meta={{ title: 'Not Found - Lyrixfy' }} className="mt-44">
    <div className="flex flex-col items-center text-center">
      <h1 className="mb-1 text-4xl font-bold text-gray-400 dark:text-primary-200/50">
        404
      </h1>

      <h2 className="mb-5 text-2xl font-bold text-black dark:text-primary-100">
        Oh no... We&apos;re lost
      </h2>

      <ButtonLink href="/" className="mx-auto">
        Take me Home 🏠
      </ButtonLink>
    </div>
  </Container>
);

export default NotFound;
