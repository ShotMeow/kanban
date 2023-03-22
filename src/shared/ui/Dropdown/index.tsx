import React, { type FC, type HTMLAttributes, type PropsWithChildren, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { createFocusTrap } from 'focus-trap';

import styles from './Dropdown.module.scss';
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onShownChange: React.Dispatch<React.SetStateAction<boolean>>;
  shown: boolean;
}

export const Dropdown: FC<PropsWithChildren<Props>> = ({ children, onShownChange, className, shown, ...props }) => {
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
    onShownChange(shown);
  }, [shown, onShownChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -40, scale: 0 }}
      animate={{ opacity: 1, y: -20, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        ref={ref}
        className={classNames(
          {
            [styles.dropdown]: true,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    </motion.div>
  );
};
