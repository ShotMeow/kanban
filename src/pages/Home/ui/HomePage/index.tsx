import React, { type FC } from 'react';
import { useSelector } from 'react-redux';

import { getColumns } from '@/entities/Column';

import { TaskBoard } from '../TaskBoard';

import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  const columns = useSelector(getColumns);

  return (
    <main className={styles.home}>
      {columns ? (
        <TaskBoard columns={columns} />
      ) : (
        <div className={styles.text}>
          <h1>Welcome to Kanban System</h1>
          <p>To get started, try to create your first board.</p>
        </div>
      )}
    </main>
  );
};
