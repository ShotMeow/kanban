import React, { type FC } from 'react';
import { useSelector } from 'react-redux';

import { boardApi, getCurrentBoard } from '@/features/Board';
import { useNotificationContext } from '@/features/Notification';
import { useAuthContext } from '@/features/Authorize';
import { Button, Modal } from '@/shared/ui';

import styles from './DeleteBoardModal.module.scss';

interface Props {
  setDeleteBoardModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  deleteBoardModalShown: boolean;
}

export const DeleteBoardModal: FC<Props> = ({ setDeleteBoardModalShown, deleteBoardModalShown }) => {
  const [deleteBoard] = boardApi.useDeleteBoardMutation();
  const currentBoard = useSelector(getCurrentBoard);
  const { user } = useAuthContext();
  const { setError, setSuccess } = useNotificationContext();

  const handleDeleteBoard = (): void => {
    deleteBoard({ userId: user?.uid || '', boardId: currentBoard?.id || '' })
      .then(() => {
        setSuccess(`The board «${currentBoard?.title}» was successfully deleted`);
        setDeleteBoardModalShown(false);
      })
      .catch(() => {
        setError('The board could not be deleted. Try again later');
      });
  };

  return (
    <Modal className={styles.modal} onShownChange={setDeleteBoardModalShown} shown={deleteBoardModalShown}>
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
              setDeleteBoardModalShown(false);
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
