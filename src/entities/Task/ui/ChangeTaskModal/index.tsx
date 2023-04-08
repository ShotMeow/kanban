import React, { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { getBoardStatuses, getCurrentBoard } from '@/entities/Board';
import { useNotificationContext } from '@/features/Notification';
import { useAuthContext } from '@/features/Authorize';
import { Button, Field, Modal, Select, TextArea } from '@/shared/ui';
import { getColumns } from '@/entities/Column';

import { taskApi } from '../../queries';
import { type SubtaskType, type TaskType } from '../../types';
import { SubtaskList } from '../SubtaskList';

import styles from './ChangeTaskModal.module.scss';

interface Props {
  setChangeTaskModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  changeTaskModalShown: boolean;
  task: TaskType;
}

export const ChangeTaskModal: FC<Props> = ({ setChangeTaskModalShown, changeTaskModalShown, task }) => {
  const [changeTask] = taskApi.useChangeTaskMutation();

  const currentBoard = useSelector(getCurrentBoard);

  const [subtasks, setSubtasks] = useState<SubtaskType[]>(task.subtasks);
  const [titleValue, setTitleValue] = useState<string>(task.title);
  const [descriptionValue, setDescriptionValue] = useState<string>(task.description);

  const [currentStatus, setCurrentStatus] = useState<string>(task.status);

  const { user } = useAuthContext();
  const { setError, setSuccess } = useNotificationContext();

  const columns = useSelector(getColumns);

  const handleChangeTask = (): void => {
    void changeTask({
      userId: user?.uid || '',
      boardId: currentBoard?.id || '',
      columnId: columns?.find((column) => column.title === currentStatus)?.id || '',
      taskId: task.id,
      task: {
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
    <Modal
      title={task.title}
      className={styles.modal}
      onShownChange={setChangeTaskModalShown}
      shown={changeTaskModalShown}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleChangeTask();
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
          currentValue={currentStatus}
          setCurrentValue={setCurrentStatus}
          options={getBoardStatuses(columns || [])}
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
