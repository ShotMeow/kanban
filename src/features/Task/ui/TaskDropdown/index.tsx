import React, { type FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Dropdown, RenameIcon, TrashIcon } from '@/shared/ui';
import { type ColumnType } from '@/features/Column';

import { DeleteTaskModal } from '../DeleteTaskModal';
import { ChangeTaskModal } from '../ChangeTaskModal';
import { type TaskType } from '../../types';

import styles from './TaskDropdown.module.scss';

interface Props {
  shown: boolean;
  onShownChange: React.Dispatch<React.SetStateAction<boolean>>;
  task: TaskType;
  column: ColumnType;
}

export const TaskDropdown: FC<Props> = ({ shown, onShownChange, task, column }) => {
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
            column={column}
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
