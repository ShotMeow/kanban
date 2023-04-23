import React, { type FC, type FormEvent, useState } from 'react';

import { Button, Field, Modal } from '@/shared/ui';
import { useAuthContext } from '@/features/Authorize';
import { useNotificationContext } from '@/features/Notification';

import { boardApi } from '../../queries';
import styles from './CreateBoardModal.module.scss';
import { useSelector } from 'react-redux';
import { getIcons } from '@/entities/Board/selectors';
import { ChooseIconSection } from '@/entities/Board/ui/ChooseIconSection';

interface Props {
  setCreateBoardModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  createBoardModalShown: boolean;
}

export const CreateBoardModal: FC<Props> = ({ setCreateBoardModalShown, createBoardModalShown }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [boardTitle, setBoardTitle] = useState<string>('');
  const { user } = useAuthContext();
  const [addBoard] = boardApi.useAddBoardMutation();
  const { setSuccess, setError } = useNotificationContext();

  const icons = useSelector(getIcons);
  const [selectedIcon, setSelectedIcon] = useState<string>(icons ? icons[0] : '');

  const handleAddBoard = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsLoading(true);
    addBoard({
      userId: user?.uid || '',
      board: {
        title: boardTitle,
        icon: selectedIcon,
      },
    })
      .then(() => {
        setSuccess(`The board «${boardTitle}» was created successfully`);
        setCreateBoardModalShown(false);
      })
      .catch(() => {
        setError('The board was not created. Try again later');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      title="Create New Board"
      className={styles.modal}
      onShownChange={setCreateBoardModalShown}
      shown={createBoardModalShown}
    >
      <form
        onSubmit={(event) => {
          handleAddBoard(event);
        }}
      >
        <Field
          required
          value={boardTitle}
          onChange={(event) => {
            setBoardTitle(event.currentTarget.value);
          }}
          title="Title"
          placeholder="e.g. Platform Launch"
        />
        {icons && <ChooseIconSection icons={icons} selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />}
        <Button disabled={isLoading} type="submit" primary>
          Create Board
        </Button>
      </form>
    </Modal>
  );
};
