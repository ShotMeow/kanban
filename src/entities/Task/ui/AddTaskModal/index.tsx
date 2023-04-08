import React, { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Field, Modal, Select, TextArea } from '@/shared/ui';
import { getBoardStatuses, getCurrentBoard } from '@/entities/Board';
import { useAuthContext } from '@/features/Authorize';
import { useNotificationContext } from '@/features/Notification';
import { getColumns } from '@/entities/Column';

import { type SubtaskType } from '../../types';
import { SubtaskList } from '../SubtaskList';
import { taskApi } from '../../queries';

import styles from './AddTaskModal.module.scss';

interface Props {
  setAddTaskModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  addTaskModalShown: boolean;
}

export const AddTaskModal: FC<Props> = ({ setAddTaskModalShown, addTaskModalShown }) => {
  const currentBoard = useSelector(getCurrentBoard);

  const [subtasks, setSubtasks] = useState<SubtaskType[]>([
    {
      id: 0,
      value: '',
      isSuccess: false,
    },
    {
      id: 1,
      value: '',
      isSuccess: false,
    },
  ]);
  const [titleValue, setTitleValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');

  const columns = useSelector(getColumns);
  const [status, setStatus] = useState<string>(getBoardStatuses(columns || [])[0]);
  const { user } = useAuthContext();
  const [addTask] = taskApi.useAddTaskMutation();
  const { setSuccess, setError } = useNotificationContext();

  const handleSubmit = (): void => {
    addTask({
      userId: user?.uid || '',
      boardId: currentBoard?.id || '',
      columnId: columns?.find((column) => column.title === status)?.id || '',
      task: {
        title: titleValue,
        description: descriptionValue,
        subtasks,
        status,
      },
    })
      .then(() => {
        setSuccess(`${titleValue} successfully added to ${status} column`);
        setAddTaskModalShown(false);
      })
      .catch(() => {
        setError(`Todo ${titleValue} couldn't added`);
      });
  };

  return (
    <Modal title="Add New Task" className={styles.modal} onShownChange={setAddTaskModalShown} shown={addTaskModalShown}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Field
          required
          onChange={(event) => {
            setTitleValue(event.currentTarget.value);
          }}
          value={titleValue}
          title="Title"
          placeholder="e.g. Take coffee break"
        />
        <TextArea
          required
          onChange={(event) => {
            setDescriptionValue(event.currentTarget.value);
          }}
          value={descriptionValue}
          title="Description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
        />
        <SubtaskList subtasks={subtasks} setSubtasks={setSubtasks} />
        <Select
          title="Status"
          currentValue={status}
          setCurrentValue={setStatus}
          options={getBoardStatuses(columns || [])}
        />
        <Button type="submit" primary>
          Create Task
        </Button>
      </form>
    </Modal>
  );
};
