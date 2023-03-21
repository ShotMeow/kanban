import React, { type FC } from 'react';

import styles from './Aside.module.scss';
import { Logo } from '@/shared/ui';

export const Aside: FC = () => {
  return (
    <aside className={styles.aside}>
      <Logo />
    </aside>
  );
};
