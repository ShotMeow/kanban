import React, { type FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { type ColumnType } from '@/entities/Column';

import { TaskModal } from '../TaskModal';
import { type TaskType } from '../../types';
import styles from './TaskCard.module.scss';

interface Props {
  task: TaskType;
  column: ColumnType;
}

export const TaskCard: FC<Props> = ({ task, column }) => {
  const [taskModalShown, setTaskModalShown] = useState<boolean>(false);
  return (
    <>
      <article
        onClick={() => {
          setTaskModalShown(true);
        }}
        className={styles.task}
      >
        <h3>{task.title}</h3>
        <p>
          {task.subtasks.filter((subtask) => subtask.isSuccess).length} of {task.subtasks.length} subtasks
        </p>
      </article>
      <AnimatePresence>
        {taskModalShown && (
          <TaskModal column={column} isShown={taskModalShown} setIsShown={setTaskModalShown} task={task} />
        )}
      </AnimatePresence>
    </>
  );
};
