import React, { type FC } from 'react';
import { useColorScheme } from '@/features/ColorScheme/hooks';

import styles from './ColorSwitcher.module.scss';
import { MoonIcon, SunIcon, Switch } from '@/shared/ui';
import { ColorSchemeSwitcherValues } from '@/features/ColorScheme/types';
import classNames from 'classnames';

export const ColorSwitcher: FC = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const handleChangeColorScheme = (): void => {
    if (colorScheme === ColorSchemeSwitcherValues.DARK) setColorScheme(ColorSchemeSwitcherValues.LIGHT);
    else setColorScheme(ColorSchemeSwitcherValues.DARK);
  };

  return (
    <div
      className={classNames(
        {
          [styles.dark]: colorScheme === ColorSchemeSwitcherValues.DARK,
          [styles.light]: colorScheme === ColorSchemeSwitcherValues.LIGHT,
        },
        styles.switcher
      )}
    >
      <SunIcon className={styles.sun} />
      <Switch
        onClick={() => {
          handleChangeColorScheme();
        }}
        isActive={colorScheme === ColorSchemeSwitcherValues.DARK}
      />
      <MoonIcon className={styles.moon} />
    </div>
  );
};
