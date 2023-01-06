import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

const sections = [
  [
    { link: '/', name: 'Home' },
    { link: '/about', name: 'About' },
    { link: '/#features', name: 'Features' }
  ],
  [
    { link: '/tweets', name: 'Tweets' },
    { link: '/privacy-policy', name: 'Privacy Policy' }
  ],
  [{ link: 'https://twitter.com/lyrixfy', name: 'Twitter' }]
];

export const Footer: React.FC = () => (
  <footer className="mx-auto mt-16 mb-24 w-full max-w-screen-xs px-4">
    <div className="mb-12 grid grid-cols-3 gap-4">
      {sections.map((section, i) => (
        <div key={i} className="flex flex-col space-y-4">
          {section.map(({ link, name }) => (
            <Link
              key={link}
              href={link}
              className="text-center text-black hover:underline dark:text-primary-100"
            >
              {name}
            </Link>
          ))}
        </div>
      ))}
    </div>

    <div className="mx-auto flex flex-col justify-center">
      <Logo className="mb-2.5 h-6 text-gray-400 dark:text-primary-300/60" />

      <div className="text-center text-sm text-gray-600 dark:text-primary-300">
        © {new Date().getFullYear()} lyrixfy.com
      </div>
    </div>
  </footer>
);
