import React, { type FC } from 'react';
import { Spinner } from '@/shared/ui';

import styles from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <Spinner />
    </div>
  );
};
