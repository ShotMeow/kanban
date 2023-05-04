import React, { type ButtonHTMLAttributes, type FC } from 'react';

import styles from './Switch.module.scss';
import classNames from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export const Switch: FC<Props> = ({ isActive, className, ...props }) => {
  return (
    <button
      aria-label="Switch"
      aria-checked={isActive}
      role="switch"
      className={classNames(
        {
          [styles.switch]: true,
          [styles.active]: isActive,
        },
        className
      )}
      {...props}
    >
      <div />
    </button>
  );
};
