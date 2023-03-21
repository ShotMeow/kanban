import React, { type FC, type PropsWithChildren } from 'react';

import styles from './Layout.module.scss';

import { Header } from '@/widgets/KanbanHeader';
import { Aside } from '@/widgets/KanbanAside';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Aside />
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};
