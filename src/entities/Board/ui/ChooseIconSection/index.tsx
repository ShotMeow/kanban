import React, { type FC } from 'react';

import styles from './ChooseIconSection.module.scss';
import classNames from 'classnames';

interface Props {
  icons: string[];
  selectedIcon: string;
  setSelectedIcon: React.Dispatch<React.SetStateAction<string>>;
}

export const ChooseIconSection: FC<Props> = ({ icons, setSelectedIcon, selectedIcon }) => {
  return (
    <div className={styles.icons}>
      <h3>Choose Icon</h3>
      <div>
        {icons?.map((icon) => (
          <button
            type="button"
            className={classNames({
              [styles.active]: icon === selectedIcon,
            })}
            onClick={() => {
              setSelectedIcon(icon);
            }}
            key={icon}
          >
            <img src={icon} alt="Icon" />
          </button>
        ))}
      </div>
    </div>
  );
};
