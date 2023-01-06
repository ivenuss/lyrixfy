import React from 'react';
import { Search } from 'react-feather';
import { Underline } from '~/modules/home/Underline';
import { ButtonLink } from '~/components/ButtonLink';
import { toggleModal } from '~/components/SearchModal';
import { Button } from '~/components/Button';
import { ProductHuntButton } from './ProductHuntButton';

export const Header: React.FC = () => (
  <header className="mx-auto mt-16 max-w-screen-xs px-4">
    <div className="mb-10 flex flex-col text-center">
      <h2 className="mb-5 text-xl font-bold text-black dark:text-primary-100 md:text-2xl">
        Tool for bringing the
        <span className="relative text-accent-dark dark:text-accent">
          {' '}
          <span>meaning</span>{' '}
          <Underline className="absolute left-0 right-0 -bottom-2 hidden h-auto w-auto md:block" />
        </span>
        of lyrics
      </h2>

      <p className="mb-6 text-center text-base text-gray-600 dark:text-primary-200">
        Screenshot your favorite lyrics from any song. Share it on Stories,
        Tweet it or just send it directly to your friends!
      </p>

      <div className="mx-auto mb-6 flex w-full flex-col items-center justify-center gap-3 xs:flex-row xs:gap-4">
        <ButtonLink href="/search" className="hidden xs:block">
          Get Started
        </ButtonLink>

        <Button onClick={() => toggleModal()} className="block xs:hidden">
          Get Started
        </Button>

        <button
          type="button"
          onClick={() => toggleModal()}
          className="hidden w-4/12 items-center space-x-2 rounded-md bg-white p-2 px-4 ring-2 ring-inset ring-transparent transition-shadow hover:ring-gray-200 dark:bg-primary-700 dark:hover:ring-primary-600 xs:flex"
        >
          <Search className="h-4 w-4 flex-none text-black dark:text-primary-200" />
          <span className="text-sm text-gray-500 dark:text-primary-300">
            Quick search...
          </span>
        </button>
      </div>

      <ProductHuntButton className="h-12" />
    </div>
  </header>
);
