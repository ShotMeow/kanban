import React, { type FC } from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';
import { CheckIcon } from '@/shared/ui/Icons/Check';

interface Props {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export const Checkbox: FC<Props> = ({ title, isActive, setIsActive }) => {
  return (
    <label
      className={classNames(
        {
          [styles.active]: isActive,
        },
        styles.checkbox
      )}
    >
      <button
        type="button"
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {isActive && <CheckIcon />}
      </button>
      <span>{title}</span>
    </label>
  );
};