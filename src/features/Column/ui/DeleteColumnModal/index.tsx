import React, { type FC } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentBoard } from '@/features/Board';
import { useNotificationContext } from '@/features/Notification';
import { useAuthContext } from '@/features/Authorize';
import { Button, Modal } from '@/shared/ui';

import { columnApi } from '../../queries';
import { type ColumnType } from '../../types';
import styles from './DeleteBoardModal.module.scss';

interface Props {
  setDeleteColumnModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  deleteColumnModalShown: boolean;
  column: ColumnType;
}

export const DeleteColumnModal: FC<Props> = ({ column, setDeleteColumnModalShown, deleteColumnModalShown }) => {
  const [deleteColumn] = columnApi.useDeleteColumnMutation();
  const currentBoard = useSelector(getCurrentBoard);
  const { user } = useAuthContext();
  const { setError, setSuccess } = useNotificationContext();

  const handleDeleteColumn = (): void => {
    deleteColumn({ userId: user?.uid || '', boardId: currentBoard?.id || '', columnId: column.id })
      .then(() => {
        setSuccess(`The column «${column.title}» was successfully deleted`);
        setDeleteColumnModalShown(false);
      })
      .catch(() => {
        setError('The column could not be deleted. Try again later');
      });
  };

  return (
    <Modal className={styles.modal} onShownChange={setDeleteColumnModalShown} shown={deleteColumnModalShown}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleDeleteColumn();
        }}
      >
        <h3>Do you really want delete «{column.title}» column?</h3>
        <div className={styles.actions}>
          <Button
            onClick={() => {
              setDeleteColumnModalShown(false);
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
