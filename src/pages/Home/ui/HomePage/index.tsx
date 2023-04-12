import React, { type FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { boardApi, getCurrentBoard } from '@/entities/Board';
import { getColumns, columnApi } from '@/entities/Column';
import { useAuthContext } from '@/features/Authorize';
import { Loader } from '@/widgets/Loader';

import { TaskBoard } from '../TaskBoard';

import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const columns = useSelector(getColumns);

  const { user } = useAuthContext();
  const currentBoard = useSelector(getCurrentBoard);

  const { refetch: columnsRefetch } = columnApi.useGetColumnsQuery({
    userId: user?.uid || '',
    boardId: currentBoard?.id || '',
  });
  const { refetch: iconsRefetch } = boardApi.useGetIconsQuery();

  useEffect(() => {
    setIsLoading(true);
    void columnsRefetch().finally(() => {
      setIsLoading(false);
    });
  }, [user, currentBoard]);

  useEffect(() => {
    void iconsRefetch();
  }, []);

  return (
    <main className={styles.home}>
      {isLoading ? <Loader /> : currentBoard && columns && <TaskBoard columns={columns} />}
    </main>
  );
};
