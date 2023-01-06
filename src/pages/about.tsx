import type { NextPage } from 'next';
import { Faq } from '~/modules/about/Faq';
import { KeyboardShortcuts } from '~/modules/about/KeyboardShortcuts';
import { Container } from '../components/Container';

const AboutPage: NextPage = () => (
  <Container meta={{ title: 'About - Lyrixfy' }}>
    <div className="relative flex flex-col space-y-14">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-primary-100">
          About
        </h2>

        <p className="text-gray-600 dark:text-primary-200">
          Lyrixfy helps you capture the specific part from lyrics and share it
          as screenshot with others. The project is inspired by Spotify mobile
          version but this one has more features and huge customization.
          <br />
          <br />
          Music data, artist images, album covers, and song previews are
          provided by Spotify.
          <br />
          <br />
          Lyrixfy is not affiliated with Spotify.
        </p>
      </section>
      <KeyboardShortcuts />
      <Faq />
    </div>
  </Container>
);

export default AboutPage;
