import React, { forwardRef, type HTMLAttributes } from 'react';

import { OtherIcon } from '../Icons/Other';

import styles from './OtherButton.module.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export const OtherButton = forwardRef<HTMLButtonElement, Props>(({ ...props }, ref) => {
  return (
    <button ref={ref} className={styles.other} {...props}>
      <OtherIcon className={styles.icon} />
    </button>
  );
});

OtherButton.displayName = 'OtherButton';
