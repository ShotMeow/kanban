import React, { type FC } from 'react';
import classNames from 'classnames';

import { CheckIcon } from '../Icons/Check';

import styles from './Checkbox.module.scss';

interface Props {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
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
        <CheckIcon
          className={classNames({
            [styles.visible]: isActive,
          })}
        />
      </button>
      {title && <span>{title}</span>}
    </label>
  );
};
