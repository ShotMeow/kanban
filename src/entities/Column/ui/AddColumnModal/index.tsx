import React, { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Field, Modal } from '@/shared/ui';

import { getCurrentBoard } from '@/entities/Board';
import { useAuthContext } from '@/features/Authorize';
import { useNotificationContext } from '@/features/Notification';

import { columnApi } from '../../queries';
import styles from './AddColumnModal.module.scss';

interface Props {
  setAddColumnModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  addColumnModalShown: boolean;
}

export const AddColumnModal: FC<Props> = ({ setAddColumnModalShown, addColumnModalShown }) => {
  const [addColumn] = columnApi.useAddColumnMutation();
  const [color, setColor] = useState<string>('#000000');
  const [title, setTitle] = useState<string>('');

  const { user } = useAuthContext();
  const currentBoard = useSelector(getCurrentBoard);

  const { setError, setSuccess } = useNotificationContext();

  const handleSubmit = (): void => {
    addColumn({
      userId: user?.uid || '',
      boardId: currentBoard?.id || '',
      column: {
        title,
        color,
      },
    })
      .then(() => {
        setSuccess(`The column «${title}» in the «${currentBoard?.title}» has been created successfully`);
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
        <div>
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
        </div>
        <Button type="submit" primary>
          Create Column
        </Button>
      </form>
    </Modal>
  );
};
