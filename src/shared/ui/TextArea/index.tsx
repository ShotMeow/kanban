import React, { type FC, type TextareaHTMLAttributes } from 'react';

import styles from './TextArea.module.scss';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
}

export const TextArea: FC<Props> = ({ title, ...props }) => {
  return (
    <label className={styles.textarea}>
      <span>{title}</span>
      <textarea {...props}></textarea>
    </label>
  );
};
