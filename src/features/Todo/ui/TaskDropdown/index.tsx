import React, { type FC, useState } from 'react';

import styles from './TaskDropdown.module.scss';
import { Dropdown, RenameIcon, TrashIcon } from '@/shared/ui';
import { AnimatePresence } from 'framer-motion';
import { DeleteTaskModal } from '@/features/Todo/ui/DeleteTaskModal';
import { type TodoType } from '@/features/Todo/types';
import { ChangeTaskModal } from '@/features/Todo/ui/ChangeTaskModal';

interface Props {
  shown: boolean;
  onShownChange: React.Dispatch<React.SetStateAction<boolean>>;
  task: TodoType;
}

export const TaskDropdown: FC<Props> = ({ shown, onShownChange, task }) => {
  const [deleteModalShown, setDeleteModalShown] = useState<boolean>(false);
  const [changeModalShown, setChangeModalShown] = useState<boolean>(false);

  return (
    <>
      <Dropdown className={styles.dropdown} onShownChange={onShownChange} shown={shown}>
        <ul>
          <li>
            <button
              onClick={() => {
                setChangeModalShown(true);
              }}
            >
              <RenameIcon />
              Change
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setDeleteModalShown(true);
              }}
              className={styles.delete}
            >
              <TrashIcon /> Delete
            </button>
          </li>
        </ul>
      </Dropdown>
      <AnimatePresence>
        {deleteModalShown && (
          <DeleteTaskModal
            setDeleteTaskModalShown={setDeleteModalShown}
            deleteTaskModalShown={deleteModalShown}
            task={task}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {changeModalShown && (
          <ChangeTaskModal
            setChangeTaskModalShown={setChangeModalShown}
            changeTaskModalShown={changeModalShown}
            task={task}
          />
        )}
      </AnimatePresence>
    </>
  );
};
