import React, { type FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { Checkbox } from '@/shared/ui';
import { useAuthContext } from '@/features/Authorize';
import { getCurrentBoard } from '@/entities/Board';
import { type ColumnType } from '@/entities/Column';

import { taskApi } from '../../queries';
import { type SubtaskType, type TaskType } from '../../types';
import styles from './SubtaskItem.module.scss';

interface Props {
  subtask: SubtaskType;
  task: TaskType;
  column: ColumnType;
}

export const SubtaskItem: FC<Props> = ({ subtask, task, column }) => {
  const { user } = useAuthContext();
  const currentBoard = useSelector(getCurrentBoard);

  const [changeTask] = taskApi.useChangeTaskMutation();
  const [isActive, setIsActive] = useState<boolean>(subtask.isSuccess);

  useEffect(() => {
    if (isActive !== subtask.isSuccess) {
      const subtasksArray: SubtaskType[] = task.subtasks.map((todoSubtask) => {
        const localSubtask = { ...todoSubtask };
        if (localSubtask.id === subtask.id) localSubtask.isSuccess = !todoSubtask.isSuccess;
        return localSubtask;
      });

      void changeTask({
        userId: user?.uid || '',
        boardId: currentBoard?.id || '',
        columnId: column.id,
        taskId: task.id,
        task: {
          ...task,
          subtasks: subtasksArray,
        },
      });
    }
  }, [isActive]);

  return (
    <label
      className={classNames(
        {
          [styles.success]: subtask.isSuccess,
        },
        styles.subtask
      )}
    >
      <Checkbox isActive={subtask.isSuccess} setIsActive={setIsActive} />
      <p>{subtask.value}</p>
    </label>
  );
};
