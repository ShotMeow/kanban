import React, { type FC, type HTMLInputTypeAttribute, type InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';

import { ClosedEyeIcon, OpenedEyeIcon } from '../Icons/Eye';

import styles from './Field.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export const Field: FC<Props> = ({ type = 'text', title, value, ...props }) => {
  const [fieldType, setFieldType] = useState<HTMLInputTypeAttribute>(type);

  return (
    <label
      className={classNames(
        {
          [styles.color]: type === 'color',
        },
        styles.field
      )}
    >
      {title && <span>{title}</span>}
      <input value={value} type={fieldType} {...props} />
      {type === 'password' ? (
        <button
          aria-label="Shown Password Button"
          className={classNames({
            [styles.active]: fieldType === 'text',
          })}
          type="button"
          onClick={() => {
            fieldType === 'password' ? setFieldType('text') : setFieldType('password');
          }}
        >
          {fieldType === 'password' ? (
            <ClosedEyeIcon className={styles.icon} />
          ) : (
            <OpenedEyeIcon className={styles.icon} />
          )}
        </button>
      ) : type === "email" && <span className={styles.icon}>@</span>}
    </label>
  );
};
