import React, { type ButtonHTMLAttributes, type FC, useState } from 'react';

import styles from './Select.module.scss';
import { ArrowIcon } from '../Icons/Arrow';
import classNames from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  options: string[];
  currentValue: string;
  setCurrentValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Select: FC<Props> = ({ title, options, currentValue, setCurrentValue, disabled, ...props }) => {
  const [optionsShown, setOptionsShown] = useState<boolean>(false);

  return (
    <label
      className={classNames(
        {
          [styles.disabled]: disabled,
        },
        styles.select
      )}
    >
      <span>{title}</span>
      <div>
        <button
          type="button"
          onClick={() => {
            setOptionsShown(!optionsShown);
          }}
          {...props}
        >
          {currentValue}
          <ArrowIcon
            className={classNames({
              [styles.active]: optionsShown,
            })}
          />
        </button>
        <ul
          className={classNames({
            [styles.shown]: optionsShown,
          })}
        >
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  setCurrentValue?.(option);
                  setOptionsShown(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
};
