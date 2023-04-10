import React, { type ButtonHTMLAttributes, type FC } from 'react';
import classNames from 'classnames';

import { CheckIcon } from '../Icons/Check';

import styles from './Checkbox.module.scss';
import { Spinner } from '@/shared/ui';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

export const Checkbox: FC<Props> = ({ title, isActive, setIsActive, disabled, ...props }) => {
  return (
    <label
      className={classNames(
        {
          [styles.active]: isActive,
          [styles.disabled]: disabled,
        },
        styles.checkbox
      )}
    >
      <button
        type="button"
        onClick={() => {
          setIsActive(!isActive);
        }}
        disabled={disabled}
        {...props}
      >
        {disabled ? (
          <Spinner />
        ) : (
          <CheckIcon
            className={classNames({
              [styles.visible]: isActive,
            })}
          />
        )}
      </button>
      {title && <span>{title}</span>}
    </label>
  );
};
