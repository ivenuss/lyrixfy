import type { NextPage } from 'next';
import { SearchTrack } from '~/components/SearchTrack';
import { Container } from '../components/Container';

const SearchPage: NextPage = () => (
  <Container meta={{ title: 'Search - Lyrixfy' }}>
    <h1 className="mb-5 text-center text-lg font-bold leading-tight text-black dark:text-primary-100 md:text-xl">
      Search for one&apos;s lyrics you find meaningful
    </h1>

    <SearchTrack />
  </Container>
);

export default SearchPage;
