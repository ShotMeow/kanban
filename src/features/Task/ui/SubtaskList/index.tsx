import React, { type FC, type HTMLAttributes } from 'react';

import { Button, Field } from '@/shared/ui';

import { getRandomPlaceholder } from '../../utils';
import { type SubtaskType } from '../../types';

import styles from './SubtaskList.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  subtasks: SubtaskType[];
  setSubtasks: React.Dispatch<React.SetStateAction<SubtaskType[]>>;
}

export const SubtaskList: FC<Props> = ({ subtasks, setSubtasks, ...props }) => {
  const handleDeleteSubtask = (subtaskId: number): void => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  };

  const handleChangeSubtask = (value: string, subtaskId: number): void => {
    const currentSubtasks: SubtaskType[] = subtasks.map((subtask) => {
      const localSubtask = { ...subtask };
      if (localSubtask.id === subtaskId) localSubtask.value = value;
      return localSubtask;
    });
    setSubtasks(currentSubtasks);
  };

  const handleAddSubtask = (): void => {
    const currentSubtasks = [...subtasks];
    currentSubtasks.push({
      id: subtasks.length,
      value: '',
      isSuccess: false,
    });
    setSubtasks(currentSubtasks);
  };

  return (
    <div className={styles.subtasks} {...props}>
      {Boolean(subtasks.length) && (
        <>
          <h2>Subtasks</h2>
          <ul>
            {subtasks.map((subtask, index) => (
              <li key={subtask.id}>
                <Field
                  required
                  onChange={(event) => {
                    handleChangeSubtask(event.currentTarget.value, subtask.id);
                  }}
                  value={subtask.value}
                  placeholder={`e.g. ${getRandomPlaceholder(index)}`}
                />
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteSubtask(subtask.id);
                  }}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <Button
        onClick={() => {
          handleAddSubtask();
        }}
        secondary
      >
        {subtasks.length ? '+ Add New Subtask' : '+ Add Subtask'}
      </Button>
    </div>
  );
};
