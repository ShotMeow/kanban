import React, { type FC, type HTMLInputTypeAttribute, type InputHTMLAttributes, useState } from 'react';

import styles from './Field.module.scss';
import { ClosedEyeIcon, OpenedEyeIcon } from '@/shared/ui/Icons/Eye';
import classNames from 'classnames';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export const Field: FC<Props> = ({ type = 'text', title, value, ...props }) => {
  const [fieldType, setFieldType] = useState<HTMLInputTypeAttribute>(type);
  return (
    <label className={styles.field}>
      <span>{title}</span>
      <input value={value} type={fieldType} {...props} />
      {type === 'password' && (
        <button
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
      )}
    </label>
  );
};
