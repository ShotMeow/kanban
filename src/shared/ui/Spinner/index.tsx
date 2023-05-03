import React, { type FC } from 'react';

import styles from './Spinner.module.scss';

export const Spinner: FC = () => {
  return <div aria-label="Spinner" className={styles.spinner} />;
};
