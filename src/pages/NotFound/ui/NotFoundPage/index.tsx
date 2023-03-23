import React, { type FC } from 'react';

import { Logo } from '@/shared/ui';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage: FC = () => {
  return (
    <main className={styles.notfound}>
      <Logo />
      <div>
        <h1>Page Not Found</h1>
      </div>
    </main>
  );
};
