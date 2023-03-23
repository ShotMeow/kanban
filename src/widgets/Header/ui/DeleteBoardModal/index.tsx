import React, { type FC } from 'react';
import { boardApi, getCurrentBoard } from '@/features/Board';
import { useNotificationContext } from '@/features/Notification';
import { useSelector } from 'react-redux';
import { useAuthContext } from '@/features/Authorize';
import styles from '@/widgets/Header/ui/Header/Header.module.scss';
import { Button, Modal } from '@/shared/ui';

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
            type="button"
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
