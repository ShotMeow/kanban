import React, { type ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

import { Spinner } from '../Spinner';

import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ disabled, primary, secondary, children, className, type = 'button', ...props }, ref) => {
    return (
      <button
        className={classNames(
          {
            [styles.primary]: primary,
            [styles.secondary]: secondary,
            [styles.disabled]: disabled,
          },
          styles.button,
          className
        )}
        type={type}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {disabled ? <Spinner /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
