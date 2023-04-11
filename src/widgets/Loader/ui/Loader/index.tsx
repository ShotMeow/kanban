import React, { type FC } from 'react';
import { Spinner } from '@/shared/ui';
import { motion } from 'framer-motion';
import styles from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <motion.div
      className={styles.loader}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <Spinner />
    </motion.div>
  );
};
