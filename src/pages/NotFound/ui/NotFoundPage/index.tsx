import React, { type FC } from 'react';

import styles from './NotFoundPage.module.scss';
import { Logo } from '@/shared/ui';

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
