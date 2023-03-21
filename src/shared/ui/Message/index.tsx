import React, { type FC, type PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Message.module.scss';
import classNames from 'classnames';
import { CheckIcon } from '@/shared/ui/Icons/Check';

import { motion } from 'framer-motion';

interface Props {
  success?: boolean;
  error?: boolean;
  warning?: boolean;
  messageVisibleHandler: (state: any) => void;
}

export const Message: FC<PropsWithChildren<Props>> = ({ success, error, warning, messageVisibleHandler, children }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      messageVisibleHandler(null);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return createPortal(
    <motion.div
      className={classNames(
        {
          [styles.success]: success,
          [styles.error]: error,
          [styles.warning]: warning,
        },
        styles.message
      )}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      {error && <div className={styles.icon}>×</div>}
      {success && (
        <div className={styles.icon}>
          <CheckIcon />
        </div>
      )}
      {warning && <div className={styles.icon}>!</div>} {children}
    </motion.div>,
    document.getElementById('overlay') as HTMLElement
  );
};
