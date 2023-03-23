import React, { type FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { KanbanIcon } from '../Icons/Kanban';
import styles from './Logo.module.scss';

const MotionLink = motion(Link);

export const Logo: FC = () => {
  return (
    <MotionLink whileTap={{ scale: 0.95 }} to="/" className={styles.logo}>
      <KanbanIcon className={styles.icon} />
      Kanban
    </MotionLink>
  );
};
