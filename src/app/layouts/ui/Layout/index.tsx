import React, { type FC, type PropsWithChildren, useEffect, useState } from 'react';

import { Header } from '@/widgets/Header';
import { Aside } from '@/widgets/Aside';

import styles from './Layout.module.scss';
import classNames from 'classnames';
import { columnApi } from '@/entities/Column';
import { Loader } from '@/widgets/Loader';
import { useSelector } from 'react-redux';
import { getCurrentBoard } from '@/entities/Board';
import { useAuthContext } from '@/features/Authorize';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isColumnsLoading, setIsColumnsLoading] = useState<boolean>(true);
  const [isSmallestAside, setIsSmallestAside] = useState<boolean>(false);
  const currentBoard = useSelector(getCurrentBoard);
  const { user } = useAuthContext();

  const { refetch: columnsRefetch } = columnApi.useGetColumnsQuery({
    userId: user?.uid || '',
    boardId: currentBoard?.id || '',
  });

  useEffect(() => {
    setIsColumnsLoading(true);
    void columnsRefetch().finally(() => {
      setIsColumnsLoading(false);
    });
  }, [currentBoard]);

  return (
    <div className={styles.layout}>
      <Aside isSmallestAside={isSmallestAside} setIsSmallestAside={setIsSmallestAside} />
      <div
        className={classNames({
          [styles.smallest]: isSmallestAside,
        })}
      >
        <Header />
        <div>{isColumnsLoading ? <Loader /> : children}</div>
      </div>
    </div>
  );
};
