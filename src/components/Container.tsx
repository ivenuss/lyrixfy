import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React from 'react';
import { Footer } from './Footer';
import { Meta, type MetaProps } from './Meta';
import { Nav } from './Nav';
import { PageTransition } from './PageTransition';

const SearchModal = dynamic(() => import('./SearchModal'));

interface ContainerProps {
  meta?: MetaProps;
  className?: string;
  maxWidth?: boolean;
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  meta,
  children,
  maxWidth = true,
  className = ''
}) => (
  <div id="container" className="flex min-h-screen flex-col">
    <Nav />
    <div className="mb-auto">
      <main
        className={clsx(
          'mx-auto mt-6 md:mt-10',
          { 'max-w-screen-xs px-4': maxWidth },
          className
        )}
      >
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
    <Footer />

    {/* Oher */}
    <SearchModal />
    <Meta {...meta} />
  </div>
);
