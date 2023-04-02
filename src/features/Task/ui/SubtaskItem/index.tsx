import React, { type FC, useEffect, useState } from 'react';
import { Checkbox } from '@/shared/ui';

import styles from './SubtaskItem.module.scss';
import { useSelector } from 'react-redux';
import { taskApi } from '@/features/Task/queries';
import { type SubtaskType, type TodoType } from '@/features/Task/types';
import { useAuthContext } from '@/features/Authorize';
import { getCurrentBoard } from '@/features/Board';
import classNames from 'classnames';

interface Props {
  subtask: SubtaskType;
  todo: TodoType;
}

export const SubtaskItem: FC<Props> = ({ subtask, todo }) => {
  const { user } = useAuthContext();
  const currentBoard = useSelector(getCurrentBoard);

  const [changeTodo] = taskApi.useChangeTodoMutation();
  const [isActive, setIsActive] = useState<boolean>(subtask.isSuccess);

  useEffect(() => {
    if (isActive !== subtask.isSuccess) {
      const subtasksArray: SubtaskType[] = todo.subtasks.map((todoSubtask) => {
        const localSubtask = { ...todoSubtask };
        if (localSubtask.id === subtask.id) localSubtask.isSuccess = !todoSubtask.isSuccess;
        return localSubtask;
      });

      void changeTodo({
        userId: user?.uid || '',
        boardId: currentBoard?.id || '',
        todoId: todo.id,
        todo: {
          ...todo,
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
