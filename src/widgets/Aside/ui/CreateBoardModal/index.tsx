import React, { type FC, type FormEvent, useState } from 'react';
import styles from '@/widgets/Aside/ui/Aside/Aside.module.scss';
import { Button, Field, Modal } from '@/shared/ui';
import { useAuthContext } from '@/features/Authorize';
import { boardApi } from '@/features/Board';
import { useNotificationContext } from '@/features/Notification';

interface Props {
  setCreateBoardModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  createBoardModalShown: boolean;
}

export const CreateBoardModal: FC<Props> = ({ setCreateBoardModalShown, createBoardModalShown }) => {
  const [boardTitle, setBoardTitle] = useState<string>('');
  const { user } = useAuthContext();
  const [addBoard] = boardApi.useAddBoardMutation();

  const { setSuccess, setError } = useNotificationContext();

  const handleAddBoard = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    addBoard({ userId: user?.uid || '', boardTitle })
      .then(() => {
        setSuccess(`The board «${boardTitle}» was created successfully`);
        setCreateBoardModalShown(false);
      })
      .catch(() => {
        setError('The board was not created. Try again later');
      });
  };

  return (
    <Modal className={styles.modal} onShownChange={setCreateBoardModalShown} shown={createBoardModalShown}>
      <form
        onSubmit={(event) => {
          handleAddBoard(event);
        }}
      >
        <h3>Create New Board</h3>
        <Field
          required
          value={boardTitle}
          onChange={(event) => {
            setBoardTitle(event.currentTarget.value);
          }}
          title="Title"
          placeholder="e.g. Platform Launch"
        />
        <Button primary>Create Board</Button>
      </form>
    </Modal>
  );
};