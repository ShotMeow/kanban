import React, { type FC, useState } from 'react';

import styles from './AddTaskModal.module.scss';
import { Button, Field, Modal, Select, TextArea } from '@/shared/ui';
import { useSelector } from 'react-redux';
import { getBoardStatuses, getCurrentBoard } from '@/features/Board';
import { SubtaskList } from '@/widgets/Header/ui/SubtaskList';
import { todoApi } from '@/features/Todo/queries';
import { useAuthContext } from '@/features/Authorize';
import { useNotificationContext } from '@/features/Notification';
import { type SubtaskType } from '@/features/Todo/types';

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

  const [currentStatus, setCurrentStatus] = useState<string>(getBoardStatuses(currentBoard?.columns || [])[0]);
  const { user } = useAuthContext();
  const [addTodo] = todoApi.useAddTodoMutation();
  const { setSuccess, setError } = useNotificationContext();

  const handleSubmit = (): void => {
    addTodo({
      userId: user?.uid || '',
      boardId: currentBoard?.id || '',
      task: {
        title: titleValue,
        description: descriptionValue,
        subtasks,
        status: currentStatus,
      },
    })
      .then(() => {
        setSuccess(`${titleValue} successfully added to ${currentBoard?.title} column`);
        setAddTaskModalShown(false);
      })
      .catch(() => {
        setError(`Todo ${titleValue} couldn't added`);
      });
  };

  return (
    <Modal className={styles.modal} onShownChange={setAddTaskModalShown} shown={addTaskModalShown}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <h3>Add New Task</h3>
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
          currentValue={currentStatus}
          setCurrentValue={setCurrentStatus}
          options={getBoardStatuses(currentBoard?.columns || [])}
        />
        <Button type="submit" primary>
          Create Task
        </Button>
      </form>
    </Modal>
  );
};
