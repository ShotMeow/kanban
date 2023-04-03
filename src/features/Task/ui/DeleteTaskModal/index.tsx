import React, { type FC } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentBoard } from '@/features/Board';
import { useAuthContext } from '@/features/Authorize';
import { useNotificationContext } from '@/features/Notification';
import { Button, Modal } from '@/shared/ui';
import { type ColumnType } from '@/features/Column';

import { type TaskType } from '../../types';
import { taskApi } from '../../queries';

import styles from './DeleteTaskModal.module.scss';

interface Props {
  setDeleteTaskModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTaskModalShown: boolean;
  task: TaskType;
  column: ColumnType;
}

export const DeleteTaskModal: FC<Props> = ({ setDeleteTaskModalShown, deleteTaskModalShown, task, column }) => {
  const [deleteTask] = taskApi.useDeleteTaskMutation();
  const currentBoard = useSelector(getCurrentBoard);
  const { user } = useAuthContext();
  const { setError, setSuccess } = useNotificationContext();

  const handleDeleteTask = (): void => {
    deleteTask({ userId: user?.uid || '', boardId: currentBoard?.id || '', columnId: column.id, taskId: task.id })
      .then(() => {
        setSuccess(`Task «${task.title}» was successfully deleted`);
        setDeleteTaskModalShown(false);
      })
      .catch(() => {
        setError('Task could not be deleted. Try again later');
      });
  };

  return (
    <Modal className={styles.modal} onShownChange={setDeleteTaskModalShown} shown={deleteTaskModalShown}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleDeleteTask();
        }}
      >
        <h3>Do you really want delete «{currentBoard?.title}» board?</h3>
        <div className={styles.actions}>
          <Button
            onClick={() => {
              setDeleteTaskModalShown(false);
            }}
            secondary
          >
            Cancel
          </Button>
          <Button type="submit" primary>
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
};
