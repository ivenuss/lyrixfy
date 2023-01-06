import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';

export interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
}

export const Meta: React.FC<MetaProps> = ({ ...customMeta }) => {
  const router = useRouter();
  const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL;

  const meta = {
    title: 'Lyrixfy',
    name: 'Lyrixfy',
    description:
      'Screenshot your favorite lyrics from any song. Share it on Stories, Tweet it or just send it directly to your friends!',
    image: `${DOMAIN}/static/banner.png`,
    type: 'website',
    ...customMeta
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <link rel="canonical" href={`${DOMAIN}${router.asPath}`} />
      <meta name="application-name" content={meta.name} />

      {/* Open Graph */}
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.name} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:url" content={`${DOMAIN}${router.asPath}`} />
      <meta property="og:image:alt" content={`${meta.name} banner`} />

      {/* Twitter Meta */}
      <meta name="twitter:site" content="@lyrixfy" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />

      {/* Ios */}
      <meta name="apple-mobile-web-app-title" content={meta.title} />
      <meta name="apple-mobile-web-app-status-bar-style" content="#001e26" />

      {/* Colors */}
      <meta name="theme-color" content="#001e26" />
      <meta name="msapplication-TileColor" content="#31efb8" />

      {/* Favicons */}
      <link
        rel="icon"
        type="image/svg+xml"
        href="/static/favicons/favicon.svg"
      />
      <link
        rel="alternate icon"
        sizes="16x16"
        href="/static/favicons/favicon.ico"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicons/favicon-32x32.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/favicons/apple-touch-icon.png"
      />
    </Head>
  );
};
