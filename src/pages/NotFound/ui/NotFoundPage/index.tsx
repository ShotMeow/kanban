import React, { type FC } from 'react';

import { Button } from '@/shared/ui';

import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.notfound}>
      <div>
        <div className={styles.code}>
          <p>404 error</p>
        </div>
        <div className={styles.text}>
          <h1>We&apos;ve lost this page</h1>
          <p>Sorry, the page you are looking for doesn&apos;t exist or has been moved.</p>
        </div>
        <Button
          onClick={() => {
            navigate('/');
          }}
          primary
        >
          Go Back
        </Button>
      </div>
    </main>
  );
};
