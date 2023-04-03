import React, { type FC } from 'react';

import { type ColumnType } from '@/features/Column';

import { type SubtaskType, type TaskType } from '../../types';
import { SubtaskItem } from '../SubtaskItem';
import styles from './SubtasksSection.module.scss';

interface Props {
  subtasks: SubtaskType[];
  task: TaskType;
  column: ColumnType;
}

export const SubtasksSection: FC<Props> = ({ subtasks, task, column }) => {
  return (
    <div className={styles.subtasks}>
      <h2>
        Subtasks ({subtasks.filter((subtask) => subtask.isSuccess).length} of {subtasks.length})
      </h2>
      <ul>
        {subtasks.map((subtask) => (
          <li key={subtask.id}>
            <SubtaskItem column={column} task={task} subtask={subtask} />
          </li>
        ))}
      </ul>
    </div>
  );
};
