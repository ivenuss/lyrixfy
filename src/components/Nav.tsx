import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

const links = [
  { link: '/', name: 'Home' },
  { link: '/#features', name: 'Features' },
  { link: '/about', name: 'About' }
];

export const Nav: React.FC = React.memo(() => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-100 bg-opacity-75 backdrop-blur-xl backdrop-saturate-150 dark:bg-primary-900 dark:bg-opacity-75 dark:backdrop-blur-xl dark:backdrop-saturate-150">
      <div className="mx-auto flex w-full max-w-screen-xs items-center px-4 py-4">
        <Link aria-label="Home page" href="/" className="mr-8">
          <Logo className="h-6 text-black dark:text-accent" />
        </Link>

        <div className="hidden items-center space-x-5 md:flex">
          {links.map(({ name, link }) => (
            <Link
              key={link}
              href={link}
              className={clsx('transition-colors duration-150 ease-in-out', {
                'text-gray-600 hover:text-accent-dark dark:text-primary-200 dark:hover:text-primary-100':
                  link !== router.asPath,
                'font-medium text-black dark:font-normal dark:text-accent':
                  link === router.asPath
              })}
            >
              {name}
            </Link>
          ))}
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
});

Nav.displayName = 'Nav';
