import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/site.webmanifest" />

          <script async src="https://cdn.splitbee.io/sb.js" />
        </Head>

        <body className="bg-gray-100 selection:bg-black selection:text-white dark:bg-primary-900 dark:selection:bg-blue-600 dark:selection:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
