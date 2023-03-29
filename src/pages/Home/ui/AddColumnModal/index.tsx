import React, { type FC, useState } from 'react';

import { Button, Field, Modal } from '@/shared/ui';

import styles from './AddColumnModal.module.scss';
import { boardApi, getCurrentBoard } from '@/features/Board';
import { useAuthContext } from '@/features/Authorize';
import { useSelector } from 'react-redux';
import { useNotificationContext } from '@/features/Notification';

interface Props {
  setAddColumnModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  addColumnModalShown: boolean;
}

export const AddColumnModal: FC<Props> = ({ setAddColumnModalShown, addColumnModalShown }) => {
  const [addColumn] = boardApi.useAddColumnMutation();
  const [color, setColor] = useState<string>('#000000');
  const [title, setTitle] = useState<string>('');

  const { user } = useAuthContext();
  const currentBoard = useSelector(getCurrentBoard);

  const { setError, setSuccess } = useNotificationContext();

  const handleSubmit = (): void => {
    addColumn({
      userId: user?.uid || '',
      boardId: currentBoard?.id || '',
      columnTitle: title,
      columnColor: color,
    })
      .then(() => {
        setSuccess(`The column ${title} in the ${currentBoard?.title} has been created successfully`);
        setAddColumnModalShown(false);
      })
      .catch(() => {
        setError('Column is not created. Please try again later');
      });
  };
  return (
    <Modal className={styles.modal} shown={addColumnModalShown} onShownChange={setAddColumnModalShown}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <h3>Add Column</h3>
        <Field
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
          value={title}
          required
          title="Column Title"
          placeholder="e.g. Todo"
        />
        <Field
          required
          onChange={(event) => {
            setColor(event.currentTarget.value);
          }}
          value={color}
          title="Column Color"
          type="color"
        />
        <Button type="submit" primary>
          Create Column
        </Button>
      </form>
    </Modal>
  );
};
