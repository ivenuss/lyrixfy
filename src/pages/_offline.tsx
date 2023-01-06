import React from 'react';
import { CloudOff } from 'react-feather';
import type { NextPage } from 'next';
import { Container } from '~/components/Container';

const OfflinePage: NextPage = () => (
  <Container meta={{ title: 'Offline - Lyrixfy' }}>
    <div className="flex flex-col items-center">
      <CloudOff className="mb-4 h-8 w-8 text-gray-500 dark:text-primary-300" />
      <div className="text-center text-gray-600 dark:text-primary-200">
        Looks like you lost your connection. Please check it and try again.
      </div>
    </div>
  </Container>
);

export default OfflinePage;
