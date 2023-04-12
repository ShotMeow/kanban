import React, { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { boardApi, getCurrentBoard } from '@/entities/Board';
import { useNotificationContext } from '@/features/Notification';
import { useAuthContext } from '@/features/Authorize';
import { Button, Field, Modal } from '@/shared/ui';

import styles from './ChangeBoardModal.module.scss';
import { getIcons } from '@/entities/Board/selectors';
import { ChooseIconSection } from '@/entities/Board/ui/ChooseIconSection';

interface Props {
  setChangeBoardModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  changeBoardModalShown: boolean;
}

export const ChangeBoardModal: FC<Props> = ({ setChangeBoardModalShown, changeBoardModalShown }) => {
  const [changeBoard] = boardApi.useChangeBoardMutation();
  const currentBoard = useSelector(getCurrentBoard);
  const [boardTitle, setBoardTitle] = useState<string>(currentBoard?.title || '');
  const icons = useSelector(getIcons);
  const [selectedIcon, setSelectedIcon] = useState<string>(currentBoard?.icon || '');

  const { user } = useAuthContext();
  const { setError, setSuccess } = useNotificationContext();

  const handleChangeBoard = (): void => {
    changeBoard({
      userId: user?.uid || '',
      boardId: currentBoard?.id || '',
      board: {
        title: boardTitle,
        icon: selectedIcon,
      },
    })
      .then(() => {
        setSuccess(`The board «${currentBoard?.title}» was successfully changed`);
        setChangeBoardModalShown(false);
      })
      .catch(() => {
        setError('The board could not be changed. Try again later');
      });
  };

  return (
    <Modal
      title={currentBoard?.title}
      className={styles.modal}
      onShownChange={setChangeBoardModalShown}
      shown={changeBoardModalShown}
    >
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
        {icons && <ChooseIconSection icons={icons} selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />}
        <div className={styles.actions}>
          <Button
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
