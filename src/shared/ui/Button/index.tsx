import React, { type FC, type HTMLAttributes, type PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
}

export const Button: FC<PropsWithChildren<Props>> = ({ primary, secondary, children, ...props }) => {
  return (
    <button
      className={classNames(
        {
          [styles.primary]: primary,
          [styles.secondary]: secondary,
        },
        styles.button
      )}
      {...props}
    >
      {children}
    </button>
  );
};
