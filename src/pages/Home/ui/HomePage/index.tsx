import React, { type FC } from 'react';
import { useSelector } from 'react-redux';

import { getColumns } from '@/entities/Column';

import { TaskBoard } from '../TaskBoard';

import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  const columns = useSelector(getColumns);

  return <main className={styles.home}>{columns && <TaskBoard columns={columns} />}</main>;
};
