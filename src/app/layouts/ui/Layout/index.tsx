import React, { type FC, type PropsWithChildren, useState } from 'react';

import { Header } from '@/widgets/Header';
import { Aside } from '@/widgets/Aside';

import styles from './Layout.module.scss';
import classNames from 'classnames';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isSmallestAside, setIsSmallestAside] = useState<boolean>(true);

  return (
    <div className={styles.layout}>
      <Aside isSmallestAside={isSmallestAside} setIsSmallestAside={setIsSmallestAside} />
      <div
        className={classNames({
          [styles.smallest]: isSmallestAside,
        })}
      >
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};
