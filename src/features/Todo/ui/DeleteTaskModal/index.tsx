import React, { type FC } from 'react';
import { getCurrentBoard } from '@/features/Board';
import { useSelector } from 'react-redux';
import { useAuthContext } from '@/features/Authorize';
import { useNotificationContext } from '@/features/Notification';
import { Button, Modal } from '@/shared/ui';
import styles from './DeleteTaskModal.module.scss';
import { todoApi } from '@/features/Todo/queries';
import { type TodoType } from '@/features/Todo/types';

interface Props {
  setDeleteTaskModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTaskModalShown: boolean;
  task: TodoType;
}

export const DeleteTaskModal: FC<Props> = ({ setDeleteTaskModalShown, deleteTaskModalShown, task }) => {
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const currentBoard = useSelector(getCurrentBoard);
  const { user } = useAuthContext();
  const { setError, setSuccess } = useNotificationContext();

  const handleDeleteBoard = (): void => {
    deleteTodo({ userId: user?.uid || '', boardId: currentBoard?.id || '', todoId: task.id })
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
          handleDeleteBoard();
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
