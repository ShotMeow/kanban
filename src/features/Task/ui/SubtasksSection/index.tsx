import React, { type FC } from 'react';

import styles from './SubtasksSection.module.scss';
import { type SubtaskType, type TodoType } from '@/features/Task/types';
import { SubtaskItem } from '@/features/Task/ui/SubtaskItem';

interface Props {
  subtasks: SubtaskType[];
  todo: TodoType;
}

export const SubtasksSection: FC<Props> = ({ subtasks, todo }) => {
  return (
    <div className={styles.subtasks}>
      <h2>
        Subtasks ({subtasks.filter((subtask) => subtask.isSuccess).length} of {subtasks.length})
      </h2>
      <ul>
        {subtasks.map((subtask) => (
          <li key={subtask.id}>
            <SubtaskItem todo={todo} subtask={subtask} />
          </li>
        ))}
      </ul>
    </div>
  );
};
