import React, { type ButtonHTMLAttributes, type FC, useState } from 'react';

import styles from './Select.module.scss';
import { ArrowIcon } from '../Icons/Arrow';
import classNames from 'classnames';
import { type ColumnType } from '@/entities/Column';
import { AnimatePresence, motion } from 'framer-motion';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  options: ColumnType[];
  currentValue: string;
  setCurrentValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Select: FC<Props> = ({ title, options, currentValue, setCurrentValue, disabled, ...props }) => {
  const [optionsShown, setOptionsShown] = useState<boolean>(false);

  return (
    <label
      role="radiogroup"
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
        <AnimatePresence>
          {optionsShown && (
            <motion.ul
              className={classNames({
                [styles.shown]: optionsShown,
              })}
              initial={{
                height: 0,
                marginTop: 0,
              }}
              animate={{
                height: 'auto',
              }}
              exit={{
                height: 0,
                marginTop: 0,
              }}
              style={{
                overflow: 'hidden',
              }}
            >
              {options.map((option) => (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentValue?.(option.title);
                      setOptionsShown(false);
                    }}
                  >
                    {option.title}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </label>
  );
};
