import React, { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { getBoardStatuses, getCurrentBoard } from '@/features/Board';
import { useNotificationContext } from '@/features/Notification';
import { useAuthContext } from '@/features/Authorize';
import { Button, Field, Modal, Select, TextArea } from '@/shared/ui';

import styles from './ChangeTaskModal.module.scss';
import { todoApi } from '@/features/Todo/queries';
import { type SubtaskType, type TodoType } from '@/features/Todo/types';
import { SubtaskList } from '@/widgets/Header/ui/SubtaskList';

interface Props {
  setChangeTaskModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  changeTaskModalShown: boolean;
  task: TodoType;
}

export const ChangeTaskModal: FC<Props> = ({ setChangeTaskModalShown, changeTaskModalShown, task }) => {
  const [changeTodo] = todoApi.useChangeTodoMutation();

  const currentBoard = useSelector(getCurrentBoard);

  const [subtasks, setSubtasks] = useState<SubtaskType[]>(task.subtasks);
  const [titleValue, setTitleValue] = useState<string>(task.title);
  const [descriptionValue, setDescriptionValue] = useState<string>(task.description);

  const [currentStatus, setCurrentStatus] = useState<string>(task.status);

  const { user } = useAuthContext();
  const { setError, setSuccess } = useNotificationContext();

  const handleChangeTask = (): void => {
    void changeTodo({
      userId: user?.uid || '',
      boardId: currentBoard?.id || '',
      todoId: task.id,
      todo: {
        title: titleValue,
        description: descriptionValue,
        status: currentStatus,
        subtasks,
      },
    })
      .then(() => {
        setSuccess(`The task «${currentBoard?.title}» was successfully changed`);
        setChangeTaskModalShown(false);
      })
      .catch(() => {
        setError('The task could not be changed. Try again later');
      });
  };

  return (
    <Modal className={styles.modal} onShownChange={setChangeTaskModalShown} shown={changeTaskModalShown}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleChangeTask();
        }}
      >
        <h3>{task.title}</h3>
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
        <div className={styles.actions}>
          <Button
            onClick={() => {
              setChangeTaskModalShown(false);
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
