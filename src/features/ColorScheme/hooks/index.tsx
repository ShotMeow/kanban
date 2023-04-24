import React, { useEffect } from 'react';

import { type ColorSchemeSwitcherValues } from '../types';
import { applyScheme, getSavedScheme, getSystemScheme } from '../utils';

export const useColorScheme = (): {
  colorScheme: ColorSchemeSwitcherValues;
  setColorScheme: React.Dispatch<ColorSchemeSwitcherValues>;
} => {
  const [colorScheme, setColorScheme] = React.useState<ColorSchemeSwitcherValues>(
    getSavedScheme() || getSystemScheme()
  );

  useEffect(() => {
    applyScheme(colorScheme, true);
  }, [colorScheme]);

  return { colorScheme, setColorScheme };
};
