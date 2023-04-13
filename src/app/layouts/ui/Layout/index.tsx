import React, { type FC, type PropsWithChildren, useEffect, useState } from 'react';

import { Header } from '@/widgets/Header';
import { Aside } from '@/widgets/Aside';

import styles from './Layout.module.scss';
import classNames from 'classnames';
import { columnApi } from '@/entities/Column';
import { Loader } from '@/widgets/Loader';
import { useSelector } from 'react-redux';
import { boardApi, getCurrentBoard } from '@/entities/Board';
import { useAuthContext } from '@/features/Authorize';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSmallestAside, setIsSmallestAside] = useState<boolean>(false);
  const currentBoard = useSelector(getCurrentBoard);
  const { user } = useAuthContext();

  boardApi.useGetIconsQuery();
  boardApi.useGetBoardsQuery({ userId: user?.uid || '' });
  const { refetch: columnsRefetch } = columnApi.useGetColumnsQuery({
    userId: user?.uid || '',
    boardId: currentBoard?.id || '',
  });

  useEffect(() => {
    setIsLoading(true);
    void columnsRefetch().finally(() => {
      setIsLoading(false);
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
        <div>{isLoading ? <Loader /> : children}</div>
      </div>
    </div>
  );
};
