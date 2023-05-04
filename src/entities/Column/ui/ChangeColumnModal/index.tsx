import React, { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentBoard } from '@/entities/Board';
import { useNotificationContext } from '@/features/Notification';
import { useAuthContext } from '@/features/Authorize';
import { Button, Field, Modal } from '@/shared/ui';

import { columnApi } from '../../queries';
import { type ColumnType } from '../../types';
import styles from './ChangeBoardModal.module.scss';

interface Props {
  setChangeColumnModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  changeColumnModalShown: boolean;
  column: ColumnType;
}

export const ChangeColumnModal: FC<Props> = ({ column, setChangeColumnModalShown, changeColumnModalShown }) => {
  const [changeColumn] = columnApi.useChangeColumnMutation();
  const currentBoard = useSelector(getCurrentBoard);
  const [title, setTitle] = useState<string>(column.title);
  const [color, setColor] = useState<string>(column.color);

  const { user } = useAuthContext();
  const { setError, setSuccess } = useNotificationContext();

  const handleChangeColumn = (): void => {
    changeColumn({
      userId: user?.uid || '',
      boardId: currentBoard?.id || '',
      columnId: column.id,
      column: {
        title,
        color,
      },
    })
      .then(() => {
        setSuccess(`The column «${currentBoard?.title}» was successfully changed`);
        setChangeColumnModalShown(false);
      })
      .catch(() => {
        setError('The column could not be changed. Try again later');
      });
  };

  return (
    <Modal
      title={column.title}
      className={styles.modal}
      onShownChange={setChangeColumnModalShown}
      shown={changeColumnModalShown}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleChangeColumn();
        }}
      >
        <div className={styles.fields}>
          <Field
            title="Column Name"
            onChange={(event) => {
              setTitle(event.currentTarget.value);
            }}
            value={title}
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
        <div className={styles.actions}>
          <Button
            onClick={() => {
              setChangeColumnModalShown(false);
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
