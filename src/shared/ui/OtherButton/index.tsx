import React, { type FC, type HTMLAttributes } from 'react';

import { OtherIcon } from '../Icons/Other';

import styles from './OtherButton.module.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export const OtherButton: FC<Props> = ({ ...props }) => {
  return (
    <button className={styles.other} {...props}>
      <OtherIcon className={styles.icon} />
    </button>
  );
};
