import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Header } from '~/modules/home/Header';
import { Hero } from '~/modules/home/hero/Hero';
import { Tutorial } from '~/modules/home/Tutorial';
import { Container } from '../components/Container';

const Features = dynamic(() => import('~/modules/home/Features'));
const Hashtag = dynamic(() => import('~/modules/home/Hashtag'));

const HomePage: NextPage = () => (
  <Container
    className="px-0"
    meta={{ title: 'Lyrixfy - Tool for bringing the meaning of lyrics' }}
  >
    <Header />

    <div className="md:pt-30 md:mb-18 mb-16 space-y-20 overflow-hidden pt-20 sm:mb-16 sm:space-y-20 sm:pt-32 md:space-y-28">
      <Tutorial />

      <section className="mx-auto mb-8 flex max-w-screen-xs flex-col px-4">
        <Hero />
      </section>

      <Features />

      <Hashtag />
    </div>
  </Container>
);

export default HomePage;
