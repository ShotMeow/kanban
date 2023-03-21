import React, { type FC } from 'react';

import styles from './Header.module.scss';
import { Button, OtherButton } from '@/shared/ui';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1>Platform Launch</h1>
      <div className={styles.actions}>
        <Button primary>+ Add New Task</Button>
        <OtherButton />
      </div>
    </header>
  );
};
