import React, { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { boardApi, getCurrentBoard } from '@/features/Board';
import { useNotificationContext } from '@/features/Notification';
import { useAuthContext } from '@/features/Authorize';
import { Button, Field, Modal } from '@/shared/ui';

import styles from './ChangeBoardModal.module.scss';

interface Props {
  setChangeBoardModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  changeBoardModalShown: boolean;
}

export const ChangeBoardModal: FC<Props> = ({ setChangeBoardModalShown, changeBoardModalShown }) => {
  const [changeBoard] = boardApi.useChangeBoardMutation();
  const currentBoard = useSelector(getCurrentBoard);
  const [boardTitle, setBoardTitle] = useState<string>(currentBoard?.title || '');

  const { user } = useAuthContext();
  const { setError, setSuccess } = useNotificationContext();

  const handleChangeBoard = (): void => {
    changeBoard({ userId: user?.uid || '', boardId: currentBoard?.id || '', boardTitle })
      .then(() => {
        setSuccess(`The board «${currentBoard?.title}» was successfully changed`);
        setChangeBoardModalShown(false);
      })
      .catch(() => {
        setError('The board could not be changed. Try again later');
      });
  };

  return (
    <Modal className={styles.modal} onShownChange={setChangeBoardModalShown} shown={changeBoardModalShown}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleChangeBoard();
        }}
      >
        {currentBoard && (
          <Field
            title="Board Name"
            onChange={(event) => {
              setBoardTitle(event.currentTarget.value);
            }}
            value={boardTitle}
          />
        )}
        <div className={styles.actions}>
          <Button
            type="button"
            onClick={() => {
              setChangeBoardModalShown(false);
            }}
            secondary
          >
            Cancel
          </Button>
          <Button type="submit" primary>
            Change
          </Button>
        </div>
      </form>
    </Modal>
  );
};
