import React, { type FC, useState } from 'react';
import { type TodoType } from '@/features/Task/types';

import styles from './TaskCard.module.scss';
import { TaskModal } from '@/features/Task/ui/TaskModal';
import { AnimatePresence } from 'framer-motion';

interface Props {
  task: TodoType;
}

export const TaskCard: FC<Props> = ({ task }) => {
  const [taskModalShown, setTaskModalShown] = useState<boolean>(false);
  return (
    <>
      <article
        onClick={(event) => {
          event.stopPropagation();
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
        {taskModalShown && <TaskModal isShown={taskModalShown} setIsShown={setTaskModalShown} task={task} />}
      </AnimatePresence>
    </>
  );
};
