import React, { type FC, useEffect, useState } from 'react';

import styles from './TaskModal.module.scss';
import { Modal, OtherButton, Select } from '@/shared/ui';
import { type TodoType } from '@/features/Task/types';
import { SubtasksSection } from '@/features/Task/ui/SubtasksSection';
import { AnimatePresence } from 'framer-motion';
import { TaskDropdown } from '@/features/Task/ui/TaskDropdown';
import { getBoardStatuses, getCurrentBoard } from '@/features/Board';
import { useSelector } from 'react-redux';
import { taskApi } from '@/features/Task/queries';
import { useAuthContext } from '@/features/Authorize';

interface Props {
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  task: TodoType;
}

export const TaskModal: FC<Props> = ({ isShown, setIsShown, task }) => {
  const [actionsShown, actionsShownChange] = useState<boolean>(false);
  const currentBoard = useSelector(getCurrentBoard);
  const { user } = useAuthContext();

  const [status, setStatus] = useState<string>(task.status);

  const [changeTodo] = taskApi.useChangeTodoMutation();

  useEffect(() => {
    if (status !== task.status) {
      void changeTodo({
        userId: user?.uid || '',
        boardId: currentBoard?.id || '',
        todoId: task.id,
        todo: {
          ...task,
          status,
        },
      });
    }
  }, [status]);

  return (
    <>
      <Modal className={styles.modal} shown={isShown} onShownChange={setIsShown}>
        <div>
          <div className={styles.heading}>
            <h2>{task.title}</h2>
            <OtherButton
              onClick={(event) => {
                event.stopPropagation();
                actionsShownChange(!actionsShown);
              }}
            />
            <AnimatePresence>
              {actionsShown && <TaskDropdown task={task} onShownChange={actionsShownChange} shown={actionsShown} />}
            </AnimatePresence>
          </div>
          <p>{task.description}</p>
          <SubtasksSection todo={task} subtasks={task.subtasks} />
          <Select
            title="Status"
            currentValue={status}
            setCurrentValue={setStatus}
            options={getBoardStatuses(currentBoard?.columns || [])}
          />
        </div>
      </Modal>
    </>
  );
};
