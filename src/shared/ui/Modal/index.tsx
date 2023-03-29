import React, { type FC, type HTMLAttributes, type PropsWithChildren, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { createFocusTrap } from 'focus-trap';
import classNames from 'classnames';

import styles from './Modal.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onShownChange: React.Dispatch<React.SetStateAction<boolean>>;
  shown: boolean;
}

export const Modal: FC<PropsWithChildren<Props>> = ({ children, onShownChange, className, shown }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trap = createFocusTrap(ref.current as HTMLDivElement, {
      allowOutsideClick: true,
      clickOutsideDeactivates: true,
    });

    shown && trap.activate();

    return () => {
      trap.deactivate();
    };
  }, [shown]);

  useEffect(() => {
    const documentClickListener = (): void => {
      onShownChange(false);
    };

    document.addEventListener('click', documentClickListener);

    return () => {
      document.removeEventListener('click', documentClickListener);
    };
  }, [onShownChange]);

  useEffect(() => {
    const documentKeydownListener = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onShownChange(false);
        event.stopPropagation();
      }
    };
    document.addEventListener('keydown', documentKeydownListener);
    return () => {
      document.removeEventListener('keydown', documentKeydownListener);
    };
  }, [onShownChange]);

  useEffect(() => {
    onShownChange(shown);
  }, [shown, onShownChange]);

  return createPortal(
    <motion.div
      onClick={() => {
        onShownChange(false);
      }}
      className={styles.frame}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(event) => {
          event.stopPropagation();
        }}
        ref={ref}
        className={classNames(
          {
            [styles.modal]: true,
          },
          className
        )}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        {children}
      </motion.div>
    </motion.div>,
    document.getElementById('overlay') as HTMLElement
  );
};
