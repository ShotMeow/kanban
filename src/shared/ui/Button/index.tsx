import React, { forwardRef, type HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ primary, secondary, children, className, ...props }, ref) => {
    return (
      <button
        className={classNames(
          {
            [styles.primary]: primary,
            [styles.secondary]: secondary,
          },
          styles.button,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
