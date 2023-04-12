import React, { type FC, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

import { Modal, OtherButton, Select } from '@/shared/ui';
import { getCurrentBoard } from '@/entities/Board';
import { useAuthContext } from '@/features/Authorize';
import { getColumns, type ColumnType } from '@/entities/Column';

import { SubtasksSection } from '../SubtasksSection';
import { TaskDropdown } from '../TaskDropdown';
import { taskApi } from '../../queries';
import { type TaskType } from '../../types';

import styles from './TaskModal.module.scss';

interface Props {
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  task: TaskType;
  column: ColumnType;
}

export const TaskModal: FC<Props> = ({ isShown, setIsShown, task, column }) => {
  const [actionsShown, actionsShownChange] = useState<boolean>(false);
  const currentBoard = useSelector(getCurrentBoard);
  const { user } = useAuthContext();

  const [status, setStatus] = useState<string>(task.status);

  const columns = useSelector(getColumns);
  const [moveTask] = taskApi.useMoveTaskMutation();

  useEffect(() => {
    if (status !== task.status) {
      void moveTask({
        userId: user?.uid || '',
        boardId: currentBoard?.id || '',
        columnFromId: column.id,
        columnToId: columns?.find((column) => column.title === status)?.id || '',
        task: {
          ...task,
          status,
        },
      });
      setIsShown(false);
    }
  }, [status]);

  return (
    <>
      <Modal className={styles.modal} shown={isShown} onShownChange={setIsShown}>
        <div>
          <div className={styles.heading}>
            <h2>{task.title}</h2>
            <OtherButton
              onClick={() => {
                actionsShownChange(!actionsShown);
              }}
            />
            <AnimatePresence>
              {actionsShown && (
                <TaskDropdown column={column} task={task} onShownChange={actionsShownChange} shown={actionsShown} />
              )}
            </AnimatePresence>
          </div>
          <p>{task.description}</p>
          <SubtasksSection column={column} task={task} subtasks={task.subtasks} />
          {columns && <Select title="Status" currentValue={status} setCurrentValue={setStatus} options={columns} />}
        </div>
      </Modal>
    </>
  );
};
