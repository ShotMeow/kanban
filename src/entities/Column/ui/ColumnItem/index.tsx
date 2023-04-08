import React, { type FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import { OtherButton } from '@/shared/ui';
import { taskApi, TaskCard } from '@/entities/Task';
import { useAuthContext } from '@/features/Authorize';
import { getCurrentBoard } from '@/entities/Board';

import { ColumnActionsDropdown } from '../ColumnActionsDropdown';
import { type ColumnType } from '../../types';
import styles from './ColumnItem.module.scss';

interface Props {
  column: ColumnType;
}

export const ColumnItem: FC<Props> = ({ column }) => {
  const [dropdownShown, setDropdownShown] = useState<boolean>(false);
  const { user } = useAuthContext();
  const currentBoard = useSelector(getCurrentBoard);

  const { data: tasks, refetch: tasksRefetch } = taskApi.useGetTasksQuery({
    userId: user?.uid || '',
    boardId: currentBoard?.id || '',
    columnId: column.id,
  });

  useEffect(() => {
    void tasksRefetch();
  }, [column, user, currentBoard]);

  return (
    <article className={styles.column}>
      <header>
        <h2>
          <div style={{ backgroundColor: column.color }} /> {column.title} {tasks && `(${tasks.length})`}
        </h2>
        <OtherButton
          onClick={(event) => {
            event.stopPropagation();
            setDropdownShown(true);
          }}
        />
        <AnimatePresence>
          {dropdownShown && (
            <ColumnActionsDropdown column={column} setDropdownShown={setDropdownShown} dropdownShown={dropdownShown} />
          )}
        </AnimatePresence>
      </header>
      {tasks && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard column={column} task={task} />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
