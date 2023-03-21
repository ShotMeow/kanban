import React, { type FC } from 'react';
import { KanbanIcon } from '../Icons/Kanban';

import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

export const Logo: FC = () => {
  return (
    <Link to="/" className={styles.logo}>
      <KanbanIcon className={styles.icon} />
      Kanban
    </Link>
  );
};
